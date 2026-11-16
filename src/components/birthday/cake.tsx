import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { wish } from '@/content'
import { cn } from '@/lib/utils'

export function Cake({ onAllBlown }: { onAllBlown: () => void }) {
  const [lit, setLit] = useState<Array<boolean>>(() =>
    Array.from({ length: wish.candles }, () => true),
  )
  const remaining = lit.filter(Boolean).length

  function blow(index: number) {
    if (!lit[index]) return
    const next = lit.map((v, i) => (i === index ? false : v))
    setLit(next)
    if (next.every((v) => !v)) onAllBlown()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mt-6 w-[280px] sm:w-[340px]">
        {/* Candles */}
        <div className="relative z-10 flex justify-center gap-5 sm:gap-7">
          {lit.map((isLit, i) => (
            <button
              key={i}
              type="button"
              onClick={() => blow(i)}
              disabled={!isLit}
              aria-label={
                isLit ? `Tiup lilin ke-${i + 1}` : `Lilin ke-${i + 1} sudah padam`
              }
              className="group relative flex h-24 w-6 flex-col items-center justify-end rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-default"
            >
              <span
                className={cn(
                  'absolute top-0 h-7 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] transition-all duration-300 motion-reduce:transition-none',
                  isLit
                    ? 'motion-safe-only animate-[flicker_0.9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_70%,oklch(0.97_0.08_95),oklch(0.82_0.16_70)_55%,oklch(0.65_0.2_40))] opacity-100 shadow-[0_0_24px_8px_oklch(0.85_0.14_80/0.45)] group-hover:scale-90'
                    : 'scale-0 opacity-0',
                )}
              />
              <span className="mb-0 h-1.5 w-0.5 bg-foreground/60" />
              <span
                className={cn(
                  'h-14 w-3 rounded-sm',
                  i % 2 === 0
                    ? 'bg-[repeating-linear-gradient(135deg,var(--gold)_0_5px,oklch(0.95_0.03_80)_5px_10px)]'
                    : 'bg-[repeating-linear-gradient(135deg,var(--accent)_0_5px,oklch(0.96_0.02_20)_5px_10px)]',
                )}
              />
            </button>
          ))}
        </div>
        {/* Cake body */}
        <div className="relative -mt-1">
          <div className="relative mx-auto h-24 w-[86%] rounded-t-3xl rounded-b-lg bg-[oklch(0.94_0.035_40)] shadow-inner">
            <div className="absolute inset-x-0 top-0 h-6 rounded-t-3xl bg-card">
              <div className="absolute -bottom-3 left-0 flex w-full justify-around">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className="h-5 w-5 rounded-full bg-card" />
                ))}
              </div>
            </div>
            <div className="absolute bottom-5 left-0 flex w-full justify-around">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="text-sm text-primary/70">
                  ♥
                </span>
              ))}
            </div>
          </div>
          <div className="mx-auto h-28 w-full rounded-b-2xl rounded-t-lg bg-[oklch(0.85_0.07_15)] shadow-[inset_0_-12px_0_oklch(0.78_0.09_15)]">
            <div className="flex h-full items-center justify-around px-4">
              {Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full bg-card/80 shadow-sm"
                />
              ))}
            </div>
          </div>
          <div className="mx-auto mt-1 h-3 w-[112%] -translate-x-[5.5%] rounded-full bg-foreground/10 blur-[2px]" />
        </div>
      </div>

      <p className="mt-8 min-h-12 max-w-md text-center text-muted-foreground">
        {remaining === 0 ? (
          <span className="font-hand text-2xl text-primary">{wish.done}</span>
        ) : (
          <>
            {wish.prompt}{' '}
            <span className="font-medium text-foreground">
              ({remaining} lilin lagi)
            </span>
          </>
        )}
      </p>

      {remaining === 0 && (
        <Button
          variant="ghost"
          className="mt-2"
          onClick={() => setLit(lit.map(() => true))}
        >
          <RotateCcw /> Nyalakan lagi
        </Button>
      )}
    </div>
  )
}
