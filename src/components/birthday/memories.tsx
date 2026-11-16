import { memories } from '@/content'

export function Memories() {
  return (
    <ol className="relative mx-auto max-w-2xl border-l-2 border-dashed border-accent/60 pl-8">
      {memories.map((m) => (
        <li key={m.title} className="relative pb-10 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[45px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ring-4 ring-background"
          >
            ♥
          </span>
          <p className="font-hand text-xl text-accent-foreground/70">{m.date}</p>
          <h3 className="font-display text-2xl text-primary">{m.title}</h3>
          <p className="mt-1 text-muted-foreground">{m.text}</p>
        </li>
      ))}
    </ol>
  )
}
