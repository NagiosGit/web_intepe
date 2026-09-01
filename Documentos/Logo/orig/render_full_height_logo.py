import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

output_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo"

def find_coeffs(pa, pb):
    matrix = []
    for p1, p2 in zip(pa, pb):
        matrix.append([p1[0], p1[1], 1, 0, 0, 0, -p2[0]*p1[0], -p2[0]*p1[1]])
        matrix.append([0, 0, 0, p1[0], p1[1], 1, -p2[1]*p1[0], -p2[1]*p1[1]])
    A = np.matrix(matrix, dtype=float)
    B = np.array(pb).reshape(8)
    res = np.linalg.solve(A, B)
    return np.array(res).reshape(8)

def render_intepe_full_height_tall(canvas_w=320, canvas_h=132):
    font_size = 460
    try:
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()
        
    text = "INTEPE"
    
    # Measure text
    dummy_img = Image.new("RGBA", (100, 100))
    dummy_draw = ImageDraw.Draw(dummy_img)
    bbox = dummy_draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    pad = 120
    
    # 1. Soft Shadow Layer
    shadow_img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((pad + 20, pad + 22), text, font=font, fill=(0, 0, 0, 160))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=8))
    
    # 2. 3D Bevel Extrusion (Darker rich orange layers)
    bevel_img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bevel_img)
    for off in range(1, 12):
        b_draw.text((pad + off * 1.2, pad + off * 1.4), text, font=font, fill=(190, 55, 0, 255))
        
    # 3. Main Orange Face (#FF7120 / #FF853A)
    face_img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(face_img)
    f_draw.text((pad, pad), text, font=font, fill=(255, 113, 32, 255))
    
    # Composite unwarped text
    flat_text = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    flat_text.paste(shadow_img, (0, 0), shadow_img)
    flat_text.paste(bevel_img, (0, 0), bevel_img)
    flat_text.paste(face_img, (0, 0), face_img)
    
    # Crop tightly
    t_bbox = flat_text.getbbox()
    cropped_flat = flat_text.crop(t_bbox)
    
    # Condensed scaling: width * 0.60 to make letters tall and slender like the original
    condensed_w = int(cropped_flat.width * 0.60)
    condensed_h = cropped_flat.height
    condensed_img = cropped_flat.resize((condensed_w, condensed_h), Image.Resampling.LANCZOS)
    
    # Apply 3D Perspective Quadrilateral Warp
    src_w, src_h = condensed_img.size
    
    warp_pad_w = int(src_w * 1.3)
    warp_pad_h = int(src_h * 1.3)
    pad_img = Image.new("RGBA", (warp_pad_w, warp_pad_h), (0, 0, 0, 0))
    off_x = (warp_pad_w - src_w) // 2
    off_y = (warp_pad_h - src_h) // 2
    pad_img.paste(condensed_img, (off_x, off_y), condensed_img)
    
    x0, y0 = off_x, off_y
    x1, y1 = off_x + src_w, off_y + src_h
    
    # Perspective points: "I" tall on left, "E" slightly shorter on right
    p_tl = (x0, y0 - 32)
    p_tr = (x1, y0 + 58)
    p_br = (x1, y1 - 48)
    p_bl = (x0, y1 + 26)
    
    coeffs = find_coeffs([p_tl, p_tr, p_br, p_bl], [(x0, y0), (x1, y0), (x1, y1), (x0, y1)])
    warped = pad_img.transform((warp_pad_w, warp_pad_h), Image.PERSPECTIVE, coeffs, Image.Resampling.BICUBIC)
    
    # Crop warped text tightly
    w_bbox = warped.getbbox()
    final_warped = warped.crop(w_bbox)
    
    # Scale to fill 94% of canvas height (124px height out of 132px)
    target_h = 124
    aspect = final_warped.width / final_warped.height
    target_w = int(target_h * aspect)
    
    if target_w > (canvas_w - 6):
        target_w = canvas_w - 6
        target_h = int(target_w / aspect)
        
    scaled_text = final_warped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 1. Transparent Canvas
    out_trans = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    pos_x = (canvas_w - target_w) // 2
    pos_y = (canvas_h - target_h) // 2
    out_trans.paste(scaled_text, (pos_x, pos_y), scaled_text)
    
    # 2. White Canvas
    out_white = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 255))
    out_white.paste(scaled_text, (pos_x, pos_y), scaled_text)
    
    # 3. HD Canvas (640 x 264)
    out_hd = Image.new("RGBA", (canvas_w * 2, canvas_h * 2), (0, 0, 0, 0))
    scaled_hd = final_warped.resize((target_w * 2, target_h * 2), Image.Resampling.LANCZOS)
    pos_x_hd = (canvas_w * 2 - target_w * 2) // 2
    pos_y_hd = (canvas_h * 2 - target_h * 2) // 2
    out_hd.paste(scaled_hd, (pos_x_hd, pos_y_hd), scaled_hd)
    
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
            
    print(f"Rendered extra-tall INTEPE logo: {target_w}x{target_h} on canvas {canvas_w}x{canvas_h}")

render_intepe_full_height_tall()
