import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { toast } from 'sonner'

import { Cake } from '@/components/birthday/cake'
import { Countdown } from '@/components/birthday/countdown'
import { Confetti, FloatingHearts } from '@/components/birthday/effects'
import { HugButton } from '@/components/birthday/hug-button'
import { LoveLetter } from '@/components/birthday/love-letter'
import { Memories } from '@/components/birthday/memories'
import { Reasons } from '@/components/birthday/reasons'
import { birthday, closing, hero } from '@/content'

export const Route = createFileRoute('/')({
  component: Home,
})

const img = (file: string, w: number) =>
  `/.netlify/images?url=/img/${file}&w=${w}&fm=webp`

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto mb-10 max-w-reading text-center">
      <p className="font-hand text-2xl text-accent-foreground/60">{kicker}</p>
      <h2 className="mt-1 font-display text-4xl text-primary sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-muted-foreground">{children}</p>}
    </div>
  )
}

function Home() {
  const [burst, setBurst] = useState(0)

  function celebrate() {
    setBurst((b) => b + 1)
    toast(`Yeay! Selamat ulang tahun, ${birthday.name}! 🎉`)
  }

  return (
    <div className="relative overflow-x-hidden">
      <FloatingHearts />
      <Confetti trigger={burst} />

      {/* Hero */}
      <header className="relative flex min-h-svh items-center">
        <img
          src={img('hero.png', 1800)}
          srcSet={`${img('hero.png', 900)} 900w, ${img('hero.png', 1800)} 1800w`}
          sizes="100vw"
          alt="Ilustrasi kue ulang tahun dengan lilin menyala dikelilingi bunga peony dan mawar"
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] opacity-40 mix-blend-multiply md:opacity-100"
        />
        <div className="relative mx-auto w-full max-w-content px-4 py-20 sm:px-6">
          <div className="max-w-xl">
            <p className="font-hand text-2xl text-accent-foreground/70 sm:text-3xl">
              {hero.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-[1.05] text-foreground sm:text-7xl">
              {hero.title}
              <span className="block italic text-primary">
                {birthday.name} ♥
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              {hero.subtitle}
            </p>
            <div className="mt-10">
              <Countdown />
            </div>
          </div>
        </div>
        <a
          href="#lilin"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm text-muted-foreground transition-colors hover:text-primary motion-reduce:transition-none"
        >
          Mulai kejutannya
          <ChevronDown className="motion-safe-only size-5 animate-bounce" />
        </a>
      </header>

      <main className="relative">
        {/* Cake */}
        <section
          id="lilin"
          className="scroll-mt-8 px-4 py-24 sm:px-6"
         
        >
          <SectionHeading kicker="Bagian satu" title="Tiup lilinnya, sayang" />
          <Cake onAllBlown={celebrate} />
        </section>

        {/* Letter */}
        <section className="bg-secondary/40 px-4 py-24 sm:px-6">
          <SectionHeading kicker="Bagian dua" title="Surat untukmu">
            Ada sesuatu yang ingin aku sampaikan, tapi lebih enak ditulis.
          </SectionHeading>
          <LoveLetter />
        </section>

        {/* Reasons */}
        <section className="px-4 py-24 sm:px-6">
          <SectionHeading
            kicker="Bagian tiga"
            title="Alasan aku sayang kamu"
          >
            Ketuk setiap kartu. Sebenarnya alasannya jauh lebih banyak, tapi
            layarnya nggak cukup.
          </SectionHeading>
          <div className="mx-auto max-w-content">
            <Reasons />
          </div>
        </section>

        {/* Memories */}
        <section className="bg-secondary/40 px-4 py-24 sm:px-6">
          <SectionHeading kicker="Bagian empat" title="Cerita kita" />
          <Memories />
        </section>

        {/* Closing */}
        <section className="px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-content items-center gap-10 md:grid-cols-2">
            <img
              src={img('flowers.png', 800)}
              srcSet={`${img('flowers.png', 500)} 500w, ${img('flowers.png', 1000)} 1000w`}
              sizes="(min-width: 768px) 40vw, 90vw"
              alt="Buket bunga peony merah muda dan mawar merah tua diikat pita"
              loading="lazy"
              className="mx-auto w-full max-w-sm mix-blend-multiply"
            />
            <div className="text-center md:text-left">
              <p className="font-hand text-2xl text-accent-foreground/60">
                Terakhir
              </p>
              <h2 className="mt-1 font-display text-4xl text-primary sm:text-5xl">
                {closing.title}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground md:max-w-none">
                {closing.text}
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <HugButton />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative px-4 pb-10 pt-4 text-center">
        <p className="font-hand text-xl text-muted-foreground">
          Dibuat dengan sepenuh hati untuk {birthday.name} · {birthday.day}{' '}
          November
        </p>
      </footer>
    </div>
  )
}
