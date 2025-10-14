import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import SimpleChessAI from './SimpleAI';
import './ChessGame.css';

const ChessGame = () => {
  const chess = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(chess.fen());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [playerColor, setPlayerColor] = useState('white');
  const [difficulty, setDifficulty] = useState(15);
  const [gameStatus, setGameStatus] = useState('');
  const [stockfishWorker, setStockfishWorker] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [useStockfish, setUseStockfish] = useState(false);
  const [aiEngine, setAiEngine] = useState('Loading AI Engine...');
  const [boardWidth, setBoardWidth] = useState(400);
  
  const fallbackAI = useMemo(() => new SimpleChessAI(Math.ceil(difficulty / 4)), [difficulty]);
  const initTimeoutRef = useRef();

  // Calculate responsive board width
  useEffect(() => {
    const updateBoardWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        setBoardWidth(Math.min(windowWidth - 40, 350));
      } else if (windowWidth < 768) {
        setBoardWidth(400);
      } else if (windowWidth < 1024) {
        setBoardWidth(450);
      } else {
        setBoardWidth(500);
      }
    };

    updateBoardWidth();
    window.addEventListener('resize', updateBoardWidth);
    return () => window.removeEventListener('resize', updateBoardWidth);
  }, []);

  // Check game status - fixed dependencies
  const checkGameStatus = useCallback(() => {
    if (chess.isCheckmate()) {
      setGameOver(true);
      setWinner(chess.turn() === 'w' ? 'Black' : 'White');
      setGameStatus('Checkmate!');
    } else if (chess.isDraw()) {
      setGameOver(true);
      setWinner('Draw');
      setGameStatus('Draw!');
    } else if (chess.isCheck()) {
      setGameStatus('Check!');
    } else {
      setGameStatus('');
    }
  }, [chess]);

  // Initialize Stockfish
  useEffect(() => {
    let worker = null;
    let isComponentMounted = true;

    const initializeStockfish = async () => {
      try {
        // Check if stockfish.js exists
        const response = await fetch('/stockfish.js');
        if (!response.ok) {
          throw new Error('Stockfish file not found');
        }

        worker = new Worker('/stockfish.js');
        
        if (!isComponentMounted) {
          worker.terminate();
          return;
        }

        setStockfishWorker(worker);
        
        // Set up timeout for initialization
        initTimeoutRef.current = setTimeout(() => {
          console.log('Stockfish initialization timeout, switching to Smart AI');
          setUseStockfish(false);
          setAiEngine('Smart AI Engine');
        }, 5000);
        
        worker.onmessage = (event) => {
          if (!isComponentMounted) return;
          
          const message = event.data;
          console.log('Stockfish message:', message);

          if (message.includes('Stockfish') || message.includes('ready')) {
            console.log('Stockfish is ready!');
            clearTimeout(initTimeoutRef.current);
            setUseStockfish(true);
            setAiEngine('Stockfish Engine');
            worker.postMessage('uci');
            return;
          }

          if (message.startsWith('bestmove')) {
            const bestMove = message.split(' ')[1];
            if (bestMove && bestMove !== '(none)') {
              makeStockfishMove(bestMove);
            } else {
              console.log('No valid move from Stockfish');
              setThinking(false);
            }
          }
        };
        
        worker.onerror = (error) => {
          console.error('Stockfish worker error:', error);
          clearTimeout(initTimeoutRef.current);
          setThinking(false);
          setUseStockfish(false);
          setAiEngine('Smart AI Engine (Stockfish failed to load)');
        };

        // Initialize Stockfish
        worker.postMessage('uci');
        
      } catch (error) {
        console.error('Failed to initialize Stockfish:', error);
        if (isComponentMounted) {
          clearTimeout(initTimeoutRef.current);
          setUseStockfish(false);
          setAiEngine('Smart AI Engine (Stockfish not available)');
        }
      }
    };

    initializeStockfish();
    
    return () => {
      isComponentMounted = false;
      clearTimeout(initTimeoutRef.current);
      if (worker) {
        worker.terminate();
      }
    };
  }, []);

  // Make AI move - fixed to properly reset state
  const makeStockfishMove = useCallback((move) => {
    console.log('Making AI move:', move);
    try {
      const moveObj = chess.move(move, { sloppy: true });
      if (moveObj) {
        console.log('AI move successful:', moveObj);
        
        // Update captured pieces
        if (moveObj.captured) {
          setCapturedPieces(prev => ({
            ...prev,
            [playerColor]: [...prev[playerColor], moveObj.captured]
          }));
        }

        setGamePosition(chess.fen());
        setMoveHistory(chess.history({ verbose: true }));
        checkGameStatus();
        
        // CRITICAL: Reset thinking state after successful AI move
        setThinking(false);
        console.log('AI move complete, thinking set to false');
      } else {
        console.error('Invalid AI move:', move);
        setThinking(false);
      }
    } catch (error) {
      console.error('Invalid Stockfish move:', error);
      setThinking(false);
    }
  }, [chess, playerColor, checkGameStatus]);

  // Enhanced piece drag handlers - fixed for proper cursor following
  const onPieceDragBegin = useCallback((piece, sourceSquare) => {
    console.log('Drag begin:', piece, sourceSquare, 'thinking:', thinking, 'gameOver:', gameOver);
    
    if (gameOver || thinking) {
      console.log('Drag blocked - game over or AI thinking');
      return false;
    }
    
    // Only allow player to drag their pieces
    const currentTurn = chess.turn();
    const pieceColor = piece[0]; // 'w' or 'b'
    
    console.log('Current turn:', currentTurn, 'Player color:', playerColor, 'Piece color:', pieceColor);
    
    if ((playerColor === 'white' && currentTurn === 'b') || 
        (playerColor === 'black' && currentTurn === 'w')) {
      console.log('Drag blocked - not player turn');
      return false;
    }
    
    // Check if it's the correct color piece
    if ((playerColor === 'white' && pieceColor === 'b') || 
        (playerColor === 'black' && pieceColor === 'w')) {
      console.log('Drag blocked - wrong color piece');
      return false;
    }

    console.log('Drag allowed');
    return true;
  }, [chess, gameOver, thinking, playerColor]);

  const onPieceDragEnd = useCallback(() => {
    // Nothing special needed here for now
  }, []);

  // Handle piece drop with better logging
  const onDrop = useCallback((sourceSquare, targetSquare, piece) => {
    console.log('Drop attempt:', sourceSquare, 'to', targetSquare, 'thinking:', thinking, 'gameOver:', gameOver);
    
    if (gameOver || thinking) {
      console.log('Drop blocked - game over or AI thinking');
      return false;
    }
    
    // Only allow player to move their pieces
    const currentTurn = chess.turn();
    if ((playerColor === 'white' && currentTurn === 'b') || 
        (playerColor === 'black' && currentTurn === 'w')) {
      console.log('Drop blocked - not player turn, current:', currentTurn, 'player:', playerColor);
      return false;
    }

    try {
      // Check for pawn promotion
      const moves = chess.moves({ verbose: true });
      const move = moves.find(m => m.from === sourceSquare && m.to === targetSquare);
      
      let promotion = undefined;
      if (move && move.flags.includes('p')) {
        promotion = 'q'; // Auto-promote to queen
      }

      const moveObj = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotion
      });

      if (moveObj) {
        console.log('Player move successful:', moveObj);
        
        // Update captured pieces
        if (moveObj.captured) {
          const opponentColor = playerColor === 'white' ? 'black' : 'white';
          setCapturedPieces(prev => ({
            ...prev,
            [opponentColor]: [...prev[opponentColor], moveObj.captured]
          }));
        }

        setGamePosition(chess.fen());
        setMoveHistory(chess.history({ verbose: true }));
        checkGameStatus();

        // Make AI move after player move
        if (!chess.isGameOver()) {
          console.log('Scheduling AI move...');
          setTimeout(() => {
            requestAIMove();
          }, 250);
        }

        return true;
      } else {
        console.log('Invalid move attempted');
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
    
    return false;
  }, [chess, gameOver, thinking, playerColor, checkGameStatus]);

  // Request AI move with better error handling
  const requestAIMove = useCallback(async () => {
    if (gameOver || thinking) {
      console.log('AI move blocked - game over or already thinking');
      return;
    }

    console.log('AI starting to think...');
    setThinking(true);

    try {
      if (useStockfish && stockfishWorker) {
        console.log('Using Stockfish for AI move');
        const currentFen = chess.fen();
        stockfishWorker.postMessage(`position fen ${currentFen}`);
        stockfishWorker.postMessage(`go depth ${Math.min(difficulty, 20)}`);
      } else {
        console.log('Using fallback AI for move');
        const move = await fallbackAI.getMoveAsync(chess, 1000);
        if (move) {
          const moveString = move.from + move.to + (move.promotion || '');
          makeStockfishMove(moveString);
        } else {
          console.log('No valid move from fallback AI');
          setThinking(false);
        }
      }
    } catch (error) {
      console.error('AI move error:', error);
      setThinking(false);
    }
  }, [useStockfish, stockfishWorker, chess, gameOver, difficulty, fallbackAI, thinking, makeStockfishMove]);

  const resetGame = useCallback(() => {
    chess.reset();
    setGamePosition(chess.fen());
    setGameOver(false);
    setWinner('');
    setGameStatus('');
    setThinking(false);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    console.log('Game reset');
  }, [chess]);

  const flipBoard = useCallback(() => {
    setPlayerColor(prev => prev === 'white' ? 'black' : 'white');
  }, []);

  const undoMove = useCallback(() => {
    if (moveHistory.length >= 2 && !thinking) {
      chess.undo(); // Undo AI move
      chess.undo(); // Undo player move
      setGamePosition(chess.fen());
      setMoveHistory(chess.history({ verbose: true }));
      setGameStatus('');
      setThinking(false); // Make sure thinking is reset
      
      // Recalculate captured pieces
      const history = chess.history({ verbose: true });
      const newCaptured = { white: [], black: [] };
      history.forEach(move => {
        if (move.captured) {
          const capturedBy = move.color === 'w' ? 'black' : 'white';
          newCaptured[capturedBy].push(move.captured);
        }
      });
      setCapturedPieces(newCaptured);
      console.log('Move undone');
    }
  }, [chess, moveHistory, thinking]);

  const renderCapturedPieces = (color) => {
    const pieces = capturedPieces[color];
    const pieceSymbols = {
      'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'
    };
    
    return (
      <div className="flex flex-wrap gap-1">
        {pieces.map((piece, index) => (
          <span key={index} className="text-2xl">
            {color === 'white' ? pieceSymbols[piece] : pieceSymbols[piece]?.replace(/./g, c => String.fromCharCode(c.charCodeAt(0) - 6))}
          </span>
        ))}
      </div>
    );
  };

  // Custom drag preview function for better cursor following
  const customDragPreview = ({ piece, sourceSquare }) => {
    return null; // Let react-chessboard handle it with our CSS
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Chess.com Clone with AI
        </h1>

        {/* Debug info */}
        <div className="text-center text-white mb-4 text-sm">
          Turn: {chess.turn() === 'w' ? 'White' : 'Black'} | 
          Player: {playerColor} | 
          Thinking: {thinking ? 'Yes' : 'No'} | 
          Game Over: {gameOver ? 'Yes' : 'No'}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Controls */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Game Controls</h2>
              
              <div className="space-y-4">
                <button
                  onClick={resetGame}
                  className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  New Game
                </button>
                
                <button
                  onClick={flipBoard}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Flip Board
                </button>
                
                <button
                  onClick={undoMove}
                  disabled={moveHistory.length < 2 || thinking}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-500 px-4 py-2 rounded-lg transition-colors"
                >
                  Undo Move
                </button>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AI Difficulty: {difficulty}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-lg">Playing as: <strong>{playerColor}</strong></p>
                  <p className="text-sm text-gray-300">
                    AI: <strong className={useStockfish ? 'text-green-400' : 'text-yellow-400'}>
                      {aiEngine}
                    </strong>
                  </p>
                  {gameStatus && (
                    <p className="text-xl font-bold text-yellow-300 mt-2">{gameStatus}</p>
                  )}
                  {thinking && (
                    <p className="text-yellow-300 mt-2 animate-pulse">AI is thinking...</p>
                  )}
                </div>
                
                {gameOver && (
                  <div className="text-center p-4 bg-yellow-500/20 rounded-lg">
                    <p className="text-xl font-bold">Game Over!</p>
                    <p className="text-lg">{winner === 'Draw' ? "It's a draw!" : `${winner} wins!`}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Captured Pieces */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white mt-6">
              <h3 className="text-lg font-bold mb-3">Captured Pieces</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm mb-1">White captured:</p>
                  {renderCapturedPieces('white')}
                </div>
                <div>
                  <p className="text-sm mb-1">Black captured:</p>
                  {renderCapturedPieces('black')}
                </div>
              </div>
            </div>
          </div>

          {/* Chessboard */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 chessboard-container">
              <Chessboard
                position={gamePosition}
                onPieceDragBegin={onPieceDragBegin}
                onPieceDragEnd={onPieceDragEnd}
                onPieceDrop={onDrop}
                boardOrientation={playerColor}
                customBoardStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
                customDarkSquareStyle={{ 
                  backgroundColor: '#769656'
                }}
                customLightSquareStyle={{ 
                  backgroundColor: '#eeeed2' 
                }}
                arePiecesDraggable={!gameOver && !thinking}
                customDropSquareStyle={{
                  boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)'
                }}
                customDragPreview={customDragPreview}
                promotionToSquare={null}
                customPremoveDarkSquareStyle={{ 
                  backgroundColor: '#CF664E' 
                }}
                customPremoveLightSquareStyle={{ 
                  backgroundColor: '#F5F682' 
                }}
                animationDuration={200}
                areArrowsAllowed={false}
                boardWidth={boardWidth}
                isDraggablePiece={({ piece, sourceSquare }) => {
                  if (gameOver || thinking) return false;
                  
                  const currentTurn = chess.turn();
                  const pieceColor = piece[0];
                  
                  // Only allow current player's pieces to be dragged
                  if ((playerColor === 'white' && currentTurn === 'b') || 
                      (playerColor === 'black' && currentTurn === 'w')) {
                    return false;
                  }
                  
                  return (playerColor === 'white' && pieceColor === 'w') || 
                         (playerColor === 'black' && pieceColor === 'b');
                }}
              />
            </div>
          </div>
        </div>

        {/* Move History */}
        {moveHistory.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Move History</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                {moveHistory.map((move, index) => (
                  <div key={index} className="text-sm font-mono bg-white/10 rounded px-2 py-1">
                    {Math.ceil((index + 1) / 2)}. {index % 2 === 0 ? move.san : '... ' + move.san}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChessGame;