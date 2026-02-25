# BYU PM NetTrek — Silicon Valley 2026

Static site for the BYU Product Management Silicon Valley NetTrek (April 28–May 1, 2026).

## Deployment

1. Push this repo to `byu-strategy/nettrek` on GitHub
2. Go to **Settings > Pages**
3. Set source to **Deploy from a branch**, branch `main`, folder `/ (root)`
4. Site will be live at `byu-strategy.github.io/nettrek`

## Local Preview

Open `index.html` in any browser. No build step required.

## Updating Placeholder Links

All Google Form and Doc links use `#form-placeholder` and are marked with HTML comments like:

```html
<!-- REPLACE: Student RSVP Google Form URL -->
```

Search for `#form-placeholder` to find and replace all placeholder URLs with real ones.

## Files

- `index.html` — The entire site (single page)
- `styles.css` — BYU-branded styles
- `script.js` — Smooth scroll, mobile nav toggle, scroll reveal animations
- `images/` — BYU Strategy logo
