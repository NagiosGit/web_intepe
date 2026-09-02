import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useSearchParams } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  RotateCw, 
  Printer, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  Smartphone, 
  Eye,
  Lock,
  Unlock,
  KeyRound,
  X,
  CreditCard,
  FileText
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { IntepeLogoIcon } from '../components/common/IntepeLogoIcon';

interface CardProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  mobile: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  nit: string;
  services: string[];
}

const defaultProfiles: Record<string, CardProfile> = {
  director: {
    id: 'director',
    name: 'Ing. William Penagos',
    title: 'Director General & Especialista TI',
    department: 'Dirección de Operaciones & Soluciones',
    mobile: siteConfig.mobile,
    phone: siteConfig.phone,
    email: 'williampenagos@intepe.net',
    address: siteConfig.address,
    website: 'https://www.intepe.net',
    nit: siteConfig.nit,
    services: [
      'Outsourcing TI Integral',
      'Mesa de Ayuda L1/L2/L3',
      'Infraestructura & Servidores',
      'Desarrollo de Software a Medida'
    ]
  },
  helpdesk: {
    id: 'helpdesk',
    name: 'Mesa de Ayuda & Soporte',
    title: 'Help Desk & Operaciones TI',
    department: 'Atención y Soporte Técnico Especializado',
    mobile: siteConfig.mobile,
    phone: siteConfig.phone,
    email: 'soporte@intepe.net',
    address: siteConfig.address,
    website: 'https://www.intepe.net/help-desk',
    nit: siteConfig.nit,
    services: [
      'Atención Remota & Presencial',
      'Mantenimiento Preventivo / Correctivo',
      'Soporte a Redes & Servidores',
      'Licenciamiento Google Workspace'
    ]
  },
  comercial: {
    id: 'comercial',
    name: 'Consultoría & Soluciones TI',
    title: 'Asesoría Empresarial en Tecnología',
    department: 'Proyectos & Transformación Digital',
    mobile: siteConfig.mobile,
    phone: siteConfig.phone,
    email: 'comercial@intepe.net',
    address: siteConfig.address,
    website: 'https://www.intepe.net/servicios',
    nit: siteConfig.nit,
    services: [
      'Auditoría y Diagnóstico TI',
      'Cotización de Outsourcing a Medida',
      'Automatización de Procesos ERP',
      'Planes Corporativos Mensuales'
    ]
  },
  rrhh: {
    id: 'rrhh',
    name: 'Patricia Muñoz',
    title: 'Gerente de Recursos Humanos',
    department: 'Gestión del Talento & Desarrollo Organizacional',
    mobile: siteConfig.mobile,
    phone: siteConfig.phone,
    email: 'rrhh@intepe.net',
    address: siteConfig.address,
    website: 'https://www.intepe.net',
    nit: siteConfig.nit,
    services: [
      'Gestión del Talento Humano',
      'Selección de Personal TI',
      'Bienestar & Clima Organizacional',
      'Capacitación & Desarrollo TI'
    ]
  },
  patricia: {
    id: 'patricia',
    name: 'Patricia Muñoz',
    title: 'Gerente de Recursos Humanos',
    department: 'Gestión del Talento & Desarrollo Organizacional',
    mobile: siteConfig.mobile,
    phone: siteConfig.phone,
    email: 'rrhh@intepe.net',
    address: siteConfig.address,
    website: 'https://www.intepe.net',
    nit: siteConfig.nit,
    services: [
      'Gestión del Talento Humano',
      'Selección de Personal TI',
      'Bienestar & Clima Organizacional',
      'Capacitación & Desarrollo TI'
    ]
  }
};

const CORPORATE_PIN = '0408'; // PIN de acceso administrativo personalizado

export const BusinessCardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Security & Role State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('intepe_card_admin') === 'true';
  });
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Card & Profile State
  const [selectedProfileKey, setSelectedProfileKey] = useState<string>('director');
  const [profile, setProfile] = useState<CardProfile>(defaultProfiles.director);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardTheme, setCardTheme] = useState<'cyber-dark' | 'executive-navy' | 'minimal-white'>('cyber-dark');
  const [cardStandard, setCardStandard] = useState<'iso' | 'usa'>('iso'); // iso: 85x55mm, usa: 90x50mm
  const [activeTab, setActiveTab] = useState<'virtual' | 'print' | 'editor'>('virtual');
  const [printLayout, setPrintLayout] = useState<'sheet-both' | 'sheet-front' | 'sheet-back' | 'individual'>('sheet-both');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [vcfDownloaded, setVcfDownloaded] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Prevent search engine indexing for internal stationery / private card tools
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
    }
    metaTag.content = 'noindex, nofollow';

    return () => {
      if (metaTag) metaTag.content = 'index, follow';
    };
  }, []);

  // Check URL query parameters (e.g. ?p=comercial or ?p=helpdesk)
  useEffect(() => {
    const pKey = searchParams.get('p');
    if (pKey && defaultProfiles[pKey]) {
      setSelectedProfileKey(pKey);
      setProfile({ ...defaultProfiles[pKey] });
    }
  }, [searchParams]);

  // Update profile when preset selection changes
  const handleProfilePresetChange = (key: string) => {
    setSelectedProfileKey(key);
    if (key !== 'custom' && defaultProfiles[key]) {
      setProfile({ ...defaultProfiles[key] });
    }
  };

  // Authenticate Admin PIN
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (enteredPin.trim() === CORPORATE_PIN) {
      setIsAdmin(true);
      sessionStorage.setItem('intepe_card_admin', 'true');
      setShowPinModal(false);
      setEnteredPin('');
      setPinError('');
    } else {
      setPinError('PIN incorrecto. Intente nuevamente.');
    }
  };

  // Logout / Lock Admin Mode
  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('intepe_card_admin');
    setActiveTab('virtual');
  };

  // Generate QR Code dynamically
  useEffect(() => {
    // When running locally, use official domain so scanning from a smartphone actually opens the website
    const domain = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'https://www.intepe.net'
      : window.location.origin;
    const targetUrl = `${domain}/tarjeta-presentacion?p=${selectedProfileKey}`;
    
    QRCode.toDataURL(targetUrl, {
      width: 360,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [selectedProfileKey]);

  // Handle 3D Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${isFlipped ? 180 + rotateY : rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg)`;
  };

  // Toggle Flip
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${!isFlipped ? 180 : 0}deg)`;
    }
  };

  // Generate and download .VCF contact file (vCard 3.0)
  const downloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.name}`,
      `N:${profile.name.split(' ').slice(1).join(' ') || profile.name};${profile.name.split(' ')[0]};;;`,
      `ORG:INTEPE S.A.S. - Informática y Tecnología Penagos S.A.S.`,
      `TITLE:${profile.title}`,
      `ROLE:${profile.department}`,
      `TEL;TYPE=CELL,VOICE:${profile.mobile}`,
      `TEL;TYPE=WORK,VOICE:${profile.phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${profile.email}`,
      `URL:${profile.website}`,
      `ADR;TYPE=WORK:;;${profile.address};Bogotá;Cundinamarca;;Colombia`,
      `NOTE:NIT: ${profile.nit} | Especialistas en Outsourcing TI, Mesa de Ayuda y Software a Medida.`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Contacto_INTEPE_${profile.name.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setVcfDownloaded(true);
    setTimeout(() => setVcfDownloaded(false), 3000);
  };

  // Copy shareable digital card link
  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/tarjeta-presentacion?p=${selectedProfileKey}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    const shareUrl = `${window.location.origin}/tarjeta-presentacion?p=${selectedProfileKey}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tarjeta de Presentación - ${profile.name} | INTEPE S.A.S.`,
          text: `Contacto corporativo de ${profile.name} (${profile.title}) - INTEPE S.A.S. Soluciones TI.`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or error:', err);
      }
    } else {
      copyShareLink();
    }
  };

  // Generate Pure Isolated HTML for 100% Reliable Print Dialog
  const getPrintHtml = () => {
    const isWhite = cardTheme === 'minimal-white';
    const bgCard = isWhite ? '#FFFFFF' : '#0F172A';
    const textMain = isWhite ? '#0F172A' : '#F8FAFC';
    const textSub = isWhite ? '#475569' : '#94A3B8';
    const borderColor = isWhite ? '#CBD5E1' : '#334155';
    const badgeBg = isWhite ? '#FFF7ED' : 'rgba(0, 229, 255, 0.1)';
    const badgeBorder = isWhite ? '#FFEDD5' : 'rgba(0, 229, 255, 0.3)';
    const badgeText = isWhite ? '#C2410C' : '#00E5FF';
    const tagLabel = profile.id === 'rrhh' ? 'TALENTO TI' : 'TI SOLUTIONS';

    const cardFrontHtml = `
      <div class="card-box">
        <div class="cf-top">
          <div class="cf-brand">
            <div class="cf-logo-box">
              <svg viewBox="0 0 512 512" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cfLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0E1626" />
                    <stop offset="100%" stop-color="#070B12" />
                  </linearGradient>
                  <linearGradient id="cfChipBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#141E30" />
                    <stop offset="100%" stop-color="#0B101D" />
                  </linearGradient>
                  <linearGradient id="cfCoreBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FF8A3D" />
                    <stop offset="100%" stop-color="#FF7120" />
                  </linearGradient>
                </defs>
                <rect x="40" y="40" width="432" height="432" rx="90" ry="90" fill="url(#cfLogoBg)" stroke="#FF7120" stroke-width="10" />
                <g stroke="#FF7120" stroke-width="12" stroke-linecap="round">
                  <line x1="172" y1="140" x2="172" y2="88" /><line x1="228" y1="140" x2="228" y2="88" /><line x1="284" y1="140" x2="284" y2="88" /><line x1="340" y1="140" x2="340" y2="88" />
                  <line x1="172" y1="372" x2="172" y2="424" /><line x1="228" y1="372" x2="228" y2="424" /><line x1="284" y1="372" x2="284" y2="424" /><line x1="340" y1="372" x2="340" y2="424" />
                  <line x1="140" y1="172" x2="88" y2="172" /><line x1="140" y1="228" x2="88" y2="228" /><line x1="140" y1="284" x2="88" y2="284" /><line x1="140" y1="340" x2="88" y2="340" />
                  <line x1="372" y1="172" x2="424" y2="172" /><line x1="372" y1="228" x2="424" y2="228" /><line x1="372" y1="284" x2="424" y2="284" /><line x1="372" y1="340" x2="424" y2="340" />
                </g>
                <g fill="#00E5FF">
                  <circle cx="172" cy="86" r="10" /><circle cx="228" cy="86" r="10" /><circle cx="284" cy="86" r="10" /><circle cx="340" cy="86" r="10" />
                  <circle cx="172" cy="426" r="10" /><circle cx="228" cy="426" r="10" /><circle cx="284" cy="426" r="10" /><circle cx="340" cy="426" r="10" />
                  <circle cx="86" cy="172" r="10" /><circle cx="86" cy="228" r="10" /><circle cx="86" cy="284" r="10" /><circle cx="86" cy="340" r="10" />
                  <circle cx="426" cy="172" r="10" /><circle cx="426" cy="228" r="10" /><circle cx="426" cy="284" r="10" /><circle cx="426" cy="340" r="10" />
                </g>
                <rect x="136" y="136" width="240" height="240" rx="34" ry="34" fill="url(#cfChipBg)" stroke="#FF7120" stroke-width="12" />
                <rect x="188" y="188" width="136" height="136" rx="20" ry="20" fill="url(#cfCoreBg)" stroke="#FF8A3D" stroke-width="3" />
              </svg>
            </div>
            <div>
              <div class="cf-name-intepe">INTEPE <span>S.A.S.</span></div>
              <div class="cf-sub-razon">Informática y Tecnología Penagos S.A.S.</div>
            </div>
          </div>
          <div class="cf-tag">${tagLabel}</div>
        </div>

        <div class="cf-center">
          <div class="cf-fullname">${profile.name}</div>
          <div class="cf-title">${profile.title}</div>
          <div class="cf-dept">${profile.department}</div>
        </div>

        <div class="cf-bottom">
          <div>📞 ${profile.mobile}</div>
          <div style="text-align: right;">✉️ ${profile.email}</div>
          <div class="cf-bottom-full">🌐 www.intepe.net • NIT: ${profile.nit}</div>
        </div>
      </div>
    `;

    const cardBackHtml = `
      <div class="card-box">
        <div class="cb-top">
          <span class="cb-tag">// ${profile.id === 'rrhh' ? 'GESTIÓN HUMANA' : 'SERVICIOS TI'}</span>
          <span class="cb-city">Bogotá, CO</span>
        </div>

        <div class="cb-center">
          <div class="cb-srv-list">
            ${profile.services.map((s) => `<div class="cb-srv-item">${s}</div>`).join('')}
          </div>
          <div class="cb-qr">
            ${qrDataUrl ? `<img src="${qrDataUrl}" class="cb-qr-img" alt="QR" />` : ''}
            <span class="cb-qr-lbl">ESCANEAR</span>
          </div>
        </div>

        <div class="cb-bottom">
          <span>${profile.address}</span>
          <strong>intepe.net</strong>
        </div>
      </div>
    `;

    const eightFrontCards = Array.from({ length: 8 }).map(() => cardFrontHtml).join('');
    const eightBackCards = Array.from({ length: 8 }).map(() => cardBackHtml).join('');

    let pagesContent = '';

    if (printLayout === 'sheet-both') {
      pagesContent = `
        <div class="page-sheet">
          <div class="sheet-label">
            <span>📄 HOJA 1 DE 2: PLIEGO FRENTE (8 TARJETAS - ANVERSO)</span>
            <span>INTEPE S.A.S. • NIT: ${profile.nit}</span>
          </div>
          <div class="cards-grid">
            ${eightFrontCards}
          </div>
        </div>

        <div class="page-sheet">
          <div class="sheet-label">
            <span>🔄 HOJA 2 DE 2: PLIEGO REVERSO (8 TARJETAS - DORSO CON QR)</span>
            <span>ALINEACIÓN DÚPLEX 1:1 (GIRO BORDE LARGO)</span>
          </div>
          <div class="cards-grid">
            ${eightBackCards}
          </div>
        </div>
      `;
    } else if (printLayout === 'sheet-front') {
      pagesContent = `
        <div class="page-sheet">
          <div class="sheet-label">
            <span>📄 PLIEGO FRENTE (8 TARJETAS - ANVERSO)</span>
            <span>INTEPE S.A.S.</span>
          </div>
          <div class="cards-grid">
            ${eightFrontCards}
          </div>
        </div>
      `;
    } else if (printLayout === 'sheet-back') {
      pagesContent = `
        <div class="page-sheet">
          <div class="sheet-label">
            <span>🔄 PLIEGO REVERSO (8 TARJETAS - DORSO CON QR)</span>
            <span>INTEPE S.A.S.</span>
          </div>
          <div class="cards-grid">
            ${eightBackCards}
          </div>
        </div>
      `;
    } else {
      // Individual 1 card front + 1 card back
      pagesContent = `
        <div class="page-sheet">
          <div class="sheet-label">
            <span>TARJETA INDIVIDUAL (FRENTE Y REVERSO)</span>
            <span>INTEPE S.A.S.</span>
          </div>
          <div class="cards-grid" style="grid-template-rows: 55mm 55mm; gap: 8mm;">
            ${cardFrontHtml}
            ${cardBackHtml}
          </div>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Tarjetas_INTEPE_${profile.name.replace(/\s+/g, '_')}</title>
  <style>
    @page {
      size: letter portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      background: #FFFFFF;
      color: ${textMain};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .page-sheet {
      width: 215.9mm;
      height: 279mm;
      max-height: 279mm;
      box-sizing: border-box;
      padding: 5mm 12mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      page-break-before: auto;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      background: #FFFFFF;
      overflow: hidden;
      position: relative;
    }
    .page-sheet:last-of-type {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    .sheet-label {
      width: 173mm;
      margin-bottom: 2mm;
      font-family: monospace;
      font-size: 7.5px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #CBD5E1;
      padding-bottom: 1mm;
      line-height: 1;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: 85mm 85mm;
      grid-template-rows: repeat(4, 53mm);
      gap: 2mm 3mm;
      justify-content: center;
      align-content: center;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .card-box {
      width: 85mm;
      height: 53mm;
      box-sizing: border-box;
      padding: 3.5mm 4.5mm;
      border: 1px solid ${borderColor};
      border-radius: 1mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: ${bgCard};
      color: ${textMain};
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      overflow: hidden;
    }
    .cf-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .cf-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cf-logo-box {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .cf-name-intepe {
      font-size: 15px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.2px;
    }
    .cf-name-intepe span {
      color: #FF7120;
    }
    .cf-sub-razon {
      font-size: 9px;
      font-weight: 700;
      color: ${textSub};
      margin-top: 1.5px;
    }
    .cf-tag {
      font-size: 9px;
      font-weight: 800;
      font-family: monospace;
      padding: 2px 7px;
      border-radius: 4px;
      background: ${badgeBg};
      border: 1px solid ${badgeBorder};
      color: ${badgeText};
      text-transform: uppercase;
    }
    .cf-center {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .cf-fullname {
      font-size: 17.5px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.3px;
    }
    .cf-title {
      font-size: 12px;
      font-weight: 800;
      color: #EA580C;
    }
    .cf-dept {
      font-size: 9.5px;
      font-weight: 600;
      font-family: monospace;
      color: ${textSub};
    }
    .cf-bottom {
      border-top: 1.5px solid ${borderColor};
      padding-top: 2mm;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 6px;
      font-size: 9.5px;
      font-weight: 600;
      font-family: monospace;
      color: ${textMain};
    }
    .cf-bottom-full {
      grid-column: span 2;
      font-size: 8.5px;
      color: ${textSub};
    }
    .cb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid ${borderColor};
      padding-bottom: 2mm;
      font-size: 9.5px;
      font-family: monospace;
    }
    .cb-tag {
      font-weight: 800;
      color: #C2410C;
      text-transform: uppercase;
    }
    .cb-city {
      font-size: 9px;
      color: ${textSub};
    }
    .cb-center {
      display: grid;
      grid-template-columns: 1fr 20mm;
      gap: 3mm;
      align-items: center;
      margin: auto 0;
    }
    .cb-srv-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: ${textMain};
    }
    .cb-srv-item {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cb-srv-item::before {
      content: "• ";
      color: #FF7120;
      font-weight: 900;
    }
    .cb-qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #F8FAFC;
      border: 1px solid ${borderColor};
      border-radius: 4px;
      padding: 1.5mm;
    }
    .cb-qr-img {
      width: 15mm;
      height: 15mm;
      display: block;
    }
    .cb-qr-lbl {
      font-size: 7px;
      font-weight: 800;
      font-family: monospace;
      color: #C2410C;
      margin-top: 1.5px;
      text-transform: uppercase;
    }
    .cb-bottom {
      border-top: 1.5px solid ${borderColor};
      padding-top: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: ${textSub};
    }
    .cb-bottom strong {
      color: #FF7120;
      font-size: 10px;
    }
  </style>
</head>
<body>
  ${pagesContent}
</body>
</html>`;
  };

  // Trigger Isolated Print Dialog (0 blank pages in Firefox & Chrome, 100% duplex registration)
  const handlePrint = () => {
    try {
      const htmlContent = getPrintHtml();
      
      // Method 1: Clean dedicated print popup window (Works 100% in Firefox and Chrome)
      const printWindow = window.open('', '_blank', 'width=980,height=850,menubar=no,toolbar=no,location=no,status=no');
      
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
        }, 400);
        return;
      }

      // Method 2: Off-screen iframe with FULL Letter dimensions (Firefox requires non-zero iframe width/height)
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.top = '-10000px';
      printFrame.style.left = '-10000px';
      printFrame.style.width = '215.9mm';
      printFrame.style.height = '279.4mm';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);

      const doc = printFrame.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();

        setTimeout(() => {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
          setTimeout(() => {
            if (document.body.contains(printFrame)) {
              document.body.removeChild(printFrame);
            }
          }, 4000);
        }, 400);
      } else {
        window.print();
      }
    } catch (e) {
      console.error('Error during isolated printing, falling back to window.print():', e);
      window.print();
    }
  };

  // Color Theme classes (Opaque solid backgrounds to prevent bleed-through)
  const getThemeFrontClasses = () => {
    switch (cardTheme) {
      case 'executive-navy':
        return 'bg-[#0A192F] text-slate-100 border-[#00E5FF]/40 shadow-[0_20px_50px_rgba(0,229,255,0.15)]';
      case 'minimal-white':
        return 'bg-[#FFFFFF] text-slate-900 border-slate-300 shadow-[0_20px_40px_rgba(0,0,0,0.15)]';
      case 'cyber-dark':
      default:
        return 'bg-[#0D1219] text-slate-100 border-[#FF7120]/40 shadow-[0_20px_50px_rgba(255,113,32,0.18)]';
    }
  };

  const getThemeBackClasses = () => {
    switch (cardTheme) {
      case 'executive-navy':
        return 'bg-[#0A192F] text-slate-100 border-[#00E5FF]/40 shadow-[0_20px_50px_rgba(0,229,255,0.15)]';
      case 'minimal-white':
        return 'bg-[#FFFFFF] text-slate-900 border-slate-300 shadow-[0_20px_40px_rgba(0,0,0,0.15)]';
      case 'cyber-dark':
      default:
        return 'bg-[#0D1219] text-slate-100 border-[#FF7120]/40 shadow-[0_20px_50px_rgba(255,113,32,0.18)]';
    }
  };

  return (
    <div className="business-card-page-wrapper pt-32 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* 1. Header & Mode Switcher (Hidden during print) */}
      <div className="no-print space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7120]/10 border border-[#FF7120]/30 text-[#FF853A] font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IDENTIDAD DIGITAL & CONTACTO CORPORATIVO</span>
          </div>

          {/* Admin Mode Status Badge */}
          {isAdmin ? (
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs hover:bg-emerald-500/25 transition-all"
              title="Haz clic para bloquear / cerrar sesión administrativa"
            >
              <Unlock className="w-3 h-3" />
              <span>ADMIN ACTIVO</span>
            </button>
          ) : (
            <button
              onClick={() => setShowPinModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-xs hover:text-white hover:border-[#FF7120]/40 transition-all"
              title="Acceso exclusivo para personal de INTEPE"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Papelería</span>
            </button>
          )}
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Tarjeta Digital <span className="text-[#FF7120]">INTEPE S.A.S.</span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {isAdmin 
            ? 'Panel de control de papelería corporativa: Gestión de perfiles, exportación vCard 3.0 y estudio de impresión física con marcas de corte.'
            : 'Presentación interactiva institucional. Guarde nuestro contacto en su celular o comuníquese directamente con nuestro equipo.'}
        </p>

        {/* Tab switcher (Only visible if Admin is unlocked) */}
        {isAdmin && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('virtual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'virtual'
                  ? 'bg-[#FF7120] text-black shadow-[0_0_20px_rgba(255,113,32,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>1. Modo Virtual 3D</span>
            </button>

            <button
              onClick={() => setActiveTab('print')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'print'
                  ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>2. Impresión en Físico</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'editor'
                  ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>3. Personalizar Datos</span>
            </button>
          </div>
        )}
      </div>

      {/* Admin Control Bar: Preset & Theme Selectors (Only visible if Admin is unlocked) */}
      {isAdmin && (
        <div className="no-print cyber-card p-4 sm:p-5 rounded-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>

          {/* Preset Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">Perfil:</span>
            <button
              onClick={() => handleProfilePresetChange('director')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedProfileKey === 'director'
                  ? 'bg-[#FF7120] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Director General
            </button>
            <button
              onClick={() => handleProfilePresetChange('helpdesk')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedProfileKey === 'helpdesk'
                  ? 'bg-[#FF7120] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Mesa de Ayuda
            </button>
            <button
              onClick={() => handleProfilePresetChange('comercial')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedProfileKey === 'comercial'
                  ? 'bg-[#FF7120] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Comercial TI
            </button>
            <button
              onClick={() => handleProfilePresetChange('rrhh')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedProfileKey === 'rrhh' || selectedProfileKey === 'patricia'
                  ? 'bg-[#FF7120] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Recursos Humanos (Patricia M.)
            </button>
            <button
              onClick={() => {
                setSelectedProfileKey('custom');
                setActiveTab('editor');
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedProfileKey === 'custom'
                  ? 'bg-cyan-400 text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Personalizado ✏️
            </button>
          </div>

          {/* Theme & Format Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10 text-xs font-mono">
              <span className="text-slate-400 px-2">Tema:</span>
              <button
                onClick={() => setCardTheme('cyber-dark')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  cardTheme === 'cyber-dark' ? 'bg-[#FF7120]/20 text-[#FF853A] border border-[#FF7120]/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber
              </button>
              <button
                onClick={() => setCardTheme('executive-navy')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  cardTheme === 'executive-navy' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Navy
              </button>
              <button
                onClick={() => setCardTheme('minimal-white')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  cardTheme === 'minimal-white' ? 'bg-white text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Luz
              </button>
            </div>

            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10 text-xs font-mono">
              <span className="text-slate-400 px-1">Medida:</span>
              <button
                onClick={() => setCardStandard('iso')}
                className={`px-2 py-1 rounded transition-colors ${
                  cardStandard === 'iso' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                85×55
              </button>
              <button
                onClick={() => setCardStandard('usa')}
                className={`px-2 py-1 rounded transition-colors ${
                  cardStandard === 'usa' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                90×50
              </button>
            </div>

            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3" />
              <span>Bloquear</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 1: VIRTUAL 3D PRESENTATION (PÚBLICO Y ACCESIBLE POR QR / ENLACE)
          ========================================================================= */}
      {activeTab === 'virtual' && (
        <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Col 1: 3D Interactive Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
            
            {/* 3D Flip Card Container */}
            <div 
              className="perspective-1000 w-full max-w-[500px] h-[315px] sm:h-[325px] cursor-pointer select-none group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={toggleFlip}
            >
              <div 
                ref={cardRef}
                className="relative w-full h-full preserve-3d transition-transform duration-500 rounded-2xl"
                style={{
                  transform: `perspective(1000px) rotateY(${isFlipped ? 180 : 0}deg)`
                }}
              >
                
                {/* ---------------- CARD FRONT (ANVERSO) ---------------- */}
                <div 
                  className={`absolute inset-0 backface-hidden rounded-2xl p-6 sm:p-7 border flex flex-col justify-between overflow-hidden transition-all duration-300 ${getThemeFrontClasses()}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    opacity: isFlipped ? 0 : 1,
                    transition: 'opacity 0.25s ease, transform 0.5s ease'
                  }}
                >
                  {/* Decorative Subtle Background Accents */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none"></div>

                  {/* Header: Logo & Chip */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
                        <IntepeLogoIcon className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_14px_rgba(255,113,32,0.45)]" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <div>
                        <div className={`text-2xl sm:text-[26px] font-black tracking-tight font-['Space_Grotesk'] leading-none ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                          INTEPE <span className="text-[#FF7120]">S.A.S.</span>
                        </div>
                        <div className={`text-[11px] sm:text-xs font-sans font-bold tracking-tight mt-1 ${cardTheme === 'minimal-white' ? 'text-slate-700' : 'text-slate-300'}`}>
                          Informática y Tecnología Penagos S.A.S.
                        </div>
                        <div className={`text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase mt-0.5 ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>
                          NIT: {profile.nit}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded border uppercase tracking-wider font-semibold ${
                        cardTheme === 'minimal-white' 
                          ? 'bg-slate-100 border-slate-300 text-slate-700 font-bold' 
                          : 'bg-white/5 border-white/10 text-cyan-400'
                      }`}>
                        TI SOLUTIONS
                      </span>
                    </div>
                  </div>

                  {/* Body: Profile Name & Title */}
                  <div className="relative z-10 space-y-1 my-auto">
                    <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight font-['Space_Grotesk'] ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                      {profile.name}
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold tracking-wide ${cardTheme === 'minimal-white' ? 'text-[#FF7120]' : 'text-[#FF853A]'}`}>
                      {profile.title}
                    </p>
                    <p className={`text-[11px] font-mono line-clamp-1 ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>
                      {profile.department}
                    </p>
                  </div>

                  {/* Footer: Quick Contacts */}
                  <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-3.5 h-3.5 text-[#FF7120] shrink-0" />
                      <span className={`truncate ${cardTheme === 'minimal-white' ? 'text-slate-800' : 'text-slate-200'}`}>
                        {profile.mobile}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-[#FF7120] shrink-0" />
                      <span className={`truncate text-[11px] ${cardTheme === 'minimal-white' ? 'text-slate-800' : 'text-slate-200'}`}>
                        {profile.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 truncate col-span-2 text-[10px]">
                      <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className={`truncate ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {profile.website}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ---------------- CARD BACK (REVERSO) ---------------- */}
                <div 
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 sm:p-7 border flex flex-col justify-between overflow-hidden transition-all duration-300 ${getThemeBackClasses()}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    opacity: isFlipped ? 1 : 0,
                    transition: 'opacity 0.25s ease, transform 0.5s ease'
                  }}
                >
                  {/* Decorative Glow */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Top: Service badges */}
                  <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                      cardTheme === 'minimal-white' ? 'text-[#FF7120]' : 'text-[#FF853A]'
                    }`}>
                      // PORTAFOLIO DE SERVICIOS
                    </span>
                    <span className={`text-[10px] font-mono ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Bogotá, CO
                    </span>
                  </div>

                  {/* Middle: QR Code + Services list */}
                  <div className="relative z-10 grid grid-cols-12 gap-4 items-center my-auto">
                    {/* Services list (7 cols) */}
                    <div className="col-span-7 space-y-2">
                      {profile.services.map((srv, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7120] shrink-0"></span>
                          <span className={`truncate font-medium ${cardTheme === 'minimal-white' ? 'text-slate-800' : 'text-slate-100'}`}>
                            {srv}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* QR Code (5 cols) - High-contrast black on white box */}
                    <div className="col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
                      <div className="bg-white p-1.5 rounded-lg shadow-md flex items-center justify-center">
                        {qrDataUrl ? (
                          <img 
                            src={qrDataUrl} 
                            alt="Código QR de Contacto" 
                            className="w-18 h-18 sm:w-20 sm:h-20 block rounded"
                          />
                        ) : (
                          <div className="w-18 h-18 sm:w-20 sm:h-20 bg-slate-200 animate-pulse rounded"></div>
                        )}
                      </div>
                      <span className={`text-[8.5px] font-mono uppercase tracking-wider mt-1.5 text-center font-bold ${
                        cardTheme === 'minimal-white' ? 'text-slate-800' : 'text-cyan-400'
                      }`}>
                        ESCANEAR CONTACTO
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Address and legal */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-[#FF7120] shrink-0" />
                      <span className={`truncate ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {profile.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <IntepeLogoIcon className="w-3.5 h-3.5" />
                      <span className="text-[#FF7120] font-bold">intepe.net</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Flip action prompt button */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFlip}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all group"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#FF7120] group-hover:rotate-180 transition-transform duration-500" />
                <span>{isFlipped ? 'Ver Anverso (Frente)' : 'Girar Tarjeta (Ver Reverso & QR)'}</span>
              </button>
              <span className="text-xs text-slate-500 hidden sm:inline font-mono">
                (O toque directo en la tarjeta)
              </span>
            </div>

          </div>

          {/* Col 2: Action Terminal (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="cyber-card p-6 rounded-lg border border-white/10 space-y-5">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#FF7120]" />
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Contacto Directo
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  vCard 3.0
                </span>
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-2.5">
                
                {/* 1. Download vCard .vcf */}
                <button
                  onClick={downloadVCard}
                  className="w-full py-3 px-4 rounded-md bg-[#FF7120] hover:bg-[#FF853A] text-black font-bold font-['Space_Grotesk'] text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(255,113,32,0.35)] cursor-pointer"
                >
                  {vcfDownloaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Contacto Guardado (.VCF Descargado)!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>GUARDAR EN CONTACTOS DEL CELULAR (.VCF)</span>
                    </>
                  )}
                </button>

                {/* 2. Direct WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola ${profile.name}, me pongo en contacto desde su Tarjeta Digital para consultar sobre sus servicios TI.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-semibold font-mono text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Chatear por WhatsApp Directo</span>
                </a>

                {/* 3. Direct Phone Call */}
                <a
                  href={`tel:${profile.mobile.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FF7120]" />
                  <span>Llamar al Móvil ({profile.mobile})</span>
                </a>

                {/* 4. Direct Email */}
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`Contacto desde Tarjeta Digital - ${profile.name}`)}`}
                  className="w-full py-2.5 px-4 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Enviar Correo ({profile.email})</span>
                </a>

                {/* 5. Portal Pagos, Copiar Enlace & Share */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <a
                    href="/pagos"
                    className="py-2 px-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[11px] flex items-center justify-center gap-1 transition-all"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pagos</span>
                  </a>

                  <button
                    onClick={copyShareLink}
                    className="py-2 px-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-[11px] flex items-center justify-center gap-1 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="py-2 px-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-[11px] flex items-center justify-center gap-1 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Compartir</span>
                  </button>
                </div>

              </div>

              {/* Security & Instant Sync Badge */}
              <div className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Compatible con iPhone, Android y lectores NFC</span>
                </div>

                {!isAdmin && (
                  <button
                    onClick={() => setShowPinModal(true)}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1 underline"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Admin</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: PHYSICAL PRINT STUDIO (PRINT-READY) - ADMIN ONLY
          ========================================================================= */}
      {isAdmin && activeTab === 'print' && (
        <div className="space-y-8">
          
          {/* Print configuration header (Hidden when printing) */}
          <div className="no-print cyber-card p-6 rounded-lg border border-cyan-500/30 bg-cyan-950/20 space-y-4">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                  <Printer className="w-5 h-5 text-cyan-400" />
                  <span>Estudio de Impresión Física (Print-Ready)</span>
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Estándar {cardStandard === 'iso' ? '85 x 55 mm (ISO/Colombia)' : '90 x 50 mm (USA)'} • 300 DPI • Guías de Corte
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                
                {/* Print Theme Switcher */}
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded border border-white/10 text-xs font-mono">
                  <span className="text-slate-400 px-1">Fondo Impresión:</span>
                  <button
                    onClick={() => setCardTheme('minimal-white')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      cardTheme === 'minimal-white' ? 'bg-white text-black font-bold shadow-sm' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ⚪ Blanco Ejecutivo (Recomendado)
                  </button>
                  <button
                    onClick={() => setCardTheme('cyber-dark')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      cardTheme === 'cyber-dark' ? 'bg-[#FF7120] text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ⚫ Cyber Dark
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded border border-white/10 text-xs font-mono">
                  <span className="text-slate-400 px-1">Disposición:</span>
                  <button
                    onClick={() => setPrintLayout('sheet-both')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      printLayout === 'sheet-both' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    📄 2 Hojas (Frente + Reverso)
                  </button>
                  <button
                    onClick={() => setPrintLayout('sheet-front')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      printLayout === 'sheet-front' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Frente (8x)
                  </button>
                  <button
                    onClick={() => setPrintLayout('sheet-back')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      printLayout === 'sheet-back' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Reverso (8x)
                  </button>
                  <button
                    onClick={() => setPrintLayout('individual')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      printLayout === 'individual' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    1 Tarjeta
                  </button>
                </div>

                <a
                  href={profile.id === 'rrhh' ? '/downloads/Pliego_Tarjetas_Patricia_Munoz.pdf' : '/downloads/Pliego_Tarjetas_Ing_William_Penagos.pdf'}
                  download
                  className="px-5 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-['Space_Grotesk'] text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DESCARGAR PDF (2 HOJAS)</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-['Space_Grotesk'] text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>IMPRIMIR EN IMPRESORA</span>
                </button>

                <a
                  href={profile.id === 'rrhh' ? '/downloads/Pliego_Tarjetas_Patricia_Munoz.docx' : '/downloads/Pliego_Tarjetas_Ing_William_Penagos.docx'}
                  download
                  className="px-4 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold font-['Space_Grotesk'] text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>DESCARGAR WORD (.DOCX)</span>
                </a>
              </div>
            </div>

            {/* Print paper recommendation guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                <span className="text-[#FF7120] font-bold">📄 Papel Recomendado:</span> Opalina 250g, Propalcote 300g mate o Cartulina Kimberly.
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                <span className="text-cyan-400 font-bold">💡 Impresión Dúplex:</span> Imprime primero la Hoja 1 (Frentes) y luego al respaldo la Hoja 2 (Reversos). Coincidencia exacta 1:1.
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">✂️ Guías de Corte:</span> Líneas perimetrales listas para guillotina o tijeras.
              </div>
            </div>
          </div>

          {/* =================================================================
              PRINTABLE AREA: INDIVIDUAL VIEW (FRENTE Y REVERSO CON CROP MARKS)
              ================================================================= */}
          {printLayout === 'individual' && (
            <div className="printable-card-container space-y-12 py-6 bg-slate-900/40 p-4 sm:p-8 rounded-xl border border-white/10">
              
              <div className="text-center no-print space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">// VISTA PREVIA INDIVIDUAL CON MARCAS DE CORTE</span>
                <p className="text-xs text-slate-400">Las marcas perimetrales indican la línea exacta donde la guillotina debe cortar.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16">
                
                {/* 1. FRENTE (ANVERSO) PRINTABLE */}
                <div className="flex flex-col items-center space-y-3">
                  <span className="no-print text-xs font-mono text-slate-400 font-semibold uppercase">Frente (Anverso)</span>
                  
                  {/* Crop marks wrapper */}
                  <div className="relative p-6 bg-white/5 border border-dashed border-white/20 rounded-lg">
                    <div className="absolute top-2 left-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute top-6 left-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute top-2 right-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute top-6 right-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute bottom-2 left-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute bottom-6 left-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute bottom-2 right-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute bottom-6 right-2 h-4 w-[1px] bg-red-400"></div>

                    {/* Physical Card Dimensions */}
                    <div 
                      className={`w-[85mm] h-[55mm] p-5 rounded-none border flex flex-col justify-between relative overflow-hidden shadow-lg ${
                        cardTheme === 'minimal-white'
                          ? 'bg-white text-slate-900 border-slate-200'
                          : 'bg-[#0F172A] text-white border-slate-700'
                      }`}
                      style={{
                        width: cardStandard === 'iso' ? '85mm' : '90mm',
                        height: cardStandard === 'iso' ? '55mm' : '50mm',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                            <IntepeLogoIcon className="w-10 h-10 drop-shadow-sm" />
                          </div>
                          <div>
                            <div className={`text-base font-black tracking-tight font-['Space_Grotesk'] leading-none ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                              INTEPE <span className="text-[#FF7120]">S.A.S.</span>
                            </div>
                            <div className={`text-[8.5px] font-sans font-bold tracking-tight mt-0.5 ${cardTheme === 'minimal-white' ? 'text-slate-700' : 'text-slate-300'}`}>
                              Informática y Tecnología Penagos S.A.S.
                            </div>
                            <div className={`text-[8px] font-mono tracking-widest uppercase mt-0.5 ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>
                              NIT: {profile.nit}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                          cardTheme === 'minimal-white' ? 'bg-orange-50 border-orange-200 text-[#EA580C]' : 'border-white/10 text-cyan-400'
                        }`}>
                          {profile.id === 'rrhh' ? 'TALENTO TI' : 'TI & SOFTWARE'}
                        </span>
                      </div>

                      <div className="my-auto space-y-1">
                        <div className={`text-[15px] font-black tracking-tight font-['Space_Grotesk'] leading-tight ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                          {profile.name}
                        </div>
                        <div className={`text-xs font-bold font-sans ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-[#FF7120]'}`}>
                          {profile.title}
                        </div>
                        <div className={`text-[9.5px] font-mono ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-400'}`}>
                          {profile.department}
                        </div>
                      </div>

                      <div className={`pt-2 border-t grid grid-cols-2 gap-1.5 text-[9px] font-mono ${cardTheme === 'minimal-white' ? 'border-slate-200 text-slate-700' : 'border-white/10 text-slate-300'}`}>
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3 h-3 text-[#FF7120] shrink-0" />
                          <span className="truncate">{profile.mobile}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-[#FF7120] shrink-0" />
                          <span className="truncate">{profile.email}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 truncate col-span-2 text-[8.5px] ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-400'}`}>
                          <Globe className="w-3 h-3 text-cyan-500 shrink-0" />
                          <span className="truncate">{profile.website} • Bogotá, Colombia</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. REVERSO (DORSO) PRINTABLE */}
                <div className="flex flex-col items-center space-y-3">
                  <span className="no-print text-xs font-mono text-slate-400 font-semibold uppercase">Reverso (Posterior con QR)</span>
                  
                  <div className="relative p-6 bg-white/5 border border-dashed border-white/20 rounded-lg">
                    <div className="absolute top-2 left-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute top-6 left-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute top-2 right-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute top-6 right-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute bottom-2 left-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute bottom-6 left-2 h-4 w-[1px] bg-red-400"></div>
                    <div className="absolute bottom-2 right-6 w-4 h-[1px] bg-red-400"></div>
                    <div className="absolute bottom-6 right-2 h-4 w-[1px] bg-red-400"></div>

                    <div 
                      className={`w-[85mm] h-[55mm] p-5 rounded-none border flex flex-col justify-between relative overflow-hidden shadow-lg ${
                        cardTheme === 'minimal-white'
                          ? 'bg-white text-slate-900 border-slate-200'
                          : 'bg-[#0F172A] text-white border-slate-700'
                      }`}
                      style={{
                        width: cardStandard === 'iso' ? '85mm' : '90mm',
                        height: cardStandard === 'iso' ? '55mm' : '50mm',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div className={`flex items-center justify-between pb-1.5 border-b ${cardTheme === 'minimal-white' ? 'border-slate-200' : 'border-white/10'}`}>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-[#FF853A]'}`}>
                          // {profile.id === 'rrhh' ? 'GESTIÓN HUMANA & TALENTO' : 'SERVICIOS TI CORPORATIVOS'}
                        </span>
                        <span className={`text-[8.5px] font-mono ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>Bogotá, CO</span>
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center my-auto">
                        <div className="col-span-8 space-y-1.5">
                          {profile.services.map((srv, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[9px] font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7120] shrink-0"></span>
                              <span className={`truncate ${cardTheme === 'minimal-white' ? 'text-slate-800 font-semibold' : 'text-slate-200'}`}>{srv}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`col-span-4 flex flex-col items-center justify-center p-1.5 rounded ${cardTheme === 'minimal-white' ? 'bg-slate-50 border border-slate-200' : 'bg-white/5 border border-white/10'}`}>
                          {qrDataUrl ? (
                            <img src={qrDataUrl} alt="QR" className="w-16 h-16 bg-white p-0.5 rounded shadow-sm" />
                          ) : (
                            <div className="w-16 h-16 bg-white/10"></div>
                          )}
                          <span className={`text-[7px] font-mono mt-1 font-bold uppercase ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-cyan-400'}`}>
                            ESCANEAR
                          </span>
                        </div>
                      </div>

                      <div className={`pt-1.5 border-t flex items-center justify-between text-[8.5px] font-mono ${cardTheme === 'minimal-white' ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'}`}>
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-[#FF7120] shrink-0" />
                          <span className="truncate">{profile.address}</span>
                        </div>
                        <span className="text-[#FF7120] font-bold">www.intepe.net</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =================================================================
              PRINTABLE AREA: PLIEGO COMPLETO (2 HOJAS DÚPLEX COINCIDENTES)
              ================================================================= */}
          {(printLayout === 'sheet-both' || printLayout === 'sheet-front' || printLayout === 'sheet-back') && (
            <div className="printable-card-container space-y-12">
              
              {/* HOJA 1: PLIEGO FRENTE (8 TARJETAS) */}
              {(printLayout === 'sheet-both' || printLayout === 'sheet-front') && (
                <div className="print-sheet-page bg-white text-black p-4 sm:p-8 rounded-xl shadow-2xl overflow-x-auto">
                  <div className="no-print text-center pb-4 text-xs font-mono text-slate-800 border-b border-slate-300 w-full mb-3">
                    <span className="font-bold uppercase text-emerald-700 tracking-wider">
                      {printLayout === 'sheet-both' ? '📄 HOJA 1 DE 2: PLIEGO FRENTE (8 TARJETAS - ANVERSO)' : '📄 PLIEGO FRENTE (8 TARJETAS)'}
                    </span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      {cardTheme === 'minimal-white' ? '⚪ Fondo Blanco Ejecutivo: Máximo ahorro de tinta y pulcritud.' : '⚫ Fondo Cyber Dark: Acabado mate corporativo.'}
                    </p>
                  </div>

                  <div className="print-sheet-grid grid grid-cols-2 gap-x-[4mm] gap-y-[4mm] max-w-[185mm] mx-auto py-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={`front-${i}`} 
                        className={`print-card-item border p-4 flex flex-col justify-between relative print-avoid-break ${
                          cardTheme === 'minimal-white' 
                            ? 'bg-white text-slate-900 border-slate-300 shadow-sm' 
                            : 'bg-[#0F172A] text-white border-slate-700'
                        }`}
                        style={{
                          width: '85mm',
                          height: '55mm',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                              <IntepeLogoIcon className="w-10 h-10 drop-shadow-sm" />
                            </div>
                            <div>
                              <div className={`text-sm font-black font-['Space_Grotesk'] tracking-tight leading-none ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                                INTEPE <span className="text-[#FF7120]">S.A.S.</span>
                              </div>
                              <div className={`text-[9px] font-sans font-bold tracking-tight mt-0.5 ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-300'}`}>
                                Informática y Tecnología Penagos S.A.S.
                              </div>
                            </div>
                          </div>
                          <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                            cardTheme === 'minimal-white' 
                              ? 'bg-orange-50 border border-orange-200 text-[#EA580C]' 
                              : 'text-cyan-400 border border-white/20'
                          }`}>
                            {profile.id === 'rrhh' ? 'TALENTO TI' : 'TI SOLUTIONS'}
                          </span>
                        </div>

                        <div className="my-auto space-y-1">
                          <div className={`text-base font-extrabold font-['Space_Grotesk'] leading-tight ${cardTheme === 'minimal-white' ? 'text-slate-900' : 'text-white'}`}>
                            {profile.name}
                          </div>
                          <div className={`text-xs font-bold ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-[#FF7120]'}`}>
                            {profile.title}
                          </div>
                          <div className={`text-[9.5px] font-mono ${cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}`}>
                            {profile.department}
                          </div>
                        </div>

                        <div className={`pt-2 border-t grid grid-cols-2 gap-1.5 text-[9px] font-mono ${
                          cardTheme === 'minimal-white' ? 'border-slate-200 text-slate-700' : 'border-white/10 text-slate-300'
                        }`}>
                          <div className="truncate font-semibold">📞 {profile.mobile}</div>
                          <div className="truncate font-semibold text-right">✉️ {profile.email}</div>
                          <div className={`truncate col-span-2 text-[8.5px] ${cardTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-400'}`}>
                            🌐 www.intepe.net • NIT: {profile.nit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HOJA 2: PLIEGO REVERSO (8 TARJETAS - COLUMNAS ESPEJADAS PARA COINCIDIR EXACTO AL IMPRIMIR A DOBLE CARA) */}
              {(printLayout === 'sheet-both' || printLayout === 'sheet-back') && (
                <div className="print-sheet-page bg-white text-black p-4 sm:p-8 rounded-xl shadow-2xl overflow-x-auto">
                  <div className="no-print text-center pb-4 text-xs font-mono text-slate-800 border-b border-slate-300 w-full mb-3">
                    <span className="font-bold uppercase text-cyan-700 tracking-wider">
                      {printLayout === 'sheet-both' ? '🔄 HOJA 2 DE 2: PLIEGO REVERSO (8 TARJETAS - DORSO CON QR)' : '🔄 PLIEGO REVERSO (8 TARJETAS)'}
                    </span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Alineación dúplex con columnas invertidas: al girar la hoja, cada frente coincide con su respectivo reverso.
                    </p>
                  </div>

                  <div className="print-sheet-grid grid grid-cols-2 gap-x-[4mm] gap-y-[4mm] max-w-[185mm] mx-auto py-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={`back-${i}`} 
                        className={`print-card-item border p-4 flex flex-col justify-between relative print-avoid-break ${
                          cardTheme === 'minimal-white' 
                            ? 'bg-white text-slate-900 border-slate-300 shadow-sm' 
                            : 'bg-[#0F172A] text-white border-slate-700'
                        }`}
                        style={{
                          width: '85mm',
                          height: '55mm',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div className={`flex items-center justify-between pb-1.5 border-b text-[9px] font-mono ${
                          cardTheme === 'minimal-white' ? 'border-slate-200' : 'border-white/10'
                        }`}>
                          <span className={`font-bold uppercase ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-[#FF853A]'}`}>
                            // {profile.id === 'rrhh' ? 'GESTIÓN HUMANA' : 'SERVICIOS TI'}
                          </span>
                          <span className={cardTheme === 'minimal-white' ? 'text-slate-500' : 'text-slate-400'}>Bogotá, CO</span>
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center my-auto">
                          <div className="col-span-8 space-y-1 text-[8.5px] font-mono">
                            {profile.services.map((srv, idx) => (
                              <div key={idx} className={`truncate font-medium ${cardTheme === 'minimal-white' ? 'text-slate-800' : 'text-slate-200'}`}>
                                • {srv}
                              </div>
                            ))}
                          </div>
                          <div className={`col-span-4 flex flex-col items-center p-1 rounded ${cardTheme === 'minimal-white' ? 'bg-slate-50 border border-slate-200' : 'bg-white/5'}`}>
                            {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-14 h-14 bg-white p-0.5 rounded shadow-sm" />}
                            <span className={`text-[7px] font-mono mt-0.5 font-bold ${cardTheme === 'minimal-white' ? 'text-[#EA580C]' : 'text-cyan-400'}`}>
                              ESCANEAR
                            </span>
                          </div>
                        </div>

                        <div className={`pt-1.5 border-t flex items-center justify-between text-[8.5px] font-mono ${
                          cardTheme === 'minimal-white' ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'
                        }`}>
                          <span className="truncate">{profile.address}</span>
                          <span className="text-[#FF7120] font-bold">intepe.net</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          TAB 3: LIVE EDITOR & DATA CUSTOMIZER - ADMIN ONLY
          ========================================================================= */}
      {isAdmin && activeTab === 'editor' && (
        <div className="no-print cyber-card p-6 sm:p-8 rounded-lg border border-emerald-500/30 space-y-6">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>

          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <span>Personalizador de Datos de la Tarjeta</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Edite cualquier campo en tiempo real para generar tarjetas personalizadas para cualquier colaborador o área.
              </p>
            </div>
            <button
              onClick={() => handleProfilePresetChange('director')}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10"
            >
              Restablecer Valores
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Nombre Completo:</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Cargo / Especialidad:</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Área / Departamento:</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Celular / WhatsApp:</label>
              <input
                type="text"
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Teléfono PBX / Fijo:</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Correo Electrónico:</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Dirección Sede:</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Sitio Web / URL:</label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white font-mono text-sm focus:border-[#FF7120] focus:outline-none"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('virtual')}
              className="btn-cyber-primary text-xs py-2 px-5"
            >
              <Eye className="w-4 h-4" />
              <span>Ver en Tarjeta Virtual 3D</span>
            </button>
            <button
              onClick={() => setActiveTab('print')}
              className="px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-['Space_Grotesk'] text-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Ver en Pliego de Impresión</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================================
          MODAL: PIN DE SEGURIDAD PARA ACCESO ADMINISTRATIVO DE PAPELERÍA
          ========================================================================= */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="cyber-card w-full max-w-md p-6 sm:p-7 rounded-xl border border-white/10 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#FF7120]/10 border border-[#FF7120]/30 text-[#FF7120]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Acceso Papelería & Edición
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Ingrese el PIN de seguridad corporativo
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPinError('');
                  setEnteredPin('');
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  PIN de Seguridad:
                </label>
                <input
                  type="password"
                  maxLength={8}
                  placeholder="••••"
                  autoFocus
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError('');
                  }}
                  className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 px-4 rounded bg-black/60 border border-white/20 text-white focus:border-[#FF7120] focus:outline-none"
                />
                {pinError && (
                  <p className="text-xs text-red-400 font-mono mt-1">{pinError}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinError('');
                    setEnteredPin('');
                  }}
                  className="w-1/2 py-2.5 px-4 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs border border-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 btn-cyber-primary text-xs py-2.5"
                >
                  Desbloquear
                </button>
              </div>

              <p className="text-[10px] text-slate-500 font-mono text-center">
                Acceso restringido y protegido para directivos de INTEPE S.A.S.
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessCardPage;
