// src/components/Games/GamesHub/index.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlay, FiClock, FiZap, FiTarget } from 'react-icons/fi';

const GamesHub = () => {
  const games = [
    {
      id: 'slap-the-boss',
      title: 'Slap the Boss! 👋',
      description: 'Release your stress! An interactive game with satisfying animations and sound effects.',
      features: ['Screen shake effects', 'Combo system', 'Critical hits', 'Synthetic sound'],
      difficulty: 'Easy',
      category: 'Action',
      color: 'from-red-500 to-red-700',
      icon: '👋',
      route: '/slap-the-boss'
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe ⭕',
      description: 'Classic strategy game with AI opponent. Perfect minimax algorithm for the ultimate challenge.',
      features: ['Player vs Player', 'AI opponent', 'Win statistics', 'Perfect AI strategy'],
      difficulty: 'Medium',
      category: 'Strategy',
      color: 'from-blue-500 to-blue-700',
      icon: '⭕',
      route: '/tic-tac-toe'
    },
    {
      id: 'chess',
      title: 'Chess Master ♟️',
      description: 'Play against Stockfish - the world\'s strongest chess engine. Full chess rules with beautiful board.',
      features: ['Stockfish AI engine', '20 difficulty levels', 'Move validation', 'Position evaluation'],
      difficulty: 'Expert',
      category: 'Strategy',
      color: 'from-emerald-500 to-emerald-700',
      icon: '♟️',
      route: '/chess'
    },
    {
      id: 'memory-game',
      title: 'Memory Game 🧠',
      description: 'Test your memory with this classic card matching game. Multiple themes and difficulties.',
      features: ['3 difficulty levels', 'Multiple themes', 'Timer & moves', 'Best score tracking'],
      difficulty: 'Hard',
      category: 'Puzzle',
      color: 'from-purple-500 to-purple-700',
      icon: '🧠',
      route: '/memory-game'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return <FiZap className="text-green-400" />;
      case 'Medium': return <FiClock className="text-yellow-400" />;
      case 'Expert': return <FiTarget className="text-purple-400" />;
      default: return <FiPlay className="text-blue-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Expert': return 'text-purple-400 bg-purple-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-accent flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-7xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Game Arcade 🎮
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Challenge yourself with our collection of engaging mini-games. 
            From stress relief to brain training - pick your favorite!
          </motion.p>
        </div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={cardVariants}
              className="card overflow-hidden group hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Game Header */}
              <div className={`relative h-32 bg-gradient-to-br ${game.color} p-6 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{game.icon}</div>
                  <div className="text-sm opacity-90">{game.category}</div>
                </div>
                
                {/* Difficulty Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(game.difficulty)} flex items-center gap-1`}>
                  {getDifficultyIcon(game.difficulty)}
                  {game.difficulty}
                </div>
              </div>

              {/* Game Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {game.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {game.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary-400 mb-2">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {game.features.map((feature, index) => (
                      <div key={index} className="text-xs text-gray-400 flex items-center">
                        <div className="w-1 h-1 bg-primary-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <Link
                  to={game.route}
                  className="btn-primary w-full flex items-center justify-center gap-2 group-hover:from-primary-600 group-hover:to-primary-800 transition-all duration-200"
                >
                  <FiPlay />
                  Play Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary-400">Game Collection Stats</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">4</div>
              <div className="text-sm text-gray-400">Total Games</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-sm text-gray-400">Hours of Fun</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-sm text-gray-400">Free to Play</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 p-6 card"
        >
          <h3 className="text-lg font-bold mb-4 text-primary-400">Quick Start Guide:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-xs">👋</span>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Stress Relief</div>
                <div>Start with Slap the Boss for immediate satisfaction and stress release</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs">⭕</span>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Strategic Thinking</div>
                <div>Challenge yourself with Tic Tac Toe against our perfect AI</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs">♟️</span>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Master Chess</div>
                <div>Test your skills against Stockfish AI with adjustable difficulty</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FiTarget className="text-purple-400 text-xs" />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Memory Training</div>
                <div>Exercise your brain with the Memory Game's multiple difficulty levels</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamesHub;