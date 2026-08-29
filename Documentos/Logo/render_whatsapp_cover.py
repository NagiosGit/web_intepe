import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_perfect_whatsapp_covers():
    W, H = 1920, 1080
    
    # -------------------------------------------------------------
    # BANNER 1: SLATE-TECH CORPORATIVO COMPLETO (1920 x 1080)
    # -------------------------------------------------------------
    img = Image.new("RGB", (W, H), (15, 23, 42)) # Slate 900 #0F172A
    draw = ImageDraw.Draw(img)
    
    # Cyber Grid
    grid_size = 48
    for x in range(0, W, grid_size):
        draw.line((x, 0, x, H), fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, grid_size):
        draw.line((0, y, W, y), fill=(255, 255, 255, 8), width=1)
        
    # Ambient Glow
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    g_draw.ellipse((W//2 - 650, -250, W//2 + 650, 550), fill=(255, 113, 32, 50))
    g_draw.ellipse((W - 550, 150, W + 250, 850), fill=(0, 229, 255, 30))
    g_draw.ellipse((-250, 150, 550, 850), fill=(0, 229, 255, 30))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=80))
    img.paste(glow_layer, (0, 0), glow_layer)
    
    # Fonts
    try:
        font_badge = ImageFont.truetype("arialbd.ttf", 26)
        font_title = ImageFont.truetype("arialbd.ttf", 104)
        font_sub = ImageFont.truetype("arial.ttf", 34)
        font_card_tag = ImageFont.truetype("arialbd.ttf", 22)
        font_card_title = ImageFont.truetype("arialbd.ttf", 34)
        font_card_desc = ImageFont.truetype("arial.ttf", 24)
        font_footer = ImageFont.truetype("arialbd.ttf", 28)
    except:
        font_badge = font_title = font_sub = font_card_tag = font_card_title = font_card_desc = font_footer = ImageFont.load_default()
        
    # Top Badge
    badge_text = "SOLUCIONES CORPORATIVAS TI  •  OUTSOURCING  •  CLOUD"
    bbox_b = draw.textbbox((0, 0), badge_text, font=font_badge)
    bw = bbox_b[2] - bbox_b[0]
    badge_y = 60
    draw.rounded_rectangle((W//2 - bw//2 - 24, badge_y - 8, W//2 + bw//2 + 24, badge_y + 40), radius=20, fill=(30, 41, 59), outline=(255, 113, 32), width=2)
    draw.text((W//2 - bw//2, badge_y), badge_text, font=font_badge, fill=(255, 113, 32))
    
    # Title: INTEPE S.A.S.
    title_text = "INTEPE S.A.S."
    bbox_t = draw.textbbox((0, 0), title_text, font=font_title)
    tw = bbox_t[2] - bbox_t[0]
    title_y = 130
    
    # Shadow
    draw.text((W//2 - tw//2 + 4, title_y + 4), title_text, font=font_title, fill=(0, 0, 0))
    # Two-tone text
    bbox_i = draw.textbbox((0, 0), "INTEPE ", font=font_title)
    wi = bbox_i[2] - bbox_i[0]
    draw.text((W//2 - tw//2, title_y), "INTEPE ", font=font_title, fill=(255, 255, 255))
    draw.text((W//2 - tw//2 + wi, title_y), "S.A.S.", font=font_title, fill=(255, 113, 32))
    
    # Subtitle
    sub_text = "Informatica y Tecnologia Penagos S.A.S. • NIT: 830.066.815-0"
    bbox_s = draw.textbbox((0, 0), sub_text, font=font_sub)
    sw = bbox_s[2] - bbox_s[0]
    draw.text((W//2 - sw//2, title_y + 115), sub_text, font=font_sub, fill=(148, 163, 184))
    
    # 4 Service Cards
    services = [
        # Left Column
        {
            "box": (110, 330, 610, 520),
            "tag": "// MESA DE AYUDA B2B",
            "title": "Mesa de Ayuda L1/L2/L3",
            "desc": "Soporte tecnico remoto y en sitio.\nRespuesta garantizada < 15 min.",
            "color": (0, 229, 255)
        },
        {
            "box": (110, 545, 610, 735),
            "tag": "// REDES & CLOUD",
            "title": "Infraestructura & Servidores",
            "desc": "Windows/Linux, Firewalls, Wi-Fi,\nVirtualizacion y Backups DRP.",
            "color": (255, 113, 32)
        },
        # Right Column
        {
            "box": (1310, 330, 1810, 520),
            "tag": "// HARDWARE & LAB",
            "title": "Mantenimiento Preventivo",
            "desc": "Polizas empresariales continuas,\nreparacion y ensamble de equipos.",
            "color": (16, 185, 129)
        },
        {
            "box": (1310, 545, 1810, 735),
            "tag": "// SOFTWARE & PRODUCTIVIDAD",
            "title": "Software & Workspace",
            "desc": "Desarrollo a medida, ERPs y\nGoogle Workspace & Microsoft 365.",
            "color": (0, 229, 255)
        }
    ]
    
    for s in services:
        x1, y1, x2, y2 = s["box"]
        # Card Background
        draw.rounded_rectangle((x1, y1, x2, y2), radius=16, fill=(30, 41, 59), outline=(255, 255, 255, 30), width=1)
        # Accent Bar
        draw.rounded_rectangle((x1, y1, x2, y1 + 5), radius=2, fill=s["color"])
        # Tag
        draw.text((x1 + 24, y1 + 20), s["tag"], font=font_card_tag, fill=s["color"])
        # Title
        draw.text((x1 + 24, y1 + 54), s["title"], font=font_card_title, fill=(255, 255, 255))
        # Desc
        draw.text((x1 + 24, y1 + 104), s["desc"], font=font_card_desc, fill=(148, 163, 184))
        
    # Central Channel Bar
    footer_text = "www.intepe.net  •  soporte@intepe.net  •  (+57) 313 386 2656"
    bbox_f = draw.textbbox((0, 0), footer_text, font=font_footer)
    fw = bbox_f[2] - bbox_f[0]
    draw.rounded_rectangle((W//2 - fw//2 - 28, 830, W//2 + fw//2 + 28, 895), radius=14, fill=(15, 23, 42), outline=(0, 229, 255, 180), width=2)
    draw.text((W//2 - fw//2, 846), footer_text, font=font_footer, fill=(0, 229, 255))
    
    # Save Banner 1
    out1 = os.path.join(output_dir, "portada_whatsapp_business.jpg")
    img.save(out1, format="JPEG", quality=96)
    img.save(os.path.join(public_dir, "portada_whatsapp_business.jpg"), format="JPEG", quality=96)
    
    # -------------------------------------------------------------
    # BANNER 2: EJECUTIVO FONDO BLANCO / CLARO (1920 x 1080)
    # -------------------------------------------------------------
    img_w = Image.new("RGB", (W, H), (248, 250, 252)) # Slate 50
    draw_w = ImageDraw.Draw(img_w)
    
    # Grid
    for x in range(0, W, grid_size):
        draw_w.line((x, 0, x, H), fill=(226, 232, 240), width=1)
    for y in range(0, H, grid_size):
        draw_w.line((0, y, W, y), fill=(226, 232, 240), width=1)
        
    # Top Badge
    draw_w.rounded_rectangle((W//2 - bw//2 - 24, badge_y - 8, W//2 + bw//2 + 24, badge_y + 40), radius=20, fill=(255, 241, 235), outline=(255, 113, 32), width=2)
    draw_w.text((W//2 - bw//2, badge_y), badge_text, font=font_badge, fill=(217, 72, 5))
    
    # Title
    draw_w.text((W//2 - tw//2, title_y), "INTEPE ", font=font_title, fill=(15, 23, 42))
    draw_w.text((W//2 - tw//2 + wi, title_y), "S.A.S.", font=font_title, fill=(255, 113, 32))
    
    # Subtitle
    draw_w.text((W//2 - sw//2, title_y + 115), sub_text, font=font_sub, fill=(71, 85, 105))
    
    for s in services:
        x1, y1, x2, y2 = s["box"]
        # Card Background
        draw_w.rounded_rectangle((x1, y1, x2, y2), radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
        # Accent Bar
        draw_w.rounded_rectangle((x1, y1, x2, y1 + 5), radius=2, fill=s["color"])
        # Tag
        draw_w.text((x1 + 24, y1 + 20), s["tag"], font=font_card_tag, fill=(14, 116, 144) if s["color"][0]==0 else (194, 65, 12))
        # Title
        draw_w.text((x1 + 24, y1 + 54), s["title"], font=font_card_title, fill=(15, 23, 42))
        # Desc
        draw_w.text((x1 + 24, y1 + 104), s["desc"], font=font_card_desc, fill=(71, 85, 105))
        
    # Footer
    draw_w.rounded_rectangle((W//2 - fw//2 - 28, 830, W//2 + fw//2 + 28, 895), radius=14, fill=(255, 255, 255), outline=(14, 116, 144), width=2)
    draw_w.text((W//2 - fw//2, 846), footer_text, font=font_footer, fill=(14, 116, 144))
    
    out_w = os.path.join(output_dir, "portada_whatsapp_blanco.jpg")
    img_w.save(out_w, format="JPEG", quality=96)
    img_w.save(os.path.join(public_dir, "portada_whatsapp_blanco.jpg"), format="JPEG", quality=96)
    
    print("WhatsApp covers created successfully!")

create_perfect_whatsapp_covers()
