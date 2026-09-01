import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_circular_avatars_with_preferred_chip():
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    r_outer = 470
    
    # 1. Ambient Orange/Cyan Aura Glow
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(255, 113, 32, 130))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=25))
    img.paste(glow_img, (0, 0), glow_img)
    
    # 2. Main Dark Background Circle (#0E1626)
    draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(14, 22, 38, 255), outline=(255, 113, 32, 255), width=8)
    
    # 3. Concentric Orbit Accent
    r_inner = 435
    draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), outline=(0, 229, 255, 45), width=3)
    
    # Crosshair Ticks
    tick = 32
    draw.line((cx, cy - r_outer - 8, cx, cy - r_outer + tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx, cy + r_outer + 8, cx, cy + r_outer - tick), fill=(0, 229, 255, 255), width=6)
    draw.line((cx - r_outer - 8, cy, cx - r_outer + tick, cy), fill=(255, 113, 32, 255), width=6)
    draw.line((cx + r_outer + 8, cy, cx + r_outer - tick, cy), fill=(255, 113, 32, 255), width=6)
    
    # 4. Draw Preferred Chip (4 Pins per side with Cyan Nodes)
    chip_cy = cy - 85
    chip_w = 260
    chip_r = 38
    
    pin_len = 55
    pin_w = 9
    offsets = [-90, -30, 30, 90]
    cyan_col = (0, 229, 255, 255)
    orange_col = (255, 113, 32, 255)
    
    for off in offsets:
        # Top
        draw.line((cx + off, chip_cy - chip_w//2, cx + off, chip_cy - chip_w//2 - pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 8, chip_cy - chip_w//2 - pin_len - 8, cx + off + 8, chip_cy - chip_w//2 - pin_len + 8), fill=cyan_col)
        # Bottom
        draw.line((cx + off, chip_cy + chip_w//2, cx + off, chip_cy + chip_w//2 + pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 8, chip_cy + chip_w//2 + pin_len - 8, cx + off + 8, chip_cy + chip_w//2 + pin_len + 8), fill=cyan_col)
        # Left
        draw.line((cx - chip_w//2, chip_cy + off, cx - chip_w//2 - pin_len, chip_cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx - chip_w//2 - pin_len - 8, chip_cy + off - 8, cx - chip_w//2 - pin_len + 8, chip_cy + off + 8), fill=cyan_col)
        # Right
        draw.line((cx + chip_w//2, chip_cy + off, cx + chip_w//2 + pin_len, chip_cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx + chip_w//2 + pin_len - 8, chip_cy + off - 8, cx + chip_w//2 + pin_len + 8, chip_cy + off + 8), fill=cyan_col)
        
    # Outer Chip Box
    draw.rounded_rectangle((cx - chip_w//2, chip_cy - chip_w//2, cx + chip_w//2, chip_cy + chip_w//2), radius=chip_r, fill=(20, 30, 48, 255), outline=orange_col, width=9)
    
    # Inner Solid Orange Core
    core_w = 145
    core_r = 22
    draw.rounded_rectangle((cx - core_w//2, chip_cy - core_w//2, cx + core_w//2, chip_cy + core_w//2), radius=core_r, fill=(255, 113, 32, 255), outline=(255, 140, 60, 255), width=2)
    
    # 5. Typography: INTEPE (White) + S.A.S. (Orange)
    try:
        font_main = ImageFont.truetype("arialbd.ttf", 112)
        font_sub = ImageFont.truetype("arialbd.ttf", 36)
    except:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    text_intepe = "INTEPE"
    bbox_m = draw.textbbox((0, 0), text_intepe, font=font_main)
    tw_m = bbox_m[2] - bbox_m[0]
    draw.text((cx - tw_m // 2, cy + 130), text_intepe, font=font_main, fill=(255, 255, 255, 255))
    
    # Subtitle Badge: SOLUCIONES TI
    text_sub = "SOLUCIONES TI"
    bbox_s = draw.textbbox((0, 0), text_sub, font=font_sub)
    tw_s = bbox_s[2] - bbox_s[0]
    
    badge_y = cy + 265
    badge_w = tw_s + 64
    draw.rounded_rectangle((cx - badge_w//2, badge_y - 8, cx + badge_w//2, badge_y + 46), radius=14, fill=(0, 229, 255, 25), outline=(0, 229, 255, 255), width=3)
    draw.text((cx - tw_s // 2, badge_y), text_sub, font=font_sub, fill=(0, 229, 255, 255))
    
    # Save all circular brand files
    files_to_save = [
        "logoRedondo_intepe.png",
        "logoRedondo.png",
        "logo_perfil_avatar.png"
    ]
    for fn in files_to_save:
        img.save(os.path.join(output_dir, fn), format="PNG", optimize=True)
        img.save(os.path.join(public_dir, fn), format="PNG", optimize=True)
        
    print("Circular avatars updated with preferred chip logo!")

create_circular_avatars_with_preferred_chip()
