Add-Type -AssemblyName System.Drawing

function Generate-Intepe-Solo-Naranja {
    param(
        [string]$OutputPath,
        [int]$Width = 320,
        [int]$Height = 132,
        [bool]$IsTransparent = $true,
        [string]$FormatType = "PNG" # "PNG" or "JPEG"
    )

    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    if ($IsTransparent) {
        $g.Clear([System.Drawing.Color]::Transparent)
    } else {
        $g.Clear([System.Drawing.Color]::White)
    }

    # Font options (Try clean tall condensed sans fonts)
    $fontName = "Impact"
    if (-not (New-Object System.Drawing.FontFamily($fontName))) {
        $fontName = "Arial Black"
    }

    # Font size calculation to fill 320x132 nicely
    $fontSize = 68.0
    $font = New-Object System.Drawing.Font($fontName, $fontSize, [System.Drawing.FontStyle]::Bold)

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $rect = New-Object System.Drawing.RectangleF(0, 0, $Width, $Height)

    # 1. Subtle 3D Soft Shadow for depth (matching the original relief effect)
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 0, 0, 0))
    $shadowRect = New-Object System.Drawing.RectangleF(3, 4, $Width, $Height)
    $g.DrawString("INTEPE", $font, $shadowBrush, $shadowRect, $sf)
    $shadowBrush.Dispose()

    # 2. Base Darker Orange Edge for 3D bevel
    $bevelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 217, 72, 5)) # #D94805
    $bevelRect = New-Object System.Drawing.RectangleF(1, 1.5, $Width, $Height)
    $g.DrawString("INTEPE", $font, $bevelBrush, $bevelRect, $sf)
    $bevelBrush.Dispose()

    # 3. Primary Vibrant Orange Face (#FF7120 / #FF853A)
    # Linear gradient brush from top to bottom
    $pTop = New-Object System.Drawing.PointF(0, 20)
    $pBottom = New-Object System.Drawing.PointF(0, 110)
    $textBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $pTop,
        $pBottom,
        [System.Drawing.Color]::FromArgb(255, 255, 125, 45),  # #FF7D2D (Top highlight)
        [System.Drawing.Color]::FromArgb(255, 235, 85, 10)    # #EB550A (Bottom rich orange)
    )

    $g.DrawString("INTEPE", $font, $textBrush, $rect, $sf)

    $font.Dispose()
    $textBrush.Dispose()
    $sf.Dispose()

    # Save format
    $imageFormat = if ($FormatType -eq "JPEG") { [System.Drawing.Imaging.ImageFormat]::Jpeg } else { [System.Drawing.Imaging.ImageFormat]::Png }
    $bitmap.Save($OutputPath, $imageFormat)

    $g.Dispose()
    $bitmap.Dispose()

    Write-Output "Generated: $OutputPath"
}

$dir = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"

# 1. Main Transparent PNG for Google Workspace (320 x 132)
Generate-Intepe-Solo-Naranja -OutputPath (Join-Path $dir "logo_google_workspace.png") -Width 320 -Height 132 -IsTransparent $true -FormatType "PNG"

# 2. White Background PNG (320 x 132)
Generate-Intepe-Solo-Naranja -OutputPath (Join-Path $dir "logo_google_workspace_blanco.png") -Width 320 -Height 132 -IsTransparent $false -FormatType "PNG"

# 3. White Background JPEG (320 x 132)
Generate-Intepe-Solo-Naranja -OutputPath (Join-Path $dir "logo_google_workspace.jpg") -Width 320 -Height 132 -IsTransparent $false -FormatType "JPEG"

# 4. HD Version (640 x 264)
Generate-Intepe-Solo-Naranja -OutputPath (Join-Path $dir "INTEPE_Solo_Naranja_HD.png") -Width 640 -Height 264 -IsTransparent $true -FormatType "PNG"

# Copy to public/logo/
Copy-Item (Join-Path $dir "logo_google_workspace.png") "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace.png" -Force
Copy-Item (Join-Path $dir "logo_google_workspace_blanco.png") "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace_blanco.png" -Force
Copy-Item (Join-Path $dir "logo_google_workspace.jpg") "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace.jpg" -Force

Write-Output "SUCCESSFULLY GENERATED INTEPE ORANGE LOGOS!"
