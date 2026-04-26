const items = [
  'Figma', 'Midjourney', 'ChatGPT', 'Framer AI', 'v0 by Vercel',
  'Figma AI', 'Adobe Firefly', 'UX Research', 'Prototyping', 'Design Systems',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            {i < doubled.length - 1 && <span className="dot">·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
