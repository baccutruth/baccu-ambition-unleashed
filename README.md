# BACCU™ Ambition Unleashed

A lightweight, mobile-first South African youth platform.

**Your next opportunity starts here.** Discover. Learn. Create. Connect.

## Public release

https://baccutruth.github.io/baccu-ambition-unleashed/

Pull requests run release checks but do not deploy. Merge to `main` triggers the single GitHub Pages deployment workflow and is the production release action.

## First-version features

- Premium BACCU black, metallic-gold and off-white visual system.
- Responsive navigation and mobile layout.
- Searchable, filterable Opportunity Hub guidance pathways.
- Daily Wisdom & AI Toolkit with copy-ready prompts and a prompt builder.
- Civic & Youth Connect official institution links.
- SpaniXpress Publishing Assistant: copy-ready, human-reviewed Facebook Group posts and branded PNG export.
- PWA manifest, service-worker app shell and installation guidance.
- No login, tracking, AI API, paid backend or personal-data collection.

## Ekurhuleni Community Bursary notice

The City's official 2027 notice states that applications close **30 November 2026**. Its separate application portal was observed displaying an unhandled error on 12 November 2026. Applicants should read the [official City notice](https://www.ekurhuleni.gov.za/campaigns/applications-for-the-2027-community-bursary-programme-now-open/) for eligibility, required documents and contact numbers, then retry the [application portal](https://bursaries.ekurhuleni.gov.za/) later. Recheck both sources before applying.

The Opportunity Hub is not a live vacancies feed. Do not infer deadlines, amounts, eligibility or availability. Do not imply partnerships. Every live listing must include provider, official source, title, type, eligibility, location, status, deadline where stated, application steps, direct official URL and last-checked date. See [verification standard](docs/OPPORTUNITY-VERIFICATION.md).

National opportunities remain eligible across all nine provinces. Display order prioritises Actonville, Benoni and Ekurhuleni, then the rest of Gauteng, then the rest of South Africa.

## SpaniXpress publishing assistant

The [SpaniXpress assistant](spanixpress.html) prepares a Facebook caption and optional PNG artwork from details the administrator checks against an official employer or programme-owner source. The tool requires a source URL, application URL, source-check date and human attestation. This attestation is not automatic BACCU verification. The administrator must review and paste the content into the [SpaniXpress Facebook Group](https://www.facebook.com/share/g/1Q8yaPsWVt/) and publish or schedule through Facebook. Direct third-party Group publishing is not supported. See [feature safeguards](docs/SPANI-XPRESS-PUBLISHING-ASSISTANT.md).

## PWA installation

Android: open the site in Chrome and use its Install app prompt or menu → Install app / Add to Home screen. iPhone: open in Safari, Share → Add to Home Screen. Options vary by device. Device testing remains part of release QA.

The service worker caches the local app shell. The homepage, internal sections, search and filters remain available offline after the first successful load. BACCU explains when external provider websites need internet and prevents offline link clicks from opening an unhelpful browser error page.

## Privacy and cost

The static site does not collect application details, create accounts or call paid AI services. The prompt builder only prepares text for users to copy into an AI assistant. The SpaniXpress assistant prepares a post locally in the browser; it does not collect Facebook credentials, use access tokens or publish directly to groups.

## Trust disclaimer

> BACCU shares information for educational purposes. Opportunities remain subject to provider requirements, eligibility and selection decisions. BACCU does not guarantee employment, funding or earnings.

## Release controls

One canonical workflow publishes Pages. Pull requests run checks but do not deploy. Merge to `main` is the production deployment action. Do not announce a changed release until deployment and post-deploy checks pass.

**Built in the Kasi. Driven by Faith. Walk in the Light. ✝**
