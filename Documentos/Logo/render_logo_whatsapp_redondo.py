import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def render_whatsapp_chip_icon_safe(size=1024):
    """
    Variant 1: Pure Chip Icon scaled down to 68% of canvas for 100% WhatsApp circular fit.
    Canvas: 1024x1024
    Outer Ring Diameter: 700px (r = 350px)
    Safe Margin: 162px transparent padding all around.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    r_outer = 350
    
    # 1. Outer Glow Aura (Orange)
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(255, 113, 32, 130))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=20))
    img.paste(glow_img, (0, 0), glow_img)
    
    # 2. Main Circular Dark Slate Background (#0A0F1D)
    draw.ellipse(
        (cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), 
        fill=(10, 15, 29, 255), 
        outline=(255, 113, 32, 255), 
        width=8
    )
    
    # 3. Inner Tech Orbit Ring & Crosshairs
    r_inner = 320
    draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), outline=(0, 229, 255, 55), width=2)
    
    # Crosshair Ticks
    tick = 26
    draw.line((cx, cy - r_outer - 4, cx, cy - r_outer + tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx, cy + r_outer + 4, cx, cy + r_outer - tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx - r_outer - 4, cy, cx - r_outer + tick, cy), fill=(255, 113, 32, 255), width=6)
    draw.line((cx + r_outer + 4, cy, cx + r_outer - tick, cy), fill=(255, 113, 32, 255), width=6)
    
    # 4. Perfectly Scaled Chip Icon
    chip_w = 340
    chip_r = 48
    
    pin_len = 70
    pin_w = 11
    offsets = [-118, -40, 40, 118]
    cyan_col = (0, 229, 255, 255)
    orange_col = (255, 113, 32, 255)
    
    # Draw Pins with Cyan Terminal Nodes
    for off in offsets:
        # Top
        draw.line((cx + off, cy - chip_w//2, cx + off, cy - chip_w//2 - pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 10, cy - chip_w//2 - pin_len - 10, cx + off + 10, cy - chip_w//2 - pin_len + 10), fill=cyan_col)
        # Bottom
        draw.line((cx + off, cy + chip_w//2, cx + off, cy + chip_w//2 + pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 10, cy + chip_w//2 + pin_len - 10, cx + off + 10, cy + chip_w//2 + pin_len + 10), fill=cyan_col)
        # Left
        draw.line((cx - chip_w//2, cy + off, cx - chip_w//2 - pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx - chip_w//2 - pin_len - 10, cy + off - 10, cx - chip_w//2 - pin_len + 10, cy + off + 10), fill=cyan_col)
        # Right
        draw.line((cx + chip_w//2, cy + off, cx + chip_w//2 + pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx + chip_w//2 + pin_len - 10, cy + off - 10, cx + chip_w//2 + pin_len + 10, cy + off + 10), fill=cyan_col)
        
    # Chip Chassis (Outer Shell)
    draw.rounded_rectangle(
        (cx - chip_w//2, cy - chip_w//2, cx + chip_w//2, cy + chip_w//2), 
        radius=chip_r, 
        fill=(18, 28, 46, 255), 
        outline=orange_col, 
        width=12
    )
    
    # Solid Orange Silicon Core
    core_w = 190
    core_r = 28
    draw.rounded_rectangle(
        (cx - core_w//2, cy - core_w//2, cx + core_w//2, cy + core_w//2), 
        radius=core_r, 
        fill=(255, 113, 32, 255), 
        outline=(255, 140, 60, 255), 
        width=3
    )
    
    # Save
    out1 = os.path.join(output_dir, "logo_whatsapp_chip_puro.png")
    img.save(out1, format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logo_whatsapp_chip_puro.png"), format="PNG", optimize=True)
    
    out_safe = os.path.join(output_dir, "logo_whatsapp_perfil_safe.png")
    img.save(out_safe, format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logo_whatsapp_perfil_safe.png"), format="PNG", optimize=True)
    print(f"Saved safe chip icon: {out1}")


def render_whatsapp_profile_with_brand_safe(size=1024):
    """
    Variant 2: Scaled-down WhatsApp Profile with Chip + INTEPE S.A.S.
    Everything comfortably inside 68% safe zone.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    r_outer = 350
    
    # 1. Outer Glow Aura
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(255, 113, 32, 130))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=20))
    img.paste(glow_img, (0, 0), glow_img)
    
    # 2. Main Circular Dark Background
    draw.ellipse(
        (cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), 
        fill=(10, 15, 29, 255), 
        outline=(255, 113, 32, 255), 
        width=8
    )
    
    # 3. Inner Orbit Ring
    r_inner = 320
    draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), outline=(0, 229, 255, 45), width=2)
    
    # Crosshairs
    tick = 26
    draw.line((cx, cy - r_outer - 4, cx, cy - r_outer + tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx, cy + r_outer + 4, cx, cy + r_outer - tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx - r_outer - 4, cy, cx - r_outer + tick, cy), fill=(255, 113, 32, 255), width=6)
    draw.line((cx + r_outer + 4, cy, cx + r_outer - tick, cy), fill=(255, 113, 32, 255), width=6)
    
    # 4. Chip Icon (Upper center)
    chip_cy = cy - 65
    chip_w = 200
    chip_r = 30
    
    pin_len = 42
    pin_w = 7
    offsets = [-68, -23, 23, 68]
    cyan_col = (0, 229, 255, 255)
    orange_col = (255, 113, 32, 255)
    
    for off in offsets:
        # Top
        draw.line((cx + off, chip_cy - chip_w//2, cx + off, chip_cy - chip_w//2 - pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 6, chip_cy - chip_w//2 - pin_len - 6, cx + off + 6, chip_cy - chip_w//2 - pin_len + 6), fill=cyan_col)
        # Bottom
        draw.line((cx + off, chip_cy + chip_w//2, cx + off, chip_cy + chip_w//2 + pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 6, chip_cy + chip_w//2 + pin_len - 6, cx + off + 6, chip_cy + chip_w//2 + pin_len + 6), fill=cyan_col)
        # Left
        draw.line((cx - chip_w//2, chip_cy + off, cx - chip_w//2 - pin_len, chip_cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx - chip_w//2 - pin_len - 6, chip_cy + off - 6, cx - chip_w//2 - pin_len + 6, chip_cy + off + 6), fill=cyan_col)
        # Right
        draw.line((cx + chip_w//2, chip_cy + off, cx + chip_w//2 + pin_len, chip_cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx + chip_w//2 + pin_len - 6, chip_cy + off - 6, cx + chip_w//2 + pin_len + 6, chip_cy + off + 6), fill=cyan_col)
        
    # Chip Chassis
    draw.rounded_rectangle(
        (cx - chip_w//2, chip_cy - chip_w//2, cx + chip_w//2, chip_cy + chip_w//2), 
        radius=chip_r, 
        fill=(18, 28, 46, 255), 
        outline=orange_col, 
        width=8
    )
    
    # Solid Orange Core
    core_w = 110
    core_r = 18
    draw.rounded_rectangle(
        (cx - core_w//2, chip_cy - core_w//2, cx + core_w//2, chip_cy + core_w//2), 
        radius=core_r, 
        fill=(255, 113, 32, 255), 
        outline=(255, 140, 60, 255), 
        width=2
    )
    
    # 5. Typography
    try:
        font_brand = ImageFont.truetype("arialbd.ttf", 84)
        font_sub = ImageFont.truetype("arialbd.ttf", 28)
    except:
        font_brand = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    # INTEPE (White) + S.A.S. (Orange)
    text_brand = "INTEPE"
    bbox_m = draw.textbbox((0, 0), text_brand, font=font_brand)
    tw_m = bbox_m[2] - bbox_m[0]
    draw.text((cx - tw_m // 2, cy + 100), text_brand, font=font_brand, fill=(255, 255, 255, 255))
    
    # Subtitle Badge: SOLUCIONES TI
    text_sub = "SOLUCIONES TI"
    bbox_s = draw.textbbox((0, 0), text_sub, font=font_sub)
    tw_s = bbox_s[2] - bbox_s[0]
    
    badge_y = cy + 205
    badge_w = tw_s + 48
    draw.rounded_rectangle(
        (cx - badge_w//2, badge_y - 6, cx + badge_w//2, badge_y + 36), 
        radius=10, 
        fill=(0, 229, 255, 25), 
        outline=(0, 229, 255, 255), 
        width=2
    )
    draw.text((cx - tw_s // 2, badge_y), text_sub, font=font_sub, fill=(0, 229, 255, 255))
    
    out2 = os.path.join(output_dir, "logo_whatsapp_redondo.png")
    img.save(out2, format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logo_whatsapp_redondo.png"), format="PNG", optimize=True)
    
    # Sincronizar también con los nombres estándar
    img.save(os.path.join(output_dir, "logoRedondo.png"), format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logoRedondo.png"), format="PNG", optimize=True)
    img.save(os.path.join(output_dir, "logoRedondo_intepe.png"), format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logoRedondo_intepe.png"), format="PNG", optimize=True)
    print(f"Saved safe brand avatar: {out2}")

render_whatsapp_chip_icon_safe()
render_whatsapp_profile_with_brand_safe()
print("All WhatsApp safe-fit logos updated!")
