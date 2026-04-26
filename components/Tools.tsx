const tools = [
  { abbr: 'MJ', tag: 'Visual Ideation',    name: 'Midjourney',     desc: "Generate mood boards, visual concepts, and art direction in seconds. My go-to for rapid visual exploration before opening Figma." },
  { abbr: 'GP', tag: 'Research & Copy',    name: 'ChatGPT',        desc: "Synthesize user research, generate UX copy variants, and structure information architecture — like a research team on demand." },
  { abbr: 'Fr', tag: 'Prototyping',        name: 'Framer AI',      desc: "Convert static designs into fully animated, responsive prototypes with AI-generated interactions and layouts that feel production-ready." },
  { abbr: 'v0', tag: 'UI Generation',      name: 'v0 by Vercel',   desc: "Describe a component, get production-quality UI code. Bridges the gap between design handoff and actual implementation perfectly." },
  { abbr: 'Fg', tag: 'Design Automation',  name: 'Figma AI',       desc: "Auto-layouts, smart rename, design suggestions, and prototype generation — native AI built right into my primary design tool." },
  { abbr: 'AF', tag: 'Asset Creation',     name: 'Adobe Firefly',  desc: "Generate on-brand illustrations, textures, and UI assets. Keeps the visual language consistent without needing a separate illustration pass." },
]

export default function Tools() {
  return (
    <section className="ai-tools" id="tools">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">My Stack</div>
          <h2 className="section-title">
            Tools that<br /><span className="gradient-text">supercharge</span> design.
          </h2>
        </div>
        <div className="tools-grid">
          {tools.map(tool => (
            <div key={tool.name} className="tool-card reveal">
              <div className="tool-logo">{tool.abbr}</div>
              <div className="tool-info">
                <span className="tool-tag">{tool.tag}</span>
                <h4>{tool.name}</h4>
                <p>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
