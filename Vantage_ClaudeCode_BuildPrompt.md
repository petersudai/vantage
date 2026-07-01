# Build Prompt — Vantage Residences (Multi-Listing Luxury Real Estate Concept)

Paste this directly into Claude Code as the project brief.

---

## Project Overview

Build a concept website for **Vantage**, a fictional luxury real estate brokerage operating in Dubai. This is a portfolio piece used to pitch real Dubai brokerage founders on a redesign of their own multi-listing portals. It needs to look like a genuinely world-class, design-led real estate brand, the kind of site that would be considered for Awwwards Site of the Day, not a generic template or an obviously AI-generated layout.

Stack: Vite + React + Tailwind CSS.

## Design Direction

Avoid generic AI-default design choices. Before building, think through the design plan and check: would this be the default output for "luxury real estate site" from any AI tool? If so, revise it until the choices feel specific to this brand, not a generic premium template.

**Color palette** (warm stone and emerald, distinct from typical navy/gold luxury real estate sites):
- Base/light background: warm stone/cream, around `#F5F1EA`
- Dark sections: warm off-black, around `#1C1A17`, not navy or pure black
- Accent: deep emerald/bottle green, around `#1F3D2E`
- Supporting neutral: warm grey for body text, avoid pure black text on white

**Typography:** Pair a refined serif (for headlines, evokes editorial luxury) with a clean, restrained sans-serif (for body and UI). Avoid default-feeling system font pairings. Make a deliberate choice and justify it through the design, don't default to Inter plus a generic serif without consideration.

**Structure and rhythm:** Use alternating light and dark sections to create visual rhythm, similar in spirit to high-end editorial sites, not as a literal copy of any reference, but as a structural principle. Numbered markers, eyebrows, and dividers should only appear where they encode real meaning (e.g., a genuine sequence or process), not as decoration.

**Motion:** Use animation deliberately and sparingly, a considered page-load sequence, scroll-triggered reveals on key moments, subtle hover micro-interactions. Avoid scattering animation everywhere, restraint reads as more premium than excess, and over-animation is a tell that screams AI-generated.

**Copy:** Write all copy in a confident, editorial tone, no em dashes or hyphens used as sentence connectors anywhere in the copy. Avoid generic real estate brochure language ("stunning views," "luxury living awaits"). Write the way a genuinely good copywriter for an elite brand would, specific, restrained, a little understated.

## Pages to Build

### 1. Homepage
- Hero section with a featured/flagship property, strong headline, brief brand statement
- Trust/stats row integrated into the hero or immediately below it (e.g., years active, total residences represented, regions covered), styled as part of the design, not a disconnected stat block
- Full property grid below, showing all listings as consistent cards (image, price, location tag, beds/baths, property type). One consistent visual style and one consistent call-to-action style throughout, no competing button colors or styles
- A short "About Vantage" section or teaser linking to the about page

### 2. Property Listings Grid (can be part of homepage or its own page)
- Filterable by property type (apartment, villa, commercial), price range, and location/area
- Filters should feel premium and intentional, not default HTML select dropdowns with no styling
- Calm, organized grid, avoid the cluttered "wall of identical cards with competing colored tags" look common on standard portals

### 3. Individual Property Detail Page (template, reused for all listings)
- Hero image or gallery for the property
- Key stats (price, size, bedrooms, bathrooms, floor)
- Description copy in the brand's editorial voice
- Curated amenities list
- Image gallery
- Location context (distance to key landmarks, similar to "X minutes to Y")
- A private viewing booking flow: a real calendar/date and time picker, not a generic contact form
- This template should be built once and populated with 8 to 10 fictional but realistic listings

### 4. Team / Agents Page
- A clean grid of team member cards: placeholder headshot image, name, title/role, contact method
- Should feel restrained and professional, not a generic "meet our team" template, consider how a high-end brand would present its people (more editorial, less corporate stock-photo grid)
- Include 4 to 6 placeholder team members with realistic names and titles (e.g., Founder & CEO, Senior Property Consultant, Head of Client Relations, Property Consultant)

### 5. About Page
- Brief brand story and positioning, short is fine, this is a concept site, doesn't need extensive depth
- Could reuse some of the trust/stats elements from the homepage in a different presentation

## Property Data

Populate with 8 to 10 fictional but realistic Dubai listings:
- Mix of apartments, villas, and at least one commercial listing
- Spread across recognizable Dubai areas: Downtown Dubai, Palm Jumeirah, Dubai Hills Estate, Business Bay, Jumeirah Village Circle
- Realistic AED pricing in the 1.1M to 8M range
- Realistic specs (size in sqft, bedrooms, bathrooms, floor where relevant)
- Realistic but clearly fictional property names (avoid using any real building or development names)

## What This Site Needs to Prove (context for design decisions)

This concept exists to demonstrate, by contrast, what a thoughtfully designed multi-listing brokerage portal looks like compared to typical template-driven competitors. Specifically it should avoid:
- Disconnected trust claims with no visual backing
- Competing call-to-action colors and styles on the same page
- Generic dropdown-heavy search/filter UX
- A cluttered grid of small, visually identical property cards with multiple colored tags fighting for attention
- Generic stock contact forms instead of a real booking experience

Every design decision should implicitly answer "how is this better than the default real estate portal," without ever saying so in the copy itself.

## Final Check Before Building

Before writing code, sketch the structural and visual plan, then review it against this brief: if any part of the plan is what you would produce by default for any generic "luxury real estate site" prompt, revise it until it feels specific to Vantage. Only proceed to code once the plan feels deliberate and distinct.
