// Enhanced Chess AI fallback
// Used when Stockfish fails to load - now much smarter!

class SimpleChessAI {
  constructor(difficulty = 5) {
    this.difficulty = Math.min(Math.max(difficulty, 1), 8); // Clamp between 1-8
  }

  // Enhanced piece values with positional considerations
  static PIECE_VALUES = {
    'p': 100, 'n': 320, 'b': 330, 'r': 500, 'q': 900, 'k': 20000
  };

  // Position value tables for better play
  static PAWN_TABLE = [
     0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
  ];

  static KNIGHT_TABLE = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50
  ];

  // Get position value for a piece
  getPositionalValue(piece, square) {
    if (!piece) return 0;
    
    const file = square.charCodeAt(0) - 97; // a=0, b=1, etc.
    const rank = parseInt(square[1]) - 1;   // 1=0, 2=1, etc.
    const index = rank * 8 + file;
    
    // Flip for black pieces
    const tableIndex = piece.color === 'w' ? index : 63 - index;
    
    switch (piece.type) {
      case 'p':
        return SimpleChessAI.PAWN_TABLE[tableIndex];
      case 'n':
        return SimpleChessAI.KNIGHT_TABLE[tableIndex];
      default:
        return 0;
    }
  }

  // Enhanced board evaluation
  evaluateBoard(chess) {
    let score = 0;
    const board = chess.board();
    
    // Material and positional evaluation
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          const square = String.fromCharCode(97 + j) + (8 - i);
          const materialValue = SimpleChessAI.PIECE_VALUES[piece.type] || 0;
          const positionalValue = this.getPositionalValue(piece, square);
          
          const totalValue = materialValue + positionalValue;
          score += piece.color === 'w' ? totalValue : -totalValue;
        }
      }
    }
    
    // Bonus/penalty for game state
    if (chess.isCheck()) {
      score += chess.turn() === 'w' ? -50 : 50;
    }
    
    // Mobility bonus (more moves = better position)
    const currentTurn = chess.turn();
    const moveCount = chess.moves().length;
    score += currentTurn === 'w' ? moveCount * 2 : -moveCount * 2;
    
    return score;
  }

  // Get all possible moves for current player
  getAllMoves(chess) {
    return chess.moves({ verbose: true });
  }

  // Check if a move is a capture
  isCapture(move) {
    return move.captured !== undefined;
  }

  // Check if a move is a check
  isCheck(chess, move) {
    chess.move(move);
    const inCheck = chess.isCheck();
    chess.undo();
    return inCheck;
  }

  // Enhanced move ordering for better alpha-beta pruning
  orderMoves(chess, moves) {
    return moves.map(move => {
      let score = 0;
      
      // Prioritize captures (MVV-LVA: Most Valuable Victim - Least Valuable Attacker)
      if (this.isCapture(move)) {
        const victimValue = SimpleChessAI.PIECE_VALUES[move.captured] || 0;
        const attackerValue = SimpleChessAI.PIECE_VALUES[move.piece] || 0;
        score += victimValue * 10 - attackerValue;
      }
      
      // Prioritize checks
      if (this.isCheck(chess, move)) {
        score += 50;
      }
      
      // Prioritize center squares
      const toFile = move.to.charCodeAt(0) - 97;
      const toRank = parseInt(move.to[1]) - 1;
      if (toFile >= 2 && toFile <= 5 && toRank >= 2 && toRank <= 5) {
        score += 10;
      }
      
      return { move, score };
    }).sort((a, b) => b.score - a.score).map(item => item.move);
  }

  // Enhanced minimax with alpha-beta pruning
  minimax(chess, depth, alpha, beta, maximizingPlayer) {
    if (depth === 0 || chess.isGameOver()) {
      return this.evaluateBoard(chess);
    }

    const moves = this.orderMoves(chess, this.getAllMoves(chess));
    
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        chess.move(move);
        const evaluation = this.minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        
        if (beta <= alpha) {
          break; // Alpha-beta cutoff
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        chess.move(move);
        const evaluation = this.minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        
        if (beta <= alpha) {
          break; // Alpha-beta cutoff
        }
      }
      return minEval;
    }
  }

  // Get best move using enhanced minimax algorithm
  getBestMove(chess) {
    const moves = this.getAllMoves(chess);
    if (moves.length === 0) return null;

    // Adjust depth based on difficulty (1-8)
    const baseDepth = Math.min(this.difficulty, 6);
    const depth = Math.max(baseDepth, 2); // Minimum depth of 2
    
    const isWhite = chess.turn() === 'w';
    const orderedMoves = this.orderMoves(chess, moves);
    
    let bestMove = orderedMoves[0];
    let bestValue = isWhite ? -Infinity : Infinity;

    // Add some randomness for lower difficulties
    const randomFactor = Math.max(0, (8 - this.difficulty) * 0.05);

    console.log(`Smart AI: Analyzing ${moves.length} moves at depth ${depth}...`);

    for (const move of orderedMoves) {
      chess.move(move);
      let moveValue = this.minimax(chess, depth - 1, -Infinity, Infinity, !isWhite);
      chess.undo();

      // Add randomness for lower difficulties
      if (randomFactor > 0) {
        moveValue += (Math.random() - 0.5) * randomFactor * 100;
      }

      // Prefer captures and checks in equal positions
      if (this.isCapture(move)) {
        moveValue += 5;
      }
      if (this.isCheck(chess, move)) {
        moveValue += 10;
      }

      if (isWhite ? moveValue > bestValue : moveValue < bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    console.log(`Smart AI: Selected move ${bestMove.from}${bestMove.to} (eval: ${bestValue.toFixed(1)})`);
    return bestMove;
  }

  // Get a move asynchronously with realistic thinking time
  async getMoveAsync(chess, maxThinkingTime = 2000) {
    return new Promise((resolve) => {
      // Calculate thinking time based on difficulty
      const baseTime = 300;
      const difficultyTime = this.difficulty * 100;
      const randomTime = Math.random() * 500;
      const totalTime = Math.min(baseTime + difficultyTime + randomTime, maxThinkingTime);

      setTimeout(() => {
        try {
          const move = this.getBestMove(chess);
          resolve(move);
        } catch (error) {
          console.error('Smart AI error:', error);
          // Emergency fallback - random legal move
          const moves = chess.moves({ verbose: true });
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          resolve(randomMove);
        }
      }, totalTime);
    });
  }
}

export default SimpleChessAI;