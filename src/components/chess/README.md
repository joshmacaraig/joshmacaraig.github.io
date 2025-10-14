# Chess.com Clone with Stockfish AI

A fully featured chess game built with React that integrates the powerful Stockfish chess engine for AI gameplay.

## Features

### Game Features
- **Full Chess Rules**: Complete implementation of chess rules including castling, en passant, and pawn promotion
- **Stockfish AI Integration**: Play against the world's strongest chess engine with 20 difficulty levels
- **Interactive Board**: Drag and drop pieces with visual feedback
- **Move Validation**: Real-time move validation and illegal move prevention
- **Game Status**: Real-time check, checkmate, and draw detection

### UI Features
- **Beautiful Chessboard**: Responsive chess board with custom styling
- **Move History**: Complete move history with algebraic notation
- **Captured Pieces**: Visual display of captured pieces for both sides
- **Flip Board**: Switch between white and black perspectives
- **Undo Moves**: Undo the last move (both player and AI)
- **Game Controls**: New game, difficulty adjustment, and game status

### Technical Features
- **Web Workers**: Stockfish runs in a separate thread to prevent UI blocking
- **Chess.js Library**: Robust chess logic and move validation
- **React Chessboard**: Professional chessboard component
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Dependencies

```json
{
  \"chess.js\": \"^1.0.0-beta.8\",
  \"react-chessboard\": \"^4.5.3\",
  \"stockfish\": \"^16.1.0\"
}
```

## File Structure

```
src/components/chess/
├── ChessGame.js          # Main chess component
├── index.js              # Export file
public/
├── stockfish.js          # Stockfish web worker
```

## How It Works

1. **Chess Logic**: Uses chess.js library for move validation, game state, and chess rules
2. **AI Engine**: Stockfish engine runs in a web worker for non-blocking AI calculations
3. **Board Display**: react-chessboard provides the interactive chess board interface
4. **Move Flow**:
   - Player makes a move by dragging pieces
   - Move is validated using chess.js
   - If valid, board updates and AI starts thinking
   - Stockfish calculates best move and executes it
   - Game continues until checkmate, stalemate, or draw

## AI Difficulty Levels

- **Level 1-5**: Beginner (Quick decisions, makes mistakes)
- **Level 6-10**: Intermediate (Balanced play)
- **Level 11-15**: Advanced (Strong tactical play)
- **Level 16-20**: Expert (Maximum strength, longer thinking time)

## Game Controls

- **New Game**: Reset board to starting position
- **Flip Board**: Change board orientation (white/black bottom)
- **Undo Move**: Take back the last move (both player and AI)
- **Difficulty Slider**: Adjust AI strength from 1-20
- **Move History**: View complete game history
- **Captured Pieces**: See pieces captured by each side

## Performance Optimization

- Stockfish runs in a web worker to prevent UI freezing
- Memoized components prevent unnecessary re-renders
- Efficient state management for smooth gameplay
- Lazy loading of heavy chess assets

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Navigate to `/chess` route
4. Start playing!

## Future Enhancements

- [ ] Opening book integration
- [ ] Position analysis
- [ ] Game saving/loading
- [ ] Tournament mode
- [ ] Multiple time controls
- [ ] Chess puzzle integration
- [ ] Online multiplayer support