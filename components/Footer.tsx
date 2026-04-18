export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Top content ── */}
      <div className="footer-inner">
        <div className="footer-top-row">

          {/* Left — Navigate */}
          <div className="footer-col-nav">
            <h4 className="footer-col-label">Navigate</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Center — Logo + tagline */}
          <div className="footer-center">
            <div className="footer-logo-mark">
              <span className="logo-dot"></span>
              <span>Jespar</span>
            </div>
            <p className="footer-tagline-text">Designing smarter.<br />Delivering faster.</p>
          </div>

          {/* Right — Connect */}
          <div className="footer-col-connect">
            <h4 className="footer-col-label">Connect</h4>
            <ul>
              <li><a href="https://dribbble.com/UXcelwithAJ" target="_blank" rel="noopener">Dribbble</a></li>
              <li><a href="https://www.behance.net/ahmedmunna1" target="_blank" rel="noopener">Behance</a></li>
              <li><a href="https://www.linkedin.com/in/ahmed-jespar-b895bb209/" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/ahmedjespar/" target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p>© 2025 Jespar. All rights reserved.</p>
          <p>Designed &amp; Built with AI-enhanced craft.</p>
        </div>
      </div>

      {/* ── Giant brand bleed — intentionally overflows footer bottom ── */}
      <div className="footer-brand-bleed" aria-hidden="true">JESPAR</div>

    </footer>
  )
}
