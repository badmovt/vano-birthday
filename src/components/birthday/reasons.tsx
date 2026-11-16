import { useState } from 'react'
import { reasons } from '@/content'
import { cn } from '@/lib/utils'

export function Reasons() {
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set())

  function toggle(i: number) {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {reasons.map((r, i) => {
        const isFlipped = flipped.has(i)
        return (
          <button
            key={r.front}
            type="button"
            onClick={() => toggle(i)}
            aria-pressed={isFlipped}
            className="group h-44 rounded-2xl [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:h-48"
          >
            <span
              className={cn(
                'relative block h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none',
                isFlipped && '[transform:rotateY(180deg)]',
              )}
            >
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm [backface-visibility:hidden] group-hover:shadow-md">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Alasan #{i + 1}
                </span>
                <span className="font-display text-xl text-primary sm:text-2xl">
                  {r.front}
                </span>
                <span aria-hidden className="text-accent">
                  ♥
                </span>
              </span>
              <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary p-4 text-center text-sm leading-relaxed text-primary-foreground shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] sm:text-base">
                {r.back}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
