// src/components/Games/MemoryGame/index.js
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiRotateCcw, FiClock, FiEye, FiTrendingUp } from 'react-icons/fi';

const MemoryGame = () => {
  // Game themes and difficulties (memoized to prevent re-creation)
  const themes = useMemo(() => ({
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐺', '🦝', '🦆', '🦢', '🦉'],
    food: ['🍎', '🍌', '🍊', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍', '🥥', '🍅', '🥑', '🌶️', '🌽', '🥕', '🥔', '🍆', '🥒'],
    objects: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🏒', '🎱', '🎯', '🎪', '🎨', '🎭', '🎪', '🎸', '🎺', '🎷']
  }), []);

  const difficulties = useMemo(() => ({
    easy: { name: 'Easy', rows: 4, cols: 4, pairs: 8 },
    medium: { name: 'Medium', rows: 4, cols: 6, pairs: 12 },
    hard: { name: 'Hard', rows: 6, cols: 6, pairs: 18 }
  }), []);

  // Game State
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('animals');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScores, setBestScores] = useState({
    easy: { time: null, moves: null },
    medium: { time: null, moves: null },
    hard: { time: null, moves: null }
  });

  // Animation controls
  const boardControls = useAnimation();
  const celebrationControls = useAnimation();
  
  // Refs
  const audioContext = useRef(null);
  const timerRef = useRef(null);

  // Initialize audio context once and load best scores
  useEffect(() => {
    // Initialize audio context if not already created
    if (!audioContext.current) {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }

    // Load best scores from localStorage
    const savedScores = localStorage.getItem('memoryGameScores');
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    }
  }, []);

  // Play sound effect
  const playSound = useCallback((type) => {
    try {
      if (audioContext.current) {
        const oscillator = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        
        let frequency, duration;
        
        switch (type) {
          case 'flip':
            frequency = 800;
            duration = 0.1;
            gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
            break;
          case 'match':
            frequency = 600;
            duration = 0.3;
            oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.current.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
            break;
          case 'win':
            frequency = 500;
            duration = 0.8;
            oscillator.frequency.setValueAtTime(500, audioContext.current.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.current.currentTime + 0.4);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.current.currentTime + 0.8);
            gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
            break;
          default:
            frequency = 400;
            duration = 0.1;
            gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
        oscillator.start(audioContext.current.currentTime);
        oscillator.stop(audioContext.current.currentTime + duration);
      }
    } catch (e) {
      console.warn('Audio playback failed');
    }
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const currentDifficulty = difficulties[difficulty];
    const themeEmojis = themes[theme];
    const selectedEmojis = themeEmojis.slice(0, currentDifficulty.pairs);
    
    // Create pairs and shuffle
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    setGameWon(false);
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [difficulty, theme, difficulties, themes]);

  // Start timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handle card click
  const handleCardClick = useCallback(async (cardId) => {
    if (!isGameActive) {
      setIsGameActive(true);
      startTimer();
    }

    const card = cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    playSound('flip');
    
    // Flip card
    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setMoves(prev => prev + 1);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);
      
      setTimeout(() => {
        if (firstCard.emoji === secondCard.emoji) {
          // Match found!
          playSound('match');
          
          const matchedCards = cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          );
          setCards(matchedCards);
          setMatchedPairs(prev => [...prev, firstCard.emoji]);
          
          // Check for game completion
          const totalPairs = difficulties[difficulty].pairs;
          if (matchedPairs.length + 1 === totalPairs) {
            setGameWon(true);
            setIsGameActive(false);
            stopTimer();
            playSound('win');
            
            // Update best scores
            const currentScore = { time, moves: moves + 1 };
            const currentBest = bestScores[difficulty];
            
            if (!currentBest.time || time < currentBest.time || 
                (time === currentBest.time && moves + 1 < currentBest.moves)) {
              const newBestScores = {
                ...bestScores,
                [difficulty]: currentScore
              };
              setBestScores(newBestScores);
              localStorage.setItem('memoryGameScores', JSON.stringify(newBestScores));
            }
            
            // Celebration animation
            celebrationControls.start({
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.6 }
            });
          }
        } else {
          // No match - flip back
          const resetCards = cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          );
          setCards(resetCards);
        }
        
        setFlippedCards([]);
      }, 1000);
    }
  }, [cards, flippedCards, isGameActive, moves, time, matchedPairs, difficulty, bestScores, startTimer, stopTimer, playSound, celebrationControls, difficulties]);

  // Initialize game when difficulty or theme changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render card
  const renderCard = (card) => {
    return (
      <motion.div
        key={card.id}
        className={`
          relative w-16 h-16 md:w-20 md:h-20 cursor-pointer
          ${card.isMatched ? 'opacity-60' : ''}
        `}
        onClick={() => handleCardClick(card.id)}
        whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg 
                     flex items-center justify-center text-white font-bold shadow-lg"
          animate={{ 
            rotateY: card.isFlipped || card.isMatched ? 180 : 0,
            scale: card.isMatched ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          ?
        </motion.div>
        
        {/* Card Front */}
        <motion.div
          className="absolute inset-0 bg-white dark:bg-dark-card rounded-lg 
                     flex items-center justify-center text-3xl md:text-4xl shadow-lg"
          animate={{ 
            rotateY: card.isFlipped || card.isMatched ? 0 : -180,
            scale: card.isMatched ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {card.emoji}
        </motion.div>
      </motion.div>
    );
  };

  const currentDifficulty = difficulties[difficulty];

  return (
    <motion.div
      animate={boardControls}
      className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-accent flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div 
          animate={celebrationControls}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Memory Game 🧠
          </h1>
          <p className="text-gray-400 text-lg">
            Match pairs of cards to win. Test your memory!
          </p>
        </motion.div>

        {/* Game Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Difficulty */}
          <div className="card p-4">
            <h3 className="text-sm font-bold mb-2 text-primary-400">Difficulty:</h3>
            <div className="grid grid-cols-3 gap-1">
              {Object.entries(difficulties).map(([key, diff]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`
                    px-2 py-1 text-xs rounded transition-all duration-200
                    ${difficulty === key 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  {diff.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="card p-4">
            <h3 className="text-sm font-bold mb-2 text-primary-400">Theme:</h3>
            <div className="grid grid-cols-3 gap-1">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setTheme(themeKey)}
                  className={`
                    px-2 py-1 text-xs rounded transition-all duration-200 capitalize
                    ${theme === themeKey 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  {themeKey}
                </button>
              ))}
            </div>
          </div>

          {/* New Game */}
          <div className="card p-4 flex items-center justify-center">
            <button
              onClick={initializeGame}
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              <FiRotateCcw /> New Game
            </button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiClock className="text-primary-400" />
              <span className="text-2xl font-bold text-primary-400">
                {formatTime(time)}
              </span>
            </div>
            <div className="text-sm text-gray-400">Time</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiEye className="text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{moves}</span>
            </div>
            <div className="text-sm text-gray-400">Moves</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiTrendingUp className="text-green-400" />
              <span className="text-2xl font-bold text-green-400">
                {matchedPairs.length}/{currentDifficulty.pairs}
              </span>
            </div>
            <div className="text-sm text-gray-400">Pairs</div>
          </div>
        </div>

        {/* Win Message */}
        {gameWon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
          >
            <div className="text-3xl font-bold text-green-400 mb-2">
              Congratulations! 🎉
            </div>
            <div className="text-lg text-gray-300">
              Completed in {formatTime(time)} with {moves} moves
            </div>
          </motion.div>
        )}

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <motion.div
            className={`
              grid gap-2 md:gap-3 p-4 bg-dark-card rounded-xl
              grid-cols-${currentDifficulty.cols}
            `}
            style={{
              gridTemplateColumns: `repeat(${currentDifficulty.cols}, minmax(0, 1fr))`
            }}
          >
            {cards.map(card => renderCard(card))}
          </motion.div>
        </div>

        {/* Best Scores */}
        <div className="card p-4">
          <h3 className="text-lg font-bold mb-4 text-primary-400 flex items-center gap-2">
            <FiTrendingUp /> Best Scores
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(difficulties).map(([key, diff]) => {
              const best = bestScores[key];
              return (
                <div key={key} className="text-center">
                  <div className="font-semibold text-primary-300 capitalize mb-1">
                    {diff.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {best.time 
                      ? `${formatTime(best.time)} / ${best.moves} moves`
                      : 'No record'
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 card">
          <h3 className="text-lg font-bold mb-2 text-primary-400">How to Play:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Click cards to flip them and reveal their symbols</li>
            <li>• Find matching pairs by remembering card locations</li>
            <li>• Match all pairs in the fewest moves and fastest time</li>
            <li>• Choose difficulty and theme to customize your game</li>
            <li>• Beat your best scores and challenge your memory!</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryGame;