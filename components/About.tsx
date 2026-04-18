import Image from 'next/image'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">

          <div className="about-left">
            <div className="section-label reveal">About Me</div>
            <h2 className="section-title reveal">
              Human insight<br />
              meets machine<br />
              <em>intelligence.</em>
            </h2>
            <div className="about-skills reveal">
              {['Figma', 'Midjourney', 'ChatGPT', 'Framer AI', 'v0 by Vercel', 'Design Systems', 'Prototyping', 'User Research'].map(skill => (
                <div key={skill} className="skill-pill">{skill}</div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="about-img-container reveal">
              <Image src="/images/profile-photo.jpg" alt="About photo" className="about-img" width={480} height={380} />
              <div className="about-img-badge">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
                AI × Design
              </div>
            </div>

            <div className="about-text reveal">
              <p>
                I&apos;m a UI/UX Designer with 5+ years of experience — and AI is now my
                co-pilot. I use AI not as a replacement for craft, but as a force
                multiplier: cutting research time, accelerating ideation, and shipping
                polished work without the bottlenecks.
              </p>
              <p>
                The result? Designs that are just as thoughtful as before, built in a
                fraction of the time. I&apos;ve delivered mobile apps, web platforms, and
                design systems for startups and brands who care about quality AND speed.
              </p>
            </div>

            <a href="#contact" className="btn btn-primary magnetic reveal">Work With Me</a>
          </div>

        </div>
      </div>
    </section>
  )
}
