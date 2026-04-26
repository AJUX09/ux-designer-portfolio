export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${base}${src}${width ? `?w=${width}` : ''}`
}
