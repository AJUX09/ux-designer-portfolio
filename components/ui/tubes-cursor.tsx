'use client';
import { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    const CDN = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

    const init = () => {
      const TubesCursorLib = (window as any).__tubesCursor1__;
      if (!TubesCursorLib || !canvasRef.current) return;
      try {
        appRef.current = TubesCursorLib(canvasRef.current, {
          tubes: {
            colors: ['#c8ff3e', '#7c3aed', '#06b6d4'],
            lights: {
              intensity: 180,
              colors: ['#c8ff3e', '#7c3aed', '#06b6d4', '#ffffff'],
            },
          },
        });
      } catch (e) {
        console.error('TubesCursor init error:', e);
      }
    };

    if ((window as any).__tubesCursor1__) {
      setTimeout(init, 100);
      return;
    }

    // Inject an ESM module script that loads the CDN module and
    // assigns its default export to a known window property
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import TubesCursor1 from '${CDN}';
      window.__tubesCursor1__ = TubesCursor1;
      window.dispatchEvent(new Event('tubesCursorReady'));
    `;
    document.head.appendChild(script);

    const onReady = () => setTimeout(init, 50);
    window.addEventListener('tubesCursorReady', onReady, { once: true });

    return () => {
      window.removeEventListener('tubesCursorReady', onReady);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
