# 🍰 Multi-Tenant Bakery E-Commerce SPA

A modern, luxury-focused artisan bakery web application built with **React 19**, **Vite**, **Tailwind CSS 4**, and **TypeScript**. 

This project is tailored to be a **multi-brand** single-page application. It allows you to run multiple distinct bakery websites from a *single codebase* by simply loading different JSON configuration files and images from the `public/brands/` directory.

## ✨ Features

- **Multi-Brand Architecture:** Switch between completely different bakeries. The UI, content, colors, and products update dynamically.
- **Admin Hub:** Built-in dashboard to select which brand's site to preview locally.
- **Developer Mode:** Toggle `DEV_MODE` in `localStorage` to reveal a sticky bottom navigation bar for quick page access.
- **Modern Shopping Experience:** 
  - Dynamic product catalog (`Shop`) with detailed cake views (`CakeDetails`).
  - Slide-out `CartDrawer` with state managed via Context API.
- **Complete Page Suite:** Home, Shop, Custom Orders, Gallery, Testimonials, FAQ, Policies, and Contact.
- **Automated Brand Scaffolding:** Use the built-in CLI script to instantly generate a new client's data structure.

## 📦 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 (+ PostCSS & Autoprefixer)
- **Language:** TypeScript
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React
- **Linting:** ESLint 9

## 📂 Project Structure

```text
cake-bakery/
├── public/                 # Static assets
│   └── brands/             # 🎨 Multi-tenant data (each folder is a different bakery)
├── src/
│   ├── components/         # Reusable UI elements, Admin Dashboard, Cart Drawer
│   ├── context/            # Global state (BrandContext, CartContext)
│   ├── layouts/            # Page layouts like MainLayout
│   ├── pages/              # Main route components (Home, Shop, Contact, etc.)
│   ├── services/           # API/Data fetching logic
│   ├── types/              # TypeScript definitions
│   └── App.tsx             # Root component handling routing and brand locking
├── make-brand.js           # Built-in CLI tool to scaffold new brands
├── package.json
└── vite.config.ts
```

## 🚀 Local Development

1. **Install dependencies:**
   This project uses `pnpm`.
   ```bash
   pnpm install
   ```

2. **Start the dev server:**
   ```bash
   pnpm run dev
   ```

3. **Developing New Brands:**
   Use the `new-brand` script to scaffold a new client:
   ```bash
   pnpm run new-brand <brand-id>
   ```
   *See `public/brands/README.md` for more details on managing brands.*

## 🚢 Deployment (Vercel / Netlify)

This project is a completely Static Site utilizing client-side routing.

1. Push this code to GitHub.
2. Connect the repository to your hosting provider (Vercel, Netlify, Cloudflare Pages).
3. Set the build command to `pnpm run build` and the output directory to `dist`.
4. **To launch a new client:** Fork the repo, use `pnpm run new-brand my-custom-bakery`, swap the placeholder JSON files with real data, and deploy!