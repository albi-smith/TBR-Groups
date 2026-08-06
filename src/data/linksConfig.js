import tbrEducationLogo from '../link/tbr education logo.png';
import tbrTradersLogo from '../link/tbr groups logo.png';
import tbrEducationLogoWebp from '../link/tbr education logo.webp';
import tbrTradersLogoWebp from '../link/tbr groups logo.webp';

export const linksConfig = {
  hero: {
    logo: "/tbrlogo.jpeg",
    logoWebp: "/tbrlogo.webp",
    title: "TBR Groups",
    subtitle: "Technology • Education • Services",
  },
  businesses: {
    tbreducation: {
      id: "tbreducation",
      title: "TBR Education",
      description: "Computer courses, software training, AI, programming and career skills.",
      logo: tbrEducationLogo,
      logoWebp: tbrEducationLogoWebp,
      buttons: [
        {
          label: "Website",
          url: "https://tbr-education.vercel.app/", // Placeholder
          icon: "Globe",
          color: "#2563eb",
        },
        {
          label: "Instagram",
          url: "https://www.instagram.com/tbr.education/", // Placeholder
          icon: "Instagram",
          color: "#db2777",
        },
        
        {
          label: "YouTube",
          url: "https://youtube.com/@tbreducation?si=WUcXLZy7dMUOZtjd", // Placeholder
          icon: "Youtube",
          color: "#dc2626",
        },
        {
          label: "WhatsApp",
          url: "https://wa.me/9487635294",
          icon: "WhatsApp",
          color: "#16a34a",
        },
        {
          label: "Facebook",
          url: "https://www.facebook.com/profile.php?id=61590702643278", // Placeholder
          icon: "Facebook",
          color: "#1877f2",
        },
        {
          label: "Telegram",
          url: "https://t.me/tbr_education", // Placeholder
          icon: "Telegram",
          color: "#2563eb",
        },
        
      ],
    },
    tbrtraders: {
      id: "tbrtraders",
      title: "TBR Traders",
      description: "Computer sales, service, e-services, registrations and business support.",
      logo: tbrTradersLogo,
      logoWebp: tbrTradersLogoWebp,
      buttons: [
        {
          label: "Website",
          url: "/", // Main site
          icon: "Globe",
          color: "#2563eb",
        },
        {
          label: "Instagram",
          url: "https://instagram.com/tbrtraders", // Placeholder
          icon: "Instagram",
          color: "#db2777",
        },
        {
          label: "YouTube",
          url: "https://youtube.com/@tbr-groups?si=O8TzbQ9URrNxtu7R", // Placeholder
          icon: "Youtube",
          color: "#dc2626",
        },
        {
          label: "WhatsApp",
          url: "https://wa.me/919952773759",
          icon: "WhatsApp",
          color: "#16a34a",
        },
        {
          label: "Facebook",
          url: "https://www.facebook.com/profile.php?id=61590662414541", // Placeholder
          icon: "Facebook",
          color: "#1877f2",
        },
        {
          label: "Telegram",
          url: "https://t.me/tbr_traders", // Placeholder
          icon: "Telegram",
          color: "#2563eb",
        },
        
      ],
    },
  },
};
