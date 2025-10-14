// src/components/Games/TicTacToe/index.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiRotateCcw, FiCpu, FiUsers } from 'react-icons/fi';

const TicTacToe = () => {
  // Game State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'ai'
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [stats, setStats] = useState({ x: 0, o: 0, draws: 0 });
  const [isThinking, setIsThinking] = useState(false);
  
  // Animation controls
  const boardControls = useAnimation();
  const winLineControls = useAnimation();
  
  // Audio context
  const audioContext = useRef(null);
  
  // Initialize audio context once and reuse
  useEffect(() => {
    if (!audioContext.current) {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }, []);

  // Play sound effect
  const playSound = useCallback((type, frequency = 800, duration = 0.1) => {
    try {
      if (audioContext.current) {
        const oscillator = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        
        switch (type) {
          case 'move':
            oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
            break;
          case 'win':
            oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.current.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);
            duration = 0.5;
            break;
          case 'draw':
            oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
            break;
          default:
            break;
        }
        
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
        oscillator.start(audioContext.current.currentTime);
        oscillator.stop(audioContext.current.currentTime + duration);
      }
    } catch (e) {
      console.warn('Audio playback failed');
    }
  }, []);

  // Check winner logic
  const checkWinner = useCallback((squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }, []);

  // AI Move Logic (Minimax Algorithm)
  const minimax = useCallback((squares, depth, isMaximizing) => {
    const result = checkWinner(squares);
    
    if (result && result.winner === 'O') return 10 - depth;
    if (result && result.winner === 'X') return depth - 10;
    if (squares.every(square => square !== null)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner]);

  // Get best AI move
  const getBestMove = useCallback((squares) => {
    let bestScore = -Infinity;
    let bestMove = null;
    
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax([...squares], 0, false);
        squares[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  }, [minimax]);

  // Handle cell click
  const handleClick = useCallback(async (index) => {
    if (board[index] || winner || isThinking) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    // Play move sound
    playSound('move', isXNext ? 900 : 700);
    
    // Check for winner
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setStats(prev => ({
        ...prev,
        [result.winner.toLowerCase()]: prev[result.winner.toLowerCase()] + 1
      }));
      playSound('win');
      
      // Animate winning line
      setTimeout(() => {
        winLineControls.start({
          opacity: [0, 1],
          scale: [0.8, 1.1, 1],
          transition: { duration: 0.6 }
        });
      }, 300);
    } else if (newBoard.every(square => square !== null)) {
      setWinner('draw');
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      playSound('draw');
    } else {
      setIsXNext(!isXNext);
    }
  }, [board, winner, isXNext, isThinking, playSound, checkWinner, winLineControls]);

  // AI Move Effect
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner && !isThinking) {
      setIsThinking(true);
      setTimeout(() => {
        const aiMove = getBestMove([...board]);
        if (aiMove !== null) {
          handleClick(aiMove);
        }
        setIsThinking(false);
      }, 500 + Math.random() * 500); // Random delay for more natural feel
    }
  }, [gameMode, isXNext, winner, board, getBestMove, handleClick, isThinking]);

  // Reset game
  const resetGame = useCallback(async () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsThinking(false);
    
    // Reset animations
    await boardControls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
  }, [boardControls]);

  // Reset stats
  const resetStats = useCallback(() => {
    setStats({ x: 0, o: 0, draws: 0 });
  }, []);

  // Get status message
  const getStatus = () => {
    if (winner === 'draw') return 'Game Draw! 🤝';
    if (winner) return `Winner: ${winner} 🎉`;
    if (isThinking) return 'AI is thinking... 🤖';
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  // Render cell
  const renderCell = (index) => {
    const value = board[index];
    const isWinningCell = winningLine && winningLine.includes(index);
    
    return (
      <motion.button
        key={index}
        className={`
          w-20 h-20 md:w-24 md:h-24 border-2 border-primary-500 rounded-lg
          flex items-center justify-center text-3xl md:text-4xl font-bold
          transition-all duration-200 hover:bg-primary-500/10
          ${value === 'X' ? 'text-blue-400' : 'text-red-400'}
          ${isWinningCell ? 'bg-yellow-400/20 border-yellow-400' : ''}
          ${!value && !winner ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        `}
        onClick={() => handleClick(index)}
        whileHover={!value && !winner ? { scale: 1.05 } : {}}
        whileTap={!value && !winner ? { scale: 0.95 } : {}}
        animate={value ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
        disabled={!!value || !!winner || isThinking}
      >
        {value && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            {value}
          </motion.span>
        )}
      </motion.button>
    );
  };

  return (
    <motion.div
      animate={boardControls}
      className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-accent flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Tic Tac Toe ⭕
          </h1>
          <p className="text-gray-400 text-lg">
            Classic strategy game. Get three in a row to win!
          </p>
        </div>

        {/* Game Mode Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setGameMode('pvp');
              resetGame();
            }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${gameMode === 'pvp' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <FiUsers /> Player vs Player
          </button>
          <button
            onClick={() => {
              setGameMode('ai');
              resetGame();
            }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${gameMode === 'ai' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <FiCpu /> Player vs AI
          </button>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-primary-400 mb-2">
            {getStatus()}
          </div>
          {gameMode === 'ai' && (
            <div className="text-sm text-gray-400">
              You are X, AI is O
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-2 p-4 bg-dark-card rounded-xl">
            {board.map((_, index) => renderCell(index))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.x}</div>
            <div className="text-sm text-gray-400">X Wins</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.draws}</div>
            <div className="text-sm text-gray-400">Draws</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{stats.o}</div>
            <div className="text-sm text-gray-400">O Wins</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="btn-primary flex items-center gap-2"
          >
            <FiRotateCcw /> New Game
          </button>
          <button
            onClick={resetStats}
            className="btn-secondary"
          >
            Reset Stats
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 card">
          <h3 className="text-lg font-bold mb-2 text-primary-400">How to Play:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Click on empty squares to place your mark</li>
            <li>• Get three in a row (horizontal, vertical, or diagonal) to win</li>
            <li>• In AI mode, you play as X and go first</li>
            <li>• The AI uses perfect strategy - try to beat it!</li>
            <li>• Track your wins in the stats above</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default TicTacToe;