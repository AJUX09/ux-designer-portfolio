import Image from 'next/image'

const projects = [
  {
    href: 'https://www.behance.net/gallery/248118239/Beauty-Editor-AI-Powered-Beautification-Photo-Editor',
    img: '/images/project-1.jpg',
    alt: 'Beauty Editor',
    category: 'iOS & Android',
    title: 'Beauty Editor',
    desc: 'AI-powered beauty retouching app with real-time filters, skin smoothing, and makeup simulation — designed for creators and enthusiasts.',
    icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  },
  {
    href: '/projects/blur-photo.html',
    img: '',
    alt: 'Blur Photo',
    category: 'Mobile App',
    title: 'Blur Photo',
    desc: 'AI-masking precision tool for photographers — blur backgrounds, objects, or faces with intelligent subject detection and live preview.',
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></>,
  },
  {
    href: '/projects/unblur.html',
    img: '/images/project-2.jpg',
    alt: 'Unblur',
    category: 'Web App',
    title: 'Unblur',
    desc: 'AI super-resolution web app that restores sharpness to blurry photos using deep-learning upscaling — designed for one-tap simplicity.',
    icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  },
]

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-bloom projects-bloom-1"></div>
      <div className="projects-bloom projects-bloom-2"></div>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">
            Projects that<br /><span className="gradient-text">define</span> me.
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map(p => (
            <a key={p.title} className="project-card reveal" href={p.href} style={{ cursor: 'pointer', textDecoration: 'none' }} {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <div className="card-thumb">
                {p.img && <Image src={p.img} alt={p.alt} className="thumb-img" width={560} height={360} />}
                <div className="thumb-placeholder"></div>
              </div>
              <div className="card-footer">
                <div className="card-footer-left">
                  <span className="card-category">{p.category}</span>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-desc">{p.desc}</p>
                </div>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>{p.icon}</svg>
                </div>
              </div>
              <div className="card-hover-line"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
