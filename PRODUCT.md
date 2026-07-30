# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: particulares.** Individual vehicle owners in Argentina handling a transfer, an inherited vehicle, a debt-laden or irregular registration. Typically a one-off, high-stakes, low-familiarity situation: they do not know the registry vocabulary, they are unsure whether their case is normal or broken, and they are deciding whether to trust a gestoría at all. Their needs break ties.

**Secondary, confirmed: concesionarias y reventas.** Dealerships and resellers with recurring volume, who care about turnaround, predictability, and batch handling rather than reassurance. Served by `/services/dealership`.

**Secondary, confirmed: empresas y flotas.** Companies handling fleet paperwork, cédulas RAC, and tax alta/baja, who need compliance and one accountable contact. Served by `/services/company`.

## Product Purpose

LIBA Gestoría del Automotor resolves vehicle registry and tax paperwork in Argentina — transferencias, radicaciones y patentamiento, multas e infracciones, oficios sucesorios, cédulas RAC, altas y bajas impositivas, and trámites for insurers, agencies, and resellers.

It exists because the registry system is opaque and adversarial to people who only pass through it once. The product is not merely filing: it is filing **plus** the client understanding what stage their case is in and what happens next.

Success has two parts, and both are required: the trámite is resolved, and the client was never left in the dark while it was. The site's job is to convert an uncertain owner into a consultation — primarily via WhatsApp, secondarily via a scheduled consultation or the contact form.

## Positioning

Three claims a neighboring gestoría could not truthfully copy, in combination:

1. **Norm-based advocacy, not compliance.** Work is grounded in the norma registral with technical fundamentos, explicitly used to push back on arbitrary decisions by the organismos rather than passing them along to the client.
2. **Honesty before the sale.** If a trámite has a real problem, the client is told. If a cheaper or better resolution path exists, the client is told that too — before the engagement, at the cost of the engagement.
3. **Complex cases as the specialty, not the exception.** Sucesiones, deudas, prendas, vehicles radicados in non-urban zones, and irregular situations are the stated core competence, worked by evaluating multiple resolution paths against their cost and risk.

The connective tissue is proactive notification: the client hears about a problem before it escalates, not after.

## Operating Context

- **The Argentine registry system.** Registros seccionales and organismos descentralizados, coordinated turnos, verificación de deudas y prendas, altas y bajas de patentes, and subsanación when a filing draws observaciones. Timelines and requirements are set by norms outside LIBA's control and change without notice.
- **Documentation intake.** The client hands over vehicle and identity documentation; the engagement begins with a diagnóstico — informes, presupuesto, and an integral review of the documentation — before the trámite is presented.
- **Client channels.** WhatsApp is the primary contact path (`VITE_WHATSAPP_NUMBER`), with a scheduled consultation via Calendly and an EmailJS-backed contact form as alternates.
- **Language.** Spanish, Argentine voseo (`regularizá`, `necesitás`, `comprás`). Not a localized or multilingual product.

## Capabilities and Constraints

**Service lines (8, confirmed):** transferencias de autos · radicaciones y patentamiento · gestión de multas e infracciones · trámites para reventas y agencias · trámites para el seguro · altas y bajas impositivas · oficios sucesorios · cédulas RAC para empresas.

**Surfaces:** Home, Sobre LIBA, Servicios (with `concesionaria` / `empresa` / `particular` segment variants), Trámites (a structured catalog by category), Preguntas Frecuentes, Contacto.

**Voice — confirmed: plural, `nosotros`.** LIBA is a team with professionals on staff; trust is presented as institutional backing, not a single personality. Future copy standardizes on `trabajamos`, `te explicamos`, `no desaparecemos`.

> Known inconsistency to reconcile: `src/components/sections/Hero.tsx` currently uses first-person singular (`Te acompaño`, and `Te escucho y actúo` in `About.tsx`), which contradicts the confirmed voice. A copy pass should resolve this; it is not a stylistic choice to preserve.

**Terminology (use exactly):** trámite · gestoría del automotor · transferencia · radicación · patentamiento · cédula RAC · oficio sucesorio · subsanación · prenda · organismo descentralizado · diagnóstico · presupuesto.

**Technical constraints:** static single-page front end with no backend of its own — form delivery runs through EmailJS, scheduling through Calendly, and primary contact through a `wa.me` link. There is no CRM, no client portal, no trámite-status lookup, and no authenticated area. Any design implying live case tracking would be describing a capability that does not exist.

**Explicitly undecided:** LIBA's formal jurisdictional scope — which registros seccionales or provinces it can operate in directly versus by correspondence — has not been established. Do not write nationwide-coverage claims until it is.

## Brand Commitments

- **Name:** LIBA Gestoría del Automotor. "LIBA" alone is acceptable in running copy after first use.
- **Voice:** plural, honest, explanatory, empathetic without sentimentality. Willing to state a problem plainly. Not salesy, not legalistic.
- **Existing assets:** `public/logo-icon.png`, `public/logo-text.png`, self-hosted Gotham (`public/fonts/Gotham-Book.woff2`), and a real hero photograph at `public/services-hero.png`.
- **Incumbent identity in code** (evidence, not a user-declared constraint): navy `#084d9b` and coral `#ed6d92` as Tailwind tokens, Gotham for text with Alverata-Irregular for display. Whether these are binding was not asked during init — the visual system is `document`'s and `new-work`'s to record or replace.

## Evidence on Hand

**Confirmed real — preserve, do not rewrite as marketing:**
- The six testimonials in `src/data/testimonials.ts` are genuine client reviews, with real names, locations, and ratings (including a 4-star, which should stay 4). Locations span Florida, Buenos Aires, La Plata, Rosario, Córdoba, and Mendoza.
- The three figures in `src/lib/constants.ts`: **+800** trámites resueltos, **+10** tipos de servicios prestados, **48 hs** average resolution time.
- The trámite descriptions in `src/data/procedures.ts` are LIBA-authored and accurate to current registry norms — including the per-trámite "¿Qué incluye?" and "Para quiénes" breakdowns.
- The five differentiators in `src/data/features.ts` are LIBA's own stated positioning.

**Placeholder — must be replaced, never presented as finished:**
- The hero video (`VITE_YOUTUBE_EMBED_URL`) is a stand-in, not a real LIBA production. It must not be described in copy as a brand film or client testimonial video until a real one exists. Same for the WhatsApp number if the env value is still a test line.

**Absences future work must not fabricate:** no press coverage, no case studies, no client or partner logos, no pricing or fee schedule, no matrícula or certification numbers, no team bios, headshots, or headcount, no founding year or years-in-business claim, no review count or aggregate star rating beyond the six real testimonials, and no turnaround guarantee beyond the confirmed 48 hs average.

## Product Principles

1. **Explain, don't just execute.** The differentiator is comprehension, so every surface should leave the visitor knowing what happens next and who tells them when it changes. Opacity is the competitor.
2. **Honesty outranks conversion.** Naming the real problem, the cheaper alternative, and the risk is the product. Copy or design that maximizes contact rate by withholding a caveat contradicts the business.
3. **Ground claims in norm, never in tone.** Authority comes from citable registral norm and technical fundamento. Confident assertion without that grounding is exactly what the competition already does.
4. **Lead with the complex case.** Sucesiones, deudas, and irregular registrations are the specialty and should be visible, not buried behind the simple transfer that any gestoría can do.
5. **The anxious first-timer sets the floor; volume clients set the speed.** Clarity for particulares is never traded away for agency-oriented density, and agency surfaces never inherit hand-holding that wastes a professional's time.
