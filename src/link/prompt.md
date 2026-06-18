Create a modern, responsive one-page Link Hub for TBR Groups (similar to Linktree) hosted at:

/links/tbreducation
/links/tbrtraders

Requirements:

- Clean, professional, mobile-first design
- Fast loading
- Card-based layout with subtle hover effects
- React + Vite + React Router
- Responsive for mobile, tablet, and desktop

Hero Section:
- TBR Groups logo
- Title: TBR Groups
- Subtitle: Technology • Education • Services

Dynamic Ordering:

For /links/tbreducation:
1. TBR Education
2. TBR Traders

For /links/tbrtraders:
1. TBR Traders
2. TBR Education

Business Cards:

TBR Education
Description: Computer courses, software training, AI, programming and career skills.
Buttons:
- Website
- Instagram
- YouTube
- Telegram
- WhatsApp

TBR Traders
Description: Computer sales, service, e-services, registrations and business support.
Buttons:
- Website
- Instagram
- YouTube
- Telegram
- WhatsApp

Additional Requirements:

- Display platform icons beside each button
- Open links in a new tab
- Smooth animations
- Modern gradient hero section
- Attractive card design with business logo/image support
- SEO-friendly page titles based on route

Footer:
© 2026 TBR Groups

Component Structure:

LinkHubPage
├── HeroSection
├── BusinessCard
└── Footer

Use a single reusable BusinessCard component and dynamically reorder cards based on the URL parameter. Generate complete production-ready React components, routing setup, JSX, CSS, placeholder URLs, and sample data structure for easily managing all links from a single configuration file.