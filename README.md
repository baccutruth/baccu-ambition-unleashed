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

Opportunity publication must follow the [BACCU Opportunity Verification Standard](docs/OPPORTUNITY-VERIFICATION.md). Automated release checks protect the official source directory and its local-priority order.

## Official youth access channels

The platform presents national opportunities with a local priority for Actonville, Benoni and the wider City of Ekurhuleni. Opportunities from every South African province remain eligible for inclusion.

The standing official channels linked in Civic & Youth Connect are:

1. **City of Ekurhuleni Community Bursary** — [application portal](https://bursaries.ekurhuleni.gov.za/) and [2027 programme notice](https://www.ekurhuleni.gov.za/campaigns/applications-for-the-2027-community-bursary-programme-now-open/). City-resident programme, not a national bursary.
2. **SA Youth** — [official platform](https://sayouth.mobi/), [about and eligibility](https://sayouth.mobi/About/EN), and [registration](https://sayouth.mobi/Join). The network describes itself as free and data-free; individual opportunities may be location-specific.
3. **South African Government youth opportunities hub** — https://www.gov.za/issues/government-and-opportunities-youth
4. **NYDA** — https://www.nyda.gov.za/
5. **NSFAS** — https://www.nsfas.org.za/
6. **Funza Lushaka** — https://www.funzalushaka.doe.gov.za/
7. **City of Ekurhuleni eRecruitment** — https://rems.ekurhuleni.gov.za/eRecruitment/
8. **Godfrey Pitje Tertiary Assistance Fund** — https://gptaf.ekurhuleni.gov.za/
9. **City of Ekurhuleni youth notices** — https://www.ekurhuleni.gov.za/category/press-releases/youth/
10. **SEDFA** — https://www.sedfa.org.za/
11. **MICT SETA** — https://mict.org.za/
12. **Department of Higher Education and Training** — https://www.dhet.gov.za/

These are official source directories and portals, not evidence that a particular programme or vacancy is currently accepting applications. A link does not imply a partnership or endorsement. Record the source, eligibility, status, official closing date and last-verified date for every live listing. Remove expired calls from the active-opportunity view. Continue adding official provincial, municipal, university, TVET, SETA and employer sources across all nine provinces.
