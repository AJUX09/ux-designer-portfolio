'use client'

import { useState, FormEvent } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' | '' }>({ msg: '', type: '' })
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setStatus({ msg: '', type: '' })

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
      _subject: `Portfolio inquiry from ${(form.elements.namedItem('name') as HTMLInputElement).value.trim()}`,
      _captcha: 'false',
      _template: 'table',
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/uxcelwithaj@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success === 'true' || json.success === true) {
        setStatus({ msg: "✓ Message sent! I'll get back to you soon.", type: 'success' })
        form.reset()
      } else {
        throw new Error('Submission failed. Please try again.')
      }
    } catch (err: unknown) {
      setStatus({ msg: '✗ ' + (err instanceof Error ? err.message : 'Something went wrong.'), type: 'error' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-wrapper">

          <div className="contact-left reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">
              Ready to move<br />fast with <span className="gradient-text">AI?</span>
            </h2>
            <p className="contact-sub">
              Got a project that needs great design and fast delivery? I combine
              deep UX craft with AI to ship work you&apos;ll be proud of.
            </p>
            <div className="contact-info">
              <div className="info-row">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>uxcelwithaj@gmail.com</span>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="contact-right reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required />
              </div>
              <button type="submit" className="btn btn-primary btn-full magnetic" disabled={sending}>
                <span className="btn-text">{sending ? 'Sending…' : 'Send Message'}</span>
                <span className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </span>
              </button>
              {status.msg && (
                <div className={`form-status ${status.type}`}>{status.msg}</div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
