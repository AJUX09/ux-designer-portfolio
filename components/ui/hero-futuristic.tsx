'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

// Site accent: #c8ff3e → vec3(0.784, 1.0, 0.243)
const ACCENT = vec3(0.784, 1.0, 0.243);

extend(THREE as any);

/* ─── Post Processing ─────────────────────────────────────────────────────── */
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new (THREE as any).PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos   = float(uScanProgress.value);
    const uvY       = uv().y;
    const scanWidth = float(0.05);
    const scanLine  = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));

    // Fade the scan effect to zero within the top/bottom 12% of the canvas
    // smoothstep args must always be edge0 < edge1 — use oneMinus for the upper fade
    const edgeFade = smoothstep(0.0, 0.12, uvY).mul(oneMinus(smoothstep(0.88, 1.0, uvY)));

    const accentOverlay = ACCENT.mul(oneMinus(scanLine)).mul(0.4).mul(edgeFade);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, accentOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)).mul(edgeFade) : float(1)
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    // Clamp to 0.12–0.88 so scan line never bleeds onto the canvas edges
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.38 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

/* ─── Scene ───────────────────────────────────────────────────────────────── */
const WIDTH  = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new (THREE as any).Vector2(0) as unknown as number);
    const uProgress = uniform(0);
    const strength  = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect   = float(WIDTH).div(HEIGHT);
    const tUv      = vec2(uv().x.mul(aspect), uv().y);
    const tiling   = vec2(120.0);
    const tiledUv  = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist  = float(tiledUv.length());
    const dot   = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap.r;
    const flow  = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Accent colour dots (was vec3(10, 0, 0) red)
    const mask  = dot.mul(flow).mul(ACCENT.mul(10));
    const final = blendScreen(tMap, mask);

    const material = new (THREE as any).MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current) {
      const mat = meshRef.current.material as any;
      if (mat && 'opacity' in mat) {
        mat.opacity = (THREE as any).MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    (uniforms.uPointer as any).value = pointer;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.40, h * 0.40, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

/* ─── Html overlay ────────────────────────────────────────────────────────── */
// 6 words total — 3 left (title) + 3 right (subtitle split)
const LEFT_WORDS  = ['BUILD', 'YOUR', 'DREAMS'];
const RIGHT_WORDS = ['AI', 'POWERED', 'CREATIVITY'];
// vertical positions (% from top) for each row
const ROW_POS = ['11%', '40%', '67%'];

export const HeroFuturistic = () => {
  const allWords = [...LEFT_WORDS, ...RIGHT_WORDS]; // 6 total
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < allWords.length) {
      const t = setTimeout(() => setVisibleCount(v => v + 1), 500);
      return () => clearTimeout(t);
    }
  }, [visibleCount, allWords.length]);

  const wordStyle = (idx: number) => ({
    opacity: idx < visibleCount ? 1 : 0,
    animationDelay: `${idx * 0.12}s`,
  });

  return (
    <div className="futuristic-section h-svh relative overflow-hidden">

      {/* LEFT column — BUILD / YOUR / DREAMS — capped at 28vw so they can't reach the centre */}
      {LEFT_WORDS.map((word, i) => (
        <div
          key={word}
          className="absolute z-[60] pointer-events-none overflow-hidden"
          style={{ top: ROW_POS[i], left: '2%', maxWidth: '28vw' }}
        >
          <span
            className={i < visibleCount ? 'futuristic-fade-in' : ''}
            style={{
              ...wordStyle(i),
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(1rem, 3vw, 2.8rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              display: 'block',
            }}
          >
            {word}
          </span>
        </div>
      ))}

      {/* RIGHT column — AI / POWERED / CREATIVITY — capped at 28vw */}
      {RIGHT_WORDS.map((word, i) => (
        <div
          key={word}
          className="absolute z-[60] pointer-events-none overflow-hidden"
          style={{ top: ROW_POS[i], right: '2%', maxWidth: '28vw' }}
        >
          <span
            className={i + 3 < visibleCount ? 'futuristic-fade-in' : ''}
            style={{
              ...wordStyle(i + 3),
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(1rem, 3vw, 2.8rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              display: 'block',
              textAlign: 'right',
            }}
          >
            {word}
          </span>
        </div>
      ))}

      {/* Three.js canvas — screen blend makes black areas transparent, revealing the grid */}
      <Canvas
        flat
        style={{ mixBlendMode: 'screen' }}
        gl={async (props) => {
          const renderer = new (THREE as any).WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect={true} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroFuturistic;
