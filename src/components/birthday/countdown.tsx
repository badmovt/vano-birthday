import { useEffect, useState } from 'react'
import { birthday } from '@/content'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

/** Returns the start of the next (or current) birthday in the configured timezone. */
function getBirthdayState(now: number) {
  const offset = birthday.utcOffsetHours * HOUR
  const local = new Date(now + offset)
  const year = local.getUTCFullYear()
  let start = Date.UTC(year, birthday.month - 1, birthday.day) - offset
  if (start + DAY <= now) {
    start = Date.UTC(year + 1, birthday.month - 1, birthday.day) - offset
  }
  return { start, isToday: now >= start && now < start + DAY }
}

export function useBirthday() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  if (now === null) return null
  const { start, isToday } = getBirthdayState(now)
  const diff = Math.max(0, start - now)
  return {
    isToday,
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const UNITS = [
  ['days', 'Hari'],
  ['hours', 'Jam'],
  ['minutes', 'Menit'],
  ['seconds', 'Detik'],
] as const

export function Countdown() {
  const state = useBirthday()

  if (state?.isToday) {
    return (
      <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-card/80 px-5 py-3 shadow-sm backdrop-blur">
        <span className="motion-safe-only inline-block animate-[heartbeat_1.6s_ease-in-out_infinite] text-xl text-primary">
          ♥
        </span>
        <span className="font-display text-lg italic text-primary">
          Hari ini hari spesialmu!
        </span>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Menuju {birthday.day} November
      </p>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
        {UNITS.map(([key, label]) => (
          <div
            key={key}
            className="flex w-16 flex-col items-center rounded-2xl border border-border bg-card/80 py-3 shadow-sm backdrop-blur sm:w-20"
          >
            <span className="font-display text-2xl font-semibold tabular-nums text-primary sm:text-3xl">
              {state ? String(state[key]).padStart(2, '0') : '--'}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
