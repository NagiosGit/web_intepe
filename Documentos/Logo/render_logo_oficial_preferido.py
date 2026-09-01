import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

os.makedirs(output_dir, exist_ok=True)
os.makedirs(public_dir, exist_ok=True)

def generate_master_svg():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E1626" />
      <stop offset="100%" stop-color="#070B12" />
    </linearGradient>

    <!-- Chip Body Gradient -->
    <linearGradient id="chipBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141E30" />
      <stop offset="100%" stop-color="#0B101D" />
    </linearGradient>

    <!-- Core Orange Gradient -->
    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8A3D" />
      <stop offset="100%" stop-color="#FF7120" />
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- 1. Outer Ambient Shadow/Glow -->
  <rect x="36" y="36" width="440" height="440" rx="96" ry="96" fill="none" stroke="#FF7120" stroke-width="4" opacity="0.35" filter="url(#orangeGlow)" />

  <!-- 2. Main Squircle Card Container -->
  <rect x="40" y="40" width="432" height="432" rx="90" ry="90" fill="url(#bgGrad)" stroke="#FF7120" stroke-width="6" />

  <!-- 3. Microchip 16 Pins (4 per side) with Electric Cyan Terminal Nodes -->
  <!-- TOP PINS -->
  <g stroke="#FF7120" stroke-width="8" stroke-linecap="round">
    <line x1="172" y1="140" x2="172" y2="88" />
    <line x1="228" y1="140" x2="228" y2="88" />
    <line x1="284" y1="140" x2="284" y2="88" />
    <line x1="340" y1="140" x2="340" y2="88" />

    <!-- BOTTOM PINS -->
    <line x1="172" y1="372" x2="172" y2="424" />
    <line x1="228" y1="372" x2="228" y2="424" />
    <line x1="284" y1="372" x2="284" y2="424" />
    <line x1="340" y1="372" x2="340" y2="424" />

    <!-- LEFT PINS -->
    <line x1="140" y1="172" x2="88" y2="172" />
    <line x1="140" y1="228" x2="88" y2="228" />
    <line x1="140" y1="284" x2="88" y2="284" />
    <line x1="140" y1="340" x2="88" y2="340" />

    <!-- RIGHT PINS -->
    <line x1="372" y1="172" x2="424" y2="172" />
    <line x1="372" y1="228" x2="424" y2="228" />
    <line x1="372" y1="284" x2="424" y2="284" />
    <line x1="372" y1="340" x2="424" y2="340" />
  </g>

  <!-- CYAN CONNECTION NODES -->
  <g fill="#00E5FF" filter="url(#cyanGlow)">
    <circle cx="172" cy="86" r="7.5" />
    <circle cx="228" cy="86" r="7.5" />
    <circle cx="284" cy="86" r="7.5" />
    <circle cx="340" cy="86" r="7.5" />

    <circle cx="172" cy="426" r="7.5" />
    <circle cx="228" cy="426" r="7.5" />
    <circle cx="284" cy="426" r="7.5" />
    <circle cx="340" cy="426" r="7.5" />

    <circle cx="86" cy="172" r="7.5" />
    <circle cx="86" cy="228" r="7.5" />
    <circle cx="86" cy="284" r="7.5" />
    <circle cx="86" cy="340" r="7.5" />

    <circle cx="426" cy="172" r="7.5" />
    <circle cx="426" cy="228" r="7.5" />
    <circle cx="426" cy="284" r="7.5" />
    <circle cx="426" cy="340" r="7.5" />
  </g>

  <!-- 4. Chip Processor Chassis (Outer Shell) -->
  <rect x="136" y="136" width="240" height="240" rx="34" ry="34" fill="url(#chipBodyGrad)" stroke="#FF7120" stroke-width="8" />

  <!-- 5. Inner Core (Solid Vibrant Orange Silicon Die) -->
  <rect x="188" y="188" width="136" height="136" rx="20" ry="20" fill="url(#coreGrad)" stroke="#FF8A3D" stroke-width="2" />
</svg>'''
    
    svg_path = os.path.join(output_dir, "logo_oficial_chip.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    pub_svg = os.path.join(public_dir, "logo_oficial_chip.svg")
    with open(pub_svg, "w", encoding="utf-8") as f:
        f.write(svg_content)
        
    print(f"Saved: {svg_path} & {pub_svg}")

def generate_master_png_and_banner():
    # 1. High Resolution Icon (1024x1024)
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    pad = 80
    box_size = size - 2 * pad
    r_box = 180
    
    # Outer Glow
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.rounded_rectangle((pad - 15, pad - 15, size - pad + 15, size - pad + 15), radius=r_box + 15, fill=(255, 113, 32, 100))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=20))
    img.paste(glow_img, (0, 0), glow_img)
    
    # Card Background (#0E1626)
    draw.rounded_rectangle((pad, pad, size - pad, size - pad), radius=r_box, fill=(14, 22, 38, 255), outline=(255, 113, 32, 255), width=12)
    
    # Chip Outer Body
    cx, cy = size // 2, size // 2
    chip_w = 480
    chip_r = 68
    
    # Pins (4 per side)
    pin_len = 105
    pin_w = 16
    offsets = [-168, -56, 56, 168]
    cyan_col = (0, 229, 255, 255)
    orange_col = (255, 113, 32, 255)
    
    # Draw Pins
    for off in offsets:
        # Top
        draw.line((cx + off, cy - chip_w//2, cx + off, cy - chip_w//2 - pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 15, cy - chip_w//2 - pin_len - 15, cx + off + 15, cy - chip_w//2 - pin_len + 15), fill=cyan_col)
        # Bottom
        draw.line((cx + off, cy + chip_w//2, cx + off, cy + chip_w//2 + pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 15, cy + chip_w//2 + pin_len - 15, cx + off + 15, cy + chip_w//2 + pin_len + 15), fill=cyan_col)
        # Left
        draw.line((cx - chip_w//2, cy + off, cx - chip_w//2 - pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx - chip_w//2 - pin_len - 15, cy + off - 15, cx - chip_w//2 - pin_len + 15, cy + off + 15), fill=cyan_col)
        # Right
        draw.line((cx + chip_w//2, cy + off, cx + chip_w//2 + pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx + chip_w//2 + pin_len - 15, cy + off - 15, cx + chip_w//2 + pin_len + 15, cy + off + 15), fill=cyan_col)
        
    # Draw Chip Box
    draw.rounded_rectangle((cx - chip_w//2, cy - chip_w//2, cx + chip_w//2, cy + chip_w//2), radius=chip_r, fill=(20, 30, 48, 255), outline=orange_col, width=16)
    
    # Inner Solid Orange Core
    core_w = 270
    core_r = 40
    draw.rounded_rectangle((cx - core_w//2, cy - core_w//2, cx + core_w//2, cy + core_w//2), radius=core_r, fill=(255, 113, 32, 255), outline=(255, 140, 60, 255), width=4)
    
    icon_out = os.path.join(output_dir, "logo_icono_chip_master.png")
    img.save(icon_out, format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logo_icono_chip_master.png"), format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logo.png"), format="PNG", optimize=True)
    print("Saved logo_icono_chip_master.png")

    # 2. Horizontal Master Brand Banner (2400 x 600)
    bw, bh = 2400, 600
    banner = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(banner)
    
    # Paste Icon on Left
    icon_resized = img.resize((440, 440), Image.Resampling.LANCZOS)
    banner.paste(icon_resized, (90, 80), icon_resized)
    
    # Typography
    try:
        font_brand = ImageFont.truetype("arialbd.ttf", 175)
        font_sub1 = ImageFont.truetype("arial.ttf", 52)
        font_sub2 = ImageFont.truetype("arialbd.ttf", 46)
    except:
        font_brand = ImageFont.load_default()
        font_sub1 = ImageFont.load_default()
        font_sub2 = ImageFont.load_default()
        
    tx = 600
    # INTEPE in Black / Deep Slate
    b_draw.text((tx, 80), "INTEPE  ", font=font_brand, fill=(15, 23, 42, 255))
    bbox_intepe = b_draw.textbbox((tx, 80), "INTEPE  ", font=font_brand)
    # S.A.S. in Orange
    b_draw.text((bbox_intepe[2], 80), "S.A.S.", font=font_brand, fill=(255, 113, 32, 255))
    
    # Subtitle 1
    b_draw.text((tx + 6, 295), "Informática y Tecnología Penagos S.A.S.", font=font_sub1, fill=(100, 116, 139, 255))
    
    # Subtitle 2: TI & SOFTWARE SOLUTIONS // OUTSOURCING EMPRESARIAL
    b_draw.text((tx + 6, 385), "TI & SOFTWARE SOLUTIONS // OUTSOURCING EMPRESARIAL", font=font_sub2, fill=(255, 113, 32, 255))
    
    banner_out = os.path.join(output_dir, "logo_horizontal_oficial_intepe.png")
    banner.save(banner_out, format="PNG", optimize=True)
    banner.save(os.path.join(public_dir, "logo_horizontal_oficial_intepe.png"), format="PNG", optimize=True)
    print("Saved logo_horizontal_oficial_intepe.png")

generate_master_svg()
generate_master_png_and_banner()
