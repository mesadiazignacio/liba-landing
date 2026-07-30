---
name: LIBA Gestoría del Automotor
description: Institutional navy rigor and coral human warmth, held in one soft-cornered system.
colors:
  navy: "#084d9b"
  navy-light: "#1e6bc4"
  coral: "#ed6d92"
  coral-deep: "#cc3a66"
  coral-light: "#f4a0b5"
  paper-cool: "#f0f5fb"
  paper-blush: "#fde4ec"
  border-cool: "#dce8f6"
  white: "#ffffff"
  star: "#facc15"
  whatsapp: "#25d366"
  whatsapp-deep: "#1db954"
typography:
  display:
    fontFamily: "Alverata-Irregular, Georgia, serif"
    fontSize: "clamp(1.5rem, 5vw, 3.125rem)"
    fontWeight: 900
    lineHeight: 1.06
    letterSpacing: "normal"
  headline:
    fontFamily: "Alverata-Irregular, Georgia, serif"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.15
  title:
    fontFamily: "Gotham, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 2vw, 1.375rem)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Gotham, Inter, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
  body-lede:
    fontFamily: "Gotham, Inter, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 2.5vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Gotham, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
  micro-label:
    fontFamily: "Gotham, Inter, system-ui, sans-serif"
    fontSize: "clamp(0.6875rem, 1vw, 0.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  surface: "16px"
  pill: "9999px"
spacing:
  stack: "12px"
  gutter: "16px"
  gutter-wide: "24px"
  card: "24px"
  section-y: "56px"
  section-y-wide: "80px"
components:
  button-primary:
    backgroundColor: "{colors.coral-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-outlined-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-whatsapp-hover:
    backgroundColor: "{colors.whatsapp-deep}"
    textColor: "{colors.white}"
  card-feature:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "24px"
  card-testimonial:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
    padding: "24px"
    width: "300px"
  chip-service:
    backgroundColor: "{colors.coral-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "12px 20px"
    typography: "{typography.label}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
    padding: "14px 16px"
    typography: "{typography.body}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    padding: "0 16px"
    typography: "{typography.label}"
  nav-link-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    padding: "0 16px"
  stage-marker:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    size: "40px"
  stage-marker-reached:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    size: "40px"
  disclosure-row:
    backgroundColor: "{colors.paper-cool}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
    padding: "20px 24px"
    typography: "{typography.title}"
---

# Design System: LIBA Gestoría del Automotor

## Overview

**Creative North Star: "Norma y Abrazo"**

Norm and Embrace. The system is a deliberate duality, and its whole job is to hold both halves at once without letting either win. Navy carries what the law says — institutional, unhedged, the color of the registry and of an argument grounded in norm. Coral carries how you are treated — the color of every human moment: the invitation to talk, the reassurance, the person on the other side of the trámite. A visitor arriving with a stalled transfer and a fear of being taken advantage of needs to feel both at once. Authority without warmth reads as another indifferent institution. Warmth without authority reads as someone who cannot actually win the case.

The mood is **institutional and credible, warm and human** — and pointedly not serene or crisp. This system is not selling calm or speed as its personality; it is selling that a competent institution will treat you like a person. That distinction decides close calls: given a choice between a treatment that reads efficient and one that reads reassuring, reassuring wins.

The spatial world is tonal bands. Large flat fields of `paper-cool` and `paper-blush` alternate with white, separated by animated wave dividers rather than hard rules, so the page reads as continuous stretches rather than stacked boxes. Cards sit lifted off those bands on real shadow. Everything — every card, band, input, panel, and chip — resolves to the same 16px corner, and every button and avatar to a full pill. That radical consistency of corner is the system's most recognizable trait and the main reason dense registry information never looks like a government form.

The motion grammar is **progression, not arrival.** Motion here has one subject — a case moving forward — and one authored expression of it, the `StageTrack` case rail. Everything else is manners: acknowledging a press, making a state legible, holding continuity across a route change. That hierarchy is the whole discipline, and it is easy to lose: the temptation is to give every section its own entrance, at which point nothing is emphasized and the page reads as a slideshow. Durations, curves, and springs are named in `src/lib/motion.ts` and are the only sanctioned source; the curve is an exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for anything arriving, and exits always run shorter than entrances because leaving must never cost the visitor a wait. Content is visible in its default state, so a dead script never hides the page.

**The One Loud Entrance Rule.** Each surface gets exactly one word-mask reveal, on its opening statement, and every other heading arrives on the quiet mass reveal. The mask is the system's loudest gesture; its meaning is entirely in its rarity.

**Key Characteristics:**
- Two-voice palette: navy for authority, coral for humanity, never blended into a third mood
- Tonal bands with wave transitions instead of ruled section breaks
- One radius for surfaces (16px), one for actions (pill) — no third value
- Cards genuinely lifted off the ground plane with structural shadow
- Alverata display type with an outline stroke, against Gotham for everything else
- Spanish (voseo) copy at every scale; the type must survive long Argentine registry vocabulary
- One authored motion sequence — the case rail — with everything else reduced to feedback and continuity

## Colors

A two-voice palette: one saturated institutional blue, one warm rose coral, and a set of very pale tints derived from each that do the actual work of dividing the page.

### Primary
- **navy** (`#084d9b`): The institutional voice. Body text color sitewide, the navbar and dropdown ground, feature-card backgrounds, avatar fills, and the color of any statement about what the norm says. A true mid-blue, saturated enough to feel registered and official rather than corporate-soft.

### Secondary
- **coral** (`#ed6d92`): The human voice, and the brand's pink of record. It marks the moment a person is being invited to talk to a person. Used wherever no text sits on top of it: the scroll-progress bar, the advancing fill and reached-marker ring of the case rail, bullet marks, glow halos, quotation watermarks, and hover accents on navy surfaces. Anything that carries a label uses `coral-deep`.
- **coral-deep** (`#cc3a66`): The text-bearing coral. `coral` at its brand lightness reaches only 2.92:1 against white, which fails AA at every size, so any coral surface carrying a label — buttons, service chips, the StatsBar band, the hero contact card, the Trámites coral category — uses this instead (4.81:1). It is also the coral used for coral-colored *text* on light grounds.
- **coral-light** (`#f4a0b5`): A lighter rose used only as the opening stop of gradients (avatar fills, category headers) that resolve into `coral` or `navy`. Never a standalone fill.

### Neutral
- **white** (`#ffffff`): The default page ground and the surface of every lifted card.
- **paper-cool** (`#f0f5fb`): The navy-tinted band. The dominant alternate section background and the fill of informational panels — the calm stretch between white sections. Reads as blue-adjacent paper, not gray.
- **paper-blush** (`#fde4ec`): The coral-tinted band. Reserved for contact and human-contact surfaces: the Contacto page's warm sections and footer, and the coral category's cards in the Trámites catalog.
- **border-cool** (`#dce8f6`): Hairline borders and alternating FAQ item fills. The only dedicated border tint.

### Tertiary
- **star** (`#facc15`): Rating stars on real testimonials only. Never decorative.
- **whatsapp** (`#25d366`) / **whatsapp-deep** (`#1db954`): WhatsApp's own brand green, used strictly on WhatsApp-destination buttons and their hover. This is a borrowed platform color, not part of LIBA's palette — it must never appear on anything that does not open WhatsApp.

### Named Rules

**The Two Voices Rule.** Navy states what is true; coral invites contact. A surface may hold both, but no element blends them into a third identity: any element that is neither authority nor invitation should be neutral, not tinted. One exception exists and is temporary — the image placeholder in `Procedures.tsx` runs a `coral-light`→`navy` gradient while it waits for `/procedures-hero.png`, and `AboutUs.tsx` runs a `coral-light`→`coral` one where the founder photograph belongs. Both are stand-ins, not patterns to copy.

**The Load-Bearing Coral Rule.** Coral that carries text is `coral-deep`; coral as pure decoration stays `coral`. Progress bars, the case rail's fill, bullet marks, glow halos, and watermarks keep the brand pink. The moment a label lands on it, the surface darkens — which is why a reached stage marker fills navy and puts the coral in its ring instead of behind its numeral.

**The Borrowed Green Rule.** `whatsapp` green is the destination's color, never LIBA's. If a button is green, tapping it must open WhatsApp. It is excluded from the palette for every other purpose, including success states.

**The Tint-Not-Gray Rule.** Backgrounds are tinted (`paper-cool`, `paper-blush`), never neutral gray. The page has no true gray surfaces; gray appears only as secondary body text.

## Typography

**Display Font:** Alverata-Irregular (with Georgia, serif fallback) — self-hosted at `/fonts/alverata-informal-regular.otf`
**Body Font:** Gotham (with Inter, system-ui fallback) — self-hosted woff2/woff, four weights
**Label Font:** Gotham, 700, at 14px

**Character:** Alverata Informal is a humanist serif with irregular, slightly hand-cut contours — an unusual and effective choice for a registry business, because it carries authority without the coldness of a legal-document serif. It is used exclusively at 900 weight with a 1.5px `-webkit-text-stroke` in `currentColor` plus a matched text-shadow, which thickens it into a display face heavier than the font ships. Gotham underneath is geometric, neutral, and highly legible at the small sizes that registry copy demands. The pairing is the palette's duality restated in type: an idiosyncratic human serif over a rational sans.

### Hierarchy
- **Display** (Alverata, 900, `clamp(1.5rem, 5vw, 3.125rem)`, line-height 1.06): Section headlines — the primary statement on each band. Always accompanied by the `.font-alverata` stroke treatment.
- **Headline** (Alverata, 900, `clamp(1.5rem, 4vw, 2.25rem)`, line-height 1.15): Page-level h1.
- **Title** (Gotham, 700, 17–22px, line-height 1.25): Card, panel, and disclosure-row headings. Gotham, not Alverata — the serif does not descend below section level. Two steps are in use and both are real: 17px for the dense catalog rows (FAQ, trámite, contact stages) and 20–22px for standalone card headings. The feature cards in `WhyChoose` push their own title to 36px at `md`, which is documented with that component rather than as a global step.
- **Body** (Gotham, 400, 14–16px, line-height 1.6): Default running copy, card descriptions, list items.
- **Body Lede** (Gotham, 500, 15–24px, line-height 1.4): The oversized paragraph directly under a display headline, used to carry the emotional statement on band openings.
- **Label** (Gotham, 700, 14px, line-height 1): Navigation, buttons, chips. Sentence case.
- **Micro-label** (Gotham, 600, 11–12px, tracked 0.22em, uppercase): Section eyebrows and team roles. Narrow by design and getting narrower — the step markers this convention used to also cover are now the case rail's Alverata numerals, which are not tracked, not uppercase, and not this role. Do not reach for it as a general small-text style; at 11px it is at the floor of what this palette can hold legibly.

### Named Rules

**The Stroke Belongs to Alverata Rule.** The 1.5px text-stroke utility (`.font-alverata`) is part of the display face's identity, not an effect. Alverata always ships with it; nothing else ever receives it.

**The Serif Stops at Section Level Rule.** Alverata is for display and headline only. Card titles, labels, buttons, and body are Gotham without exception — the serif's job is to open a section, not to decorate inside one.

**The Voseo Fits Rule.** Copy is Argentine Spanish, which runs longer than English and stacks accented capitals (`Regularizá`, `Gestoría`, `Trámites`). Line-height and container widths must be verified against real Spanish strings, never against English placeholder text.

## Layout

Content is centered in progressively narrower containers by intent: `max-w-6xl` for full section grids, `max-w-4xl` for feature content and video, `max-w-3xl` for headline-plus-lede blocks. Horizontal gutters are 16px, opening to 24px at the `sm` breakpoint and above.

The vertical rhythm is band-based. Sections run 56px of vertical padding on mobile, opening to 80px at `sm` — a deliberately tight-to-generous jump that keeps mobile scannable while letting desktop breathe. Cards carry 24px of internal padding; stacked content inside them sits on a 12px gap.

The defining layout move is the **tonal band**: full-bleed alternating fields of white, `paper-cool`, and `paper-blush`, joined by the animated `WaveDivider` rather than by margin or rule. Bands are the unit of page composition; a new section means a new band, and the divider's `fromColor`/`toColor` must match the two bands it actually sits between.

Breakpoints are Tailwind's defaults — `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px — and the system leans hardest on `sm`, where most type scales and padding steps happen. Mobile is the primary composition: nearly every size declaration starts at a mobile value and scales up, and the site was built mobile-first rather than adapted down.

**The Band Continuity Rule.** Every section change is a band change with a wave between it. Sections never butt against each other on a hard horizontal edge.

## Elevation & Depth

**Lifted cards on tonal ground.** Depth in this system is real and structural, not ambient decoration. The ground plane is the flat tonal band; cards, panels, and the hero contact surface sit visibly above it on shadow, and they rise further on hover. The lift is load-bearing — it is how a visitor knows a surface is a discrete, actionable object rather than part of the band behind it. A card rendered flat on a band reads as broken.

Glow halos are a separate, narrower device: colored ambient shadows that appear on hover over navy surfaces to signal interactivity, never present at rest.

### Shadow Vocabulary
- **Card at rest** (`box-shadow: 0 4px 24px rgba(0,0,0,0.08)`): The default lift for any card on a tonal band.
- **Card raised** (`box-shadow: 0 12px 48px rgba(0,0,0,0.16)`): The hover state. A genuine jump in both offset and blur, not a subtle darkening.
- **Coral glow** (`box-shadow: 0 0 30px rgba(237,109,146,0.3)`): Ambient coral halo on feature cards and primary buttons at hover only.
- **Navy glow** (`box-shadow: 0 0 30px rgba(8,77,155,0.3)`): The navy counterpart, for coral or white surfaces on navy ground.
- **Navy-cast card** (`box-shadow: 0 12px 32px rgba(8,77,155,0.18)`): The hero contact card, the pillar cards on `paper-cool`, and any open disclosure row. Where a card sits on a tinted band or directly beneath a colored surface, the shadow is tinted navy rather than black.
- **Stage reached** (`box-shadow: 0 0 0 4px rgba(237,109,146,0.26), 0 10px 24px -8px rgba(237,109,146,0.75)`): The halo on a case-rail marker the coral fill has passed. Carries both a ring and an offset drop, so it reads as the marker lifting off the rail rather than merely tinting.

### Named Rules

**The Colored Shadow Rule.** Shadows over tinted bands are cast in navy at low alpha, not black. Neutral black shadow is for white ground only; on `paper-cool` and `paper-blush` a black shadow reads muddy.

**The Glow-Is-A-State Rule.** Glow halos never appear at rest. A glow means "this responds to you" — or, on the case rail, "the case has got this far." Both are states. Using one as decoration destroys its meaning.

## Shapes

The form language is unusually disciplined and should stay that way: **two radii, no third**. Every surface — card, band panel, input, dropdown, image frame, video container, chip — is 16px. Every action and identity element — buttons, avatars, badges, stage markers, the progress indicator — is a full pill. There is no 4px, 8px, or 24px anywhere in the system, and no square corners except the intentionally flush navbar active-state fill.

Borders are hairlines and mostly translucent: `white/10` on navy surfaces, `navy/10` on light ones, with `border-cool` where an opaque line is needed. Borders never carry weight above 1px except on outlined buttons, where a 2px stroke is the entire treatment.

One deliberate exception exists: an organic blob radius (`60% 40% 70% 30% / 40% 50% 60% 50%`) used as a decorative background shape. It is a background flourish, not a container form.

**The Two Radii Rule.** Surfaces are 16px, actions are pills. If a new element seems to need a different corner, it is the wrong element.

## Components

### Buttons

Two shapes are in play and the split is real, not drift: **pill for navigational actions** (`Consultar mi caso →`, `Ver todos los trámites →`) and **16px surface for the large stacked calls to action** that behave like cards with a heading and a supporting line (the hero's `Agendar consulta`, the WhatsApp and Calendly pair). The second kind is a surface you press, not a label you press, so it takes the surface radius.

- **Primary, on light ground:** `navy` fill, white text, no border. The default for anything leading further into the site.
- **Primary, on navy ground:** white fill with navy text.
- **Accent:** `coral-deep` fill with white text — never `coral`, which fails AA behind a label.
- **WhatsApp:** `whatsapp` green, deepening to `whatsapp-deep` on hover. Reserved for WhatsApp destinations.
- **Hover:** A scale of 1.02 on the large card-shaped actions and 1.03–1.04 on pills, paired with a navy-cast shadow bloom. Several also sit inside `MagneticButton`, which pulls the whole control a few pixels toward the pointer before any click.
- **Press:** 0.97, on the `press` spring (stiffness 400, damping 26). Reassuring rather than eager — a gentle acknowledgment, not a bounce.
- **Note:** `src/components/ui/Button.tsx` declares a different system — three padding steps, a 2px border on every variant, a `coral` fill, a resting coral glow — and **no page imports it.** It is an unused variant, and its resting glow contradicts the Glow-Is-A-State Rule. The bullets above describe what actually ships; treat that file as a deletion candidate, not a pattern to copy.

### Cards / Containers
- **Corner Style:** 16px, always.
- **Feature card** (as shipped in `WhyChoose`): Navy fill, 24–32px padding, centered text, no border. A white diagonal sheen (`rgba(255,255,255,0.12)` → transparent → `0.08`) fades in over 500ms on hover, layered under a spotlight that follows the cursor and a 5° tilt. Title is Gotham 600 at 20–36px; body is `white/80`.
- **Testimonial card** (as shipped in `Testimonials`): White fill, `gray-100` hairline, 20px padding, 280px opening to 310px, resting card shadow, a `coral/10` quotation-mark watermark in the top-right corner, a 44px navy initials pill, `star` rating row, and gray body copy clamped to four lines. It rides a 30s marquee and is intentionally non-interactive, so it has no hover state.
- **Pillar card** (as shipped in `AboutUs`): White fill at 16px with 20px padding, a `navy/5` ring, and the navy-cast resting shadow because it sits on `paper-cool`. Lifts 3px on hover. Holds a stage marker to its left (mobile) or above it (desktop).
- **Panel:** `paper-cool` or `paper-blush` fill at 16px with 20–28px padding. The workhorse for informational blocks inside a band.
- **Internal Padding:** 24px standard; 20px mobile opening to 28px at `sm` on larger panels.

### Inputs / Fields
- **Style:** White fill, 16px radius, 16px/14px padding, navy text, transparent 1px border at rest — the field is defined by its fill against the tinted band, not by a stroke.
- **Focus:** A 2px `navy/20` ring plus a `navy/20` border, transitioned. Soft and non-alarming by design.
- **Note:** Placeholders are rendered transparent (`placeholder-transparent`), meaning fields depend entirely on their visible labels. Any new field must ship a real label; there is no placeholder fallback.

### Focus

A single system-level treatment in `index.css` covers every focusable element: a 2px white outline drawn on the element plus a 4px navy halo outside it. The white ring reads on navy and coral surfaces, the navy halo reads on white and the paper tints, so at least one is always visible. It is defined with `:where()` (zero specificity), so any component with its own designed focus state — the contact inputs, for instance — overrides it without a fight.

### Disclosure

The expandable row behind both the FAQ list and the trámite catalog, and the system's densest information container.

- **Style:** A 16px row whose fill is set by its context — `border-cool` and `paper-blush` alternating down the FAQ list, the category tone in the trámite catalog. No border; the fill against white is the whole definition.
- **Trigger:** The full row is the button. Title at 17px bold navy, optional subtitle at 12–14px gray beneath it, and a 44px circular navy-outlined chevron pinned right.
- **Open:** The row takes the navy-cast shadow and lifts off the band — an open row is the active object on the page. The chevron rotates 180°. The panel takes height over 400ms while its contents settle a beat behind, so the text is never stretched mid-growth.
- **Close:** Faster than it opened (180ms), and the contents clear first so the collapse never squashes legible copy.
- **Note:** The chevron points up (∧) when closed and down (∨) when open. That is inverted from the common convention and it is the incumbent behavior; it is recorded here as observed, not endorsed.

### Navigation
- **Style:** Navy bar, white 14px bold labels, full-height hit areas with a `white/10` hover wash.
- **Active state:** A white fill behind the label with the text inverting to navy — and notably square (`borderRadius: 0`), the one intentional break from the two-radii rule, animated between items as a shared `layoutId` spring.
- **Dropdown:** A 16px panel at `rgba(8,77,155,0.92)` with `blur(12px) saturate(180%)` backdrop filter and a `white/10` border, entering on an 8px rise over 200ms.

### Signature Components

The system has two, and they divide the work cleanly: `WaveDivider` defines the **spatial** world — how the page is put together — and `StageTrack` defines the **temporal** one — how a case moves through it. Neither substitutes for the other, and a surface can want one without the other.

#### WaveDivider — the spatial signature

An SVG wave (1440-unit period, drawn across two cycles) that transitions between two band colors, drifting continuously at an idle speed and shifting horizontally with scroll. It replaces every hard section edge on the site. It takes explicit `fromColor`/`toColor` props, so it is only correct when those match the bands above and below it — a mismatch is the most likely way to break the page's continuity. Every instance is visibility-gated and they share one frame loop, so a page can carry four of them without four animation loops.

#### StageTrack — the temporal signature

The case rail: a 2px track with an advancing `coral` fill and a 40px pill marker per stage. It carries the product's central promise — that the client can see what stage their trámite is at — and it is the only place on the site where motion is the message rather than the manners.

- **Two marker states, no third.** Pending is a white fill with a `navy/20` ring and its numeral in navy at 0.8 alpha. Reached is a navy fill, a `coral` ring, a white numeral, and the **Stage reached** halo. The numeral is Alverata — the one sanctioned place the display serif appears below section level, because it is a figure, not a heading.
- **The fill spans marker centres, not the container.** From the first marker's centre to the last's, so a completed fill means the final stage rather than the bottom of the final paragraph.
- **Markers commit on measurement, not on a share.** Each threshold is read from the rendered marker, because stages carry unequal amounts of copy; splitting the track evenly lights stage 3 while the coral is still beside stage 2, which breaks the only claim the component makes.
- **The unreached track is `navy/16`, not `border-cool`.** `border-cool` measures about 1.1:1 on white and 1.05:1 on `paper-cool`, so a 2px rail in it vanishes and the sequence appears to stop at the last reached marker instead of continuing.
- **Content never dims.** Stages move into place but always stay at full contrast. A stage the visitor has not scrolled to yet is still theirs to read, and greying it would trade legibility for a decorative point.
- **Two orientations:** vertical (the contact process, and the pillars below `md`) and horizontal (the pillars at `md` and up). Each measures only the markers it renders, so only one is ever mounted per breakpoint.

**The Rail Means Progress Rule.** The case rail is reserved for genuine ordered sequences where the order carries information the reader needs — the contact process, the four pillars in the order they are applied. It is not a list decoration. If the items could be reordered without loss, they are a list, not stages.

## Do's and Don'ts

### Do:
- **Do** resolve every surface to 16px and every action to a pill. Two radii, no third.
- **Do** separate sections with a `WaveDivider` whose `fromColor` and `toColor` match the actual adjacent band fills.
- **Do** lift cards off tonal bands with the resting card shadow, and cast that shadow in navy at low alpha when the ground is tinted.
- **Do** pair every Alverata heading with the `.font-alverata` stroke utility.
- **Do** use `coral` for the moment of human contact and `navy` for the statement of fact, on every surface.
- **Do** write and test layouts against real Argentine Spanish strings, including accented capitals.
- **Do** give every input a visible label — placeholders are transparent by design.
- **Do** take durations, curves, and springs from `src/lib/motion.ts`, and derive group stagger from `staggerStep()` so a list of any length finishes arriving inside 0.28s.
- **Do** reach for the case rail when a sequence's order carries information, and only then.
- **Do** give every real outcome a visible acknowledgment — the pending sweep on a submit, the drawn check on success.

### Don't:
- **Don't** introduce a third radius value, a gray surface, or a navy-to-coral gradient.
- **Don't** use `whatsapp` green on anything that does not open WhatsApp.
- **Don't** apply glow halos at rest; they mean interactivity.
- **Don't** set Alverata below section level — card titles and labels are Gotham.
- **Don't** set body copy in uppercase. Running paragraphs are sentence case; uppercase is reserved for the micro-label role (11–12px, 600, tracked 0.22em) on section eyebrows and team roles.
- **Don't** put white text on `coral` (`#ed6d92`) — that pairing is 2.92:1 and fails AA at every size. Use `coral-deep`.
- **Don't** reintroduce `#e8577d` or `#1b3a5c`. These are superseded values from an earlier palette; `coral` is `#ed6d92` and navy is `#084d9b`.
- **Don't** add one-off navy shades. `#1e6bc4` and `#1e5aa0` exist as unsanctioned hover variants and should consolidate, not multiply.
- **Don't** give a second element the word-mask entrance. One per surface, on its opening statement.
- **Don't** hand-write a duration, easing curve, or spring. They live in `src/lib/motion.ts`; a literal in a component is drift.
- **Don't** let an entrance and its exit share a duration. Leaving is always shorter.
- **Don't** ship an infinite loop without gating it on visibility, or a scroll-linked effect without a resolved state for reduced motion.

## Known exceptions

- **WhatsApp green carries white text at 1.98:1.** This is WhatsApp's own brand green, kept for platform recognition on buttons that open WhatsApp. It is a knowing deviation from the AA floor, not an oversight; `#128c7e` (4.6:1) is the fix if recognition is ever judged less important than legibility.
- **`#f59e0b`** appears once, as the avatar fill for the team's "Chief Happiness Officer" (the office dog). Deliberate personality, outside the palette by intent.
