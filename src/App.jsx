import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        {/* About and Portfolio sections will be added in the next phase */}
      </main>
    </div>
  );
}

export default App;
