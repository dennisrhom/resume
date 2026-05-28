"use client";
import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./starShader";
import { useMouseUniform } from "./useMouseUniform";

interface Props {
  count?: number;
  clickData: { pos: [number, number]; time: number };
  scrollY: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function StarField({ count = 10000, clickData, scrollY }: Props) {
  const mouse = useMouseUniform();
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  const { positions, sizes, brightnesses, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const br = new Float32Array(count);
    const col = new Float32Array(count * 3);

    // Palette chosen to contrast with #e8e6e3 warm off-white text.
    // Blue/indigo/cyan dominates — clearly different in hue from text.
    const palette = [
      [0.28, 0.48, 0.95], // vivid blue        (35%)
      [0.18, 0.62, 0.88], // sky / cyan-blue    (25%)
      [0.52, 0.28, 0.92], // indigo / violet    (20%)
      [0.12, 0.72, 0.78], // teal               (12%)
      [0.72, 0.52, 0.18], // muted amber        (8%)
    ];
    const weights = [0.35, 0.25, 0.20, 0.12, 0.08];
    const cumulative = weights.reduce<number[]>((acc, w, i) => {
      acc.push((acc[i - 1] ?? 0) + w);
      return acc;
    }, []);

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere with denser center band (galaxy shape)
      const theta = rand(0, Math.PI * 2);
      const phi = Math.acos(rand(-1, 1));
      const r = Math.pow(Math.random(), 0.5) * 80;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4; // flatten Y
      pos[i * 3 + 2] = r * Math.cos(phi);

      sz[i] = rand(0.4, 2.0);
      br[i] = rand(0.25, 0.7);

      // Pick color by weighted random
      const roll = Math.random();
      let ci = 0;
      for (let j = 0; j < cumulative.length; j++) {
        if (roll <= cumulative[j]) { ci = j; break; }
      }
      col[i * 3]     = palette[ci][0];
      col[i * 3 + 1] = palette[ci][1];
      col[i * 3 + 2] = palette[ci][2];
    }

    return { positions: pos, sizes: sz, brightnesses: br, colors: col };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uMouse:      { value: new THREE.Vector2(0, 0) },
    uClickPos:   { value: new THREE.Vector2(0, 0) },
    uClickTime:  { value: 0 },
    uScrollY:    { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);
    uniforms.uScrollY.value = scrollY;

    // Click shockwave age (0 = no click, 0..1 = animating, >1 = done)
    if (clickData.time > 0) {
      const age = (Date.now() - clickData.time) / 1200;
      if (age < 1) {
        uniforms.uClickTime.value = age;
        uniforms.uClickPos.value.set(clickData.pos[0], clickData.pos[1]);
      } else {
        uniforms.uClickTime.value = 0;
      }
    }

    // Slow Y-axis rotation of the whole field
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aBrightness"
          args={[brightnesses, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
