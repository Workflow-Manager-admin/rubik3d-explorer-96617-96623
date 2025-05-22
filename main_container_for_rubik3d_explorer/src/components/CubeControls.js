import React from 'react';
import { useCubeStore } from '../utils/cubeState';

/**
 * CubeControls component provides UI controls for manipulating the Rubik's Cube
 * Includes buttons for rotating different faces and resetting the cube
 */
const CubeControls = () => {
  const { startRotation, resetCube, rotationState } = useCubeStore();
  
  // Check if any rotation is currently in progress
  const isRotating = rotationState.animating;
  
  // Rotate a face of the cube
  const handleRotate = (layer, axis, direction) => {
    if (isRotating) return; // Prevent starting a new rotation while one is in progress
    startRotation(layer, axis, direction);
  };
  
  // Handle cube reset
  const handleReset = () => {
    if (isRotating) return;
    resetCube();
  };
  
  return (
    <div className="cube-controls">
      <h3>Cube Controls</h3>
      
      <div className="controls-section">
        <h4>Front Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('front', [0, 0, 1], 1)}
            disabled={isRotating}
          >
            Front CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('front', [0, 0, 1], -1)}
            disabled={isRotating}
          >
            Front CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Back Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('back', [0, 0, -1], 1)}
            disabled={isRotating}
          >
            Back CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('back', [0, 0, -1], -1)}
            disabled={isRotating}
          >
            Back CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Up Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('up', [0, 1, 0], 1)}
            disabled={isRotating}
          >
            Up CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('up', [0, 1, 0], -1)}
            disabled={isRotating}
          >
            Up CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Down Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('down', [0, -1, 0], 1)}
            disabled={isRotating}
          >
            Down CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('down', [0, -1, 0], -1)}
            disabled={isRotating}
          >
            Down CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Left Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('left', [-1, 0, 0], 1)}
            disabled={isRotating}
          >
            Left CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('left', [-1, 0, 0], -1)}
            disabled={isRotating}
          >
            Left CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Right Face</h4>
        <div className="button-row">
          <button 
            className="control-btn" 
            onClick={() => handleRotate('right', [1, 0, 0], 1)}
            disabled={isRotating}
          >
            Right CW
          </button>
          <button 
            className="control-btn" 
            onClick={() => handleRotate('right', [1, 0, 0], -1)}
            disabled={isRotating}
          >
            Right CCW
          </button>
        </div>
      </div>
      
      <div className="controls-section reset-section">
        <button 
          className="reset-btn"
          onClick={handleReset}
          disabled={isRotating}
        >
          Reset Cube
        </button>
      </div>
    </div>
  );
};

export default CubeControls;
