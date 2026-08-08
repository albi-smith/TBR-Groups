import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Globe } from 'lucide-react';
import { linksConfig } from '../data/linksConfig';
import Picture from '../components/Picture';
import '../styles/LinkHub.css';

// Custom lightweight SVG Icons for social platforms to avoid missing brand icons in lucide-react
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Telegram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const WhatsApp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// Map icon string names to components
const iconMap = {
  Globe,
  Instagram,
  Youtube,
  Telegram,
  WhatsApp,
  Facebook,
};

function HeroSection({ hero }) {
  return (
    <header className="lh-hero">
      <Picture
        src={hero.logo}
        webp={hero.logoWebp}
        avif={hero.logoAvif}
        alt={`${hero.title} logo`}
        className="lh-hero-logo"
        fetchPriority="high"
      />
      <div className="lh-hero-text">
        <h1 className="lh-hero-title">{hero.title}</h1>
        <p className="lh-hero-subtitle">{hero.subtitle}</p>
      </div>
    </header>
  );
}

function BusinessCard({ business }) {
  return (
    <article className="lh-card">
      <div className="lh-card-header">
        <Picture
          src={business.logo}
          webp={business.logoWebp}
          avif={business.logoAvif}
          alt={`${business.title} logo`}
          className="lh-card-logo"
          fetchPriority="high"
        />
        <h2 className="lh-card-title">{business.title}</h2>
      </div>
      <p className="lh-card-desc">{business.description}</p>
      <div className="lh-buttons-list">
        {business.buttons.map((btn, idx) => {
          const IconComponent = iconMap[btn.icon] || Globe;
          return (
            <a
              key={idx}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lh-btn"
            >
              <span className="lh-btn-icon" style={{ color: btn.color }}>
                <IconComponent size={18} />
              </span>
              <span>{btn.label}</span>
            </a>
          );
        })}
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="lh-footer">
      <p className="lh-footer-text">&copy; 2026 TBR Groups</p>
    </footer>
  );
}

export default function LinkHubPage() {
  const { subPage } = useParams();

  // Map friendly subPage parameter to actual business key
  const targetKey = subPage ? (
    subPage.toLowerCase().includes('trade') ? 'tbrtraders' :
    subPage.toLowerCase().includes('education') || subPage.toLowerCase().includes('edu') ? 'tbreducation' :
    subPage
  ) : null;

  // Determine ordering: prioritize the business matched by URL subPage parameter
  const businessKeys = Object.keys(linksConfig.businesses);
  
  // Sort key list: put matched targetKey at first index
  const orderedKeys = [...businessKeys].sort((a, b) => {
    if (a === targetKey) return -1;
    if (b === targetKey) return 1;
    return 0;
  });

  // Page-specific SEO meta tags
  const helmetMeta = {
    tbreducation: {
      title: 'TBR Education – Computer & Technology Courses | TBR Groups',
      description: 'Explore computer, software, programming, AI and technology courses with practical learning and career-focused training from TBR Education.',
    },
    tbrtraders: {
      title: 'TBR Traders – Computer, e-Seva & Trade Services | TBR Groups',
      description: 'Computer sales and service, e-Seva, business support and supply of dry fruits, honey, edible oils and bottled water from TBR Traders.',
    },
  }[targetKey] || {
    title: 'TBR Groups – Links | Technology, e-Seva & Business Services',
    description: 'Explore TBR Groups services, including computer hardware, custom software, website development, e-Seva, business support and trade supplies.',
  };
  const helmetTitle = helmetMeta.title;
  const helmetDescription = helmetMeta.description;
  const canonicalUrl = `https://tbr-groups.vercel.app/links${subPage ? `/${subPage}` : ''}`;

  return (
    <main className="link-hub-container">
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={helmetDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="link-hub-content">
        <HeroSection hero={linksConfig.hero} />
        {orderedKeys.map((key) => (
          <BusinessCard key={key} business={linksConfig.businesses[key]} />
        ))}
        <Footer />
      </div>
    </main>
  );
}
