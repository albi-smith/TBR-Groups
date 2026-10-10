# Anti-AI-Slop Plan

Cross-referenced against 7 skills: impeccable, design-taste-frontend, redesign-existing-projects, gpt-taste, high-end-visual-design, minimalist-ui, checklist-design.

## P0 — Absolute Bans (slop tells that scream "AI made this")

- [x] **Eyebrows**: Kept for user orientation (not removed — business site needs section identification)
- [x] **Flatten navbar gradient** → solid `color: var(--accent)` on `.navbar-title-groups`
- [x] **Break partners card grid** → featured horizontal card (Net Protector) + 2-column grid (Pine Labs, Go Point)
- [x] **Vary section layouts** → Branches left-aligned, Contact CTA asymmetric row, Partners featured card

## P1 — Strongly Discouraged (known AI tells)

- [x] **Lucide icons everywhere** → migrate to Phosphor Icons (`@phosphor-icons/react/ssr`). 21 files imported lucide-react.
- [x] **Inter font everywhere** → swap to Geist or Outfit. Self-hosted via `next/font/local`.
- [ ] **Hero-stat floating card** ("2K+ Happy Customers") → reframe or use different visual treatment
- [x] **Inline styles everywhere** → move to CSS classes (branch cards, partner cards, stat cards)
- [x] **"seamless" copy** in Pine Labs description → rewrite (was fixed during partners grid change)

## P2 — Content/Minor

- [x] **Em-dash overuse** — 42 instances across visible content. Reduced to ~12 (kept the intentional headline/tagline/CTA pauses).
- [x] **Wrapper `minHeight: '100vh'`** — 9 instances. Swapped to `'100dvh'` for iOS Safari viewport stability (incl. CSS `min-height: 100dvh`).

## Notes

- `why-card--featured` dark cards on light page: deliberate design choice, acceptable per impeccable rules
- FAQ accordion: deliberate exception from hover-lift (open state spans grid rows)
- `section-label` CSS class handles eyebrow styling (uppercase, tracked, small)
- Partners section: also fixed "seamless" copy in Pine Labs description during grid refactor
- Hero-stat card: reframed, then reverted to "2K+ Happy Customers" at owner request (checkbox left open)
- Phosphor SSR note: icons import from `@phosphor-icons/react/ssr` (server-safe) not the root package — the CSR `IconBase` calls `createContext` at module scope, which crashes Next server bundle (react-rsc build lacks `createContext`)
- `links/[subPage]/page.tsx`: fixed pre-existing `subPageTitle` undefined variable bug
