import { useEffect, useState } from 'react'

const HEART_COUNT = 14

/** Soft hearts drifting up the page. Positions are deterministic so SSR and hydration match. */
export function FloatingHearts() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {Array.from({ length: HEART_COUNT }, (_, i) => {
        const left = (i * 37) % 100
        const size = 10 + ((i * 7) % 16)
        const duration = 14 + ((i * 5) % 12)
        const delay = (i * 2.3) % 18
        return (
          <span
            key={i}
            className="motion-safe-only absolute bottom-[-40px] text-accent/60"
            style={{
              left: `${left}%`,
              fontSize: size,
              animation: `float-up ${duration}s linear ${delay}s infinite`,
            }}
          >
            ♥
          </span>
        )
      })}
    </div>
  )
}

type Piece = {
  id: number
  left: number
  drift: number
  delay: number
  duration: number
  color: string
  shape: 'rect' | 'heart'
}

const COLORS = [
  'var(--primary)',
  'var(--accent)',
  'var(--gold)',
  'var(--secondary)',
  'oklch(0.65 0.15 10)',
]

/** Bursts confetti each time `trigger` increases. */
export function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Array<Piece>>([])

  useEffect(() => {
    if (trigger === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const next = Array.from({ length: 90 }, (_, i) => ({
      id: trigger * 1000 + i,
      left: Math.random() * 100,
      drift: (Math.random() - 0.5) * 240,
      delay: Math.random() * 0.8,
      duration: 2.6 + Math.random() * 2,
      color: COLORS[i % COLORS.length],
      shape: (i % 5 === 0 ? 'heart' : 'rect') as Piece['shape'],
    }))
    setPieces(next)
    const t = window.setTimeout(() => setPieces([]), 5200)
    return () => window.clearTimeout(t)
  }, [trigger])

  if (pieces.length === 0) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={
            {
              left: `${p.left}%`,
              color: p.color,
              '--drift': `${p.drift}px`,
              animation: `confetti-fall ${p.duration}s cubic-bezier(.2,.6,.4,1) ${p.delay}s forwards`,
            } as React.CSSProperties
          }
        >
          {p.shape === 'heart' ? (
            <span className="text-lg">♥</span>
          ) : (
            <span
              className="block h-3 w-1.5 rounded-sm"
              style={{ background: p.color }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
