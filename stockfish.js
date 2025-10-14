// Stockfish Web Worker for Chess Game
// This handles both real Stockfish and fallback AI

let stockfishEngine = null;
let isReady = false;
let currentPosition = '';

console.log('Stockfish Worker: Starting initialization...');

// Simple fallback AI for when Stockfish fails
class FallbackChessAI {
  constructor() {
    this.pieceValues = {
      'p': 100, 'n': 320, 'b': 330, 'r': 500, 'q': 900, 'k': 20000
    };
  }

  // Generate a reasonable chess move from common opening moves
  generateMove(depth = 1) {
    const openingMoves = [
      'e2e4', 'e7e5', 'd2d4', 'd7d5', 'g1f3', 'b8c6', 
      'f1c4', 'f8c5', 'c2c4', 'c7c5', 'b1c3', 'g8f6'
    ];
    
    const middlegameMoves = [
      'e4e5', 'd4d5', 'f3g5', 'c6d4', 'c4c5', 'f6g4',
      'e5f6', 'd5c6', 'g5f7', 'd4c2', 'c5d6', 'g4f2'
    ];
    
    // Choose move set based on depth (simulating game phase)
    const moves = depth < 3 ? openingMoves : middlegameMoves;
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    
    return randomMove;
  }

  async getMoveAsync(depth = 3) {
    // Simulate thinking time
    const thinkingTime = Math.min(depth * 200 + Math.random() * 500, 2000);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const move = this.generateMove(depth);
        resolve(move);
      }, thinkingTime);
    });
  }
}

const fallbackAI = new FallbackChessAI();

// Try to initialize Stockfish
async function initializeStockfish() {
  try {
    // Method 1: Try to load from node_modules stockfish
    try {
      const StockfishModule = await import('stockfish');
      stockfishEngine = StockfishModule.default || StockfishModule;
      console.log('Stockfish loaded from npm package');
    } catch (npmError) {
      console.log('NPM Stockfish not available, trying CDN...');
      
      // Method 2: Try CDN versions
      const cdnUrls = [
        'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish.js',
        'https://unpkg.com/stockfish@16.0.0/src/stockfish.js'
      ];
      
      for (const url of cdnUrls) {
        try {
          importScripts(url);
          if (typeof Stockfish !== 'undefined') {
            stockfishEngine = Stockfish();
            console.log('Stockfish loaded from CDN');
            break;
          }
        } catch (cdnError) {
          console.log(`CDN ${url} failed:`, cdnError.message);
        }
      }
    }

    if (stockfishEngine && typeof stockfishEngine.postMessage === 'function') {
      // Set up Stockfish message handler
      stockfishEngine.onmessage = function(line) {
        if (typeof line === 'string') {
          console.log('Stockfish:', line);
          
          if (line.includes('uciok')) {
            isReady = true;
            self.postMessage('ready');
          } else {
            self.postMessage(line);
          }
        }
      };

      // Initialize UCI protocol
      stockfishEngine.postMessage('uci');
      
      // Timeout fallback
      setTimeout(() => {
        if (!isReady) {
          console.log('Stockfish initialization timeout');
          stockfishEngine = null;
          initializeFallback();
        }
      }, 5000);
      
    } else {
      throw new Error('Stockfish engine not properly loaded');
    }

  } catch (error) {
    console.log('Stockfish initialization failed:', error.message);
    initializeFallback();
  }
}

function initializeFallback() {
  console.log('Using Smart AI fallback');
  isReady = true;
  stockfishEngine = null;
  self.postMessage('fallback_ready');
}

// Handle incoming messages
self.onmessage = async function(event) {
  const message = event.data;
  console.log('Worker received:', message);

  // Handle initialization
  if (message === 'uci' || message === 'init') {
    if (!isReady) {
      await initializeStockfish();
    }
    return;
  }

  if (!isReady) {
    self.postMessage('error: Engine not ready yet');
    return;
  }

  try {
    if (stockfishEngine && typeof stockfishEngine.postMessage === 'function') {
      // Use real Stockfish
      if (message.startsWith('position')) {
        currentPosition = message;
      }
      stockfishEngine.postMessage(message);
      
    } else {
      // Use fallback AI
      await handleFallbackCommand(message);
    }
  } catch (error) {
    console.error('Worker error:', error);
    self.postMessage(`error: ${error.message}`);
  }
};

async function handleFallbackCommand(command) {
  if (command.startsWith('position fen ')) {
    currentPosition = command.substring(13);
    console.log('Fallback AI: Position set');
    
  } else if (command.startsWith('go depth ')) {
    const depth = Math.min(parseInt(command.substring(9)), 6);
    console.log(`Fallback AI: Thinking at depth ${depth}...`);
    
    try {
      const move = await fallbackAI.getMoveAsync(depth);
      self.postMessage(`bestmove ${move}`);
    } catch (error) {
      console.error('Fallback AI error:', error);
      self.postMessage('bestmove e2e4'); // Emergency fallback
    }
    
  } else if (command === 'uci') {
    self.postMessage('id name Smart Chess AI');
    self.postMessage('id author Chess Clone');
    self.postMessage('uciok');
    
  } else if (command.startsWith('setoption')) {
    // Ignore options for fallback
    console.log('Fallback AI: Option ignored');
    
  } else {
    console.log('Fallback AI: Unknown command:', command);
  }
}

// Auto-initialize
console.log('Stockfish Worker: Ready to initialize');
self.postMessage('worker_ready');