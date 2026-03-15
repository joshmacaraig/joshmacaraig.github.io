import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home';
import NeuralVortexBackground from './components/ui/neural-vortex-background';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#09090b]">
      {/* Fixed WebGL neural vortex — sits behind everything, always on */}
      <NeuralVortexBackground />

      <Header />
      <main className="flex-grow relative z-10 pointer-events-none">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
