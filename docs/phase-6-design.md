# Phase 6 — Design System

## Direction

**Photographic naturalism + glassmorphism.** Dark, moody atmospheric sections that evoke Cretan landscapes at golden hour — deep olive forests, warm amber honey light, rich earth tones. Glassmorphism cards float over these backgrounds with `backdrop-blur`, subtle borders, and inner glow on hover.

## Tailwind v4 Color Palette

Defined in `src/app/globals.css` via `@theme inline`:

| Token               | Value     | Usage                            |
|---------------------|-----------|----------------------------------|
| `brand-amber`       | `#F5A623` | Primary accent / honey gold      |
| `brand-amber-dark`  | `#D4891A` | Amber hover state                |
| `brand-amber-light` | `#FDF0D5` | Light amber (admin/form use)     |
| `brand-dark`        | `#1A3A4A` | Legacy text / fallback           |
| `brand-cream`       | `#FFF9F0` | Legacy light bg / fallback       |
| `brand-warm-gray`   | `#6B7B7F` | Muted text (light contexts)      |
| `brand-blue`        | `#4A90C4` | Secondary (admin, links)         |
| `brand-blue-dark`   | `#3A7AAE` | Blue hover                       |

## Typography

- **Display**: Playfair Display — headings, brand name, section titles (bold, large)
- **Body**: Source Sans 3 — nav, body text, captions (excellent Greek support)

## Photographic Gradient Backgrounds

Defined as CSS classes in `globals.css`. Use inline `style` for per-component tweaks.

| Class           | Evokes                              | Used in             |
|-----------------|-------------------------------------|---------------------|
| `.photo-hero`   | Cretan hillside, golden-hour light  | Hero section        |
| `.photo-amber`  | Capped honeycomb, warm amber shadow | Product categories  |
| `.photo-forest` | Aegean blue, clear sky at dusk      | Why Us, About → Queen rearing |
| `.photo-olive`  | Wild thyme and olive groves         | About → Nucs        |

`.photo-amber` is also used for About → Beekeeping. Sections pair the gradient with
`.noise-layer` and `FloatingHexagons` (`src/components/shared/`) for the floating cells.

Each uses 3–4 layered radial gradients over a dark linear base for depth and dimensionality.

## Film Grain

`.noise-layer` — an absolutely-positioned div (aria-hidden) placed over photographic sections. Uses an SVG `feTurbulence` data-URI at `opacity: 0.04` with `mix-blend-mode: overlay` to add photographic grain and prevent the gradients from looking too digital.

## Glassmorphism Cards

Applied directly with Tailwind utilities. Standard recipe:

```
rounded-2xl
border border-white/[0.1]
bg-white/[0.06]
backdrop-blur-xl
shadow-2xl shadow-black/50
```

Hover state:
```
hover:border-white/[0.18]
hover:bg-white/[0.09]
hover:-translate-y-2
```

Featured/center card uses amber-tinted glass:
```
border-brand-amber/[0.18]
bg-white/[0.08]
hover:border-brand-amber/[0.32]
```

Icon containers within glass cards:
```
rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm
```

## Navbar

`sticky top-0 z-50`. Scroll-reactive via `useEffect` + `useState`:
- **At top**: `bg-black/15 backdrop-blur-md border-b border-white/[0.06]`
- **Scrolled (>48px)**: `bg-black/55 backdrop-blur-xl border-b border-white/[0.08]`

All text is white/white-opacity. Amber accent is used only on the logo subtext and hover states.

## Footer

Dark forest gradient (`linear-gradient(160deg, #060e04 → #040804)`). Noise layer applied. Single amber hairline divider at top. Text at white/25–white/40 opacity for premium muted look.

## Section Transitions

Each dark section fades into the next via an absolutely-positioned gradient overlay at the bottom:
```jsx
<div
  className="absolute bottom-0 inset-x-0 h-28 sm:h-36 pointer-events-none"
  style={{ background: "linear-gradient(to bottom, transparent, #[next-section-base-color])" }}
/>
```

Hero → amber: `#191000`  
Amber → forest: `#040a03`

## Key UI Decisions

- **Full-dark aesthetic**: Body background is `brand-dark` (#1A3A4A); all homepage sections are self-contained dark atmospheric gradients
- **White text throughout**: High contrast on dark backgrounds; opacity (40–70%) for hierarchy
- **Amber as the single accent**: Used sparingly — logo subtext, icon color, CTA buttons, card borders on featured items
- **Mobile-first**: Glass cards stack to single column; navbar hamburger menu inherits glass style
- **No real photography yet**: CSS gradients carry the entire photographic weight until real images are sourced
