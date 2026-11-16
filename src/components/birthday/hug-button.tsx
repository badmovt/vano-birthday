import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const STORAGE_KEY = 'vano-hugs'

const MESSAGES = [
  'Pelukan terkirim! 🤗',
  'Satu lagi, biar makin hangat ♥',
  'Peluk eraaat!',
  'Ini pelukan dari jauh, nanti aku bayar langsung ya',
  'Kamu pantas dapat sejuta pelukan',
]

export function HugButton() {
  const [count, setCount] = useState(0)
  const [pop, setPop] = useState(0)

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY))
    if (Number.isFinite(saved)) setCount(saved)
  }, [])

  function hug() {
    const next = count + 1
    setCount(next)
    setPop((p) => p + 1)
    window.localStorage.setItem(STORAGE_KEY, String(next))
    if (next === 1 || next % 5 === 0) {
      toast(MESSAGES[(next / 5) % MESSAGES.length | 0])
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={hug}
        aria-label="Kirim pelukan virtual"
        className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-5xl text-primary-foreground shadow-[0_12px_40px_-8px_var(--primary)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:scale-95 motion-reduce:transition-none"
      >
        <span
          key={pop}
          aria-hidden
          className="motion-safe-only inline-block animate-[heartbeat_0.6s_ease-out]"
        >
          ♥
        </span>
      </button>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        <span className="font-display text-2xl font-semibold text-primary tabular-nums">
          {count}
        </span>{' '}
        pelukan terkirim
      </p>
    </div>
  )
}
