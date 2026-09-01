import os
from PIL import Image

logo_master_path = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_icono_chip_master.png"
public_dir = r"c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public"
public_logo_dir = os.path.join(public_dir, "logo")

if not os.path.exists(logo_master_path):
    print("Master logo not found!")
    exit(1)

master_img = Image.open(logo_master_path)

# 1. Update public/logo/logo.png (1024x1024)
master_img.save(os.path.join(public_logo_dir, "logo.png"), format="PNG", optimize=True)
master_img.save(os.path.join(public_logo_dir, "LOGO.png"), format="PNG", optimize=True)
master_img.save(os.path.join(public_logo_dir, "LOGON.png"), format="PNG", optimize=True)
master_img.save(os.path.join(public_logo_dir, "logo_icono_chip_master.png"), format="PNG", optimize=True)

# 2. Update PWA and mobile icons
icon_512 = master_img.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save(os.path.join(public_dir, "icon-512.png"), format="PNG", optimize=True)

icon_192 = master_img.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save(os.path.join(public_dir, "icon-192.png"), format="PNG", optimize=True)

apple_icon = master_img.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(os.path.join(public_dir, "apple-touch-icon.png"), format="PNG", optimize=True)

# 3. Create favicon.png (64x64)
fav_64 = master_img.resize((64, 64), Image.Resampling.LANCZOS)
fav_64.save(os.path.join(public_dir, "favicon.png"), format="PNG", optimize=True)

print("Web icons updated successfully from logo_icono_chip_master.png!")
