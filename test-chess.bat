@echo off
echo Testing Chess Game Components...
echo =================================

echo.
echo 1. Checking Node.js dependencies...
if exist "node_modules\chess.js" (
    echo ✓ chess.js found
) else (
    echo ✗ chess.js missing - run install-chess-deps.bat
)

if exist "node_modules\react-chessboard" (
    echo ✓ react-chessboard found
) else (
    echo ✗ react-chessboard missing - run install-chess-deps.bat
)

if exist "node_modules\stockfish" (
    echo ✓ stockfish found
) else (
    echo ✗ stockfish missing - run install-chess-deps.bat
)

echo.
echo 2. Checking Chess component files...
if exist "src\components\chess\ChessGame.js" (
    echo ✓ ChessGame.js found
) else (
    echo ✗ ChessGame.js missing
)

if exist "src\components\chess\SimpleAI.js" (
    echo ✓ SimpleAI.js found
) else (
    echo ✗ SimpleAI.js missing
)

if exist "src\components\chess\ChessGame.css" (
    echo ✓ ChessGame.css found
) else (
    echo ✗ ChessGame.css missing
)

if exist "public\stockfish.js" (
    echo ✓ stockfish.js worker found
) else (
    echo ✗ stockfish.js worker missing
)

echo.
echo 3. Starting development server...
echo   This will open the chess game at http://localhost:3000/chess
echo.
echo Press Ctrl+C to stop the server when done testing
echo.
echo =================================

npm start