import Image from 'next/image'

const THUMBS = [
  { src: '/images/project-1.jpg', alt: 'Project 1' },
  { src: '/images/project-3.jpg', alt: 'Project 3' },
  { src: '/images/project-1.jpg', alt: 'Project 1' },
  { src: '/images/project-3.jpg', alt: 'Project 3' },
  { src: '/images/project-1.jpg', alt: 'Project 1' },
  { src: '/images/project-3.jpg', alt: 'Project 3' },
]

export default function ArtGallery() {
  return (
    <section className="art-gallery" id="gallery">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>My Art Gallery</div>
        <h2 className="section-title reveal">
          Selected <span className="gradient-text">Visuals</span>
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="gallery-track-wrapper">
        <div className="gallery-track scroll-left">
          {[...THUMBS, ...THUMBS].map((img, i) => (
            <div className="gallery-thumb" key={i}>
              <Image src={img.src} alt={img.alt} width={480} height={320} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="gallery-track-wrapper">
        <div className="gallery-track scroll-right">
          {[...THUMBS, ...THUMBS].map((img, i) => (
            <div className="gallery-thumb" key={i}>
              <Image src={img.src} alt={img.alt} width={480} height={320} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
