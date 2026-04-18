'use client'

import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className="navbar" id="navbar">
        <a href="#" className="nav-logo">
          <span className="logo-dot"></span>
          <span className="logo-text">Jespar</span>
        </a>

        <ul className="nav-links">
          <li><a href="#hero"     className="nav-link" data-text="Home">Home</a></li>
          <li><a href="#about"    className="nav-link" data-text="About">About</a></li>
          <li><a href="#process"  className="nav-link" data-text="Process">Process</a></li>
          <li><a href="#projects" className="nav-link" data-text="Projects">Projects</a></li>
          <li><a href="#contact"  className="nav-link" data-text="Contact">Contact</a></li>
        </ul>

        <a href="#contact" className="nav-cta magnetic">Let&apos;s Talk</a>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          id="hamburger"
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        <ul>
          <li><a href="#hero"     className="mobile-link" onClick={closeMenu}>Home</a></li>
          <li><a href="#about"    className="mobile-link" onClick={closeMenu}>About</a></li>
          <li><a href="#process"  className="mobile-link" onClick={closeMenu}>Process</a></li>
          <li><a href="#projects" className="mobile-link" onClick={closeMenu}>Projects</a></li>
          <li><a href="#contact"  className="mobile-link" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </>
  )
}
