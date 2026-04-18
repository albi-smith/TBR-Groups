import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TBRTechnologies from './home2';
import ServicePage from './pages/ServicePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TBRTechnologies />} />
          <Route path="/service/:serviceSlug" element={<ServicePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
