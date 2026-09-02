import os
import subprocess
import base64
import shutil

doc_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Papeleria"
pub_downloads = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\downloads"

os.makedirs(doc_dir, exist_ok=True)
os.makedirs(pub_downloads, exist_ok=True)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

profiles = {
    "director": {
        "filename": "Pliego_Tarjetas_Ing_William_Penagos",
        "qr_path": os.path.join(doc_dir, "qr_william.png"),
        "name": "Ing. William Penagos",
        "role": "Director General & Especialista TI",
        "dept": "Dirección de Operaciones & Soluciones",
        "mobile": "(+57) 313 386 2656",
        "phone": "(601) 745 2345",
        "email": "williampenagos@intepe.net",
        "address": "Cl. 152a # 55-44, Bogotá",
        "website": "https://www.intepe.net",
        "nit": "830.066.815-0",
        "tag": "TI SOLUTIONS",
        "services": [
            "Outsourcing TI Integral",
            "Mesa de Ayuda L1/L2/L3",
            "Infraestructura & Servidores",
            "Desarrollo de Software a Medida"
        ]
    },
    "rrhh": {
        "filename": "Pliego_Tarjetas_Patricia_Munoz",
        "qr_path": os.path.join(doc_dir, "qr_patricia.png"),
        "name": "Patricia Muñoz",
        "role": "Directora de Gestión Humana & Talento",
        "dept": "Dirección de Talento Humano",
        "mobile": "(+57) 310 819 6554",
        "phone": "(601) 745 2345",
        "email": "gestionhumana@intepe.net",
        "address": "Cl. 152a # 55-44, Bogotá",
        "website": "https://www.intepe.net/tarjeta?p=rrhh",
        "nit": "830.066.815-0",
        "tag": "TALENTO TI",
        "services": [
            "Gestión del Talento & Selección",
            "Capacitación Técnica Empresarial",
            "Cultura Organizacional TI",
            "Bienestar & Consultoría Laboral"
        ]
    }
}

chip_svg = """<svg viewBox="0 0 512 512" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>"""

def generate_pdf_for_profile(key, p):
    with open(p["qr_path"], "rb") as f:
        qr_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode('utf-8')
    
    # 8 Frentes
    front_cards_html = ""
    for _ in range(8):
        front_cards_html += f"""
        <div class="card-box">
          <div class="cf-top">
            <div class="cf-brand">
              <div class="cf-logo-box">
                {chip_svg}
              </div>
              <div>
                <div class="cf-name-intepe">INTEPE <span>S.A.S.</span></div>
                <div class="cf-sub-razon">Informática y Tecnología Penagos S.A.S.</div>
              </div>
            </div>
            <div class="cf-tag">{p['tag']}</div>
          </div>
          <div class="cf-center">
            <div class="cf-fullname">{p['name']}</div>
            <div class="cf-title">{p['role']}</div>
            <div class="cf-dept">{p['dept']}</div>
          </div>
          <div class="cf-bottom">
            <div>📞 {p['mobile']}</div>
            <div style="text-align: right;">✉️ {p['email']}</div>
            <div class="cf-bottom-full">🌐 {p['website']} • NIT: {p['nit']}</div>
          </div>
        </div>
        """
        
    # 8 Reversos (Espejados para coincidencia dúplex)
    srv_html = "".join([f'<div class="cb-srv-item">{s}</div>' for s in p['services']])
    back_cards_html = ""
    for _ in range(8):
        back_cards_html += f"""
        <div class="card-box">
          <div class="cb-top">
            <div class="cb-tag">// {p['tag']}</div>
            <div class="cb-city">Bogotá, CO</div>
          </div>
          <div class="cb-center">
            <div class="cb-srv-list">
              {srv_html}
            </div>
            <div class="cb-qr">
              <img src="{qr_b64}" class="cb-qr-img" alt="QR" />
              <div class="cb-qr-lbl">ESCANEAR</div>
            </div>
          </div>
          <div class="cb-bottom">
            <div>📍 {p['address']}</div>
            <div><strong>www.intepe.net</strong></div>
          </div>
        </div>
        """
        
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>{p['filename']}</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      background: #FFFFFF;
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
    }}
    .page-sheet {{
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
    }}
    .page-sheet:last-of-type {{
      page-break-after: avoid !important;
      break-after: avoid !important;
    }}
    .sheet-label {{
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
    }}
    .cards-grid {{
      display: grid;
      grid-template-columns: 85mm 85mm;
      grid-template-rows: repeat(4, 53mm);
      gap: 2mm 3mm;
      justify-content: center;
      align-content: center;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }}
    .card-box {{
      width: 85mm;
      height: 53mm;
      box-sizing: border-box;
      padding: 3.5mm 4.5mm;
      border: 1px solid #CBD5E1;
      border-radius: 1mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
      color: #0F172A;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      overflow: hidden;
    }}
    .cf-top {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }}
    .cf-brand {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .cf-logo-box {{
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}
    .cf-name-intepe {{
      font-size: 14px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.2px;
    }}
    .cf-name-intepe span {{
      color: #FF7120;
    }}
    .cf-sub-razon {{
      font-size: 8px;
      font-weight: 700;
      color: #475569;
      margin-top: 1.5px;
    }}
    .cf-tag {{
      font-size: 8.5px;
      font-weight: 800;
      font-family: monospace;
      padding: 2px 6px;
      border-radius: 4px;
      background: #FFF7ED;
      border: 1px solid #FFEDD5;
      color: #C2410C;
      text-transform: uppercase;
    }}
    .cf-center {{
      margin: auto 0;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }}
    .cf-fullname {{
      font-size: 16.5px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.3px;
    }}
    .cf-title {{
      font-size: 11.5px;
      font-weight: 800;
      color: #EA580C;
    }}
    .cf-dept {{
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: #475569;
    }}
    .cf-bottom {{
      border-top: 1.5px solid #CBD5E1;
      padding-top: 1.5mm;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 6px;
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: #0F172A;
    }}
    .cf-bottom-full {{
      grid-column: span 2;
      font-size: 8.5px;
      color: #475569;
    }}
    .cb-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #CBD5E1;
      padding-bottom: 1.5mm;
      font-size: 9px;
      font-family: monospace;
    }}
    .cb-tag {{
      font-weight: 800;
      color: #C2410C;
      text-transform: uppercase;
    }}
    .cb-city {{
      font-size: 8.5px;
      color: #475569;
    }}
    .cb-center {{
      display: grid;
      grid-template-columns: 1fr 20mm;
      gap: 3mm;
      align-items: center;
      margin: auto 0;
    }}
    .cb-srv-list {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: #0F172A;
    }}
    .cb-srv-item {{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}
    .cb-srv-item::before {{
      content: "• ";
      color: #FF7120;
      font-weight: 900;
    }}
    .cb-qr {{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 1.5mm;
    }}
    .cb-qr-img {{
      width: 14mm;
      height: 14mm;
      display: block;
    }}
    .cb-qr-lbl {{
      font-size: 7px;
      font-weight: 800;
      font-family: monospace;
      color: #C2410C;
      margin-top: 1.5px;
      text-transform: uppercase;
    }}
    .cb-bottom {{
      border-top: 1.5px solid #CBD5E1;
      padding-top: 1.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      font-weight: 600;
      font-family: monospace;
      color: #475569;
    }}
    .cb-bottom strong {{
      color: #FF7120;
      font-size: 9.5px;
    }}
  </style>
</head>
<body>
  <div class="page-sheet">
    <div class="sheet-label">
      <span>📄 HOJA 1 DE 2: PLIEGO FRENTE (8 TARJETAS - ANVERSO)</span>
      <span>INTEPE S.A.S. • NIT: {p['nit']}</span>
    </div>
    <div class="cards-grid">
      {front_cards_html}
    </div>
  </div>

  <div class="page-sheet">
    <div class="sheet-label">
      <span>🔄 HOJA 2 DE 2: PLIEGO REVERSO (8 TARJETAS - DORSO CON QR)</span>
      <span>ALINEACIÓN DÚPLEX 1:1 (GIRO BORDE LARGO)</span>
    </div>
    <div class="cards-grid">
      {back_cards_html}
    </div>
  </div>
</body>
</html>"""
    
    html_path = os.path.join(doc_dir, f"{p['filename']}.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    pdf_pub = os.path.join(pub_downloads, f"{p['filename']}.pdf")
    pdf_doc = os.path.join(doc_dir, f"{p['filename']}.pdf")
    
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={pdf_pub}",
        "--no-pdf-header-footer",
        f"file:///{html_path.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd, check=True)
    
    shutil.copyfile(pdf_pub, pdf_doc)
    print(f"Generated 2-page PDF: {pdf_pub}")

for k, prof in profiles.items():
    generate_pdf_for_profile(k, prof)
print("All PDFs generated successfully!")
