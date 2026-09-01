import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def create_perspective_intepe_logo(
    canvas_w=320, 
    canvas_h=132, 
    is_transparent=True, 
    scale=2, # Render at 2x for ultra anti-aliasing
    font_thickness="medium"
):
    W = canvas_w * scale
    H = canvas_h * scale
    
    # 1. Create large canvas for rendering text in high-res
    text_w = 600 * scale
    text_h = 240 * scale
    text_img = Image.new("RGBA", (text_w, text_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(text_img)
    
    # Select best font
    font_size = 140 * scale
    try:
        font = ImageFont.truetype("arialbd.ttf", font_size) # Arial Bold (cleaner and thinner than Impact/Arial Black)
    except:
        font = ImageFont.load_default()
        
    text = "INTEPE"
    
    # We want custom letter spacing and heights for perspective
    # Let's measure each letter
    letters = list(text)
    
    # Starting perspective scale:
    # "I" at left has scale 1.05
    # "E" at right has scale 0.88
    scales = np.linspace(1.06, 0.88, len(letters))
    
    # Let's draw each letter with its perspective size & 3D bevel
    total_rendered_w = 0
    letter_imgs = []
    
    for i, char in enumerate(letters):
        char_scale = scales[i]
        char_font_size = int(font_size * char_scale)
        try:
            char_font = ImageFont.truetype("arialbd.ttf", char_font_size)
        except:
            char_font = font
            
        bbox = draw.textbbox((0, 0), char, font=char_font)
        cw = bbox[2] - bbox[0]
        ch = bbox[3] - bbox[1]
        
        # Create single character canvas with padding for shadow
        pad = 20 * scale
        c_canvas = Image.new("RGBA", (cw + pad * 2, ch + pad * 2), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(c_canvas)
        
        # 3D Drop Shadow
        shadow_offset_x = int(4 * scale * char_scale)
        shadow_offset_y = int(5 * scale * char_scale)
        c_draw.text((pad - bbox[0] + shadow_offset_x, pad - bbox[1] + shadow_offset_y), char, font=char_font, fill=(0, 0, 0, 90))
        
        # Bevel / Depth bottom edge
        bevel_y = int(2 * scale * char_scale)
        c_draw.text((pad - bbox[0] + 1, pad - bbox[1] + bevel_y), char, font=char_font, fill=(217, 72, 5, 255)) # Dark Orange #D94805
        
        # Main Face: Vibrant Brand Orange (#FF7120)
        c_draw.text((pad - bbox[0], pad - bbox[1]), char, font=char_font, fill=(255, 113, 32, 255)) # #FF7120
        
        letter_imgs.append((c_canvas, cw, ch, pad))
    
    # Combine letters with tight tracking
    composite = Image.new("RGBA", (text_w, text_h), (0, 0, 0, 0))
    
    # Tracking spacing
    tracking = int(-4 * scale) # Tight elegant tracking
    curr_x = 30 * scale
    
    for i, (c_img, cw, ch, pad) in enumerate(letter_imgs):
        # Align bottoms with slight upward perspective tilt (like looking from below)
        # "I" bottom is slightly lower, "E" bottom is slightly higher
        y_offset = int((text_h - ch) / 2 + (i * 2.5 * scale))
        
        composite.paste(c_img, (curr_x - pad, y_offset - pad), c_img)
        curr_x += cw + tracking
        
    # Crop to actual content
    bbox = composite.getbbox()
    cropped = composite.crop(bbox)
    
    # Apply subtle smooth shadow blur
    # Fit into target canvas (W x H)
    target_content_h = int(H * 0.76) # Fill ~76% of canvas height
    aspect = cropped.width / cropped.height
    target_content_w = int(target_content_h * aspect)
    
    if target_content_w > (W - 16 * scale):
        target_content_w = W - 16 * scale
        target_content_h = int(target_content_w / aspect)
        
    final_text = cropped.resize((target_content_w, target_content_h), Image.Resampling.LANCZOS)
    
    # Place on final canvas
    if is_transparent:
        final_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    else:
        final_canvas = Image.new("RGBA", (W, H), (255, 255, 255, 255))
        
    pos_x = (W - target_content_w) // 2
    pos_y = (H - target_content_h) // 2
    final_canvas.paste(final_text, (pos_x, pos_y), final_text)
    
    # Downsample to native target resolution (320 x 132) for supersampled anti-aliasing
    out_img = final_canvas.resize((canvas_w, canvas_h), Image.Resampling.LANCZOS)
    return out_img

# Generate all required variations
# 1. Transparent PNG
img_trans = create_perspective_intepe_logo(320, 132, is_transparent=True)
img_trans.save(os.path.join(output_dir, "logo_google_workspace.png"), format="PNG", optimize=True)

# 2. White Background PNG
img_white_png = create_perspective_intepe_logo(320, 132, is_transparent=False)
img_white_png.save(os.path.join(output_dir, "logo_google_workspace_blanco.png"), format="PNG", optimize=True)

# 3. White Background JPEG
img_white_jpg = img_white_png.convert("RGB")
img_white_jpg.save(os.path.join(output_dir, "logo_google_workspace.jpg"), format="JPEG", quality=96)

# 4. HD 2X Version (640 x 264)
img_hd = create_perspective_intepe_logo(640, 264, is_transparent=True)
img_hd.save(os.path.join(output_dir, "logo_google_workspace_hd.png"), format="PNG", optimize=True)

# Copy to public/logo/
for f in ["logo_google_workspace.png", "logo_google_workspace_blanco.png", "logo_google_workspace.jpg", "logo_google_workspace_hd.png"]:
    src = os.path.join(output_dir, f)
    dst = os.path.join(public_dir, f)
    with open(src, "rb") as s, open(dst, "wb") as d:
        d.write(s.read())

print("Perspective INTEPE logo generated successfully!")
