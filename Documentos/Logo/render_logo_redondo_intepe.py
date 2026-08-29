import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_circular_intepe_brand_avatar():
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    r_outer = 470
    
    # 1. Ambient Glow Ring
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(255, 113, 32, 140))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=25))
    img.paste(glow_img, (0, 0), glow_img)
    
    # 2. Main Dark Background Circle (#0F172A)
    draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(15, 23, 42, 255), outline=(255, 113, 32, 255), width=8)
    
    # 3. Inner Tech Accents & Cyan Dashes
    r_inner = 430
    draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), outline=(255, 255, 255, 30), width=3)
    
    # Crosshair ticks
    tick_len = 30
    # Top
    draw.line((cx, cy - r_outer - 10, cx, cy - r_outer + tick_len), fill=(0, 229, 255, 255), width=8)
    # Bottom
    draw.line((cx, cy + r_outer + 10, cx, cy + r_outer - tick_len), fill=(0, 229, 255, 255), width=8)
    # Left
    draw.line((cx - r_outer - 10, cy, cx - r_outer + tick_len, cy), fill=(255, 113, 32, 255), width=8)
    # Right
    draw.line((cx + r_outer + 10, cy, cx + r_outer - tick_len, cy), fill=(255, 113, 32, 255), width=8)
    
    # 4. Draw Chip Icon at upper center
    chip_cy = cy - 80
    chip_w = 200
    # Chip body
    draw.rounded_rectangle((cx - chip_w//2, chip_cy - chip_w//2, cx + chip_w//2, chip_cy + chip_w//2), radius=35, outline=(255, 113, 32, 255), width=16)
    # Inner core
    core_w = 90
    draw.rounded_rectangle((cx - core_w//2, chip_cy - core_w//2, cx + core_w//2, chip_cy + core_w//2), radius=16, outline=(255, 113, 32, 255), width=12)
    draw.ellipse((cx - 10, chip_cy - 10, cx + 10, chip_cy + 10), fill=(0, 229, 255, 255))
    
    # Pins
    pin_len = 32
    pin_w = 14
    for off in [-50, 0, 50]:
        # Top pins
        draw.line((cx + off, chip_cy - chip_w//2, cx + off, chip_cy - chip_w//2 - pin_len), fill=(255, 113, 32, 255), width=pin_w)
        # Bottom pins
        draw.line((cx + off, chip_cy + chip_w//2, cx + off, chip_cy + chip_w//2 + pin_len), fill=(255, 113, 32, 255), width=pin_w)
        # Left pins
        draw.line((cx - chip_w//2, chip_cy + off, cx - chip_w//2 - pin_len, chip_cy + off), fill=(255, 113, 32, 255), width=pin_w)
        # Right pins
        draw.line((cx + chip_w//2, chip_cy + off, cx + chip_w//2 + pin_len, chip_cy + off), fill=(255, 113, 32, 255), width=pin_w)
        
    # 5. Bold INTEPE Text
    try:
        font_main = ImageFont.truetype("arialbd.ttf", 108)
        font_sub = ImageFont.truetype("arialbd.ttf", 36)
    except:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    text_main = "INTEPE"
    bbox_m = draw.textbbox((0, 0), text_main, font=font_main)
    tw_m = bbox_m[2] - bbox_m[0]
    draw.text((cx - tw_m // 2, cy + 130), text_main, font=font_main, fill=(255, 255, 255, 255))
    
    # Subtitle Badge: S.A.S. • SOLUCIONES TI
    text_sub = "SOLUCIONES TI"
    bbox_s = draw.textbbox((0, 0), text_sub, font=font_sub)
    tw_s = bbox_s[2] - bbox_s[0]
    
    badge_y = cy + 260
    badge_w = tw_s + 60
    draw.rounded_rectangle((cx - badge_w//2, badge_y - 8, cx + badge_w//2, badge_y + 44), radius=12, fill=(0, 229, 255, 30), outline=(0, 229, 255, 255), width=3)
    draw.text((cx - tw_s // 2, badge_y), text_sub, font=font_sub, fill=(0, 229, 255, 255))
    
    # Save
    out_path = os.path.join(output_dir, "logoRedondo_intepe.png")
    img.save(out_path, format="PNG", optimize=True)
    
    dst_path = os.path.join(public_dir, "logoRedondo_intepe.png")
    img.save(dst_path, format="PNG", optimize=True)
    print("Generated logoRedondo_intepe.png")

create_circular_intepe_brand_avatar()
