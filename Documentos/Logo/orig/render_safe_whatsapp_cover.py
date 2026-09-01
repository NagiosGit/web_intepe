import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_safe_zone_whatsapp_cover():
    W, H = 1920, 1080
    
    # 1. Base Canvas #0F172A
    img = Image.new("RGB", (W, H), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    # 2. Smooth Ambient Glows
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    # Center orange glow
    g_draw.ellipse((W//2 - 450, 80, W//2 + 450, 650), fill=(255, 113, 32, 50))
    # Left & Right cyan ambient
    g_draw.ellipse((200, 300, 700, 900), fill=(0, 229, 255, 25))
    g_draw.ellipse((1220, 300, 1720, 900), fill=(0, 229, 255, 25))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=80))
    img.paste(glow_layer, (0, 0), glow_layer)
    
    # Fonts
    try:
        font_logo = ImageFont.truetype("arialbd.ttf", 150)
        font_tagline = ImageFont.truetype("arialbd.ttf", 26)
        font_card_title = ImageFont.truetype("arialbd.ttf", 25)
        font_card_desc = ImageFont.truetype("arial.ttf", 18)
        font_footer = ImageFont.truetype("arialbd.ttf", 21)
    except:
        font_logo = font_tagline = font_card_title = font_card_desc = font_footer = ImageFont.load_default()
        
    # -------------------------------------------------------------
    # 3. 3D "INTEPE" LOGO (Positioned inside safe Y: 180-330)
    # -------------------------------------------------------------
    big_text = "INTEPE"
    bbox_bt = draw.textbbox((0, 0), big_text, font=font_logo)
    btw = bbox_bt[2] - bbox_bt[0]
    
    intepe_y = 190
    intepe_x = W // 2 - btw // 2
    
    # Drop shadow
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((intepe_x + 14, intepe_y + 16), big_text, font=font_logo, fill=(0, 0, 0, 190))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=10))
    img.paste(shadow_img, (0, 0), shadow_img)
    
    # 3D Bevel depth
    for off in range(1, 11):
        draw.text((intepe_x + int(off * 1.1), intepe_y + int(off * 1.1)), big_text, font=font_logo, fill=(185, 52, 0))
        
    # Face Vibrant Orange
    draw.text((intepe_x, intepe_y), big_text, font=font_logo, fill=(255, 113, 32))
    
    # -------------------------------------------------------------
    # 4. TAGLINE PILL (Y: 345)
    # -------------------------------------------------------------
    tagline_text = "SOLUCIONES CORPORATIVAS TI  •  OUTSOURCING  •  CLOUD"
    bbox_tl = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    tlw = bbox_tl[2] - bbox_tl[0]
    tagline_y = 350
    
    draw.rounded_rectangle((W//2 - tlw//2 - 20, tagline_y - 6, W//2 + tlw//2 + 20, tagline_y + 36), radius=14, fill=(30, 41, 59), outline=(255, 255, 255, 40), width=1)
    draw.text((W//2 - tlw//2, tagline_y), tagline_text, font=font_tagline, fill=(255, 255, 255))
    
    # -------------------------------------------------------------
    # 5. COMPACT 2-COLUMN SERVICE CARDS (Inside safe width: X: 420 - 1500)
    # -------------------------------------------------------------
    card_w = 520
    card_h = 105
    gap_x = 40
    gap_y = 16
    
    left_x = W // 2 - card_w - (gap_x // 2)  # ~410
    right_x = W // 2 + (gap_x // 2)         # ~990
    
    y_start = 425
    
    services_left = [
        {"title": "Mesa de Ayuda L1/L2/L3", "desc": "Atencion tecnica remota y presencial", "accent": (0, 229, 255)},
        {"title": "Mantenimiento Preventivo", "desc": "Polizas periodicas y optimizacion", "accent": (16, 185, 129)},
        {"title": "Servidores & Redes Wi-Fi", "desc": "Windows/Linux, Firewalls y Backups", "accent": (255, 113, 32)}
    ]
    
    services_right = [
        {"title": "Software a Medida", "desc": "Plataformas web, ERPs y automatizacion", "accent": (0, 229, 255)},
        {"title": "Google Workspace & Cloud", "desc": "Correo corporativo, Drive y seguridad", "accent": (255, 113, 32)},
        {"title": "Licenciamiento & Antivirus", "desc": "Software corporativo original auditado", "accent": (16, 185, 129)}
    ]
    
    # Render Left Column
    for i, s in enumerate(services_left):
        cy1 = y_start + i * (card_h + gap_y)
        cy2 = cy1 + card_h
        draw.rounded_rectangle((left_x, cy1, left_x + card_w, cy2), radius=12, fill=(30, 41, 59), outline=(255, 255, 255, 30), width=1)
        draw.rounded_rectangle((left_x, cy1, left_x + 5, cy2), radius=2, fill=s["accent"])
        draw.text((left_x + 18, cy1 + 18), s["title"], font=font_card_title, fill=(255, 255, 255))
        draw.text((left_x + 18, cy1 + 55), s["desc"], font=font_card_desc, fill=(148, 163, 184))
        
    # Render Right Column
    for i, s in enumerate(services_right):
        cy1 = y_start + i * (card_h + gap_y)
        cy2 = cy1 + card_h
        draw.rounded_rectangle((right_x, cy1, right_x + card_w, cy2), radius=12, fill=(30, 41, 59), outline=(255, 255, 255, 30), width=1)
        draw.rounded_rectangle((right_x, cy1, right_x + 5, cy2), radius=2, fill=s["accent"])
        draw.text((right_x + 18, cy1 + 18), s["title"], font=font_card_title, fill=(255, 255, 255))
        draw.text((right_x + 18, cy1 + 55), s["desc"], font=font_card_desc, fill=(148, 163, 184))
        
    # -------------------------------------------------------------
    # 6. FOOTER WEB BADGE (Y: 810)
    # -------------------------------------------------------------
    footer_text = "www.intepe.net  •  soporte@intepe.net  •  (+57) 313 386 2656"
    bbox_fb = draw.textbbox((0, 0), footer_text, font=font_footer)
    fbw = bbox_fb[2] - bbox_fb[0]
    draw.rounded_rectangle((W//2 - fbw//2 - 18, 805, W//2 + fbw//2 + 18, 845), radius=10, fill=(15, 23, 42), outline=(0, 229, 255, 140), width=1)
    draw.text((W//2 - fbw//2, 814), footer_text, font=font_footer, fill=(0, 229, 255))
    
    # Save
    out_b1 = os.path.join(output_dir, "portada_whatsapp_business.jpg")
    img.save(out_b1, format="JPEG", quality=96)
    
    out_b2 = os.path.join(output_dir, "portada_whatsapp_minimal.jpg")
    img.save(out_b2, format="JPEG", quality=96)
    
    # Copy to public/logo/
    img.save(os.path.join(public_dir, "portada_whatsapp_business.jpg"), format="JPEG", quality=96)
    img.save(os.path.join(public_dir, "portada_whatsapp_minimal.jpg"), format="JPEG", quality=96)
    
    print("Exact WhatsApp Safe-Zone cover generated successfully!")

create_safe_zone_whatsapp_cover()
