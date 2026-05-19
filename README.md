# Responsive Portfolio — React + Vite

A single-page portfolio application built with React 18, Vite 5, Tailwind CSS 3, and Framer Motion 11. Fully responsive, dark/light themed, with zero backend — contact form is handled by EmailJS, and all assets are served from environment variables to support CDN overrides.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | React | 18.3 |
| Build tool | Vite + `@vitejs/plugin-react` | 5.3 |
| Styling | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 11.3 |
| Icons | react-icons | 5.2 |
| Email | @emailjs/browser | 4.4 |
| CSS pre-processing | PostCSS + Autoprefixer | 8.4 / 10.4 |
| Fonts | Sora · Inter · JetBrains Mono (Google Fonts) | — |

---

## Project Structure

```
├── index.html                  # Shell — viewport meta, anti-flash theme script, font preconnect
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                        # VITE_* personal info + EmailJS credentials (git-tracked template)
├── .env.local                  # CDN asset URL overrides — git-ignored, optional
│
├── public/
│   └── assets/
│       ├── photo/              # Profile photo fallback
│       ├── logos/              # Company / institution logos fallback
│       ├── projects/           # Project screenshot fallbacks
│       └── cv/                 # Downloadable PDF
│
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Section composition + ThemeProvider wrapper
    ├── index.css               # CSS custom properties, glass-card, gradient-text, animations
    │
    ├── data/
    │   └── content.js          # Single source of truth — all text, URLs, and asset refs via import.meta.env
    │
    ├── context/
    │   └── ThemeContext.jsx    # Dark/light provider — localStorage + system preference
    │
    ├── hooks/
    │   └── useActiveSection.js # IntersectionObserver hook — active nav link tracking
    │
    └── components/
        ├── Navbar.jsx          # Fixed nav, theme toggle, mobile hamburger menu, CV download
        ├── Hero.jsx            # Profile photo, heading, CTA buttons, social links
        ├── About.jsx           # Bio text + skill category cards
        ├── Experience.jsx      # Work timeline
        ├── Projects.jsx        # Featured card + project grid
        ├── Education.jsx       # Education cards with institution logos
        ├── Certifications.jsx  # Certification grid
        ├── Contact.jsx         # EmailJS contact form + direct contact links
        ├── Footer.jsx
        └── ui/
            ├── AnimatedSection.jsx   # Scroll-triggered fade-up wrapper (IntersectionObserver)
            ├── ProjectCard.jsx       # Featured and regular card variants
            ├── SignalBackground.jsx  # Canvas-based animated neural network background
            ├── Tag.jsx               # Teal pill tag
            └── TimelineItem.jsx      # Single timeline entry
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill the environment file
cp .env .env.local   # optional — for CDN overrides

# 3. Start the dev server (http://localhost:5173)
npm run dev

# 4. Production build → /dist
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## Environment Variables

All variables are prefixed with `VITE_` so Vite exposes them to the browser via `import.meta.env`.

### `.env` — required

```env
# Contact info
VITE_EMAIL=
VITE_PHONE=
VITE_LOCATION=
VITE_LINKEDIN=
VITE_GITHUB=

# Asset paths (local fallbacks)
VITE_PHOTO=/assets/photo/photo.png
VITE_LOGO=/assets/logos/logo.png
VITE_CV=/assets/cv/resume.pdf

# EmailJS (contact form)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

### `.env.local` — optional CDN overrides

Used to point assets to a CDN (e.g., Cloudinary) instead of the `public/` folder. Git-ignored. When absent, the app falls back to the paths declared in `.env`.

```env
# Profile photo from CDN
VITE_PHOTO=https://res.cloudinary.com/<cloud>/image/upload/photo.png

# Logo overrides
VITE_LOGO=https://res.cloudinary.com/<cloud>/image/upload/logo.png
VITE_LOGO_COMPANY_A=https://...
VITE_LOGO_SCHOOL_A=https://...

# Project images
VITE_IMG_PROJECT_A=https://...
VITE_IMG_PROJECT_B=https://...
```

### EmailJS template variables

Create a template at [emailjs.com](https://www.emailjs.com) using these exact variable names:

```
{{from_name}}    — sender name
{{from_email}}   — sender email
{{subject}}      — email subject
{{message}}      — message body
```

---

## Content Architecture

All portfolio content is centralized in `src/data/content.js`. Components consume it as named exports — no text or asset URL is hardcoded in any component. To update any section, edit only that file.

```js
// src/data/content.js
export const personal = { name, title, photo, cv, github, linkedin, email, ... }
export const skills   = [ { category, items[] }, ... ]
export const experience = [ { company, logo, role, period, bullets[] }, ... ]
export const projects   = [ { title, image, description, tech[], github, live }, ... ]
export const education  = [ { school, logo, degree, period }, ... ]
export const certs      = [ { title, issuer, logo, date, link }, ... ]
```

---

## Theme System

| Concern | Implementation |
|---|---|
| Detection | `window.matchMedia('prefers-color-scheme: dark')` on first visit |
| Persistence | `localStorage` key `portfolio-theme` |
| Application | `.dark` class toggled on `<html>` |
| Tailwind config | `darkMode: 'class'` |
| CSS variables | Defined in `:root` and `.dark` blocks in `index.css` |
| Anti-flash | Inline `<script>` in `index.html` applies theme before first paint |

CSS custom properties used throughout:

```css
--bg-primary      --bg-secondary     --bg-elevated
--text-primary    --text-secondary   --text-muted
--accent          --accent-hover     --accent-glow
--accent-border   --border-subtle    --section-tint
--nav-scrolled-bg --menu-overlay-bg
```

---

## Animation System

Framer Motion is used for all motion. Key patterns:

- **Entrance animations** — `initial / animate` on mount with staggered `delay` via the `fadeUp(delay)` factory in `Hero.jsx`
- **Scroll-triggered** — `whileInView` + `viewport={{ once: true, margin }}` on section cards
- **Continuous** — `animate` with array keyframes (`[0, -12, 0]`) for the floating profile photo
- **Page transitions** — `AnimatePresence` for the mobile menu overlay
- **Canvas animation** — `SignalBackground.jsx` renders a 4-layer neural network (4→6→6→3 nodes) on a `<canvas>`. It pauses via `IntersectionObserver` when off-screen and respects `prefers-reduced-motion`.

---

## Responsive Breakpoints

Tailwind breakpoints used (mobile-first):

| Prefix | Min-width | Use |
|---|---|---|
| _(base)_ | 0px | Single-column stacked layout |
| `sm:` | 640px | 2-column grids (certifications, form fields) |
| `md:` | 768px | Desktop nav, 2-column project grid |
| `lg:` | 1024px | 2-column hero/about layouts, larger photo |

No custom CSS `@media` queries — all responsiveness is via Tailwind utility prefixes.

---

## Key UI Utilities (`index.css`)

```css
.gradient-text    /* teal → cyan → indigo gradient on text via background-clip */
.glass-card       /* semi-transparent background + backdrop-filter blur + border */
.section-alt      /* subtle tint for alternating section backgrounds */
.dot-grid         /* radial-gradient dot-pattern background */
.photo-ring       /* pulsing box-shadow animation on the profile photo */
.img-fallback     /* gradient background shown when an image fails to load */
.img-overlay-top  /* bottom-to-transparent gradient over project card images */
.img-overlay-right /* left-to-right gradient for featured card image blend */
.nav-scrolled     /* frosted-glass navbar style after scroll > 50px */
.menu-overlay     /* full-screen frosted overlay for mobile nav */
```

---

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set all `VITE_*` environment variables in the Vercel dashboard
4. Deploy — `vercel.json` configures SPA routing automatically

### GitHub Pages / static host

```bash
npm run build
# Deploy the contents of /dist
# If not deploying to the domain root, set `base` in vite.config.js
```

---

## License

[MIT](./LICENSE) © 2026 Montassar Laboudi
