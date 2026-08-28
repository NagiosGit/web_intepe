import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ScrollToTop } from './components/common/ScrollToTop';

// Marketing Pages
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

// Help Desk Application Pages
import { HelpDeskLoginPage } from './pages/helpdesk/HelpDeskLoginPage';
import { UpdatePasswordPage } from './pages/helpdesk/UpdatePasswordPage';
import { ClientDashboardPage } from './pages/helpdesk/ClientDashboardPage';
import { CreateTicketPage } from './pages/helpdesk/CreateTicketPage';
import { TicketListPage } from './pages/helpdesk/TicketListPage';
import { TicketDetailPage } from './pages/helpdesk/TicketDetailPage';
import { TechnicianDashboardPage } from './pages/helpdesk/TechnicianDashboardPage';
import { AdminHelpDeskPage } from './pages/helpdesk/admin/AdminHelpDeskPage';
import { AdminClientsPage } from './pages/helpdesk/admin/AdminClientsPage';
import { AdminClientDetailPage } from './pages/helpdesk/admin/AdminClientDetailPage';
import { AdminTechniciansPage } from './pages/helpdesk/admin/AdminTechniciansPage';

function AppLayout() {
  const location = useLocation();

  // Check if current route is part of the Help Desk Portal
  const isHelpDeskApp = 
    location.pathname.startsWith('/help-desk') ||
    location.pathname.startsWith('/tecnico') ||
    location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-[#FF7120] selection:text-black flex flex-col antialiased relative cyber-grid">
      {/* Architectural vertical body lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-7xl mx-auto px-4 opacity-25">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF7120]/40 to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent hidden md:block"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF7120]/40 to-transparent"></div>
      </div>

      {/* Show Public Navbar only on non-portal pages */}
      {!isHelpDeskApp && <Navbar />}

      {/* Dynamic Route Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Marketing & Service Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/outsourcing-ti" element={<OutsourcingTIPage />} />
          <Route path="/servicios/help-desk" element={<HelpDeskPage />} />
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

          {/* ============================================================ */}
          {/* HELP DESK AUTHENTICATED & MULTI-TENANT APPLICATION ROUTES     */}
          {/* ============================================================ */}
          <Route path="/help-desk/login" element={<HelpDeskLoginPage />} />
          <Route path="/help-desk/cambiar-clave" element={<UpdatePasswordPage />} />
          
          {/* Client Portal */}
          <Route
            path="/help-desk"
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'ADMIN_INTEPE']}>
                <ClientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-desk/tickets"
            element={
              <ProtectedRoute>
                <TicketListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-desk/tickets/nuevo"
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'ADMIN_INTEPE']}>
                <CreateTicketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-desk/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Technician Portal */}
          <Route
            path="/tecnico"
            element={
              <ProtectedRoute allowedRoles={['TECNICO_INTEPE', 'ADMIN_INTEPE']}>
                <TechnicianDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Command Center */}
          <Route
            path="/admin/help-desk"
            element={
              <ProtectedRoute allowedRoles={['ADMIN_INTEPE']}>
                <AdminHelpDeskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clientes"
            element={
              <ProtectedRoute allowedRoles={['ADMIN_INTEPE']}>
                <AdminClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clientes/:id"
            element={
              <ProtectedRoute allowedRoles={['ADMIN_INTEPE']}>
                <AdminClientDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tecnicos"
            element={
              <ProtectedRoute allowedRoles={['ADMIN_INTEPE']}>
                <AdminTechniciansPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Show Public Footer and WhatsApp floating button only on non-portal pages */}
      {!isHelpDeskApp && <Footer />}
      {!isHelpDeskApp && <WhatsAppButton />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
