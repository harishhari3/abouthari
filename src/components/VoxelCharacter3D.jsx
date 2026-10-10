import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Canvas Texture Generator for Minecraft/Voxel Character
 * Creates crisp, pixel-perfect textures for:
 * 1. Checkered Light-Blue Shirt with Placket & Pocket
 * 2. Charcoal Pants with Grid Detail
 * 3. Face Front with Beard Stubble & Eyes
 * 4. Skin Tone
 * 5. White Sneakers with Sole Trim
 */
function createVoxelTextures() {
  // Helper canvas creation
  const createCanvasTexture = (width, height, drawFn) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx, width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
  };

  // 1. Light Blue Checkered Shirt Texture (32x32)
  const shirt = createCanvasTexture(32, 32, (ctx, w, h) => {
    // Fill checkered light blue background
    const tileSize = 4;
    for (let y = 0; y < h; y += tileSize) {
      for (let x = 0; x < w; x += tileSize) {
        const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isAlt ? '#8ec3f8' : '#6ba6e6';
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
    // Front Placket & White Buttons (center column)
    ctx.fillStyle = '#518ad0';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(15, 6, 2, 2);
    ctx.fillRect(15, 14, 2, 2);
    ctx.fillRect(15, 22, 2, 2);

    // Front Pocket (Left chest area)
    ctx.strokeStyle = '#4376bb';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 16, 7, 8);
    ctx.fillStyle = '#7db6f2';
    ctx.fillRect(21, 17, 5, 6);
  });

  // 2. Charcoal Pants Texture (16x16)
  const pants = createCanvasTexture(16, 16, (ctx, w, h) => {
    const tileSize = 2;
    for (let y = 0; y < h; y += tileSize) {
      for (let x = 0; x < w; x += tileSize) {
        const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isAlt ? '#3a3d43' : '#2a2c31';
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
    // Belt line at top
    ctx.fillStyle = '#1c1d21';
    ctx.fillRect(0, 0, 16, 2);
    ctx.fillStyle = '#d4af37'; // Buckle
    ctx.fillRect(7, 0, 2, 2);
  });

  // 3. Skin Tone Texture (8x8)
  const skin = createCanvasTexture(8, 8, (ctx, w, h) => {
    ctx.fillStyle = '#e8aa78';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#df9b66';
    ctx.fillRect(0, 0, 2, 2);
    ctx.fillRect(6, 6, 2, 2);
  });

  // 4. Face Front Texture (32x32)
  const face = createCanvasTexture(32, 32, (ctx, w, h) => {
    // Skin base
    ctx.fillStyle = '#e8aa78';
    ctx.fillRect(0, 0, w, h);

    // Eyes at y: 14 to 17
    // Left eye
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(5, 15, 5, 4);
    ctx.fillStyle = '#3a2518'; // pupil
    ctx.fillRect(7, 15, 3, 4);

    // Right eye
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(22, 15, 5, 4);
    ctx.fillStyle = '#3a2518'; // pupil
    ctx.fillRect(22, 15, 3, 4);

    // Eyebrows
    ctx.fillStyle = '#221914';
    ctx.fillRect(4, 12, 7, 2);
    ctx.fillRect(21, 12, 7, 2);

    // Nose
    ctx.fillStyle = '#d6925c';
    ctx.fillRect(14, 18, 4, 3);

    // Beard Stubble & Mouth (lower third y: 21 to 31)
    for (let y = 21; y < 31; y += 2) {
      for (let x = 4; x < 28; x += 2) {
        if ((x + y) % 4 === 0) {
          ctx.fillStyle = 'rgba(50, 35, 25, 0.45)';
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
    // Lips
    ctx.fillStyle = '#c7785c';
    ctx.fillRect(13, 24, 6, 2);
  });

  // 5. White Shoes Texture (16x16)
  const shoes = createCanvasTexture(16, 16, (ctx, w, h) => {
    ctx.fillStyle = '#f4f5f8';
    ctx.fillRect(0, 0, w, h);
    // Sole edge at bottom
    ctx.fillStyle = '#b0b4bc';
    ctx.fillRect(0, 12, 16, 4);
    // Laces
    ctx.fillStyle = '#d8dce2';
    ctx.fillRect(4, 3, 8, 2);
    ctx.fillRect(4, 7, 8, 2);
  });

  // 6. Hair Texture
  const hair = createCanvasTexture(8, 8, (ctx, w, h) => {
    ctx.fillStyle = '#241c18';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#18120e';
    ctx.fillRect(0, 0, 4, 4);
  });

  return { shirt, pants, skin, face, shoes, hair };
}

// 3D Voxel Character Mesh with Rigged Node Hierarchies & Cursor Tracking
function VoxelCharacterMesh({ mousePos }) {
  const rootRef = useRef();
  const torsoRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const textures = useMemo(() => createVoxelTextures(), []);

  // Materials setup
  const matShirt = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.shirt, roughness: 0.65 }), [textures]);
  const matPants = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.pants, roughness: 0.8 }), [textures]);
  const matSkin = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.skin, roughness: 0.6 }), [textures]);
  const matFace = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.face, roughness: 0.6 }), [textures]);
  const matShoes = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.shoes, roughness: 0.5 }), [textures]);
  const matHair = useMemo(() => new THREE.MeshStandardMaterial({ map: textures.hair, roughness: 0.9 }), [textures]);

  const headMaterials = useMemo(() => [
    matSkin, // Right
    matSkin, // Left
    matHair, // Top
    matSkin, // Bottom
    matFace, // Front (+Z)
    matHair  // Back (-Z)
  ], [matSkin, matHair, matFace]);

  // Real-time Lerp Cursor Tracking Physics insideuseFrame loop
  useFrame((state, delta) => {
    const targetX = mousePos.x; // -1 to 1
    const targetY = mousePos.y; // -1 to 1
    const time = state.clock.elapsedTime;

    // 1. Head tracks mouse with highest responsiveness
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 0.9, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY * 0.6, 0.1);
    }

    // 2. Torso rotates and tilts naturally toward cursor
    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, targetX * 0.4, 0.08);
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, -targetY * 0.25, 0.08);
      torsoRef.current.position.y = 0.2 + Math.sin(time * 2) * 0.04; // Idle breathing float
    }

    // 3. Arms sway to follow motion & idle stance
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(time * 2) * 0.08 - targetY * 0.3, 0.08);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.15 + targetX * 0.2, 0.08);
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.sin(time * 2) * 0.08 - targetY * 0.3, 0.08);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.15 + targetX * 0.2, 0.08);
    }

    // 4. Whole Root Group slight movement following cursor
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, targetX * 0.3, 0.05);
      rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, -targetY * 0.2, 0.05);
    }
  });

  return (
    <group ref={rootRef} position={[0, -1.2, 0]} scale={[1.6, 1.6, 1.6]}>
      
      {/* Torso Group (Pivot at hip/waist) */}
      <group ref={torsoRef} position={[0, 0.9, 0]}>
        
        {/* Torso Box (Light Blue Checkered Shirt) */}
        <mesh material={matShirt} castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 1.05, 0.5]} />
        </mesh>

        {/* Shirt Collar */}
        <mesh material={matShirt} position={[-0.18, 0.53, 0.22]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.22, 0.12, 0.08]} />
        </mesh>
        <mesh material={matShirt} position={[0.18, 0.53, 0.22]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.22, 0.12, 0.08]} />
        </mesh>

        {/* Head Group (Pivot at neck) */}
        <group ref={headRef} position={[0, 0.55, 0]}>
          
          {/* Main Blocky Head */}
          <mesh material={headMaterials} castShadow receiveShadow position={[0, 0.35, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
          </mesh>

          {/* 3D Voxel Hair Strands (Dark Brown Voxels) */}
          <mesh material={matHair} castShadow position={[0, 0.65, 0]}>
            <boxGeometry args={[0.74, 0.22, 0.74]} />
          </mesh>
          {/* Forehead Hair Fringe Voxels */}
          <mesh material={matHair} position={[-0.2, 0.55, 0.36]}>
            <boxGeometry args={[0.2, 0.15, 0.08]} />
          </mesh>
          <mesh material={matHair} position={[0.05, 0.53, 0.37]}>
            <boxGeometry args={[0.22, 0.18, 0.08]} />
          </mesh>
          <mesh material={matHair} position={[0.25, 0.57, 0.36]}>
            <boxGeometry args={[0.18, 0.12, 0.08]} />
          </mesh>

          {/* Blocky Nose */}
          <mesh material={matSkin} position={[0, 0.32, 0.38]}>
            <boxGeometry args={[0.12, 0.12, 0.08]} />
          </mesh>
        </group>

        {/* Left Arm (Shirt Sleeve + Skin Hand) */}
        <group ref={leftArmRef} position={[-0.6, 0.42, 0]}>
          <mesh material={matShirt} castShadow position={[0, -0.28, 0]}>
            <boxGeometry args={[0.28, 0.55, 0.28]} />
          </mesh>
          <mesh material={matSkin} castShadow position={[0, -0.68, 0]}>
            <boxGeometry args={[0.24, 0.38, 0.24]} />
          </mesh>
        </group>

        {/* Right Arm (Shirt Sleeve + Skin Hand) */}
        <group ref={rightArmRef} position={[0.6, 0.42, 0]}>
          <mesh material={matShirt} castShadow position={[0, -0.28, 0]}>
            <boxGeometry args={[0.28, 0.55, 0.28]} />
          </mesh>
          <mesh material={matSkin} castShadow position={[0, -0.68, 0]}>
            <boxGeometry args={[0.24, 0.38, 0.24]} />
          </mesh>
        </group>

      </group>

      {/* Left Leg (Charcoal Pants + White Shoes) */}
      <group ref={leftLegRef} position={[-0.22, 0, 0]}>
        <mesh material={matPants} castShadow position={[0, 0.38, 0]}>
          <boxGeometry args={[0.38, 0.72, 0.38]} />
        </mesh>
        <mesh material={matShoes} castShadow position={[0, 0.06, 0.04]}>
          <boxGeometry args={[0.4, 0.18, 0.48]} />
        </mesh>
      </group>

      {/* Right Leg (Charcoal Pants + White Shoes) */}
      <group ref={rightLegRef} position={[0.22, 0, 0]}>
        <mesh material={matPants} castShadow position={[0, 0.38, 0]}>
          <boxGeometry args={[0.38, 0.72, 0.38]} />
        </mesh>
        <mesh material={matShoes} castShadow position={[0, 0.06, 0.04]}>
          <boxGeometry args={[0.4, 0.18, 0.48]} />
        </mesh>
      </group>

      {/* Ground Contact Shadow Ring */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.85, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>

    </group>
  );
}

export default function VoxelCharacter3D({ className = "" }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized X, Y coordinates across full window (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#fff1db" castShadow />
        <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#7caee4" />
        <pointLight position={[0, -2, 3]} intensity={0.5} color="#ffaa3b" />

        <VoxelCharacterMesh mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
