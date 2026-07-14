# Website Design Guidelines

Personal reference file for how websites should be built. Follow this every time, no exceptions.

## 1. Reference Library

This section holds design references — screenshots and links of websites/layouts I like, including award-winning designs (Awwwards, CSS Design Awards, FWA, etc). Before starting any build, check this section for anything relevant to the project at hand.

> **Add references below as they come in.** Format: name, link (if any), and what specifically to steal from it (layout, type pairing, motion, grid, color).

- **Cryox** — industrial dry ice cleaning. Huge all-caps condensed/compressed heavy sans display type over full-bleed desaturated grayscale photography, single orange accent (CTA button + logo mark), minimal top nav, short punchy sentence-case body copy under the headline. Tone: technical, disciplined, no decoration for decoration's sake.
  - *Screenshot-only — no source code available.* Treat this description as the literal target to recreate exactly: the condensed all-caps type, grayscale-photo-plus-orange-accent palette, and sparse nav, not as loose inspiration.
- **Joy Rush** — THC-infused drinks/gummies. Warm cream background, bold serif display headlines, hand-drawn scalloped/cloud-shaped image frames, pill-shaped buttons, bright candy-colored product cans as the main visual interest, wavy scallop-edge section dividers, playful script logo. Tone: fun, tactile, lifestyle-brand — proves color and playfulness can work without reading as a template if the shapes/frames are custom.
  - **Confirmed from real code:**
    - **The cloud shapes are literal custom SVG cloud outlines** (not just image framing) — used both as ingredient "tag" badges (each floats with mouse-parallax, rotated at a fixed small angle like -5°/5°, e.g. "L-Tyrosine for focus & lift") and as the background shape on the age-gate modal. This is a genuine reusable brand asset, not a CSS trick.
    - **Every product has its own literal fruit-shaped color blob behind it** — e.g. a tangerine-shaped blob behind Tropical Tangerine, a cherry-shaped blob behind Lush Cherry — plus a matching 3-color system per flavor (a background color, an accent color, a border color, e.g. Wild Berries = `#2f1948` / `#85d8ff` / `#2f1948`). So each SKU is its own tiny palette, not one shared card style reused with a photo swap.
    - **Fonts:** a semibold display face (used for headlines) + a bold grotesk (used for labels/eyebrows) — confirmed via class names `fedro-sb` (Fedro Semibold) and `montreal-b` (Montreal Bold).
    - **Custom star icon:** review ratings use a bespoke asterisk/flower-shaped star SVG instead of a generic star glyph — another small signature detail.
    - **Tech stack:** built on Shopify, with Swiper for the horizontal product carousels and a scroll-linked reveal system (`data-anim` attributes) for section entrances.
    - **Practical takeaway:** the "cloud/scallop" look here isn't a border-radius trick — it's genuine custom SVG illustration work built as reusable components (cloud badge, fruit blobs, custom star), which is what makes it feel intentional rather than templated.
- **Bucks Sauce** — BBQ sauce. Near-black/dark brown background, bold condensed western-stencil display type used at huge oversized scale (outline-only treatment for secondary headlines), mustard-gold + red-orange accents, torn/textured illustration elements (fruit, peppers), vintage badge-style logo, irreverent copywriting. Tone: rustic, handmade, funny.
  - *Screenshot-only — no source code available.* Treat this description as the literal target to recreate exactly: the oversized stencil type treatment, dark+gold+red palette, and torn-texture illustration style, not as loose inspiration.
- **Lasala Plaza Hotel** — luxury boutique hotel. Muted sepia/warm-neutral palette with a deep forest-green section, elegant italic serif for headlines mixed with a clean sans for body, generous whitespace, minimal line-art logo mark. Tone: quiet, unhurried luxury — restraint as the design device.
  - **Confirmed from real code (not just the screenshot):**
    - **Fonts:** `Hurme Geometric Sans` (body/UI, sans), `BerlingskeSerif` (headlines, light-weight serif), and `calluna` (a warmer serif used for longer body copy/paragraphs) — three fonts doing three distinct jobs, not one font stretched everywhere.
    - **Real palette (from the CSS, not a guess):** `#2a3936` deep green-black (body text/dark sections), `#f6f4f2` warm off-white (page bg), `#4b6753` mid forest green, `#66473d` deep brown, `#ad8566` warm tan/gold, `#8ca193` sage green, `#ede9e5` blush-pink-beige section bg. Every color is a muted, desaturated earth tone — nothing saturated or "digital."
    - **What I first read as "scattered polaroid photos" is actually a rotating dial/wheel carousel** — room cards are absolutely positioned and rotated at fixed increments (15°, 30°, 45°...) around a shared pivot point far below the viewport, so they arc across the screen like a fan/dial rather than sitting in a grid. That's a much more specific and interesting technique than generic scattered photos, and worth stealing directly for a hospitality or lifestyle project.
    - **Tech stack:** GSAP + ScrollTrigger + ScrollSmoother (buttery scroll-linked pinning/reveals) + Draggable (the dial carousel is draggable) + SplitText (staggered text reveals) + Swiper (mobile slider fallback) + Flatpickr (date picker). Sections fade/slide in via `data-fade` attributes tied to ScrollTrigger, with configurable delay/duration per section.
    - **Practical takeaway:** this level of polish comes from GSAP's scroll-linked plugin suite, not from CSS alone. If a project wants this kind of "premium, cinematic scroll" feel, GSAP + ScrollTrigger + ScrollSmoother is the actual toolkit to reach for.
- **Unseen Studio** — creative studio portfolio. Soft dusty pink/lavender 3D-rendered environment (arches, water, a glass sphere) as the hero, elegant italic script paired with a plain sans, pill nav/buttons, portfolio thumbnails in a filterable grid with a desaturated/chromatic-aberration hover treatment. Tone: cinematic, art-directed — shows a pastel/soft palette done with intent (unlike the generic purple-gradient SaaS look) because it's grounded in a rendered 3D scene, not a flat gradient.
  - **Confirmed from real code:**
    - **This is genuinely live WebGL, not a pre-rendered sequence** — my earlier guess was wrong. There's a real `<canvas id="gl">` and every portfolio project in their data has actual x/y/z coordinates for images and videos floating in 3D space (e.g. a project's hero image sits at `{x:-450, y:20, z:-100}` and a video at `{x:400, y:150, z:-300}`) — literally a 3D scene you scroll/drag through, most likely built with Three.js.
    - **Fonts:** `Neue Montreal` (clean grotesk sans, used for nav/labels) + `Saol Display` (the elegant serif, including a true italic cut — not a faux-italic) for headlines/hover states. Two fonts, clear hierarchy.
    - **Smooth-scroll engine:** `asscroll` (a well-known lightweight smooth-scroll library) drives the buttery scroll feel — same category of tool as Lasala's GSAP ScrollSmoother, different library.
    - **Custom cursor system:** a fully custom cursor component (`.js-cursor`) that morphs into different states — drag arrows, video play/pause rings with a progress indicator, a "click & hold" prompt — rather than the default OS cursor. This is a deliberate signature interaction, not decoration.
    - **Filterable project grid:** categories (Branding/Digital/Motion/Experiment) are just data tags on each project, filtered client-side via buttons — a fairly simple pattern that reads as sophisticated purely because of the visual execution around it.
    - **A "World" page/easter egg:** a separate draggable 3D globe experience, reinforcing that the studio treats even secondary pages as a chance to do something unexpected — worth remembering as a general principle (put a signature detail somewhere unexpected, not just the homepage hero).
    - **Practical takeaway:** the "3D pastel scene" look isn't a filter or a background image — it's an actual Three.js (or equivalent) scene with real depth, camera movement, and object placement. If a project wants this exact effect, that's the real lift required, not a CSS trick.

**Common thread across all of these:** none of them use a default palette — each color choice ties to the product (industrial gray+orange for a cleaning company, cream+red for an edible, dark+gold for a rustic sauce, sepia+green for a historic hotel, pastel 3D for a design studio). Bold, oversized display type is a recurring device, but the actual typeface changes every time to match the brand's personality — never the same "safe" font twice.

### Cheat sheet — which reference to pull from

| Project type | Pull from | Why |
|---|---|---|
| Food / beverage / CPG / lifestyle product | **Joy Rush** | Custom frame shapes, playful color done on purpose, product-forward layout |
| Service / technical / industrial / B2B | **Cryox** | Disciplined type, monochrome photography + one accent, no clutter |
| Rustic / artisanal / food-with-personality | **Bucks Sauce** | Oversized stencil type, texture, irreverent voice |
| Hospitality / luxury / real estate | **Lasala Plaza Hotel** | Restraint, whitespace, elegant serif, scattered-photo layout |
| Portfolio / creative studio / agency | **Unseen Studio** | Art-directed 3D hero, filterable grid, cinematic hover states |

Use this as a starting anchor, not a strict lookup — cross-pollinate if a project sits between categories (e.g. a luxury food brand could borrow Lasala's restraint + Joy Rush's product photography).

### Rule
If I provide a design example or reference for a specific project, that reference overrides everything else in this file for that project. Match its layout logic, spacing, and feel — don't just take loose inspiration from it.

## 2. Anti-AI-Slop Rule (Most Important)

Never produce a site that reads as "vibe-coded" or AI-generated. The tells to actively avoid:

- **No purple/violet gradients.** This is the single biggest giveaway (see reference: the "purple SaaS gradient hero" look). Banned palette direction unless a reference image explicitly calls for it.
- No generic dark-mode-with-one-accent-color template (near-black bg + single neon/violet accent) used by default.
- No cliché cream-background-plus-serif-plus-terracotta combo either — that's just the other AI default.
- No stock "glassmorphism card grid" layouts, no meaningless floating gradient blobs, no generic rounded-corner SaaS dashboard mockups as hero images.
- No numbered 01/02/03 section markers unless the content is an actual sequence.
- Every project should look like it was designed on purpose, for that specific brand/subject — not a template with the copy swapped in.

Before building, pick a palette and type system that's specific to the actual subject/brand — not a default. State the palette (4–6 named hex values) and type pairing before writing code.

## 3. Typography

- Always use a deliberate, well-paired type system: one characterful display face + one clean body face (+ a utility face for captions/data if needed).
- Never default to system fonts or the first Google Font that comes to mind. Fonts should feel chosen, not defaulted to.
- Set a clear type scale (sizes, weights, letter-spacing) — no ad hoc font sizes scattered through the CSS.

## 4. Responsiveness

- Every site must work cleanly on both desktop and mobile — not just "doesn't break," but properly designed for both.
- Check layout at common breakpoints (mobile ~375–430px, tablet ~768px, desktop ~1280px+).
- Nav, hero, images, and type scale all need explicit mobile treatment, not just a squeeze.

## 5. Mandatory Self-Review Before Calling It Done

After building, always:

1. Re-check the output against the brief and any reference images provided — does it actually match the intended layout/style, or did it drift into a generic template?
2. Scan for the anti-AI-slop tells in Section 2 — if any snuck in, fix them.
3. Check for blunders: broken links, misaligned elements, inconsistent spacing, overlapping text, unreadable contrast, broken responsive behavior, missing hover/focus states.
4. Fix anything caught in the above steps before presenting the final result. Don't just flag issues — resolve them.

## 6. Process

1. Check the reference library (Section 1) and any project-specific references provided.
2. Define palette + type pairing specific to this project's subject (not a default).
3. Build.
4. Run the self-review checklist (Section 5).
5. Deliver.
