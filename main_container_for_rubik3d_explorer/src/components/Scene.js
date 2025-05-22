import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import RubiksCube from './RubiksCube';

/**
 * Scene component that sets up the 3D environment for the Rubik's Cube
 * Includes camera positioning, lighting, and orbit controls for interaction
 */
const Scene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} className="canvas">
      <color attach="background" args={['#1A1A1A']} />
      
      {/* Set up camera with initial position */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      
      <Suspense fallback={null}>
        {/* The Rubik's Cube component */}
        <RubiksCube />
        
        {/* Environmental reflection map */}
        <Environment preset="city" />
      </Suspense>
      
      {/* Orbit controls for rotating the view */}
      <OrbitControls 
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default Scene;
