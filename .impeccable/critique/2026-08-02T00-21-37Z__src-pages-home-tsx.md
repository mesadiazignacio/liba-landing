---
target: home
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-02T00-21-37Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence, both isolated)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Two CTAs leave the site (`target="_blank"`) with no external-destination cue; `PageLoader` holds 1.6–2.2s with zero words. |
| 2 | Match System / Real World | 2 | Eight registry-jargon labels with no plain-language entry — for the persona PRODUCT.md defines by *not knowing the vocabulary*. |
| 3 | User Control and Freedom | 2 | Testimonials are `pointer-events-none select-none` and unpausable; service cards open on `onMouseEnter` and reset on leave. |
| 4 | Consistency and Standards | 1 | "Agendar consulta" opens WhatsApp in `Hero.tsx:109` and Calendly in `CtaFooter.tsx:71`. Plus the body typeface isn't the one the system specifies. |
| 5 | Error Prevention | 2 | No "no sé qué trámite necesito" path — the primary persona's default state. |
| 6 | Recognition Rather Than Recall | 2 | Closed service cards show a label only; one open at a time, so comparing two requires memorizing the first. |
| 7 | Flexibility and Efficiency | 2 | No persistent contact affordance. No sticky WhatsApp button — the standard convention for this business in Argentina. |
| 8 | Aesthetic and Minimalist Design | 2 | Largest object on the page is a third-party video; second largest is eight 224px boxes that are ~130px empty each. |
| 9 | Error Recovery | 2 | The `wa.me` prefill is generic regardless of which service card was open — all context lost at handoff. No fallback if the embed fails. |
| 10 | Help and Documentation | 2 | `/faqs` exists but the home page never links to it from any point of confusion. `StageTrack`, built for exactly this, is absent. |
| **Total** | | **20/40** | **Poor — major UX work required before release** |

All ten scored; none n/a. Heuristics 7 and 10 apply because the "expert" on this surface is the already-decided returning visitor, who is given nothing.

The visual craft would score far higher than 20/40. Nielsen measures whether it works. The page is beautifully made and poorly working.

## Design Specificity Verdict

**Partly authored, structurally interchangeable. The visual voice is specific; the page is a template.**

Genuinely authored: Alverata Informal at 900 with the 1.5px stroke utility, surviving stacked accented capitals. `src/lib/contour.ts` reused three ways (filled in `WaveDivider`, stroked white on navy in `WaveTexture`, stroked navy on white in `PaperGround`). `DUR.exchange = 0.6` named for the failure it prevents.

Category-interchangeable — most of the page: centered headline → lede → 16:9 video → CTA slab → 3-stat counter row → why-choose-us → infinite testimonial marquee → 8-card hover accordion → closing CTA. Nothing in the sequence was decided by this product. `CursorGlow`, `SpotlightCard`, five `MagneticButton`s and `NoiseOverlay` are portfolio-site effects; four of five are pointer-only and don't exist on the primary device.

**"Norma y Abrazo" does not read on screen.** Coral appears in four places, three of them micro-marks. `paper-blush` — the tint DESIGN.md reserves for "contact and human-contact surfaces" — appears zero times on this page, including on `CtaFooter`, which uses the navy tint. At the exact moment the system says coral must carry, the page is blue.

**Deterministic scan:** detector returned `[]`, exit 0, on the home-page tree and on all of `src` — clean, verified genuine (exit 2 on a synthetic bad file). Browser-mode injection succeeded: 2 anti-patterns at 1440×900, 15 at 390×844 — `radial-spotlight-glow` (`About.tsx:8`), `marquee`, `tiny-text` ×2 (`Hero.tsx:167`, mobile only). The 11 `body-text-viewport-edge` hits are false positives: offsets of −189 to −3149px at 296px intervals are duplicated marquee cards inside `overflow-hidden`.

**Where the assessments collided:** the design review praised the typography at length; the evidence pass proved the body typeface isn't loading at all. Neither pass would have found it alone.

## Overall Impression

Craftsmanship spent on the wrong problems. The disclosure animation, the contour system, and the honesty-compiled-into-code (`Counter` renders the true figure in markup so a dead script can't show a lie; the 4-star review stays 4; the `aria-hidden` marquee is shadowed by a real `sr-only` list) are authored, non-generic work.

And the page opens with a stranger's vlog, buries the specialty at 77% depth, and closes on an empty navy slab with no address.

**Biggest opportunity:** the `About` band at y≈1272 is where trust is won — "No sólo hacemos el trámite. Te explicamos qué pasa en cada etapa, te avisamos si hay un problema antes de que se agrave." It contains no call to action of any kind. The emotional peak and the conversion moment are 2,300px apart.

## What's Working

**The Services disclosure is genuinely well-engineered.** `gridTemplateRows: open ? '1fr' : '0fr'` gives the panel its real height without measuring, so copy can never be clipped at a guessed pixel. `SETTLE_DELAY` puts the box's growth ahead of its text. `lg:basis-0 lg:min-w-0` stops a long Spanish label widening its own closed card — a bug that only exists in Spanish and was anticipated.

**The honesty commitments are structural, not aspirational.** `services.ts:34` carries a `PENDIENTE DE CONFIRMACIÓN DE LIBA` marker on the one summary LIBA didn't write. Defend all of this in any redesign.

**Reduced motion is near-complete and verified live.** With the media feature emulated, zero CSS animations still run and `MaskReveal` renders plain text. Every component except one resolves correctly.

## Priority Issues

### [P0] The hero video is an unrelated third-party vlog, and it owns the fold
`VITE_YOUTUBE_EMBED_URL` = `lvedZVy0NF4` — "Pasé 24 Horas Con WestCOL" by Nil Ojeda — rendered under `title="LIBA Gestoría del Automotor"` at 504px of a 900px desktop fold. Env value confirmed directly.
**Why it matters:** the visitor's job here is deciding whether LIBA is real. The first thing the page shows her is evidence that it isn't. PRODUCT.md flagged this as a placeholder that "must be replaced, never presented as finished."
**Fix:** delete the `<iframe>` from `Hero.tsx`. Don't substitute stock footage. With it gone the CTA slab rises into the fold on every viewport.
**Suggested command:** `/impeccable distill src/components/sections/Hero.tsx`

### [P0] All eight Gotham font files are missing — the body typeface is a fallback everywhere
`public/fonts/` contains only `alverata-informal-regular.otf`. Every `@font-face` in `index.css:15-46` 404s into Vite's SPA fallback; browser reports `OTS parsing error: invalid sfntVersion: 1008821359` = `0x3C21444F` = `<!DO`, the HTML doctype parsed as a font. 48 warnings at desktop. `npm run build` emits 8 matching warnings and still succeeds, so nothing catches it.
Every word of body copy renders in Inter — only because `index.html:11-13` loads Google Fonts, a third-party request the Privacy page's "no third-party tracking" claim doesn't disclose. Half the designed type pairing has never shipped.
Tagged P0 despite not blocking a task: it's silent, it's in the build output, and what's in production is not the product.
**Fix:** add the eight woff2/woff files to `public/fonts/`, or drop the `@font-face` blocks and self-host the fallback honestly. Then remove the Google Fonts link.
**Suggested command:** `/impeccable audit src/index.css`

### [P1] "Agendar consulta" means two different things on one page, and neither WhatsApp link says WhatsApp
`Hero.tsx:109` — label `Agendar consulta`, sub-line "Llamado inicial de 20 minutos sin cargo", `href={WHATSAPP_URL}`, new tab. `CtaFooter.tsx:71` — `Agendar consulta en Calendly`, `href={CALENDLY_URL}`.
**Why it matters:** a first-timer taps expecting a calendar and gets a chat window with a stranger, prefilled with a sentence she didn't write, now attributed to her. A small betrayal at the page's primary conversion event.
**Fix:** relabel the hero to `Escribinos por WhatsApp` with the `WhatsAppIcon` from `BrandIcons`; reserve "Agendar consulta" for Calendly everywhere; add an external-destination cue to both.
**Suggested command:** `/impeccable clarify src/components/sections/Hero.tsx src/components/sections/CtaFooter.tsx`

### [P1] The page inverts its own stated positioning
PRODUCT.md principle 4 is lead with the complex case. The page does the opposite at every level — hero lede leads with transferencias, Services masthead opens on "el trámite más solicitado", `RESTING = 0` opens the accordion on Transferencias, and the complex-case claim sits in the bottom-right cell of a 2×2 ruled list at y≈2400 of 4836, at 3.98:1 contrast. "Oficios sucesorios" appears once, as the 7th of 8 closed labels, at 77% page depth on mobile.
**Why it matters:** the visitor who most needs LIBA and can least substitute a competitor finds nothing addressed to her until half-way down.
**Fix:** promote "Alta resolución de casos" into the `WhyChoose` lead panel. Give the sucesión/deuda case a named entry point in or right after the `About` band.
**Suggested command:** `/impeccable layout src/components/sections/WhyChoose.tsx src/components/sections/Services.tsx`

### [P1] A forbidden nationwide claim, and no address anywhere
`Services.tsx:204`: "...y aseguradoras en toda la Argentina." PRODUCT.md: "Do not write nationwide-coverage claims until [jurisdictional scope] is established." `constants.ts:23` documents this constraint four lines above `SERVICE_AREA` — 'Olivos, Provincia de Buenos Aires' — which the home page never renders.
**Why it matters:** the page overclaims reach and discloses no location at all. For someone about to hand a stranger her vehicle title, a real service area is a stronger trust signal than a coverage claim. "Honesty outranks conversion" being traded away.
**Fix:** delete "en toda la Argentina". Render `SERVICE_AREA` and `CONTACT_EMAIL` as visible text in the footer.
**Suggested command:** `/impeccable clarify src/components/sections/Services.tsx src/components/layout/Footer.tsx`

### [P2] Verified accessibility defects (measured in a real browser)
- `text-navy/70` on white = 3.98:1 (`WhyChoose.tsx:100`, ×4 cards) and on `paper-cool` = 3.78:1 (`CtaFooter.tsx:54,75`). Both fail AA. The second pair is the reassurance copy at the decision point. `text-navy/80` is 5.05:1 and already in use — a one-token fix.
- `ScrollProgress.tsx:11-21` is the only motion in the system that ignores `prefers-reduced-motion` — framer's `useSpring` writes inline `transform`, which the CSS blanket at `index.css:97-110` doesn't cover. Verified still animating under reduce.
- Touch targets: `Footer.tsx:163` 42×42, `Footer.tsx:114` four social links at 36×36. Pass WCAG 2.5.8 AA (24px), fail 2.5.5 AAA (44px).
- Five of six images declare no `width`/`height`; no `loading="lazy"` on below-fold footer logos. `logo-icon.png` is 1150×1167 rendered at 20×20.
- The testimonial marquee is `pointer-events-none select-none`, unpausable at 30s, `line-clamp-4`, with 64px fades washing out card copy mid-sentence. Six real client reviews are the only third-party evidence on the page; making them uncontrollable reads as concealment of social proof.
**Suggested command:** `/impeccable audit home`

## Persona Red Flags

**Jordan (confused first-timer)** — 1.6s of a wordless navy void; then a Colombian influencer arm-wrestling; then `Agendar consulta` gives her WhatsApp instead of a calendar. `Radicaciones y patentamiento`, `Cédulas RAC`, `Oficios sucesorios` must each be hovered one at a time to learn what they mean. Navbar shows `Servicios` and `Trámites` with no stated difference, and the `Servicios` dropdown asks her to classify herself before she's learned anything. No "no sé qué trámite necesito" option exists.

**Riley (stress tester)** — opens the video source, finds a third-party vlog, done. `48 hs` at 60px with no methodology or sample. "en toda la Argentina" against no address, no CUIT, no matrícula. Can't pause, select, or copy a testimonial to verify a name. Finds the genuinely honest Privacy page ("no analítica, ni píxeles publicitarios") and then finds `index.html` loading Google Fonts anyway. No `og:image`, no canonical, no `LocalBusiness` JSON-LD — shares the URL, gets a blank card.

**Casey (distracted mobile)** — at 375×667 the primary CTA's bottom edge is 5px past the fold; she sees a 62px sliver. No sticky WhatsApp button, the near-universal convention for this category in Argentina — her fastest path is scrolling to 605px or to 4,571px of a 5,411px document. The hamburger offers 8 destinations, none of them "Contactanos por WhatsApp." Services is 1,459px of stacked boxes showing a label and a "+". `CursorGlow` explicitly bails on `(pointer: coarse)`, so two of the page's designed moments don't exist on her device.

**Silvia (the inheritor — derived from PRODUCT.md)** — her father died, the car is in his name, she has a paper from a judge. The one sentence written for her (`services.ts:55`: "Cuando fallece el titular, el vehículo queda en un limbo registral...") is genuinely good and hidden behind a tap in the eighth-least-prominent element on the page. `CtaFooter.tsx:50`'s "¿Trámite complejo? Hablemos" requires her to self-diagnose as complex — she doesn't know if it's complex, she knows her father died. The precedent she needs — Carlos Ramírez, Córdoba, "Tenía un caso complicado con una sucesión y lo resolvieron de manera impecable" — is on a conveyor belt she can't stop.

## Minor Observations

- `index.html:15` — `<title>Liba  - Gestoría del Automotor</title>`: double space, and "Liba" not "LIBA".
- `index.html:5` — `type="image/svg+xml"` on a `.png`. An unused `public/favicon.svg` exists.
- No `og:image`, `og:url`, canonical, or `LocalBusiness` JSON-LD. For a local gestoría acquired through search and WhatsApp shares, structured data is the highest-leverage missing item.
- `index.css:53` sets `scroll-behavior: smooth` while Lenis also runs — two smooth-scroll systems on one document.
- Scrollbars hidden globally on a 4,836px page; `ScrollProgress` sits above the navbar and terminates in a hard vertical edge mid-viewport.
- `Testimonials.tsx:37` — the headline "Tu opinión realmente nos importa" solicits feedback; the eyebrow beneath it does the section's actual job, smaller and quieter.
- `Testimonials.tsx:62` uses `border-gray-100` — against DESIGN.md's Tint-Not-Gray Rule.
- **DESIGN.md has drifted materially from the code.** `paper-blush` unused on this page; the Band Continuity Rule broken between `Services` and `CtaFooter` (no divider); Alverata on an h3 at `WhyChoose.tsx:62`, against the Serif-Stops-at-Section-Level rule; and the entire `whatsapp`/`whatsapp-deep` token pair, the `button-whatsapp` spec, the Borrowed Green Rule and its documented 1.98:1 exception exist nowhere in the code — both WhatsApp buttons are navy. The doc records a contrast trade-off for a button that doesn't exist.
- The h1 renders at 36px while two h2s render at 50px, and the largest type on the page is `+800` at 60px. That's DESIGN.md's own type scale, faithfully implemented — a design-system bug, not an implementation one.
- Nothing implies live case tracking, a portal, or status lookup. That constraint is fully respected.

## Questions to Consider

1. The `About` band is where trust is won and it has no button. What happens if the WhatsApp CTA lives inside that navy band, one line after "te avisamos si hay un problema antes de que se agrave"?
2. What if the eight jargon cards became four situations — "Compré o vendí un auto" / "Falleció el titular" / "El vehículo tiene deuda o prenda" / "No sé qué trámite necesito"? Silvia doesn't know she needs an "oficio sucesorio."
3. `48 hs` is the largest number in the hero. Is average turnaround what an anxious first-timer chooses on, or what a dealership chooses on — whose page is the hero?
4. "Honestidad antes que la venta" is the most differentiating sentence LIBA owns, set at 15px and 3.98:1 in the top-right cell of a list. What would the page look like if it were the h1?
5. What's on this page that a gestoría two blocks away couldn't put on theirs by Friday — other than the typeface?
