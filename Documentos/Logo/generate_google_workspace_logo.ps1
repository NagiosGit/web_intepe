Add-Type -AssemblyName System.Drawing

function Draw-RoundedRectangle {
    param(
        [System.Drawing.Graphics]$g,
        [System.Drawing.Pen]$pen,
        [System.Drawing.Brush]$brush,
        [float]$x, [float]$y, [float]$width, [float]$height, [float]$radius
    )

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = [float]($radius * 2)

    $path.AddArc([float]$x, [float]$y, $diameter, $diameter, 180, 90)
    $path.AddArc([float]($x + $width - $diameter), [float]$y, $diameter, $diameter, 270, 90)
    $path.AddArc([float]($x + $width - $diameter), [float]($y + $height - $diameter), $diameter, $diameter, 0, 90)
    $path.AddArc([float]$x, [float]($y + $height - $diameter), $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    if ($brush -ne $null) {
        $g.FillPath($brush, $path)
    }
    if ($pen -ne $null) {
        $g.DrawPath($pen, $path)
    }
    $path.Dispose()
}

function Generate-Google-Workspace-Logo-Perfect {
    param(
        [string]$OutputPath,
        [int]$Width = 640,
        [int]$Height = 264,
        [string]$TextType = "INTEPE_SAS" # "INTEPE_SAS" or "INTEPE_ONLY"
    )

    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = [float]($Height / 264.0)

    # ----------------------------------------------------
    # 1. ICON ON LEFT (INTEPE Squircle + Microchip)
    # ----------------------------------------------------
    $iconSize = [float](184.0 * $scale)
    $iconX = [float](22.0 * $scale)
    $iconY = [float](($Height - $iconSize) / 2)
    $radius = [float]($iconSize * 0.22)

    # Outer Squircle Background (#0F172A)
    $squircleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
    Draw-RoundedRectangle -g $g -pen $null -brush $squircleBrush -x $iconX -y $iconY -width $iconSize -height $iconSize -radius $radius
    $squircleBrush.Dispose()

    # HUD Corner Brackets in Orange (#FF7120)
    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float](4.8 * $scale))
    $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cornerLen = [float]($iconSize * 0.18)

    # Top-Left HUD
    $g.DrawLine($hudPen, [float]($iconX + 6 * $scale), [float]($iconY + (6 + $cornerLen) * $scale), [float]($iconX + 6 * $scale), [float]($iconY + 6 * $scale))
    $g.DrawLine($hudPen, [float]($iconX + 6 * $scale), [float]($iconY + 6 * $scale), [float]($iconX + (6 + $cornerLen) * $scale), [float]($iconY + 6 * $scale))

    # Bottom-Right HUD
    $g.DrawLine($hudPen, [float]($iconX + $iconSize - (6 + $cornerLen) * $scale), [float]($iconY + $iconSize - 6 * $scale), [float]($iconX + $iconSize - 6 * $scale), [float]($iconY + $iconSize - 6 * $scale))
    $g.DrawLine($hudPen, [float]($iconX + $iconSize - 6 * $scale), [float]($iconY + $iconSize - 6 * $scale), [float]($iconX + $iconSize - 6 * $scale), [float]($iconY + $iconSize - (6 + $cornerLen) * $scale))
    $hudPen.Dispose()

    # Central CPU Chip inside Squircle
    $chipSize = [float]($iconSize * 0.46)
    $chipX = [float]($iconX + (($iconSize - $chipSize) / 2))
    $chipY = [float]($iconY + (($iconSize - $chipSize) / 2))
    $chipRadius = [float]($chipSize * 0.18)

    $orangePenThick = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float](5.5 * $scale))
    $orangePenThick.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $orangePenThick -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

    # Outer Pins
    $pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float](4.5 * $scale))
    $pinPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinLen = [float]($chipSize * 0.18)

    $step = [float]($chipSize / 4)
    for ($p = 1; $p -le 3; $p++) {
        $pos = [float]($chipX + ($p * $step))
        $g.DrawLine($pinPen, $pos, $chipY, $pos, [float]($chipY - $pinLen))
        $g.DrawLine($pinPen, $pos, [float]($chipY + $chipSize), $pos, [float]($chipY + $chipSize + $pinLen))

        $posV = [float]($chipY + ($p * $step))
        $g.DrawLine($pinPen, $chipX, $posV, [float]($chipX - $pinLen), $posV)
        $g.DrawLine($pinPen, [float]($chipX + $chipSize), $posV, [float]($chipX + $chipSize + $pinLen), $posV)
    }
    $pinPen.Dispose()

    # Inner Silicon Core Die
    $coreSize = [float]($chipSize * 0.44)
    $coreX = [float]($iconX + (($iconSize - $coreSize) / 2))
    $coreY = [float]($iconY + (($iconSize - $coreSize) / 2))
    $coreRadius = [float]($coreSize * 0.22)
    $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float](4.2 * $scale))
    $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius
    $corePen.Dispose()
    $orangePenThick.Dispose()

    # ----------------------------------------------------
    # 2. TYPOGRAPHY ON RIGHT (Carefully proportioned)
    # ----------------------------------------------------
    $fontFamily = "Segoe UI"
    $brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) # Slate Navy #0F172A
    $brushOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 88, 12)) # Deep vibrant orange #EA580C
    $brushSlate = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 100, 116, 139)) # Slate #64748B

    $textX = [float]($iconX + $iconSize + (24.0 * $scale))

    if ($TextType -eq "INTEPE_SAS") {
        # Size 44pt for perfect horizontal fit in 640px
        $fontMain = New-Object System.Drawing.Font($fontFamily, [float](44.0 * $scale), [System.Drawing.FontStyle]::Bold)
        $fontSAS = New-Object System.Drawing.Font($fontFamily, [float](44.0 * $scale), [System.Drawing.FontStyle]::Bold)
        $fontSub = New-Object System.Drawing.Font($fontFamily, [float](14.0 * $scale), [System.Drawing.FontStyle]::Bold)

        $textY = [float](60.0 * $scale)
        $g.DrawString("INTEPE", $fontMain, $brushDark, $textX, $textY)
        $intepeWidth = $g.MeasureString("INTEPE", $fontMain).Width
        $g.DrawString(" S.A.S.", $fontSAS, $brushOrange, [float]($textX + $intepeWidth - (12.0 * $scale)), $textY)

        # Subtitle: Informática y Tecnología
        $g.DrawString("Informatica y Tecnologia Penagos", $fontSub, $brushSlate, [float]($textX + 2 * $scale), [float](148.0 * $scale))

        $fontMain.Dispose()
        $fontSAS.Dispose()
        $fontSub.Dispose()
    } elseif ($TextType -eq "INTEPE_ONLY") {
        # Large bold "INTEPE"
        $fontMain = New-Object System.Drawing.Font($fontFamily, [float](56.0 * $scale), [System.Drawing.FontStyle]::Bold)
        $fontSub = New-Object System.Drawing.Font($fontFamily, [float](15.0 * $scale), [System.Drawing.FontStyle]::Bold)

        $textY = [float](55.0 * $scale)
        $g.DrawString("INTEPE", $fontMain, $brushDark, $textX, $textY)
        $g.DrawString("SOLUCIONES TI EMPRESARIALES", $fontSub, $brushOrange, [float]($textX + 2 * $scale), [float](150.0 * $scale))

        $fontMain.Dispose()
        $fontSub.Dispose()
    }

    $brushDark.Dispose()
    $brushOrange.Dispose()
    $brushSlate.Dispose()

    # Save PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()

    Write-Output "Generated: $OutputPath"
}

# 1. Main Recommended (320 x 132 px standard Google Workspace size)
$out320 = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_google_workspace_320x132.png"
Generate-Google-Workspace-Logo-Perfect -OutputPath $out320 -Width 320 -Height 132 -TextType "INTEPE_SAS"

# 2. HD Retina Version (640 x 264 px)
$out640 = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_google_workspace_640x264.png"
Generate-Google-Workspace-Logo-Perfect -OutputPath $out640 -Width 640 -Height 264 -TextType "INTEPE_SAS"

# 3. Main header logo (logo_google_workspace.png)
$outMain = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_google_workspace.png"
Copy-Item $out640 $outMain -Force

# 4. Copy to public/logo/
Copy-Item $outMain "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace.png" -Force
Copy-Item $out320 "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace_320x132.png" -Force
Copy-Item $out640 "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo_google_workspace_640x264.png" -Force

Write-Output "ALL LOGOS FOR GOOGLE WORKSPACE PERFECTED!"
