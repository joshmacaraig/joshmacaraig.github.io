// src/components/Games/ChessGame/index.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiRotateCcw, FiCpu, FiUsers, FiBookOpen, FiLoader } from 'react-icons/fi';

const ChessGame = () => {
  // Initial board position (FEN notation)
  const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // Piece symbols for display
  const PIECE_SYMBOLS = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  // Game State
  const [gameState, setGameState] = useState({
    board: [],
    turn: 'white',
    gameStatus: 'playing',
    moveHistory: [],
    capturedPieces: { white: [], black: [] }
  });
  
  const [gameMode, setGameMode] = useState('ai');
  const [difficulty, setDifficulty] = useState(5); // 1-10 for lighter load
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isEngineLoading, setIsEngineLoading] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  
  // Refs
  const stockfishRef = useRef(null);
  const boardControls = useAnimation();
  const audioContext = useRef(null);

  // Initialize Audio Context
  useEffect(() => {
    if (!audioContext.current) {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }, []);

  // Lazy load Stockfish only when component mounts
  useEffect(() => {
    let stockfishScript = null;
    
    const loadStockfish = async () => {
      if (gameMode === 'ai' && !stockfishRef.current && !isEngineLoading) {
        setIsEngineLoading(true);
        
        try {
          // Create script element for Stockfish
          stockfishScript = document.createElement('script');
          stockfishScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js';
          stockfishScript.async = true;
          
          stockfishScript.onload = () => {
            if (window.Stockfish) {
              stockfishRef.current = window.Stockfish();
              stockfishRef.current.onmessage = handleStockfishMessage;
              stockfishRef.current.postMessage('uci');
              stockfishRef.current.postMessage('setoption name Threads value 1'); // Limit threads
              stockfishRef.current.postMessage('setoption name Hash value 16');   // Limit memory to 16MB
              stockfishRef.current.postMessage('ucinewgame');
              setIsEngineLoading(false);
              setEngineReady(true);
            }
          };
          
          stockfishScript.onerror = () => {
            console.warn('Failed to load Stockfish');
            setIsEngineLoading(false);
          };
          
          document.head.appendChild(stockfishScript);
        } catch (e) {
          console.warn('Failed to load Stockfish:', e);
          setIsEngineLoading(false);
        }
      }
    };

    loadStockfish();
    initializeGame();

    // Cleanup function
    return () => {
      // Terminate Stockfish worker
      if (stockfishRef.current) {
        try {
          stockfishRef.current.postMessage('quit');
          stockfishRef.current.terminate && stockfishRef.current.terminate();
        } catch (e) {
          console.warn('Error terminating Stockfish:', e);
        }
        stockfishRef.current = null;
      }
      
      // Remove script element
      if (stockfishScript && stockfishScript.parentNode) {
        document.head.removeChild(stockfishScript);
      }
      
      setEngineReady(false);
    };
  }, [gameMode]);

  // Play sound effects
  const playSound = useCallback((type) => {
    if (!audioContext.current) return;
    
    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      let frequency, duration;
      
      switch (type) {
        case 'move':
          frequency = 800;
          duration = 0.1;
          gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
          break;
        case 'capture':
          frequency = 400;
          duration = 0.2;
          oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.current.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
          break;
        case 'check':
          frequency = 1000;
          duration = 0.3;
          gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
          break;
        default:
          frequency = 500;
          duration = 0.1;
          gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
      }
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback failed');
    }
  }, []);

  // Convert FEN to board array
  const fenToBoard = useCallback((fen) => {
    const [boardPart] = fen.split(' ');
    const ranks = boardPart.split('/');
    const board = [];
    
    for (let rank = 0; rank < 8; rank++) {
      const row = [];
      for (const char of ranks[rank]) {
        if (isNaN(char)) {
          row.push(char);
        } else {
          for (let i = 0; i < parseInt(char); i++) {
            row.push(null);
          }
        }
      }
      board.push(row);
    }
    
    return board;
  }, []);

  // Convert board to FEN notation
  const boardToFen = useCallback((board, turn = 'white') => {
    const fenBoard = board.map(rank => {
      let fenRank = '';
      let emptyCount = 0;
      
      for (const piece of rank) {
        if (piece === null) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fenRank += emptyCount;
            emptyCount = 0;
          }
          fenRank += piece;
        }
      }
      
      if (emptyCount > 0) {
        fenRank += emptyCount;
      }
      
      return fenRank;
    }).join('/');
    
    const turnChar = turn === 'white' ? 'w' : 'b';
    return `${fenBoard} ${turnChar} KQkq - 0 1`;
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const board = fenToBoard(INITIAL_FEN);
    setGameState({
      board,
      turn: 'white',
      gameStatus: 'playing',
      moveHistory: [],
      capturedPieces: { white: [], black: [] }
    });
    setSelectedSquare(null);
    setPossibleMoves([]);
    setEvaluation(0);
  }, [fenToBoard]);

  // Basic move validation (simplified)
  const isValidMove = useCallback((from, to, piece, board) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    // Basic bounds check
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
    
    // Can't capture own pieces
    const targetPiece = board[toRow][toCol];
    if (targetPiece && getPieceColor(piece) === getPieceColor(targetPiece)) return false;
    
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;
    const absRowDiff = Math.abs(rowDiff);
    const absColDiff = Math.abs(colDiff);
    
    // Basic piece movement rules
    switch (piece.toLowerCase()) {
      case 'p': // Pawn
        const direction = getPieceColor(piece) === 'white' ? -1 : 1;
        const startRow = getPieceColor(piece) === 'white' ? 6 : 1;
        
        if (colDiff === 0) { // Forward move
          if (rowDiff === direction && !targetPiece) return true;
          if (fromRow === startRow && rowDiff === 2 * direction && !targetPiece && !board[fromRow + direction][fromCol]) return true;
        } else if (absColDiff === 1 && rowDiff === direction && targetPiece) { // Capture
          return true;
        }
        break;
        
      case 'r': // Rook
        return (rowDiff === 0 || colDiff === 0) && !isPathBlocked(from, to, board);
        
      case 'n': // Knight
        return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
        
      case 'b': // Bishop
        return absRowDiff === absColDiff && !isPathBlocked(from, to, board);
        
      case 'q': // Queen
        return (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) && !isPathBlocked(from, to, board);
        
      case 'k': // King
        return absRowDiff <= 1 && absColDiff <= 1;
    }
    
    return false;
  }, []);

  // Check if path is blocked
  const isPathBlocked = (from, to, board) => {
    const rowStep = Math.sign(to[0] - from[0]);
    const colStep = Math.sign(to[1] - from[1]);
    
    let currentRow = from[0] + rowStep;
    let currentCol = from[1] + colStep;
    
    while (currentRow !== to[0] || currentCol !== to[1]) {
      if (board[currentRow][currentCol] !== null) return true;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return false;
  };

  // Get piece color
  const getPieceColor = (piece) => {
    return piece === piece.toUpperCase() ? 'white' : 'black';
  };

  // Generate possible moves
  const generatePossibleMoves = useCallback((row, col, board) => {
    const piece = board[row][col];
    if (!piece || getPieceColor(piece) !== gameState.turn) return [];
    
    const moves = [];
    for (let toRow = 0; toRow < 8; toRow++) {
      for (let toCol = 0; toCol < 8; toCol++) {
        if (isValidMove([row, col], [toRow, toCol], piece, board)) {
          moves.push([toRow, toCol]);
        }
      }
    }
    return moves;
  }, [gameState.turn, isValidMove]);

  // Handle Stockfish messages
  const handleStockfishMessage = useCallback((event) => {
    const message = event.data || event;
    
    if (message.includes('bestmove')) {
      const match = message.match(/bestmove (\w+)/);
      if (match && match[1] !== '(none)') {
        parseAndMakeAIMove(match[1]);
      }
      setIsThinking(false);
    } else if (message.includes('info') && message.includes('score cp')) {
      const match = message.match(/score cp (-?\d+)/);
      if (match) {
        setEvaluation(parseInt(match[1]) / 100);
      }
    }
  }, []);

  // Request AI move
  const requestAIMove = useCallback((gameState) => {
    if (!stockfishRef.current || !engineReady) return;
    
    setIsThinking(true);
    const fen = boardToFen(gameState.board, gameState.turn);
    
    // Use limited depth to prevent memory issues
    const maxDepth = Math.min(difficulty, 8);
    
    try {
      stockfishRef.current.postMessage(`position fen ${fen}`);
      stockfishRef.current.postMessage(`go depth ${maxDepth}`);
    } catch (e) {
      console.warn('Error communicating with Stockfish:', e);
      setIsThinking(false);
    }
  }, [boardToFen, difficulty, engineReady]);

  // Parse and make AI move
  const parseAndMakeAIMove = useCallback((moveString) => {
    if (moveString.length < 4) return;
    
    const fromCol = moveString.charCodeAt(0) - 97;
    const fromRow = 8 - parseInt(moveString[1]);
    const toCol = moveString.charCodeAt(2) - 97;
    const toRow = 8 - parseInt(moveString[3]);
    
    setTimeout(() => {
      makeMove([fromRow, fromCol], [toRow, toCol]);
    }, 300);
  }, []);

  // Handle square click
  const handleSquareClick = useCallback((row, col) => {
    const piece = gameState.board[row][col];
    
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      
      if (row === fromRow && col === fromCol) {
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else if (possibleMoves.some(([r, c]) => r === row && c === col)) {
        makeMove(selectedSquare, [row, col]);
      } else if (piece && getPieceColor(piece) === gameState.turn) {
        setSelectedSquare([row, col]);
        setPossibleMoves(generatePossibleMoves(row, col, gameState.board));
      } else {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    } else if (piece && getPieceColor(piece) === gameState.turn) {
      setSelectedSquare([row, col]);
      setPossibleMoves(generatePossibleMoves(row, col, gameState.board));
    }
  }, [selectedSquare, possibleMoves, gameState, generatePossibleMoves]);

  // Make a move
  const makeMove = useCallback((from, to) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const newBoard = gameState.board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    const capturedPiece = newBoard[toRow][toCol];
    
    // Move the piece
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    
    // Handle captured pieces
    const newCapturedPieces = { ...gameState.capturedPieces };
    if (capturedPiece) {
      const capturedColor = getPieceColor(capturedPiece);
      newCapturedPieces[capturedColor === 'white' ? 'black' : 'white'].push(capturedPiece);
      playSound('capture');
    } else {
      playSound('move');
    }
    
    // Create move notation
    const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}-${String.fromCharCode(97 + toCol)}${8 - toRow}`;
    
    // Update game state
    const newGameState = {
      board: newBoard,
      turn: gameState.turn === 'white' ? 'black' : 'white',
      gameStatus: 'playing',
      moveHistory: [...gameState.moveHistory, { from, to, piece, captured: capturedPiece, notation: moveNotation }],
      capturedPieces: newCapturedPieces
    };
    
    setGameState(newGameState);
    setSelectedSquare(null);
    setPossibleMoves([]);
    
    // Request AI move if needed
    if (gameMode === 'ai' && newGameState.turn === 'black' && engineReady) {
      requestAIMove(newGameState);
    }
  }, [gameState, gameMode, playSound, engineReady, requestAIMove]);

  // Add the parseAndMakeAIMove dependency
  useEffect(() => {
    // This ensures parseAndMakeAIMove is available for the callback
  }, [parseAndMakeAIMove]);

  // Render square
  const renderSquare = (row, col) => {
    const piece = gameState.board[row][col];
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    const isPossibleMove = possibleMoves.some(([r, c]) => r === row && c === col);
    
    return (
      <motion.div
        key={`${row}-${col}`}
        className={`
          w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer relative
          ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
          ${isSelected ? 'ring-4 ring-primary-500' : ''}
          ${isPossibleMove ? 'ring-2 ring-green-400' : ''}
          transition-all duration-200
        `}
        onClick={() => handleSquareClick(row, col)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {piece && (
          <motion.span
            className={`text-2xl md:text-4xl select-none ${
              getPieceColor(piece) === 'white' ? 'text-gray-100' : 'text-gray-900'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              textShadow: getPieceColor(piece) === 'white' 
                ? '1px 1px 2px rgba(0,0,0,0.8)' 
                : '1px 1px 2px rgba(255,255,255,0.8)'
            }}
          >
            {PIECE_SYMBOLS[piece]}
          </motion.span>
        )}
        
        {isPossibleMove && !piece && (
          <div className="w-3 h-3 bg-green-400 rounded-full opacity-70" />
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      animate={boardControls}
      className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-accent flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Chess Master ♟️
          </h1>
          <p className="text-gray-400 text-lg">
            Play against Stockfish - the world's strongest chess engine!
          </p>
          
          {/* Engine Status */}
          {gameMode === 'ai' && (
            <div className="mt-2">
              {isEngineLoading && (
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <FiLoader className="animate-spin" />
                  Loading Stockfish engine...
                </div>
              )}
              {engineReady && (
                <div className="text-green-400 text-sm">
                  ✅ Stockfish engine ready!
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Mode Selection */}
            <div className="card p-4">
              <h3 className="text-lg font-bold mb-3 text-primary-400">Game Mode</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGameMode('pvp')}
                  className={`
                    flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                    ${gameMode === 'pvp' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <FiUsers size={16} /> Player vs Player
                </button>
                <button
                  onClick={() => setGameMode('ai')}
                  className={`
                    flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                    ${gameMode === 'ai' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <FiCpu size={16} /> vs Stockfish
                </button>
              </div>
            </div>

            {/* AI Difficulty */}
            {gameMode === 'ai' && (
              <div className="card p-4">
                <h3 className="text-lg font-bold mb-3 text-primary-400">AI Strength</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level: {difficulty}</span>
                    <span className="text-yellow-400">
                      {difficulty <= 2 ? 'Beginner' : 
                       difficulty <= 4 ? 'Intermediate' : 
                       difficulty <= 6 ? 'Advanced' : 'Expert'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="w-full"
                  />
                  {isThinking && engineReady && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiCpu className="animate-pulse" />
                      Stockfish is thinking...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Game Status */}
            <div className="card p-4">
              <h3 className="text-lg font-bold mb-3 text-primary-400">Game Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Turn:</span>
                  <span className={gameState.turn === 'white' ? 'text-gray-300' : 'text-gray-600'}>
                    {gameState.turn === 'white' ? 'White' : 'Black'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-400 capitalize">{gameState.gameStatus}</span>
                </div>
                {engineReady && Math.abs(evaluation) > 0 && (
                  <div className="flex justify-between">
                    <span>Evaluation:</span>
                    <span className={evaluation > 0 ? 'text-green-400' : 'text-red-400'}>
                      {evaluation > 0 ? '+' : ''}{evaluation.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Captured Pieces */}
            <div className="card p-4">
              <h3 className="text-lg font-bold mb-3 text-primary-400">Captured</h3>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Black captured:</div>
                  <div className="flex flex-wrap gap-1">
                    {gameState.capturedPieces.black.map((piece, index) => (
                      <span key={index} className="text-lg">{PIECE_SYMBOLS[piece]}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">White captured:</div>
                  <div className="flex flex-wrap gap-1">
                    {gameState.capturedPieces.white.map((piece, index) => (
                      <span key={index} className="text-lg">{PIECE_SYMBOLS[piece]}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="card p-4">
              <button
                onClick={initializeGame}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <FiRotateCcw /> New Game
              </button>
            </div>
          </div>

          {/* Chess Board */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="bg-amber-900 p-4 rounded-xl shadow-2xl">
              <div className="grid grid-cols-8 gap-0 border-2 border-amber-800 rounded-lg overflow-hidden">
                {gameState.board.map((row, rowIndex) =>
                  row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
                )}
              </div>
            </div>
          </div>

          {/* Move History */}
          <div className="lg:col-span-1">
            <div className="card p-4 h-full">
              <h3 className="text-lg font-bold mb-3 text-primary-400 flex items-center gap-2">
                <FiBookOpen /> Move History
              </h3>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {gameState.moveHistory.length === 0 ? (
                  <div className="text-gray-400 text-sm">No moves yet</div>
                ) : (
                  gameState.moveHistory.map((move, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{Math.floor(index / 2) + 1}.</span>
                      <span className="text-gray-300 flex-1 ml-2">
                        {PIECE_SYMBOLS[move.piece]} {move.notation}
                        {move.captured && ` x${PIECE_SYMBOLS[move.captured]}`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 card">
          <h3 className="text-lg font-bold mb-2 text-primary-400">How to Play:</h3>
          <ul className="text-sm text-gray-400 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <li>• Click a piece to select it and see valid moves</li>
            <li>• Click a highlighted square to move your piece</li>
            <li>• You play as White (bottom pieces)</li>
            <li>• Stockfish engine loads when AI mode is selected</li>
            <li>• Adjust difficulty from 1 (easy) to 8 (expert)</li>
            <li>• Engine uses limited memory for stability</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ChessGame;