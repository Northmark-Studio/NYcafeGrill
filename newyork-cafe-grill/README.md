# Newyork Cafe & Grill — Website

Static website for Newyork Cafe & Grill, 1145 Inman Ave, Edison, NJ 08820.
Plain HTML/CSS/JS — no build step, no dependencies.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page (hero, about, menu preview, order links, visit/contact) |
| `menu.html` | Full menu |
| `styles.css` | All styling (colors, fonts, layout, animations) |
| `script.js` | Mobile nav, scroll animations, footer year |

## Editing content

- **Menu items & prices** — edit `menu.html`. Each category is a `.ticket` block; each item is one `<li>` line. Copy an existing `<li>` to add an item.
- **Hours / address** — edit the "Visit" section in `index.html` and the footers of both pages.
- **Contact email** — search for `newyorkcafegrill@gmail.com` in both HTML files and replace (appears in the contact button and footer).
- **Order links** — search for `order.online`, `order.store`, `tryotter.com` and replace with your direct ordering URLs.
- **Colors** — edit the CSS variables at the top of `styles.css` (`--espresso`, `--crust`, `--cream`, `--pastrami`, `--olive`).

## Preview locally

Open `index.html` in a browser, or run a tiny server:

```
npx serve .
```

## Deploy to Vercel

Option 1 — drag & drop:
1. Go to https://vercel.com/new
2. Drag this folder onto the page. Done.

Option 2 — CLI:
```
npm i -g vercel
vercel
```
Accept the defaults (no framework, no build command, output directory = `./`).

Every push/redeploy is instant since there is no build step.
