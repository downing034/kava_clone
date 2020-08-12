import React from 'react';
import Dashboard from './dashboard/index';
import '../styles/app.css';

export default function App() {
  return (
    <div>
      <div className="container-fluid">
        <div className="main-container">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};
