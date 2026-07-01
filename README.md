# Vantage — Residences of Dubai

A design-led concept for a multi-listing luxury real estate portal, built to demonstrate, by contrast, what a thoughtfully designed brokerage site looks like next to template-driven competitors.

> Concept piece. Vantage is fictional; every listing, name and figure is invented.

## Stack

- **Vite** + **React 18**
- **Tailwind CSS** (v3, config-file setup)
- **React Router** for the five page templates
- **Framer Motion** for a restrained, considered set of motion

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#F5F1EA` | Warm cream, primary light ground |
| `ink` | `#1C1A17` | Warm off-black, dark sections and text |
| `emerald` | `#1F3D2E` | Deep bottle-green accent (the only accent) |
| `stone-*` | warm greys | Body copy and muted UI |

Type pairs **Fraunces** (optical-size serif, headlines and numerals) with **Hanken Grotesk** (humanist grotesque, body and UI). Sections alternate canvas / ink / emerald grounds for rhythm. Numbered markers appear only where they encode a real sequence (the engagement steps, the gallery, principles).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
  components/   Nav, Footer, PropertyCard, filters, Calendar, BookingFlow, ...
  data/         properties, team, site (the single source for all content)
  lib/          price formatting, image URLs, filter logic
  pages/        Home, Residences, ResidenceDetail, Team, About, NotFound
```

## Notes

- Photography is loaded from Unsplash and resolved in `src/lib/images.js`. `SmartImage`
  falls back to an in-brand gradient if a source fails, so the layout never breaks.
- The private-viewing flow (`BookingFlow`) is a real three-step calendar, time and
  details sequence, not a contact form. Nothing is submitted anywhere; it resolves to a
  confirmation state.
