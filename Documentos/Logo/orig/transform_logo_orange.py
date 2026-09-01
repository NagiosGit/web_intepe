import os
import colorsys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

source_path = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\Solo_Intepe_2026_8.png"
output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

# Load source image
img = Image.open(source_path).convert("RGBA")
width, height = img.size
print(f"Source image loaded: {width}x{height}")

# Target Brand Orange: #FF7120 (RGB: 255, 113, 32 -> Hue: 22 deg, Saturation: ~0.87)
# Source Teal: RGB ~ (38, 97, 119) -> Hue: ~196 deg

data = np.array(img, dtype=np.float32)

r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# Convert RGB to HSV for each pixel
hsv = np.zeros_like(data[:, :, :3])
for y in range(height):
    for x in range(width):
        r_norm, g_norm, b_norm = r[y, x] / 255.0, g[y, x] / 255.0, b[y, x] / 255.0
        h, s, v = colorsys.rgb_to_hsv(r_norm, g_norm, b_norm)
        
        # Check if this pixel is part of the blue/teal text (Hue around 180-220 deg, saturation > 0.15)
        if 0.45 <= h <= 0.65 and s > 0.15:
            # Shift hue to Brand Orange (~22 deg / 0.061 in [0, 1])
            new_h = 22.0 / 360.0 # ~0.0611
            # Boost saturation slightly for vibrant brand orange
            new_s = min(1.0, s * 1.35)
            new_v = min(1.0, v * 1.45) # Make it brighter and more luminous
            
            nr, ng, nb = colorsys.hsv_to_rgb(new_h, new_s, new_v)
            data[y, x, 0] = nr * 255.0
            data[y, x, 1] = ng * 255.0
            data[y, x, 2] = nb * 255.0
        # If it is background / shadow (low saturation, grey/white), leave shadow intact but remove any white background box if needed

recolored_img = Image.fromarray(np.uint8(data), mode="RGBA")

# Crop any transparent border tightly around the text
bbox = recolored_img.getbbox()
if bbox:
    # If the image has white background, let's also create a clean transparent version
    print(f"Bounding box: {bbox}")

# Resize and place onto Google Workspace standard canvas (320 x 132)
canvas_w, canvas_h = 320, 132

# Find the aspect ratio
aspect = recolored_img.width / recolored_img.height
# Fit height to around 100px so it fills the box with nice margins (just like the original)
target_h = 104
target_w = int(target_h * aspect)

if target_w > (canvas_w - 16):
    target_w = canvas_w - 16
    target_h = int(target_w / aspect)

resized_recolored = recolored_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

# 1. Transparent PNG
canvas_trans = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
pos_x = (canvas_w - target_w) // 2
pos_y = (canvas_h - target_h) // 2
canvas_trans.paste(resized_recolored, (pos_x, pos_y), resized_recolored)

# 2. White background PNG / JPG
canvas_white = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 255))
canvas_white.paste(resized_recolored, (pos_x, pos_y), resized_recolored)

# Save all variations
out_trans_png = os.path.join(output_dir, "logo_google_workspace.png")
out_white_png = os.path.join(output_dir, "logo_google_workspace_blanco.png")
out_white_jpg = os.path.join(output_dir, "logo_google_workspace.jpg")

canvas_trans.save(out_trans_png, format="PNG", optimize=True)
canvas_white.save(out_white_png, format="PNG", optimize=True)
canvas_white.convert("RGB").save(out_white_jpg, format="JPEG", quality=95)

# 3. HD 2X version (640 x 264)
canvas_hd = Image.new("RGBA", (640, 264), (0, 0, 0, 0))
resized_hd = recolored_img.resize((target_w * 2, target_h * 2), Image.Resampling.LANCZOS)
pos_x_hd = (640 - target_w * 2) // 2
pos_y_hd = (264 - target_h * 2) // 2
canvas_hd.paste(resized_hd, (pos_x_hd, pos_y_hd), resized_hd)
out_hd_png = os.path.join(output_dir, "logo_google_workspace_hd.png")
canvas_hd.save(out_hd_png, format="PNG", optimize=True)

# Copy to public/logo/
for name in ["logo_google_workspace.png", "logo_google_workspace_blanco.png", "logo_google_workspace.jpg", "logo_google_workspace_hd.png"]:
    src = os.path.join(output_dir, name)
    dst = os.path.join(public_dir, name)
    canvas_trans.save(dst) if "workspace.png" in name else None
    
print("Successfully generated pixel-perfect recolored logo for Google Workspace!")
