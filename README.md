# BACCU™ Ambition Unleashed

A lightweight, mobile-first South African youth platform.

**Core message:** Your next opportunity starts here.  
**Discover. Learn. Create. Connect.**

## Current first version

- Premium BACCU black, metallic-gold and off-white visual system.
- Responsive navigation and mobile layout.
- Opportunity Hub with searchable, filterable **guidance pathways**.
- Daily Wisdom & AI Toolkit with copy-ready prompts and a prompt builder.
- Civic & Youth Connect with links to public institutions.
- About BACCU and contact route.
- Basic PWA manifest, install prompt and service-worker app shell.
- No login, tracking, AI API, paid backend or personal-data collection.

## Important content distinction

The Opportunity Hub currently contains general resource pathways only. It does not advertise confirmed vacancies, bursaries, grants, learnerships or internships. No live opportunity should be published until the source and every required field have been checked.

For each future live listing, record:

- Provider and official source.
- Opportunity type and title.
- Eligibility and requirements.
- Location.
- Application status.
- Official closing date, only when stated by the provider.
- Official application URL.
- Last verified date.

Do not infer deadlines, amounts, eligibility or availability. Do not imply a partnership from a resource link.

## Trust disclaimer

> BACCU shares information for educational purposes. Opportunities remain subject to provider requirements, eligibility and selection decisions. BACCU does not guarantee employment, funding or earnings.

## Run locally

Serve the repository root with any static HTTP server. The service worker and PWA installation require localhost or HTTPS. No build step is required.

## PWA notes

The service worker caches the local app shell. External provider websites still require an internet connection. Installation support varies by browser and device. Test installation and offline behaviour on target devices before public release.

## Privacy and cost

The first version uses static HTML, CSS and JavaScript. It does not collect application details, create accounts, or call paid AI services. The prompt builder only prepares text for the user to copy into an AI service of their choice.

## Brand

- Matte black: `#0A0A0A`
- Metallic gold: `#D4AF37`
- Off-white: `#F5F5F5`
- Subtle crimson: `#6B0F1A`

**Built in the Kasi. Driven by Faith. Walk in the Light.**

## Release controls

No public deployment is authorised by this repository update. Obtain approval before connecting a public domain or publishing a production release.
