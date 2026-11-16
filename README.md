# Selamat Ulang Tahun, Vano ♥

A personal, one-page birthday website for Vano, celebrating 24 November. It's written in Indonesian and made to be opened on a phone or laptop and read slowly.

## What's on the page

- **Hero with countdown** — counts down the days, hours, minutes and seconds to 24 November (WIB). On the day itself it changes to "Hari ini hari spesialmu!".
- **Tiup lilinnya** — a cake with candles you blow out by tapping them. The last candle sets off confetti and shows a birthday wish.
- **Surat untukmu** — a sealed envelope that opens into a handwritten-style love letter.
- **Alasan aku sayang kamu** — flip cards, each with a reason on the back.
- **Cerita kita** — a short timeline of shared memories.
- **Pelukan virtual** — a heart button that counts the hugs you send (remembered in the browser).

## Personalising the text

All the words live in one file, `src/content.ts`: the name, date, letter, reasons, memories and closing message. Change them there and the page updates. The illustrations are in `public/img/`.

## Tech

TanStack Start (React 19) with Tailwind CSS 4 and shadcn/ui components, deployed on Netlify. Images are served through the Netlify Image CDN. The site has no backend.

## Running locally

```bash
pnpm install
netlify dev    # or: pnpm dev
```
