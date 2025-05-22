import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCubeStore } from '../utils/cubeState';

/**
 * RubiksCube component renders a 3D Rubik's Cube
 * The cube is interactive and displays the current state
 */
const RubiksCube = () => {
  const groupRef = useRef();
  
  // In a complete implementation, we would load a GLTF model of a Rubik's Cube
  // For now, we'll create a simplified cube representation
  
  // Access the cube state from our store
  const { rotationState, updateRotation } = useCubeStore();
  
  // Set up the cube pieces
  const createCubePieces = () => {
    const pieces = [];
    const size = 1;
    const gap = 0.05;
    const totalSize = size * 3 + gap * 2;
    const offset = totalSize / 2 - size / 2;
    
    // Create 3x3x3 cube pieces
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // Skip the center piece (fully internal)
          if (x === 1 && y === 1 && z === 1) continue;
          
          pieces.push({
            position: [
              x * (size + gap) - offset,
              y * (size + gap) - offset,
              z * (size + gap) - offset
            ],
            key: `${x}-${y}-${z}`
          });
        }
      }
    }
    
    return pieces;
  };
  
  const pieces = createCubePieces();
  
  // Handle animations and rotations
  useFrame((_, delta) => {
    if (rotationState.animating) {
      updateRotation(delta * 2); // Adjust speed as needed
    }
  });
  
  return (
    <group ref={groupRef}>
      {pieces.map(piece => (
        <CubePiece 
          key={piece.key} 
          position={piece.position} 
          rotationState={rotationState} 
        />
      ))}
    </group>
  );
};

/**
 * Individual cube piece component (sticker)
 */
const CubePiece = ({ position, rotationState }) => {
  const meshRef = useRef();
  
  // Determine if this piece should rotate based on the current rotation state
  useEffect(() => {
    if (!rotationState.animating || !rotationState.layer) return;
    
    // In a complete implementation, determine if this piece is in the rotating layer
    // and apply the appropriate rotation
  }, [rotationState]);
  
  // Colors for the cube faces
  const materials = [
    new THREE.MeshStandardMaterial({ color: '#B71234' }), // Right - Red
    new THREE.MeshStandardMaterial({ color: '#FF5800' }), // Left - Orange
    new THREE.MeshStandardMaterial({ color: '#0046AD' }), // Top - Blue
    new THREE.MeshStandardMaterial({ color: '#009B48' }), // Bottom - Green
    new THREE.MeshStandardMaterial({ color: '#FFFFFF' }), // Front - White
    new THREE.MeshStandardMaterial({ color: '#FFD500' })  // Back - Yellow
  ];
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      castShadow 
      receiveShadow
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      {materials.map((material, index) => (
        <primitive 
          key={index} 
          object={material} 
          attach={`material-${index}`} 
        />
      ))}
    </mesh>
  );
};

export default RubiksCube;
