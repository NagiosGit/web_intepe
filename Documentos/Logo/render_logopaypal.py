import os
from PIL import Image, ImageDraw, ImageFilter

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def render_logopaypal_large(size=1024):
    """
    Renders logopaypal.png:
    - Full-bleed circular white badge (960px diameter) filling the avatar space
    - Prominent, large 16-pin microchip inside
    - Electric cyan/blue outer ring with subtle glow
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    r_outer = 475  # 950px diameter (fills the full circular avatar area)
    
    # 1. Subtle Outer Cyan Glow
    glow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_img)
    g_draw.ellipse(
        (cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), 
        fill=(0, 210, 255, 120)
    )
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=15))
    img.paste(glow_img, (0, 0), glow_img)
    
    # 2. Main Circular Container: Pure White (#FFFFFF) with Bold Cyan/Tech Blue Border
    draw.ellipse(
        (cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), 
        fill=(255, 255, 255, 255), 
        outline=(0, 180, 245, 255), 
        width=16
    )
    
    # 3. Inner Tech Orbit Ring & Crosshairs
    r_inner = 438
    draw.ellipse(
        (cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), 
        outline=(0, 180, 245, 90), 
        width=3
    )
    
    # Crosshair Ticks (Cyan / Tech Blue)
    tick = 36
    cyan_blue = (0, 160, 235, 255)
    draw.line((cx, cy - r_outer - 4, cx, cy - r_outer + tick), fill=cyan_blue, width=8)
    draw.line((cx, cy + r_outer + 4, cx, cy + r_outer - tick), fill=cyan_blue, width=8)
    draw.line((cx - r_outer - 4, cy, cx - r_outer + tick, cy), fill=cyan_blue, width=8)
    draw.line((cx + r_outer + 4, cy, cx + r_outer - tick, cy), fill=cyan_blue, width=8)
    
    # 4. LARGE Centered 16-Pin Microchip
    chip_w = 480
    chip_r = 68
    
    pin_len = 100
    pin_w = 16
    offsets = [-168, -56, 56, 168]
    cyan_col = (0, 210, 255, 255)
    orange_col = (255, 113, 32, 255)
    
    # Draw Pins with Large Cyan Connection Nodes
    for off in offsets:
        # Top Pins
        draw.line((cx + off, cy - chip_w//2, cx + off, cy - chip_w//2 - pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 15, cy - chip_w//2 - pin_len - 15, cx + off + 15, cy - chip_w//2 - pin_len + 15), fill=cyan_col)
        # Bottom Pins
        draw.line((cx + off, cy + chip_w//2, cx + off, cy + chip_w//2 + pin_len), fill=orange_col, width=pin_w)
        draw.ellipse((cx + off - 15, cy + chip_w//2 + pin_len - 15, cx + off + 15, cy + chip_w//2 + pin_len + 15), fill=cyan_col)
        # Left Pins
        draw.line((cx - chip_w//2, cy + off, cx - chip_w//2 - pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx - chip_w//2 - pin_len - 15, cy + off - 15, cx - chip_w//2 - pin_len + 15, cy + off + 15), fill=cyan_col)
        # Right Pins
        draw.line((cx + chip_w//2, cy + off, cx + chip_w//2 + pin_len, cy + off), fill=orange_col, width=pin_w)
        draw.ellipse((cx + chip_w//2 + pin_len - 15, cy + off - 15, cx + chip_w//2 + pin_len + 15, cy + off + 15), fill=cyan_col)
        
    # Chip Chassis (Deep Navy #0F172A for maximum contrast and sharpness on white)
    draw.rounded_rectangle(
        (cx - chip_w//2, cy - chip_w//2, cx + chip_w//2, cy + chip_w//2), 
        radius=chip_r, 
        fill=(15, 23, 42, 255), 
        outline=orange_col, 
        width=16
    )
    
    # Large Solid Orange Silicon Core
    core_w = 270
    core_r = 40
    draw.rounded_rectangle(
        (cx - core_w//2, cy - core_w//2, cx + core_w//2, cy + core_w//2), 
        radius=core_r, 
        fill=(255, 113, 32, 255), 
        outline=(255, 140, 60, 255), 
        width=4
    )
    
    # Save files
    out_file = os.path.join(output_dir, "logopaypal.png")
    img.save(out_file, format="PNG", optimize=True)
    
    pub_file = os.path.join(public_dir, "logopaypal.png")
    img.save(pub_file, format="PNG", optimize=True)
    
    img.save(os.path.join(output_dir, "logopaypal_white.png"), format="PNG", optimize=True)
    img.save(os.path.join(public_dir, "logopaypal_white.png"), format="PNG", optimize=True)
    
    print(f"Saved large PayPal logo: {out_file} & {pub_file}")

render_logopaypal_large()
