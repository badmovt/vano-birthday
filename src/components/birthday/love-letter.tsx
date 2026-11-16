import { useState } from 'react'
import { MailOpen } from 'lucide-react'
import { birthday, letter } from '@/content'
import { cn } from '@/lib/utils'

export function LoveLetter() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto max-w-reading">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative mx-auto block aspect-[3/2] w-full max-w-md rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label="Buka surat cinta"
        >
          <div className="absolute inset-0 rounded-xl bg-[oklch(0.9_0.05_25)] shadow-xl transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none" />
          {/* Envelope flap */}
          <div
            className="absolute inset-x-0 top-0 h-[58%] origin-top bg-[oklch(0.86_0.06_22)] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[60%] bg-[oklch(0.88_0.055_24)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
            style={{ clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)' }}
          />
          {/* Wax seal */}
          <span className="absolute left-1/2 top-[52%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground shadow-lg ring-4 ring-primary/20 transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:scale-105 motion-reduce:transition-none">
            ♥
          </span>
          <span className="absolute inset-x-0 bottom-4 text-center font-hand text-xl text-primary">
            Untuk {birthday.name} — ketuk untuk membuka
          </span>
        </button>
      ) : (
        <article
          className={cn(
            'paper-grain relative rounded-2xl border border-border bg-card px-6 py-10 shadow-xl sm:px-12',
            'animate-in fade-in slide-in-from-bottom-6 duration-700 motion-reduce:animate-none',
          )}
        >
          <MailOpen
            aria-hidden
            className="absolute right-6 top-6 size-5 text-accent"
          />
          <p className="font-hand text-3xl text-primary">{letter.greeting}</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/90">
            {letter.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-10 font-hand text-2xl text-muted-foreground">
            {letter.closing}
          </p>
          <p className="font-hand text-3xl text-primary">{birthday.sender} ♥</p>
        </article>
      )}
    </div>
  )
}
