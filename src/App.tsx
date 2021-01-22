import React from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar/index';
import './Global.scss';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
