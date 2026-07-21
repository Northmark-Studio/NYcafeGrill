# Newyork Cafe & Grill — Website

Single-page static website for Newyork Cafe & Grill, 1145 Inman Ave, Edison, NJ 08820.
Plain HTML/CSS/JS — no build step, no dependencies.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Complete website: hero, banner, about, full menu, order links, and visit/contact |
| `styles.css` | Colors, typography, responsive layout, tickets, images, and animations |
| `script.js` | Mobile navigation, scroll animations, and footer year |
| `images/` | Replaceable banner and menu-category image placeholders |

## Editing content

- **Menu items and prices** — edit the `#menu` section in `index.html`. Each category is a `.ticket` block; each item is one `<li>` line. Copy an existing item to add another.
- **Hours and address** — edit the `#visit` section and footer in `index.html`.
- **Contact email** — search `index.html` for `newyorkcafegrill@gmail.com`.
- **Order links** — search `index.html` for `order.online`, `order.store`, and `tryotter.com`, then replace them with direct restaurant ordering URLs.
- **Colors** — edit the CSS variables at the top of `styles.css` (`--espresso`, `--crust`, `--cream`, `--pastrami`, and `--olive`).

## Replacing images

Current image assets:

- `images/restaurant-hero.jpg` — restaurant photo shown in the header
- `images/cafe-banner.svg` — illustrated banner placeholder
- `images/menu-bagels.svg` — illustrated menu placeholder
- `images/menu-hot-sandwiches.svg` — illustrated menu placeholder
- `images/menu-cold-sandwiches.svg` — illustrated menu placeholder
- `images/menu-wraps.svg` — illustrated menu placeholder
- `images/menu-salads.svg` — illustrated menu placeholder
- `images/menu-coffee-drinks.svg` — illustrated menu placeholder

To use restaurant photos:

1. Add optimized JPG, WebP, or SVG files to `images/`.
2. Update the matching `src` in `index.html`.
3. Update the image `width` and `height` attributes to match the new file's dimensions.
4. Replace the placeholder `alt` text with a short description of the actual photo.

Recommended sizes:

- Banner: about 1600 × 700 pixels.
- Menu images: about 900 × 540 pixels.
- Keep each optimized file reasonably small for fast mobile loading.

The CSS uses `object-fit: cover`, so photos can be larger than these exact sizes while keeping the same visual crop.

## Preview locally

Open `index.html` in a browser, or run a tiny server from this folder:

```sh
npx serve .
```

Then open the local URL and test the Menu, About, and Visit navigation links.

## Deploy to Vercel

Option 1 — drag and drop:

1. Go to https://vercel.com/new
2. Drag this folder onto the page.

Option 2 — CLI:

```sh
npm i -g vercel
vercel
```

Accept the defaults: no framework, no build command, output directory `./`.
