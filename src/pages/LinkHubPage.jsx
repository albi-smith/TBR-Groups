import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { linksConfig } from '../data/linksConfig';
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
  <svg viewBox="0 0 32 32" fill="none" width="18" height="18" {...props}>
    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/>
    <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#37BBFE"/>
        <stop offset="1" stopColor="#007DBB"/>
      </linearGradient>
    </defs>
  </svg>
);

const WhatsApp = (props) => (
  <svg viewBox="0 0 32 32" fill="none" width="18" height="18" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"/>
    <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"/>
    <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5 9.49989Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5BD066"/>
        <stop offset="1" stopColor="#27B43E"/>
      </linearGradient>
    </defs>
  </svg>
);

// Map icon string names to components
const iconMap = {
  Globe,
  Instagram,
  Youtube,
  Telegram,
  WhatsApp,
};

function HeroSection({ hero }) {
  return (
    <header className="lh-hero">
      <img src={hero.logo} alt={`${hero.title} logo`} className="lh-hero-logo" />
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
        <img src={business.logo} alt={`${business.title} logo`} className="lh-card-logo" />
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

  // Dynamic Page title updates for SEO friendly headers
  useEffect(() => {
    const currentBusiness = linksConfig.businesses[targetKey];
    if (currentBusiness) {
      document.title = `${currentBusiness.title} — Links | TBR Groups`;
    } else {
      document.title = `${linksConfig.hero.title} — Complete Service Solution`;
    }
  }, [targetKey]);

  return (
    <main className="link-hub-container">
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
