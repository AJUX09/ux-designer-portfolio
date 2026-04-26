'use client';
import Image from 'next/image'
import { Smartphone, Globe } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'

const apps = [
  {
    name: 'Time Warp Scan App',
    tagline: 'iOS & Android',
    desc: 'AI-powered beauty retouching with real-time filters, skin smoothing, and makeup simulation — designed for creators and enthusiasts.',
    stats: [{ label: 'Downloads', value: '500K+' }, { label: 'Rating', value: '4.8★' }, { label: 'Platform', value: 'iOS & Android' }],
    playstore: null,
    appstore: 'https://apps.apple.com/us/app/time-warp-scan-app/id6450537320',
    icon: '/images/apps/time-warp.png',
    accent: 'rgba(200,255,62,0.12)',
    accentBorder: 'rgba(200,255,62,0.22)',
    glowColor: 'green' as const,
  },
  {
    name: 'Blur Photo',
    tagline: 'Mobile App',
    desc: 'AI-masking precision tool for photographers — blur backgrounds, objects, or faces with intelligent subject detection and live preview.',
    stats: [{ label: 'Downloads', value: '200K+' }, { label: 'Rating', value: '4.6★' }, { label: 'Platform', value: 'Android' }],
    playstore: 'https://play.google.com',
    appstore: null,
    icon: '/images/apps/blur-photo.png',
    accent: 'rgba(124,58,237,0.12)',
    accentBorder: 'rgba(124,58,237,0.25)',
    glowColor: 'purple' as const,
  },
  {
    name: 'Unblur',
    tagline: 'Web & Mobile',
    desc: 'AI super-resolution web app that restores sharpness to blurry photos using deep-learning upscaling — designed for one-tap simplicity.',
    stats: [{ label: 'Users', value: '50K+' }, { label: 'Rating', value: '4.7★' }, { label: 'Platform', value: 'iOS' }],
    playstore: null,
    appstore: 'https://apps.apple.com',
    icon: '/images/apps/unblur.png',
    accent: 'rgba(6,182,212,0.12)',
    accentBorder: 'rgba(6,182,212,0.25)',
    glowColor: 'blue' as const,
  },
  {
    name: 'Add music to video',
    tagline: 'iOS & Android',
    desc: 'Real-time face swap app powered by on-device AI — swap faces in photos and videos instantly with natural lighting and expression matching.',
    stats: [{ label: 'Downloads', value: '300K+' }, { label: 'Rating', value: '4.5★' }, { label: 'Platform', value: 'iOS & Android' }],
    playstore: 'https://play.google.com/store/apps/details?id=kgs.com.addmusictovideos&hl=en',
    appstore: 'https://apps.apple.com/us/app/add-music-to-video-editor/id947792997',
    icon: '/images/apps/add-music.png',
    accent: 'rgba(251,146,60,0.12)',
    accentBorder: 'rgba(251,146,60,0.25)',
    glowColor: 'orange' as const,
  },
  {
    name: 'Jatri',
    tagline: 'Mobile App',
    desc: 'One-tap background remover for product photos and portraits — AI segmentation with edge refinement for clean, studio-quality cutouts.',
    stats: [{ label: 'Downloads', value: '120K+' }, { label: 'Rating', value: '4.6★' }, { label: 'Platform', value: 'Android' }],
    playstore: 'https://play.google.com/store/apps/details?id=com.jatri.jatriuser&hl=en',
    appstore: null,
    icon: '/images/apps/jatri.png',
    accent: 'rgba(236,72,153,0.12)',
    accentBorder: 'rgba(236,72,153,0.25)',
    glowColor: 'red' as const,
  },
  {
    name: 'Colorpop',
    tagline: 'Web & Mobile',
    desc: 'AI-driven photo colorization and color grading tool — restore old black-and-white photos or apply cinematic color styles with a single tap.',
    stats: [{ label: 'Users', value: '80K+' }, { label: 'Rating', value: '4.8★' }, { label: 'Platform', value: 'iOS' }],
    playstore: null,
    appstore: 'https://apps.apple.com/us/app/color-pop-ai-photo-editor/id940508574',
    icon: '/images/apps/colorpop.png',
    accent: 'rgba(52,211,153,0.12)',
    accentBorder: 'rgba(52,211,153,0.25)',
    glowColor: 'green' as const,
  },
]

const PlayStoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 0 1-.93-.23l-.05-.03 8.3-8.3 2.81 2.8-9.8 5.6a2 2 0 0 1-.33.16zM.75 22.5A2 2 0 0 1 .5 21.5V2.5A2 2 0 0 1 .75 1.5l.05-.03 11.7 11.7-11.7 9.3-.05-.03zM21.1 14.1l-2.58 1.47-3.11-3.11 3.11-3.11 2.6 1.48a2 2 0 0 1 0 3.27zM4.5.47l9.8 5.6L11.5 8.88.75 1.53A2 2 0 0 1 4.5.47z"/>
  </svg>
)

const AppStoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

function AppIcon({ src, accentBorder, playstore, appstore }: {
  src: string;
  accentBorder: string;
  playstore: string | null;
  appstore: string | null;
}) {
  return (
    <div className="app-icon-wrap" style={{ borderColor: accentBorder, overflow: 'hidden', padding: 0 }}>
      <Image
        src={src}
        alt="App icon"
        width={48}
        height={48}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <span
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'var(--text)',
        }}
      >
        {playstore && !appstore ? <PlayStoreIcon /> : appstore && !playstore ? <AppStoreIcon /> : <Smartphone size={20} />}
      </span>
    </div>
  );
}

export default function AppMarket() {
  return (
    <section className="app-market" id="apps">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Live on Stores</div>
          <h2 className="section-title">
            Apps on market that<br />
            <span className="gradient-text">I worked on</span>
          </h2>
        </div>

        <div className="app-market-grid">
          {apps.map((app) => (
            <GlowCard
              key={app.name}
              glowColor={app.glowColor}
              customSize
              className="app-card reveal"
            >
              {/* Header */}
              <div className="app-card-header">
                <AppIcon
                  src={app.icon}
                  accentBorder={app.accentBorder}
                  playstore={app.playstore}
                  appstore={app.appstore}
                />
                <div>
                  <h3 className="app-card-name">{app.name}</h3>
                  <span className="app-card-tag">{app.tagline}</span>
                </div>
              </div>

              {/* Description */}
              <p className="app-card-desc">{app.desc}</p>

              {/* Stats */}
              <div className="app-card-stats">
                {app.stats.map(s => (
                  <div key={s.label} className="app-stat">
                    <span className="app-stat-value">{s.value}</span>
                    <span className="app-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="app-card-ctas">
                {app.playstore && (
                  <a
                    href={app.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-cta-btn app-cta-play"
                  >
                    <PlayStoreIcon />
                    Google Play
                  </a>
                )}
                {app.appstore && (
                  <a
                    href={app.appstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-cta-btn app-cta-apple"
                  >
                    <AppStoreIcon />
                    App Store
                  </a>
                )}
                {!app.playstore && !app.appstore && (
                  <a href="#contact" className="app-cta-btn app-cta-web">
                    <Globe size={16} />
                    View App
                  </a>
                )}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
