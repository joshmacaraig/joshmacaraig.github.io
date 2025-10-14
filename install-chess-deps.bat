@echo off
echo Installing Chess Game Dependencies...
echo =====================================

echo.
echo Installing Node.js packages...
call npm install

echo.
echo Installing specific chess dependencies...
call npm install chess.js@1.0.0-beta.8
call npm install react-chessboard@4.7.3  
call npm install stockfish@16.0.0

echo.
echo Verifying installation...
if exist "node_modules\chess.js" (
    echo ✓ chess.js installed successfully
) else (
    echo ✗ chess.js installation failed
)

if exist "node_modules\react-chessboard" (
    echo ✓ react-chessboard installed successfully  
) else (
    echo ✗ react-chessboard installation failed
)

if exist "node_modules\stockfish" (
    echo ✓ stockfish installed successfully
) else (
    echo ✗ stockfish installation failed
)

echo.
echo =====================================
echo Chess dependencies installation complete!
echo.
echo To start the development server, run:
echo   npm start
echo.
echo Or use the start-chess-dev.bat script
echo =====================================

pause