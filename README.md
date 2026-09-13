# Happy Birthday ❤️

A ten-act scroll experience, built for one person to open on one phone.

---

## Make it yours

Almost everything you'll want to change lives in **one file**: [`lib/content.ts`](lib/content.ts).
Names, every line of writing, the memories, the reasons, the letter, the photo
captions. Nothing is hardcoded anywhere else.

Start at the top:

```ts
export const HER = {
  name: "Maidah",     // her name
  nickname: "Maidu",  // what you call her — this carries the hero
  yourName: "Ahad",   // signs the letter
};
```

Then work down the file. It's written in the order she'll see it.

### The lily motif

Lilies run through the whole thing, since they're hers: a six-tepal lily mark
separates every chapter heading and sits under the hero, three lilies bloom in
the magic scroll as you scroll past them, fallen tepals drift through the
ambient layer, and one of the six hand-drawn keepsake designs is a lily. It's
all vector — nothing to swap out, and it stays sharp at any size.

**Photos** go in `public/photos/` — see [the note in that folder](public/photos/README.md).
**Music** goes in `public/audio/song.mp3` — see [the note there](public/audio/README.md).

Both are optional. Photos you haven't added render as hand-drawn keepsake art,
and with no music file the player button simply never appears.

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000> — then use your browser's device toolbar to view it
at 390px wide. It's built for phones and only really makes sense at that size.

---

## Put it online

The fastest route is Vercel, which hosts Next.js for free:

```bash
npx vercel
```

Answer the prompts and you'll get a link you can text her. If you'd rather not
use the CLI, push this folder to a GitHub repo and import it at
[vercel.com/new](https://vercel.com/new) — no configuration needed.

One thing worth doing before you send it: **open the link on a real phone
yourself first.** Scroll the whole way through. It takes about three minutes.

---

## The ten acts

| # | Act | What happens |
|---|-----|---|
| I | Opening | Black screen, stars, three lines, tap to begin |
| II | Hero | The greeting, unmasking line by line |
| III | Magic scroll | Scroll drives it: clouds pass, flowers open, butterflies fly |
| IV | Timeline | Memories stack into a deck as you read |
| V | Gallery | Swipeable polaroids; tap one to fill the screen |
| VI | Reasons | A deck you swipe through, one card at a time |
| VII | Love letter | A sealed fold that unfolds and writes itself out |
| VIII | Wishes | Word-by-word headline, one burst of confetti |
| IX | Heart | Particles gather, beat, burst, and spell *I Love You* |
| X | Ending | Moon, lanterns, and the last three lines |

The background moves through **night → dawn → day → night** across the ten acts,
following the story rather than the clock.

---

## How it's put together

```
app/            layout (fonts, metadata) and the single page
components/
  acts/         one file per act, in story order
  fx/           canvas effects: ambient particles, touch sparkles, confetti
  ui/           reusable pieces: reveals, headings, polaroid frames, lightbox
hooks/          scene theme, smooth scroll, audio, haptics, scroll lock
lib/            content, GSAP setup, motion vocabulary, canvas helpers
```

Next.js 15 · TypeScript · Tailwind v4 · GSAP (ScrollTrigger, SplitText, DrawSVG,
MotionPath) · Framer Motion · Lenis.

### Why it stays smooth

The performance work is mostly about *not* doing things:

- **One animation frame for the whole page.** Lenis, every canvas and every GSAP
  timeline run off `gsap.ticker`, not one `requestAnimationFrame` loop each.
- **Nothing allocates per frame.** Particles are pooled and sprites are
  pre-rendered once, so every draw is a `drawImage` rather than a fresh path.
- **Device pixel ratio is capped at 2.** Phones report 3× and 4×; rendering
  ambient particles at native density costs triple the fill for no visible gain.
- **Weak devices thin themselves out** automatically — roughly half the particle
  count where `deviceMemory` or core count says it's warranted.
- **Everything below the hero is a separate chunk**, fetched quietly while the
  opening lines play. The first load carries a black screen and a greeting.
- **Off-screen means off.** Canvases stop when the tab is hidden.

### Accessibility

- `prefers-reduced-motion` is honoured throughout, and not by just freezing
  things: the scroll-driven acts collapse to a single screen, stacked text
  becomes a readable list, and the particle heart renders one still frame.
- Pinch-zoom is never blocked. Touch targets are at least 44px.
- The opening responds to Enter and Space as well as touch; the lightbox closes
  on Escape.
- The words drawn as particles in Act IX are also present as real text for
  screen readers.

---

Made by hand. Go send it to her.
