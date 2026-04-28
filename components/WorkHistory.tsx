'use client'
import { useState } from 'react'

const jobs = [
  { company: 'Kite Games Studio Ltd.', role: 'UX/UI Designer',        period: '2023 – Present' },
  { company: 'Jatri.co',               role: 'Product Designer',       period: '2022 – 2023'   },
  { company: 'GyanBikash',             role: 'Product Designer',       period: 'May – Aug 2022' },
  { company: 'Project X Ltd.',         role: 'Junior UX/UI Designer',  period: '2021 – 2022'   },
]

export default function WorkHistory() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? jobs : jobs.slice(0, 1)

  return (
    <div className="work-history reveal">
      <p className="work-history-title">My work history</p>
      <div className="work-history-list">
        {visible.map((job) => (
          <div key={job.company} className="work-history-item">
            <div className="work-history-left">
              <span className="work-history-company">{job.company}</span>
              <span className="work-history-role">{job.role}</span>
            </div>
            <span className="work-history-period">{job.period}</span>
          </div>
        ))}
      </div>
      <button className="work-history-toggle" onClick={() => setExpanded(p => !p)}>
        {expanded ? 'Hide' : 'Show all'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
          <circle cx="12" cy="12" r="10" opacity="0.15"/>
          <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
    </div>
  )
}
