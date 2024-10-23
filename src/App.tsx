import { useEffect, useState } from 'react';

import PdtDashboard from './pages/PdtDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="pdtHeader">
        <h1>
          Products Dashboard
        </h1>
      </header>
      <main>        
        <PdtDashboard />
      </main>
    </div>
  );
}

export default App;
