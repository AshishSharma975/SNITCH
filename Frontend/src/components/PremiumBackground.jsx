import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Environment } from '@react-three/drei';

// A lightweight, premium particle field with higher contrast
const ParticleField = () => {
  const ref = useRef();

  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={true}>
        <PointMaterial
          transparent
          color="#000000"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// High-contrast, polished Obsidian gems
const FloatingGem = () => {
  const meshRef1 = useRef();
  const meshRef2 = useRef();

  useFrame((state, delta) => {
    if (meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.15;
      meshRef1.current.rotation.y += delta * 0.2;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.1;
      meshRef2.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
      {/* Main polished obsidian shape - Centered as requested */}
      <mesh ref={meshRef1} position={[0, 1, -2]} scale={2.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#E491C9"
          metalness={0.6}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.25}
        />
      </mesh>

      {/* Secondary contrasting shape */}
      <mesh ref={meshRef2} position={[-2.5, -1, 0]} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#BF4646"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          wireframe={true}
          wireframeLinewidth={1.5}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fcfbfc]">
      {/* Custom CSS for fluid animation - Optimized for Performance */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(5%, -5%) scale(1.1); }
            66% { transform: translate(-3%, 3%) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }
          @keyframes float2 {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-5%, 4%) scale(0.9); }
            66% { transform: translate(3%, -3%) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
          }
          @keyframes float3 {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(3%, 3%) scale(1.1); }
            66% { transform: translate(-4%, -4%) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }
          .fluid-blob {
            position: absolute;
            border-radius: 50%;
            opacity: 0.8;
            mix-blend-mode: multiply;
            will-change: transform;
          }
        `}
      </style>

      {/* Fluid Animated Blobs using Radial Gradients (No heavy blur needed!) */}
      <div
        className="fluid-blob"
        style={{ background: 'radial-gradient(circle, #fbcfe8 0%, transparent 70%)', width: '80vw', height: '80vw', top: '-20%', left: '-20%', animation: 'float1 15s ease-in-out infinite' }}
      />
      <div
        className="fluid-blob"
        style={{ background: 'radial-gradient(circle, #e9d5ff 0%, transparent 70%)', width: '90vw', height: '90vw', top: '10%', right: '-30%', animation: 'float2 18s ease-in-out infinite' }}
      />
      <div
        className="fluid-blob"
        style={{ background: 'radial-gradient(circle, #fecdd3 0%, transparent 70%)', width: '100vw', height: '100vw', bottom: '-40%', left: '0%', animation: 'float3 20s ease-in-out infinite' }}
      />
      <div
        className="fluid-blob opacity-50"
        style={{ background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', width: '70vw', height: '70vw', top: '10%', left: '10%', animation: 'float1 25s ease-in-out infinite reverse' }}
      />

      {/* Premium Architectural Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" />
        <directionalLight position={[-10, -20, -10]} intensity={1} color="#f0f0f0" />

        <Environment preset="studio" />

        <ParticleField />
        <FloatingGem />
      </Canvas>

      {/* Subtle vignette to frame the content perfectly */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)] pointer-events-none" />
    </div>
  );
};

export default PremiumBackground;
