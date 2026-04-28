'use client'
import { useState } from 'react'

const jobs = [
  { company: 'Kite Games Studio Ltd.', role: 'UX/UI Designer',       period: '2023 – Present' },
  { company: 'Jatri.co',               role: 'Product Designer',      period: '2022 – 2023'   },
  { company: 'GyanBikash',             role: 'Product Designer',      period: 'May – Aug 2022' },
  { company: 'Project X Ltd.',         role: 'Junior UX/UI Designer', period: '2021 – 2022'   },
]

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function WorkHistory() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="work-history reveal">
      <p className="work-history-title">My work history</p>

      <div className="work-history-list">
        {jobs.map((job, i) => {
          const show = i === 0 || expanded
          const delay = i === 0 ? 0 : (i - 1) * 0.07

          return (
            <div
              key={job.company}
              style={{
                overflow: 'hidden',
                maxHeight: show ? '120px' : '0px',
                opacity: show ? 1 : 0,
                marginTop: i === 0 ? 0 : (expanded ? 8 : 0),
                transition: [
                  `max-height 0.5s ${EASING} ${delay}s`,
                  `opacity 0.4s ease ${delay}s`,
                  `margin-top 0.5s ${EASING} ${delay}s`,
                ].join(', '),
              }}
            >
              <div className="work-history-item">
                <div className="work-history-left">
                  <span className="work-history-company">{job.company}</span>
                  <span className="work-history-role">{job.role}</span>
                </div>
                <span className="work-history-period">{job.period}</span>
              </div>
            </div>
          )
        })}
      </div>

      <button
        className="work-history-toggle"
        onClick={() => setExpanded(p => !p)}
      >
        {expanded ? 'Hide' : 'Show all'}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform 0.4s ${EASING}`,
          }}
        >
          <circle cx="12" cy="12" r="10" opacity="0.15" />
          <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
    </div>
  )
}
