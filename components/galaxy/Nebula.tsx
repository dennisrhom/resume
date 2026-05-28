"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.1;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    // Animated noise shape
    vec2 p = uv * 3.0 + vec2(uTime * 0.02, uTime * 0.015);
    float n = fbm(p);

    // Radial falloff × noise
    float alpha = smoothstep(0.5, 0.0, dist) * n * uOpacity;
    alpha = pow(alpha, 1.5);

    gl_FragColor = vec4(uColor * alpha, alpha);
  }
`;

interface NebulaProps {
  position: [number, number, number];
  scale: number;
  color: THREE.Color;
  driftSpeed?: number;
  opacity?: number;
}

function NebulaMesh({ position, scale, color, driftSpeed = 1, opacity = 0.18 }: NebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: color },
    uOpacity: { value: opacity },
  }), [color, opacity]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime() * driftSpeed;
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.00008 * driftSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[scale, scale, 1, 1]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Nebula() {
  return (
    <>
      <NebulaMesh
        position={[-18, 4, -30]}
        scale={55}
        color={new THREE.Color(0.22, 0.16, 0.75)}
        driftSpeed={0.7}
        opacity={0.22}
      />
      <NebulaMesh
        position={[20, -6, -40]}
        scale={50}
        color={new THREE.Color(0.15, 0.45, 0.65)}
        driftSpeed={0.5}
        opacity={0.18}
      />
      <NebulaMesh
        position={[5, 10, -50]}
        scale={65}
        color={new THREE.Color(0.28, 0.12, 0.6)}
        driftSpeed={0.9}
        opacity={0.15}
      />
    </>
  );
}
