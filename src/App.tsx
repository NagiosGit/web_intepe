import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { OutsourcingTIPage } from './pages/OutsourcingTIPage';
import { HelpDeskPage } from './pages/HelpDeskPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { MaintenancePage } from './pages/MaintenancePage';
import { GoogleWorkspacePage } from './pages/GoogleWorkspacePage';
import { SoftwareDevelopmentPage } from './pages/SoftwareDevelopmentPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { DataTreatmentPage } from './pages/DataTreatmentPage';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-sky-500 selection:text-white flex flex-col antialiased">
        {/* Sticky Corporate Header */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/outsourcing-ti" element={<OutsourcingTIPage />} />
            <Route path="/help-desk" element={<HelpDeskPage />} />
            <Route path="/infraestructura-tecnologica" element={<InfrastructurePage />} />
            <Route path="/mantenimiento" element={<MaintenancePage />} />
            <Route path="/google-workspace" element={<GoogleWorkspacePage />} />
            <Route path="/desarrollo-software" element={<SoftwareDevelopmentPage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="/cotizador-outsourcing" element={<CalculatorPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/tratamiento-datos" element={<DataTreatmentPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Corporate Footer */}
        <Footer />

        {/* Discrete WhatsApp Floating Button */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
