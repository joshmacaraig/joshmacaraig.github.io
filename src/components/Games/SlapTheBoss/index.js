// src/components/Games/SlapTheBoss/index.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SlapTheBoss = () => {
  // Game State
  const [bossHealth, setBossHealth] = useState(100);
  const [maxHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [isHit, setIsHit] = useState(false);
  
  // Animation controls
  const bossControls = useAnimation();
  const screenShakeControls = useAnimation();
  const healthBarControls = useAnimation();
  
  // Audio refs (shared context to prevent multiple instances)
  const audioContext = useRef(null);
  const comboTimeoutRef = useRef(null);
  
  // Initialize audio context once and reuse
  useEffect(() => {
    if (!audioContext.current) {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current);
      }
    };
  }, []);

  // Play slap sound with variations
  const playSlapSound = useCallback(async (intensity = 1) => {
    try {
      // Create oscillator for synthetic slap sound (fallback for demo)
      if (audioContext.current) {
        const oscillator = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        
        // Slap sound characteristics: quick attack, sharp decay
        oscillator.frequency.setValueAtTime(200 + (intensity * 100), audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.current.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3 * intensity, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.15);
        
        oscillator.start(audioContext.current.currentTime);
        oscillator.stop(audioContext.current.currentTime + 0.15);
      }
    } catch (e) {
      console.warn('Audio playback failed');
    }
  }, []);

  // Calculate damage with variation
  const calculateDamage = useCallback(() => {
    const baseDamage = 8 + Math.random() * 7; // 8-15 base damage
    const comboMultiplier = 1 + (combo * 0.1); // 10% bonus per combo
    const isCritical = Math.random() < 0.15; // 15% crit chance
    const critMultiplier = isCritical ? 2 : 1;
    
    return {
      damage: Math.floor(baseDamage * comboMultiplier * critMultiplier),
      isCritical
    };
  }, [combo]);

  // Add floating damage number
  const addDamageNumber = useCallback((damage, isCritical, x, y) => {
    const id = Date.now() + Math.random();
    const damageNum = {
      id,
      damage,
      isCritical,
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 30
    };
    
    setDamageNumbers(prev => [...prev, damageNum]);
    
    // Remove after animation
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(num => num.id !== id));
    }, 1500);
  }, []);

  // Main slap action
  const handleSlap = useCallback(async (event) => {
    if (isGameOver || bossHealth <= 0) return;
    
    // Get click/tap position for damage number
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const { damage, isCritical } = calculateDamage();
    const newHealth = Math.max(0, bossHealth - damage);
    
    // Update state
    setBossHealth(newHealth);
    setScore(prev => prev + damage * (isCritical ? 2 : 1));
    setCombo(prev => prev + 1);
    setIsHit(true);
    
    // Add floating damage number
    addDamageNumber(damage, isCritical, x, y);
    
    // Play sound with intensity based on damage
    await playSlapSound(damage / 15);
    
    // Boss recoil animation
    await bossControls.start({
      x: [0, -20, 15, -10, 5, 0],
      rotate: [0, -5, 3, -2, 1, 0],
      transition: { duration: 0.4, ease: "easeOut" }
    });
    
    // Screen shake effect
    screenShakeControls.start({
      x: [0, -5, 5, -3, 3, 0],
      y: [0, -2, 2, -1, 1, 0],
      transition: { duration: 0.3 }
    });
    
    // Health bar shake
    healthBarControls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.2 }
    });
    
    // Reset hit state
    setTimeout(() => setIsHit(false), 100);
    
    // Reset combo after delay
    clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => {
      setCombo(0);
    }, 2000);
    
    // Check for game over
    if (newHealth <= 0) {
      setIsGameOver(true);
      // Victory animation
      await bossControls.start({
        y: 50,
        rotate: 90,
        opacity: 0.7,
        transition: { duration: 1 }
      });
    }
  }, [bossHealth, isGameOver, calculateDamage, addDamageNumber, playSlapSound, bossControls, screenShakeControls, healthBarControls]);

  // Reset game
  const resetGame = useCallback(async () => {
    setBossHealth(100);
    setScore(0);
    setCombo(0);
    setIsGameOver(false);
    setDamageNumbers([]);
    setIsHit(false);
    
    // Reset boss animation
    await bossControls.start({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    });
  }, [bossControls]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        // Simulate click in center of boss
        const fakeEvent = {
          currentTarget: { getBoundingClientRect: () => ({ left: 150, top: 150 }) },
          clientX: 200,
          clientY: 200
        };
        handleSlap(fakeEvent);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSlap]);

  // Boss facial expressions based on health
  const getBossExpression = () => {
    if (bossHealth > 70) return '😠'; // Angry
    if (bossHealth > 40) return '😰'; // Worried
    if (bossHealth > 10) return '🤕'; // Hurt
    return '😵'; // Defeated
  };

  const getBossColor = () => {
    if (bossHealth > 70) return 'from-red-500 to-red-700';
    if (bossHealth > 40) return 'from-orange-500 to-red-600';
    if (bossHealth > 10) return 'from-yellow-500 to-orange-600';
    return 'from-gray-500 to-gray-700';
  };

  return (
    <motion.div 
      animate={screenShakeControls}
      className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-accent flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Slap the Boss! 👋
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Release your stress! Click or tap to slap the boss. Use spacebar for keyboard slapping!
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-400">{score}</div>
            <div className="text-sm text-gray-400">Score</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {combo > 0 ? `${combo}x` : '0x'}
            </div>
            <div className="text-sm text-gray-400">Combo</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{bossHealth}%</div>
            <div className="text-sm text-gray-400">Boss HP</div>
          </div>
        </div>

        {/* Health Bar */}
        <motion.div 
          animate={healthBarControls}
          className="w-full bg-gray-700 rounded-full h-4 mb-8 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300"
            style={{ width: `${(bossHealth / maxHealth) * 100}%` }}
          />
        </motion.div>

        {/* Game Area */}
        <div className="relative flex justify-center items-center h-96 mb-8">
          {/* Boss Character */}
          <motion.div
            animate={bossControls}
            className={`relative cursor-pointer select-none transition-all duration-200 ${
              isHit ? 'filter brightness-150' : ''
            }`}
            onClick={handleSlap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Boss Body */}
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${getBossColor()} 
              flex items-center justify-center text-6xl shadow-2xl border-4 border-white/20
              ${isHit ? 'shadow-red-500/50' : ''}`}
            >
              {getBossExpression()}
            </div>
            
            {/* Boss Suit/Tie */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-blue-600 rounded-sm" />
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white rounded-sm" />
          </motion.div>

          {/* Floating Damage Numbers */}
          {damageNumbers.map(({ id, damage, isCritical, x, y }) => (
            <motion.div
              key={id}
              className={`absolute pointer-events-none font-bold text-2xl z-10 ${
                isCritical ? 'text-yellow-400' : 'text-red-400'
              }`}
              style={{ left: x, top: y }}
              initial={{ opacity: 1, scale: 0.8, y: 0 }}
              animate={{ 
                opacity: 0, 
                scale: isCritical ? 1.5 : 1.2, 
                y: -50,
                x: (Math.random() - 0.5) * 100
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {isCritical ? 'CRITICAL! ' : ''}{damage}
            </motion.div>
          ))}

          {/* Hit Effect */}
          {isHit && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.1 }}
            >
              <div className="w-full h-full bg-red-500 rounded-full blur-xl" />
            </motion.div>
          )}
        </div>

        {/* Game Controls */}
        <div className="text-center">
          {isGameOver ? (
            <div className="space-y-4">
              <div className="text-3xl font-bold text-yellow-400">
                Boss Defeated! 🎉
              </div>
              <div className="text-xl text-gray-300">
                Final Score: {score}
              </div>
              <button
                onClick={resetGame}
                className="btn-primary text-lg px-8 py-3"
              >
                Slap Another Boss! 🔄
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-lg text-gray-400">
                Keep slapping to build combos! 💪
              </div>
              <button
                onClick={resetGame}
                className="btn-secondary"
              >
                Reset Game 🔄
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 card">
          <h3 className="text-lg font-bold mb-2 text-primary-400">How to Play:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Click or tap the boss to slap them!</li>
            <li>• Use spacebar or Enter for keyboard slapping</li>
            <li>• Build combos by slapping rapidly</li>
            <li>• Critical hits deal double damage</li>
            <li>• Reduce boss health to 0 to win!</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SlapTheBoss;