import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_clean_whatsapp_cover():
    W, H = 1920, 1080
    
    # 1. Sleek Background: No grid, pure rich Slate-Tech #0F172A
    img = Image.new("RGB", (W, H), (15, 23, 42)) # #0F172A
    draw = ImageDraw.Draw(img)
    
    # 2. Rich Ambient Lighting & Smooth Glows (No Grid!)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    
    # Top Orange Aurora Glow behind INTEPE Logo
    g_draw.ellipse((W//2 - 600, -250, W//2 + 600, 450), fill=(255, 113, 32, 55))
    # Left Cyan Glow for services
    g_draw.ellipse((-150, 200, 500, 950), fill=(0, 229, 255, 35))
    # Right Cyan/Emerald Glow for services
    g_draw.ellipse((W - 500, 200, W + 150, 950), fill=(0, 229, 255, 30))
    
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=90))
    img.paste(glow_layer, (0, 0), glow_layer)
    
    # Fonts
    try:
        font_big_intepe = ImageFont.truetype("arialbd.ttf", 195)
        font_tagline = ImageFont.truetype("arialbd.ttf", 36)
        font_pill = ImageFont.truetype("arialbd.ttf", 30)
        font_card_tag = ImageFont.truetype("arialbd.ttf", 20)
        font_card_desc = ImageFont.truetype("arial.ttf", 22)
        font_web = ImageFont.truetype("arialbd.ttf", 24)
    except:
        font_big_intepe = font_tagline = font_pill = font_card_tag = font_card_desc = font_web = ImageFont.load_default()
        
    # -------------------------------------------------------------
    # 3. TOP-CENTER: 3D "INTEPE" LOGO
    # -------------------------------------------------------------
    big_text = "INTEPE"
    bbox_bt = draw.textbbox((0, 0), big_text, font=font_big_intepe)
    btw = bbox_bt[2] - bbox_bt[0]
    
    intepe_y = 70
    intepe_x = W // 2 - btw // 2
    
    # Soft ambient drop shadow
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((intepe_x + 20, intepe_y + 24), big_text, font=font_big_intepe, fill=(0, 0, 0, 180))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=14))
    img.paste(shadow_img, (0, 0), shadow_img)
    
    # 3D Bevel depth (rich warm orange extrusions)
    for off in range(1, 14):
        draw.text((intepe_x + int(off * 1.2), intepe_y + int(off * 1.2)), big_text, font=font_big_intepe, fill=(185, 52, 0))
        
    # Main Face Vibrant Orange (#FF7120)
    draw.text((intepe_x, intepe_y), big_text, font=font_big_intepe, fill=(255, 113, 32))
    
    # -------------------------------------------------------------
    # 4. TAGLINE: "SOLUCIONES CORPORATIVAS TI • OUTSOURCING • CLOUD"
    # -------------------------------------------------------------
    tagline_text = "SOLUCIONES CORPORATIVAS TI  •  OUTSOURCING  •  CLOUD"
    bbox_tl = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    tlw = bbox_tl[2] - bbox_tl[0]
    tagline_y = 295
    
    draw.rounded_rectangle((W//2 - tlw//2 - 24, tagline_y - 8, W//2 + tlw//2 + 24, tagline_y + 44), radius=16, fill=(30, 41, 59), outline=(255, 255, 255, 35), width=1)
    draw.text((W//2 - tlw//2, tagline_y), tagline_text, font=font_tagline, fill=(255, 255, 255))
    
    # -------------------------------------------------------------
    # 5. REUBICACIÓN INTELIGENTE DE LOS SERVICIOS (EN LOS LATERALES)
    # -------------------------------------------------------------
    left_services = [
        {
            "tag": "// SOPORTE & ASISTENCIA",
            "title": "Mesa de Ayuda L1/L2/L3",
            "desc": "Atencion tecnica remota y presencial",
            "box": (80, 410, 580, 560),
            "accent": (0, 229, 255) # Cyan
        },
        {
            "tag": "// HARDWARE & LABORATORIO",
            "title": "Mantenimiento Preventivo",
            "desc": "Polizas periodicas y optimizacion",
            "box": (80, 590, 580, 740),
            "accent": (16, 185, 129) # Emerald
        },
        {
            "tag": "// INFRAESTRUCTURA & NUBE",
            "title": "Servidores & Redes Wi-Fi",
            "desc": "Windows/Linux, Firewalls y Backups DRP",
            "box": (80, 770, 580, 920),
            "accent": (255, 113, 32) # Orange
        }
    ]
    
    right_services = [
        {
            "tag": "// DESARROLLO ESPECIALIZADO",
            "title": "Software a Medida",
            "desc": "Plataformas web, ERPs y automatizacion",
            "box": (1340, 410, 1840, 560),
            "accent": (0, 229, 255) # Cyan
        },
        {
            "tag": "// PRODUCTIVIDAD & CORREO",
            "title": "Google Workspace & Cloud",
            "desc": "Correo corporativo, Drive y seguridad",
            "box": (1340, 590, 1840, 740),
            "accent": (255, 113, 32) # Orange
        },
        {
            "tag": "// SEGURIDAD & LICENCIAS",
            "title": "Licenciamiento & Antivirus",
            "desc": "Software corporativo original auditado",
            "box": (1340, 770, 1840, 920),
            "accent": (16, 185, 129) # Emerald
        }
    ]
    
    all_cards = left_services + right_services
    
    for c in all_cards:
        x1, y1, x2, y2 = c["box"]
        draw.rounded_rectangle((x1, y1, x2, y2), radius=16, fill=(30, 41, 59), outline=(255, 255, 255, 30), width=1)
        draw.rounded_rectangle((x1, y1, x1 + 6, y2), radius=3, fill=c["accent"])
        draw.text((x1 + 22, y1 + 18), c["tag"], font=font_card_tag, fill=c["accent"])
        draw.text((x1 + 22, y1 + 48), c["title"], font=font_pill, fill=(255, 255, 255))
        draw.text((x1 + 22, y1 + 92), c["desc"], font=font_card_desc, fill=(148, 163, 184))
        
    # Clean Web URL Capsule at Bottom
    web_badge = "www.intepe.net  •  soporte@intepe.net"
    bbox_wb = draw.textbbox((0, 0), web_badge, font=font_web)
    wbw = bbox_wb[2] - bbox_wb[0]
    draw.rounded_rectangle((W//2 - wbw//2 - 24, 960, W//2 + wbw//2 + 24, 1015), radius=12, fill=(15, 23, 42), outline=(0, 229, 255, 150), width=2)
    draw.text((W//2 - wbw//2, 975), web_badge, font=font_web, fill=(0, 229, 255))
    
    # Save files
    out_path = os.path.join(output_dir, "portada_whatsapp_business.jpg")
    img.save(out_path, format="JPEG", quality=96)
    
    out_path2 = os.path.join(output_dir, "portada_whatsapp_minimal.jpg")
    img.save(out_path2, format="JPEG", quality=96)
    
    # Sync to public/logo/
    img.save(os.path.join(public_dir, "portada_whatsapp_business.jpg"), format="JPEG", quality=96)
    img.save(os.path.join(public_dir, "portada_whatsapp_minimal.jpg"), format="JPEG", quality=96)
    
    print("Clean WhatsApp cover generated successfully!")

create_clean_whatsapp_cover()
