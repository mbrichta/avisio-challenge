import React from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar/index';
import './Global.scss';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
