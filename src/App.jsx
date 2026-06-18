import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TBRTechnologies from './home2';
import ServicePage from './pages/ServicePage';
import LinkHubPage from './pages/LinkHubPage';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Refresh AOS on route change
  return (
    <div>
      <BrowserRouter>
        <AOSRefresh />
        <Routes>
          <Route path="/" element={<TBRTechnologies />} />
          <Route path="/service/:serviceSlug" element={<ServicePage />} />
          <Route path="/links/:subPage" element={<LinkHubPage />} />
          <Route path="/links" element={<LinkHubPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Helper component to refresh AOS on route changes
function AOSRefresh() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.refresh();
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default App;

