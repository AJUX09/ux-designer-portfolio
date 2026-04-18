'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const CYCLING_WORDS = ['Smarter', 'Faster', 'Better']
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

export default function Hero() {
  useEffect(() => {
    const statNums = document.querySelectorAll('.stat-num')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.target || '0', 10)
          const duration = 1400
          const start = performance.now()
          function update(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 4)
            el.textContent = Math.floor(ease * target).toString()
            if (progress < 1) requestAnimationFrame(update)
            else el.textContent = target.toString()
          }
          requestAnimationFrame(update)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    statNums.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Cycling word state — key change remounts span and replays the animation
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    // Wait for initial word-reveal entrance to finish before cycling
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setWordIdx(i => (i + 1) % CYCLING_WORDS.length)
      }, 3000)
      return () => clearInterval(interval)
    }, 1400)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    // overflowX hidden keeps orbs in, overflowY visible so robot legs aren't clipped
    <section className="hero" id="hero" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
      <div className="hero-bg-grid"></div>

      <Spotlight
        className="top-[-20%] left-[40%]"
        fill="rgba(200,255,62,0.18)"
      />

      {/* Flex row: text left (60%), robot right (flex:1) — no overlap */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Left — 60% width, pointer-events none so cursor reaches robot behind */}
        <div
          className="hero-content hero-left"
          style={{
            position: 'relative',
            transform: 'none',
            flex: '0 0 45%',
            maxWidth: '45%',
            paddingTop: 0,
            textAlign: 'left',
            alignItems: 'flex-start',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <div className="hero-badge hero-anim" style={{ ['--d' as string]: '0ms' }}>
            <span className="badge-dot pulse"></span>
            AI-Enhanced Designer
          </div>

          <h1 className="hero-title">
            <div className="hero-line">
              <div className="word-clip"><span className="word-reveal" style={{ ['--wi' as string]: 0 }}>Designing</span></div>
            </div>
            <div className="hero-line">
              <div className="word-clip" style={{ overflow: 'visible' }}>
                <span
                  key={wordIdx}
                  className="gradient-text"
                  style={{
                    display: 'inline-block',
                    animation: 'wordSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
                  }}
                >
                  {CYCLING_WORDS[wordIdx]}
                </span>
              </div>
              <div className="word-clip"><span className="word-reveal" style={{ ['--wi' as string]: 2 }}>Products</span></div>
            </div>
            <div className="hero-line">
              <div className="word-clip"><span className="word-reveal" style={{ ['--wi' as string]: 3 }}>with</span></div>
              <div className="word-clip"><span className="word-reveal gradient-text" style={{ ['--wi' as string]: 4 }}>AI.</span></div>
            </div>
          </h1>

          <p className="hero-sub hero-anim" style={{ ['--d' as string]: '520ms' }}>
            UI/UX Designer pairing human creativity with AI<br />
            to deliver better experiences, faster — since 2020.
          </p>

          <div className="hero-actions hero-anim" style={{ ['--d' as string]: '660ms', pointerEvents: 'auto' }}>
            <a href="#projects" className="btn btn-primary magnetic">View Projects</a>
            <a href="#process" className="btn btn-ghost magnetic">My AI Process</a>
          </div>

          <div className="hero-stats hero-anim" style={{ ['--d' as string]: '800ms' }}>
            <div className="stat">
              <span className="stat-num" data-target="40">0</span><span>+</span>
              <p>Projects Done</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num" data-target="5">0</span><span>+</span>
              <p>Years Experience</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num" data-target="3">0</span><span>x</span>
              <p>Faster Delivery</p>
            </div>
          </div>
        </div>

        {/* Right — robot fills remaining space, bleeds right + bottom so legs show fully */}
        <div
          className="hero-robot"
          style={{
            flex: '0 0 55%',
            height: '980px',
            marginRight: '-48px',  /* bleed past section right padding */
            marginBottom: '-120px', /* push below section so legs aren't clipped */
            alignSelf: 'flex-end',
            position: 'relative',
          }}
        >
          {/* Floating AI tool icons */}

          {/* Claude — top-left */}
          <div className="ai-icon" title="Claude" style={{ top: '5%', left: '5%', animationDelay: '0s', animationDuration: '3.8s' }}>
            <Image src="/images/image 65.png" alt="Claude" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* Gemini — top-center above robot head */}
          <div className="ai-icon" title="Gemini" style={{ top: '2%', left: '37%', animationDelay: '0.5s', animationDuration: '4.2s' }}>
            <Image src="/images/image 66.png" alt="Gemini" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* Artstudio — top-right */}
          <div className="ai-icon" title="Artstudio" style={{ top: '6%', right: '10%', animationDelay: '1.0s', animationDuration: '3.6s' }}>
            <Image src="/images/image 67.png" alt="Artstudio" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* Perplexity — mid-left beside robot */}
          <div className="ai-icon" title="Perplexity" style={{ top: '40%', left: '3%', animationDelay: '0.8s', animationDuration: '4.0s' }}>
            <Image src="/images/perplexity.png" alt="Perplexity" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* ChatGPT — mid-right beside robot */}
          <div className="ai-icon" title="ChatGPT" style={{ top: '38%', right: '8%', animationDelay: '1.6s', animationDuration: '4.4s', animation: 'floatBob2 4.4s ease-in-out 1.6s infinite' }}>
            <Image src="/images/image 68.png" alt="ChatGPT" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* Figma — lower-left */}
          <div className="ai-icon" title="Figma" style={{ top: '66%', left: '6%', animationDelay: '1.3s', animationDuration: '3.9s' }}>
            <Image src="/images/Fimga.png" alt="Figma" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          {/* Relume — lower-right */}
          <div className="ai-icon" title="Relume" style={{ top: '63%', right: '10%', animationDelay: '0.3s', animationDuration: '4.6s' }}>
            <Image src="/images/Relume.png" alt="Relume" width={74} height={74} style={{ borderRadius: 16 }} />
          </div>

          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

      </div>

      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
