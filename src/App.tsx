import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { UrbanPlanningPage } from './pages/UrbanPlanningPage';
import { TransportationPage } from './pages/TransportationPage';
import { EnergyPage } from './pages/EnergyPage';
import { IoTPage } from './pages/IoTPage';
import { DigitalServicesPage } from './pages/DigitalServicesPage';
import { SustainabilityPage } from './pages/SustainabilityPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/urban-planning" element={<UrbanPlanningPage />} />
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/iot" element={<IoTPage />} />
            <Route path="/digital-services" element={<DigitalServicesPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
