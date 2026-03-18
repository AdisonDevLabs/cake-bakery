# 🎨 Brand Management Directory

This folder (`public/brands/`) is the heart of the multi-tenant architecture. The web application dynamically fetches data, text, product catalogs, and images from the subdirectories in here. 

Rather than hardcoding text in `src/`, all client-specific content is stored here as JSON.

## 🏗️ Structure of a Brand Folder

Each brand folder must contain its own custom assets and configuration JSONs. The typical structure includes:

- `brand.json` - Core identity (name, primary colors, typography preferences).
- `products.json` - The catalog of cakes and items available in the shop.
- `content.json` - Marketing copy used on the Home, About, and Contact pages.
- `/images/` - A directory holding the logo, hero banners, and product photos.

## 🛠️ How to Create a New Brand

We have a built-in Node.js script to automate the creation of new clients!

From the root directory of the project, run:

```bash
pnpm run new-brand <your-brand-id>
```

**Example:**
```bash
pnpm run new-brand velvet-crumbs
```

### What does the script do?
1. It copies the `_template` folder inside this directory and duplicates it into a new folder named `<your-brand-id>`.
2. It reads all brand folders and updates `registry.json`.
3. The Admin Dashboard in the app reads `registry.json` to let you easily switch to your new brand.

## 🗃️ The `registry.json` File

This file acts as the master list of all available brands. **Do not edit it manually.** The `make-brand.js` script will automatically regenerate and update this file whenever you add a new brand.

If you ever need to manually force a regeneration of `registry.json`, run:
```bash
node make-brand.js
```
(without providing a brand ID).
