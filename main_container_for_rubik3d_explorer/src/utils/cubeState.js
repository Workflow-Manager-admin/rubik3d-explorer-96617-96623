import * as THREE from 'three';
import { create } from 'zustand';

// Cube face colors
const COLORS = {
  WHITE: '#FFFFFF',  // Front
  RED: '#B71234',    // Right
  BLUE: '#0046AD',   // Top
  ORANGE: '#FF5800', // Left
  GREEN: '#009B48',  // Bottom
  YELLOW: '#FFD500', // Back
};

/**
 * Creates the initial state of a solved 3x3 Rubik's Cube
 * Each face has 9 squares of the same color
 * @returns {Object} Initial cube state
 */
const createInitialCubeState = () => {
  return {
    // Each face represented as a 3x3 grid
    front: Array(9).fill(COLORS.WHITE),
    right: Array(9).fill(COLORS.RED),
    up: Array(9).fill(COLORS.BLUE),
    left: Array(9).fill(COLORS.ORANGE),
    down: Array(9).fill(COLORS.GREEN),
    back: Array(9).fill(COLORS.YELLOW),
  };
};

/**
 * Store for managing the Rubik's Cube state
 * Provides methods for rotating faces and checking if solved
 */
const useCubeStore = create((set, get) => ({
  // Initial solved cube state
  cubeState: createInitialCubeState(),
  
  // Rotation state for animation
  rotationState: {
    layer: null, // Which layer is rotating
    axis: null,  // Axis of rotation
    angle: 0,    // Current angle
    direction: 1, // 1 for clockwise, -1 for counter-clockwise
    animating: false, // Whether rotation is in progress
  },
  
  // Reset cube to solved state
  resetCube: () => set({ cubeState: createInitialCubeState() }),
  
  // Start a layer rotation animation
  startRotation: (layer, axis, direction) => {
    set({
      rotationState: {
        layer,
        axis: new THREE.Vector3(...axis),
        angle: 0,
        direction,
        animating: true,
      }
    });
  },
  
  // Update rotation angle during animation
  updateRotation: (deltaAngle) => {
    const { rotationState } = get();
    if (!rotationState.animating) return;
    
    let newAngle = rotationState.angle + deltaAngle * rotationState.direction;
    
    // Check if rotation is complete (90 degrees)
    if (Math.abs(newAngle) >= Math.PI / 2) {
      set({
        rotationState: {
          ...rotationState,
          angle: 0,
          animating: false,
        }
      });
      // Apply the completed rotation to the cube state
      get().applyRotation(rotationState.layer, rotationState.axis, rotationState.direction);
    } else {
      set({
        rotationState: {
          ...rotationState,
          angle: newAngle,
        }
      });
    }
  },
  
  // Apply a completed rotation to update the cube state
  applyRotation: (layer, axis, direction) => {
    // Note: This is a simplified version - in a complete implementation
    // this would update the cube state based on the rotation
    set(state => {
      // Deep copy of current state
      const newState = JSON.parse(JSON.stringify(state.cubeState));
      
      // In a real implementation, we would update the cube faces 
      // based on the rotation that just occurred
      
      return { cubeState: newState };
    });
  },
  
  // Check if the cube is solved
  isSolved: () => {
    const { cubeState } = get();
    
    // Check if each face has all the same color
    return Object.values(cubeState).every(face => {
      const firstColor = face[0];
      return face.every(color => color === firstColor);
    });
  },
}));

export { useCubeStore, COLORS };
