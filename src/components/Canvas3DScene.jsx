import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Floating Dust & Embers Particle Field
const ParticleField = () => {
  const count = 1000;
  const meshRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#ffaa3b');
    const redColor = new THREE.Color('#ff4500');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const isGold = Math.random() > 0.4;
      const c = isGold ? goldColor : redColor;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const positionsArr = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      positionsArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003 + 0.008;
      positionsArr[i * 3] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.002;

      if (positionsArr[i * 3 + 1] > 18) {
        positionsArr[i * 3 + 1] = -18;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.mouse.x * 0.08;
    meshRef.current.rotation.x = -state.mouse.y * 0.08;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 3D Revolver Chamber Object Floating in 3D Space
const RevolverCylinder3D = () => {
  const cylinderRef = useRef();

  useFrame((state, delta) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.z += delta * 0.5;
      cylinderRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={cylinderRef} position={[7, 3, -5]} scale={[0.85, 0.85, 0.85]}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 2.2, 32]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.9} roughness={0.2} />
      </mesh>
      {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.85;
        const z = Math.sin(rad) * 0.85;
        return (
          <group key={idx} position={[x, 0, z]}>
            <mesh>
              <cylinderGeometry args={[0.35, 0.35, 2.3, 16]} />
              <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 1.12, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default function Canvas3DScene({ scrollProgress = 0, isMuted = true }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Real-time High-Visibility Video Background Player */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[85%] contrast-[110%] sepia-[15%] opacity-85 scale-105 transition-all duration-700"
      >
        <source src="/rdr_background.mp4" type="video/mp4" />
      </video>

      {/* Subtle Cinematic Vignette Overlay (Leaves video fully clear in center) */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />

      {/* 2. Real-time Three.js 3D WebGL Canvas Layer */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff9a3c" />
          <pointLight position={[-10, -5, -5]} intensity={0.9} color="#8b0000" />
          
          {/* Floating dust and embers */}
          <ParticleField />

          {/* 3D Revolver Cylinder */}
          <RevolverCylinder3D />
        </Canvas>
      </div>
    </div>
  );
}
