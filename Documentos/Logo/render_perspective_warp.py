import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def find_coeffs(pa, pb):
    import numpy as np
    matrix = []
    for p1, p2 in zip(pa, pb):
        matrix.append([p1[0], p1[1], 1, 0, 0, 0, -p2[0]*p1[0], -p2[0]*p1[1]])
        matrix.append([0, 0, 0, p1[0], p1[1], 1, -p2[1]*p1[0], -p2[1]*p1[1]])
    A = np.matrix(matrix, dtype=float)
    B = np.array(pb).reshape(8)
    res = np.linalg.solve(A, B)
    return np.array(res).reshape(8)

def render_intepe_3d_perspective():
    # Render at high resolution (1600 x 600)
    w_hi, h_hi = 1600, 600
    base_img = Image.new("RGBA", (w_hi, h_hi), (0, 0, 0, 0))
    draw = ImageDraw.Draw(base_img)
    
    # Try finding condensed font or stretch standard bold font
    try:
        font = ImageFont.truetype("arialbd.ttf", 340)
    except:
        font = ImageFont.load_default()
        
    text = "INTEPE"
    
    # Measure text
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    # Render uncompressed text
    temp_img = Image.new("RGBA", (tw + 100, th + 100), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(temp_img)
    
    # Shadow layer (soft blur)
    shadow_img = Image.new("RGBA", (tw + 100, th + 100), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((20, 20), text, font=font, fill=(0, 0, 0, 140))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=6))
    
    # Bevel/3D edge layer
    bevel_img = Image.new("RGBA", (tw + 100, th + 100), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bevel_img)
    for off in range(1, 10):
        b_draw.text((10 + off, 10 + off), text, font=font, fill=(200, 65, 0, 255)) # Deep 3D orange edge #C84100
        
    # Main Orange Face (#FF7120)
    face_img = Image.new("RGBA", (tw + 100, th + 100), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(face_img)
    f_draw.text((10, 10), text, font=font, fill=(255, 113, 32, 255)) # Vibrant Brand Orange
    
    # Composite uncompressed text
    flat_text = Image.new("RGBA", (tw + 100, th + 100), (0, 0, 0, 0))
    flat_text.paste(shadow_img, (0, 0), shadow_img)
    flat_text.paste(bevel_img, (0, 0), bevel_img)
    flat_text.paste(face_img, (0, 0), face_img)
    
    # Crop tightly
    t_bbox = flat_text.getbbox()
    cropped_flat = flat_text.crop(t_bbox)
    
    # Condensed scaling (make font taller and thinner, aspect ratio ~ 0.72x width)
    condensed_w = int(cropped_flat.width * 0.75)
    condensed_h = cropped_flat.height
    condensed_img = cropped_flat.resize((condensed_w, condensed_h), Image.Resampling.LANCZOS)
    
    # Apply 3D Perspective Quadrilateral Warp:
    # Left side: full height (100%)
    # Right side: height reduced to 80%, angled towards vanishing point
    src_w, src_h = condensed_img.size
    
    pad_w = int(src_w * 1.3)
    pad_h = int(src_h * 1.3)
    pad_img = Image.new("RGBA", (pad_w, pad_h), (0, 0, 0, 0))
    off_x = (pad_w - src_w) // 2
    off_y = (pad_h - src_h) // 2
    pad_img.paste(condensed_img, (off_x, off_y), condensed_img)
    
    # Perspective coordinates
    # Source corners of the text
    x0, y0 = off_x, off_y
    x1, y1 = off_x + src_w, off_y + src_h
    
    # Target corners:
    # Top-Left: y slightly higher (-15px)
    # Bottom-Left: y slightly lower (+15px)
    # Top-Right: y lower (+45px)
    # Bottom-Right: y higher (-45px)
    # This creates the exact "I" taller than "E" perspective!
    p_tl = (x0, y0 - 20)
    p_tr = (x1, y0 + 42)
    p_br = (x1, y1 - 38)
    p_bl = (x0, y1 + 18)
    
    coeffs = find_coeffs([p_tl, p_tr, p_br, p_bl], [(x0, y0), (x1, y0), (x1, y1), (x0, y1)])
    
    warped = pad_img.transform((pad_w, pad_h), Image.PERSPECTIVE, coeffs, Image.Resampling.BICUBIC)
    
    # Crop warped text
    w_bbox = warped.getbbox()
    final_warped = warped.crop(w_bbox)
    
    # Fit into Google Workspace 320 x 132 canvas
    target_canvas_w, target_canvas_h = 320, 132
    
    # Fill ~85% height to look bold and prominent in the box
    target_h = 106
    aspect = final_warped.width / final_warped.height
    target_w = int(target_h * aspect)
    
    if target_w > (target_canvas_w - 12):
        target_w = target_canvas_w - 12
        target_h = int(target_w / aspect)
        
    scaled_text = final_warped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 1. Transparent Canvas
    out_trans = Image.new("RGBA", (target_canvas_w, target_canvas_h), (0, 0, 0, 0))
    pos_x = (target_canvas_w - target_w) // 2
    pos_y = (target_canvas_h - target_h) // 2
    out_trans.paste(scaled_text, (pos_x, pos_y), scaled_text)
    
    # 2. White Canvas
    out_white = Image.new("RGBA", (target_canvas_w, target_canvas_h), (255, 255, 255, 255))
    out_white.paste(scaled_text, (pos_x, pos_y), scaled_text)
    
    # 3. HD Canvas (640 x 264)
    out_hd = Image.new("RGBA", (640, 264), (0, 0, 0, 0))
    scaled_hd = final_warped.resize((target_w * 2, target_h * 2), Image.Resampling.LANCZOS)
    out_hd.paste(scaled_hd, ((640 - target_w * 2) // 2, (264 - target_h * 2) // 2), scaled_hd)
    
    # Save files
    out_trans.save(os.path.join(output_dir, "logo_google_workspace.png"), format="PNG", optimize=True)
    out_white.save(os.path.join(output_dir, "logo_google_workspace_blanco.png"), format="PNG", optimize=True)
    out_white.convert("RGB").save(os.path.join(output_dir, "logo_google_workspace.jpg"), format="JPEG", quality=96)
    out_hd.save(os.path.join(output_dir, "logo_google_workspace_hd.png"), format="PNG", optimize=True)
    
    # Copy to public/logo/
    for f in ["logo_google_workspace.png", "logo_google_workspace_blanco.png", "logo_google_workspace.jpg", "logo_google_workspace_hd.png"]:
        src = os.path.join(output_dir, f)
        dst = os.path.join(public_dir, f)
        with open(src, "rb") as s, open(dst, "wb") as d:
            d.write(s.read())
            
    print("Exact 3D perspective warped INTEPE logo generated!")

render_intepe_3d_perspective()
