# Montassar Laboudi — Personal Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

Live at: [montassar-laboudi.vercel.app](https://montassar-laboudi.vercel.app)

---

## Stack

- **React 18** — component architecture
- **Vite 5** — dev server and production bundler
- **Tailwind CSS 3** — utility-first styling with custom teal palette and dark mode
- **Framer Motion 11** — scroll-triggered and entrance animations
- **EmailJS** — contact form email delivery (no backend)
- **react-icons** — icon library

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, tagline, CTA buttons, social links, animated profile photo |
| **About** | Bio and skill categories (ML, Signal Processing, Data Science, Tooling) |
| **Experience** | Timeline of 3 internships (CEA, dB.Sense, Sharing Technologies) |
| **Projects** | 9 projects — 1 featured (AnimeGPT) + 8 regular cards |
| **Education** | ENIB, ENIT, IPEIEM with institution logos |
| **Certifications** | 6 certs — Oracle, NVIDIA, MathWorks, OpenCV, DataCamp |
| **Contact** | EmailJS-powered form + direct contact info |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              ← fixed nav, theme toggle, mobile menu, CV download
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Education.jsx
│   ├── Certifications.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ui/
│       ├── AnimatedSection.jsx ← reusable intersection-observer scroll wrapper
│       ├── ProjectCard.jsx     ← featured + regular card variants
│       ├── SignalBackground.jsx ← canvas-based animated neural network background
│       ├── Tag.jsx
│       └── TimelineItem.jsx
├── context/
│   └── ThemeContext.jsx        ← dark/light provider, localStorage + system preference
├── data/
│   └── content.js              ← all text content and asset URLs (reads from .env)
├── hooks/
│   └── useActiveSection.js     ← intersection observer for active nav link
├── App.jsx
├── main.jsx
└── index.css                   ← CSS variables, glass-card, gradient utilities
public/
└── assets/
    ├── photo/                  ← montassar.png
    ├── projects/               ← project screenshots
    ├── logos/                  ← company and certification logos
    └── cv/                     ← Resume_Montassar__Laboudi_Portfolio.pdf
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Environment Variables

All variables must be prefixed with `VITE_` to be exposed to the browser.

### `.env` — personal info and EmailJS credentials

```env
# Personal info
VITE_EMAIL=
VITE_PHONE=
VITE_LOCATION=
VITE_LINKEDIN=
VITE_GITHUB=
VITE_PHOTO=
VITE_CV=

# EmailJS — contact form
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

### `.env.local` — external asset URLs (optional, overrides `.env`)

Used to serve photos, logos, and project images from Cloudinary (or any CDN) instead of the `public/` folder.

```env
# Profile photo
VITE_PHOTO=https://res.cloudinary.com/.../montassar.png

# Company / institution logos
VITE_LOGO_CEA=...
VITE_LOGO_ENIB=...
VITE_LOGO_ENIT=...
# etc.

# Project images
VITE_IMG_ANIMEGPT=...
VITE_IMG_DEEPLEARNING=...
# etc.
```

> `.env.local` is git-ignored. When not present, the app falls back to the paths set in `.env`.

### EmailJS template variables

Create a template at [emailjs.com](https://www.emailjs.com) using these variables:

- `{{from_name}}` — sender's name
- `{{from_email}}` — sender's email
- `{{subject}}` — subject line
- `{{message}}` — message body

---

## Theme System

- Detects system preference on first visit (`prefers-color-scheme`)
- Persists choice to `localStorage` under the key `portfolio-theme`
- Toggle button in the navbar switches between dark and light
- Uses CSS custom properties (defined in `index.css`) that flip on the `dark` class applied to `<html>`
- Tailwind `darkMode: 'class'` — configured in `tailwind.config.js`

---

## Customizing Content

All portfolio content — personal info, skills, experience, projects, education, certifications — is centralized in [`src/data/content.js`](src/data/content.js). No content is hardcoded in components. Edit that file to update any section without touching the UI.

---

## Deployment

**Vercel (recommended):**

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all `VITE_*` environment variables in the Vercel dashboard
4. Deploy — `vercel.json` handles SPA routing automatically

**GitHub Pages:**

```bash
npm run build
# Deploy the contents of /dist
# Note: configure your base path in vite.config.js if not deploying to root
```

---

## License

All rights reserved — Montassar Laboudi, 2026.
