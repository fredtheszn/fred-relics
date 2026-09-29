# FRED RELICS — Brand Experience Website

> **"NOT JUST ACCESSORIES. RELICS."**

A cinematic, editorial web experience for **FRED RELICS** — built around the philosophy that accessories are not disposable fashion, but meaningful artifacts that carry memories and outlive trends.

---

## ⚡ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Syne (Headings), Space Grotesk (Labels & Serials), Inter (Editorial Body)

---

## 🚀 Getting Started

### 1. Clone the repository
`ash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
`

### 2. Install dependencies
`ash
npm install
`

### 3. Start local development server
`ash
npm run dev
`
The site will run at http://localhost:5173/.

### 4. Build for production
`ash
npm run build
`
Generates optimized static assets in the dist/ directory.

---

## 📂 Project Architecture

`
├── public/
│   ├── brand/          # Transparent SVG/PNG brand marks & lockups
│   ├── images/relics/  # Product editorial photography
│   └── videos/         # Cinematic hero campaign video
├── src/
│   ├── components/     # UI Components (Navbar, Footer, CartDrawer, etc.)
│   ├── context/        # CartContext & global modal state
│   ├── data/           # Relics catalog and collections data
│   ├── pages/          # Home, Shop, Collections, Product, About
│   ├── App.jsx         # Routing & Lenis smooth scroll provider
│   └── index.css       # Tailwind v4 theme & typography setup
└── vite.config.js
`

---

## 🛡️ License

Private & proprietary to FRED RELICS. All rights reserved.
