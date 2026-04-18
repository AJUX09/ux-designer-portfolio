'use client'

import { useEffect } from 'react'

export default function ClientEffects() {
  useEffect(() => {
    /* ── Custom Cursor ── */
    const cursor = document.getElementById('cursor')
    const cursorFollower = document.getElementById('cursor-follower')

    if (cursor && cursorFollower) {
      const cf = cursorFollower
      let mouseX = 0, mouseY = 0
      let followerX = 0, followerY = 0

      // Use transform (GPU-composited) instead of left/top (triggers layout)
      const hw = 6   // half of cursor  12px
      const hfw = 18 // half of follower 36px

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        cursor.style.transform = `translate(${mouseX - hw}px, ${mouseY - hw}px)`
      }, { passive: true })

      function animateCursor() {
        followerX += (mouseX - followerX) * 0.1
        followerY += (mouseY - followerY) * 0.1
        cf.style.transform = `translate(${followerX - hfw}px, ${followerY - hfw}px)`
        requestAnimationFrame(animateCursor)
      }
      animateCursor()

      const hoverTargets = document.querySelectorAll(
        'a, button, .project-card, .skill-pill, .magnetic, input, textarea'
      )
      hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('expand')
          cursorFollower.classList.add('expand')
        })
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('expand')
          cursorFollower.classList.remove('expand')
        })
      })
    }

    /* ── Navbar scroll effect ── */
    const navbar = document.getElementById('navbar')
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50)
      }, { passive: true })
    }

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href')
        if (!href || href === '#') return
        const target = document.querySelector(href)
        if (!target) return
        e.preventDefault()
        const navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '80'
        )
        const top = target.getBoundingClientRect().top + window.scrollY - navH
        window.scrollTo({ top, behavior: 'smooth' })
      })
    })

    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal, .reveal-line')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement?.querySelectorAll('.reveal, .reveal-line')
          siblings?.forEach((el, idx) => {
            if (el === entry.target) {
              setTimeout(() => el.classList.add('visible'), idx * 80)
            }
          })
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach(el => revealObserver.observe(el))

    /* ── Magnetic button effect ── */
    const magneticBtns = document.querySelectorAll('.magnetic')
    magneticBtns.forEach(btn => {
      const el = btn as HTMLElement
      el.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent
        const rect = el.getBoundingClientRect()
        const dx = (me.clientX - (rect.left + rect.width / 2)) * 0.3
        const dy = (me.clientY - (rect.top + rect.height / 2)) * 0.3
        el.style.transform = `translate(${dx}px, ${dy}px)`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)'
      })
    })

    /* ── Parallax orbs — rAF-throttled ── */
    const orbs = document.querySelectorAll('.orb')
    let orbMouseX = 0, orbMouseY = 0, orbRafPending = false
    document.addEventListener('mousemove', (e) => {
      orbMouseX = e.clientX
      orbMouseY = e.clientY
      if (!orbRafPending) {
        orbRafPending = true
        requestAnimationFrame(() => {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight / 2
          const dx = (orbMouseX - cx) / cx
          const dy = (orbMouseY - cy) / cy
          orbs.forEach((orb, i) => {
            const factor = (i + 1) * 12;
            (orb as HTMLElement).style.transform = `translateZ(0) translate(${dx * factor}px, ${dy * factor}px)`
          })
          orbRafPending = false
        })
      }
    }, { passive: true })

    /* ── Project card tilt ── */
    const cards = document.querySelectorAll('.project-card')
    cards.forEach(card => {
      const el = card as HTMLElement
      el.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent
        const rect = el.getBoundingClientRect()
        const x = (me.clientX - rect.left) / rect.width - 0.5
        const y = (me.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `translateY(-6px) scale(1.012) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = ''
      })
    })

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          navLinks.forEach(link => {
            (link as HTMLElement).style.color =
              link.getAttribute('href') === `#${id}` ? 'var(--text)' : ''
          })
        }
      })
    }, { threshold: 0.4 })
    sections.forEach(s => sectionObserver.observe(s))

    /* ── Thumb image placeholder ── */
    document.querySelectorAll('.thumb-img').forEach(img => {
      const el = img as HTMLImageElement
      const hide = () => el.classList.add('loaded')
      if (el.complete && el.naturalWidth) hide()
      else el.addEventListener('load', hide)
    })
  }, [])

  return null
}
