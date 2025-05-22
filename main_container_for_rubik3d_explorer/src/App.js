import React from 'react';
import './App.css';
import Scene from './components/Scene';
import CubeControls from './components/CubeControls';

/**
 * Main container component for the Rubik3D Explorer application
 * Provides the layout structure and integrates all components
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-symbol">*</span> Rubik3D Explorer
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <div className="rubiks-explorer-container">
            <div className="explorer-header">
              <h1 className="title">Rubik's Cube Explorer</h1>
              <p className="description">
                An interactive 3D digital representation of the classic Rubik's Cube puzzle.
                Use the controls to rotate the cube layers or drag directly on the cube to rotate the view.
              </p>
            </div>
            
            <div className="explorer-content">
              <div className="cube-scene-container">
                <Scene />
              </div>
              
              <div className="controls-container">
                <CubeControls />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>Developed with React and Three.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
