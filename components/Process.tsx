const steps = [
  {
    num: '01',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    title: 'Brief & AI Discovery',
    desc: "You brief me, I brief the AI. Using structured prompt engineering, I extract insights, generate personas, and map the competitive landscape — in under 2 hours what used to take 2 weeks.",
    tools: ['ChatGPT', 'Perplexity', 'Notion AI'],
    oldTime: '5 days', newTime: '2 hours',
  },
  {
    num: '02',
    icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    title: 'Visual Exploration',
    desc: "I generate 50–100 visual directions using Midjourney and Adobe Firefly, then curate the strongest 5–10 into refined moodboards. This replaces days of stock-photo hunting and manual sketching.",
    tools: ['Midjourney', 'Adobe Firefly', 'DALL-E 3'],
    oldTime: '3 days', newTime: '4 hours',
  },
  {
    num: '03',
    icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    title: 'Design Execution',
    desc: "Using AI-assisted Figma plugins, auto-generated component libraries, and real-time design token systems — screens are built at 3× normal velocity while keeping pixel-perfect standards.",
    tools: ['Figma AI', 'Galileo AI', 'Magician'],
    oldTime: '2 weeks', newTime: '3–4 days',
  },
  {
    num: '04',
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    title: 'Build & Deploy',
    desc: "AI-assisted development turns designs into production code in record time. GitHub Copilot, Cursor.ai, and Vercel AI generate boilerplate while I architect the experience and interactions.",
    tools: ['Cursor AI', 'Copilot', 'Vercel AI'],
    oldTime: '2 weeks', newTime: '4–5 days',
  },
  {
    num: '05',
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    title: 'Test, Refine & Ship',
    desc: "AI-powered usability testing, automated accessibility audits, and real-user simulation catch issues before launch. You get a product that's tested, optimized, and ready to perform.",
    tools: ['Attention Insight', 'Maze AI', 'Notion AI'],
    oldTime: '1 week', newTime: '1 day',
  },
]

export default function Process() {
  return (
    <section className="ai-process" id="process">
      <div className="projects-bloom projects-bloom-1"></div>
      <div className="projects-bloom projects-bloom-2"></div>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">// AI Workflow</div>
          <h2 className="section-title">
            The <span className="gradient-text">engine</span> behind the speed
          </h2>
          <p className="process-subtitle">A battle-tested system where AI does the heavy lifting — I guide the craft.</p>
        </div>

        <div className="timeline">
          {steps.map(step => (
            <div className="timeline-step reveal" key={step.num}>
              <div className="timeline-node">{step.num}</div>
              <div className="timeline-card">
                <div className="tl-card-head">
                  <div className="timeline-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}>
                      {step.icon}
                    </svg>
                  </div>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.desc}</p>
                <div className="timeline-tools">
                  {step.tools.map(t => <span key={t} className="tl-pill">{t}</span>)}
                </div>
                <div className="timeline-time">
                  <span className="tl-time-old">{step.oldTime}</span>
                  <span className="tl-time-arrow">→</span>
                  <span className="tl-time-new">{step.newTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="process-comparison reveal">
          <div className="comparison-block">
            <div className="comparison-num">~6 weeks</div>
            <div className="comparison-label">Traditional timeline</div>
          </div>
          <div className="comparison-middle">
            <div className="comparison-ai-tag">AI powered</div>
            <div className="comparison-arrow">→</div>
          </div>
          <div className="comparison-block">
            <div className="comparison-num gradient-text">~1 week</div>
            <div className="comparison-label">My average delivery</div>
          </div>
        </div>
      </div>
    </section>
  )
}
