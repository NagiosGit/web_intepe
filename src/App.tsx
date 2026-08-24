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
import { PaymentsPage } from './pages/PaymentsPage';
import { BusinessCardPage } from './pages/BusinessCardPage';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080B0E] text-slate-100 font-sans selection:bg-[#FF7120] selection:text-black flex flex-col antialiased relative cyber-grid">
        {/* Architectural vertical body lines (ChainGPT Labs style) */}
        <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-7xl mx-auto px-4 opacity-15">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Sticky Cyber Header */}
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
            <Route path="/pagos" element={<PaymentsPage />} />
            <Route path="/link-pagos" element={<PaymentsPage />} />
            <Route path="/tarjeta-presentacion" element={<BusinessCardPage />} />
            <Route path="/tarjeta" element={<BusinessCardPage />} />
            <Route path="/papeleria/tarjeta" element={<BusinessCardPage />} />
            <Route path="/papeleria" element={<BusinessCardPage />} />
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
