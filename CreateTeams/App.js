import React from 'react';
import Dashboard from './Dashboard';
import './App.css';  // Make sure to import the CSS


function App() {
  return (
    <div className="App">
      <h1>
        Instructor Dashboard
      </h1>
      <div className="dashboard-container">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
