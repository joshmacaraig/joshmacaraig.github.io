import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home';
import GamesHub from './components/Games/GamesHub';
import SlapTheBoss from './components/Games/SlapTheBoss';
import TicTacToe from './components/Games/TicTacToe';
import MemoryGame from './components/Games/MemoryGame';
import { ChessGame } from './components/chess';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/slap-the-boss" element={<SlapTheBoss />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/chess" element={<ChessGame />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
