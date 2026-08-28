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

function Generate-Logo-Redondo-Soporte-Ultra {
    param(
        [string]$OutputPath,
        [int]$Size = 1024,
        [string]$BadgeText = "SOPORTE TI"
    )

    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    $g.Clear([System.Drawing.Color]::Transparent)

    $center = [float]($Size / 2)
    # Circle diameter with safe margin for Gmail (88% of canvas)
    $circleRadius = [float]($Size * 0.44)
    $circleDiam = [float]($circleRadius * 2)
    $circleX = [float]($center - $circleRadius)
    $circleY = [float]($center - $circleRadius)

    # 1. Outer Cyan Support Aura Glow
    for ($i = 1; $i -le 8; $i++) {
        $glowPad = [float]($circleX - ($i * 4))
        $glowDiam = [float]($circleDiam + ($i * 8))
        $alpha = [int](16 * (9 - $i))
        $glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 0, 229, 255), [float]($i * 3.5))
        $g.DrawEllipse($glowPen, $glowPad, $glowPad, $glowDiam, $glowDiam)
        $glowPen.Dispose()
    }

    # 2. Main Circular Container (Deep Slate-Navy gradient)
    $p1 = New-Object System.Drawing.PointF([float]$circleX, [float]$circleY)
    $p2 = New-Object System.Drawing.PointF([float]($circleX + $circleDiam), [float]($circleY + $circleDiam))
    $circleBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $p1,
        $p2,
        [System.Drawing.Color]::FromArgb(255, 20, 32, 50),   # #142032 (Slate-Cyan Navy top)
        [System.Drawing.Color]::FromArgb(255, 11, 15, 23)    # #0B0F17 (Deep Navy bottom)
    )
    $g.FillEllipse($circleBrush, $circleX, $circleY, $circleDiam, $circleDiam)
    $circleBrush.Dispose()

    # 3. Concentric Orbit Rings & Grid Accent
    $orbitPen1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 0, 229, 255), [float]($Size * 0.003))
    $orbitPen1.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $orbitDiam1 = [float]($circleDiam * 0.88)
    $orbitX1 = [float]($center - ($orbitDiam1 / 2))
    $g.DrawEllipse($orbitPen1, $orbitX1, $orbitX1, $orbitDiam1, $orbitDiam1)
    $orbitPen1.Dispose()

    # 4. Neon Cyan Primary Ring (Support Signature)
    $ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.016))
    $g.DrawEllipse($ringPen, $circleX, $circleY, $circleDiam, $circleDiam)
    $ringPen.Dispose()

    # 5. Inner Orange Micro-Glow Line
    $innerGlowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 255, 113, 32), [float]($Size * 0.0035))
    $innerPad = [float]($Size * 0.015)
    $g.DrawEllipse($innerGlowPen, [float]($circleX + $innerPad), [float]($circleY + $innerPad), [float]($circleDiam - ($innerPad * 2)), [float]($circleDiam - ($innerPad * 2)))
    $innerGlowPen.Dispose()

    # 6. Tech HUD Cardinal Marks (Top, Bottom, Left, Right)
    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.012))
    $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $tickLen = [float]($Size * 0.035)

    $g.DrawLine($hudPen, $center, [float]($circleY + 4), $center, [float]($circleY + 4 + $tickLen))
    $g.DrawLine($hudPen, $center, [float]($circleY + $circleDiam - 4), $center, [float]($circleY + $circleDiam - 4 - $tickLen))
    $g.DrawLine($hudPen, [float]($circleX + 4), $center, [float]($circleX + 4 + $tickLen), $center)
    $g.DrawLine($hudPen, [float]($circleX + $circleDiam - 4), $center, [float]($circleX + $circleDiam - 4 - $tickLen), $center)
    $hudPen.Dispose()

    # ----------------------------------------------------
    # 7. CENTRAL MICROCHIP (PERFECTLY PROPORTIONED)
    # ----------------------------------------------------
    $chipSize = [float]($circleDiam * 0.28)
    $chipX = [float]($center - ($chipSize / 2))
    $chipY = [float]($center - ($chipSize / 2) - ($Size * 0.030))
    $chipRadius = [float]($chipSize * 0.20)

    # Chip Background
    $chipBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 13, 20, 32))
    Draw-RoundedRectangle -g $g -pen $null -brush $chipBgBrush -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius
    $chipBgBrush.Dispose()

    # Chip Body Pen (Orange)
    $orangeChipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.020))
    $orangeChipPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $orangeChipPen -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

    # Outer Pins for Chip (3 top, 3 bottom)
    $pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.015))
    $pinPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinLen = [float]($chipSize * 0.16)

    $stepPin = [float]($chipSize / 4)
    for ($p = 1; $p -le 3; $p++) {
        $pX = [float]($chipX + ($p * $stepPin))
        $g.DrawLine($pinPen, $pX, $chipY, $pX, [float]($chipY - $pinLen))
        $g.DrawLine($pinPen, $pX, [float]($chipY + $chipSize), $pX, [float]($chipY + $chipSize + $pinLen))
    }
    $pinPen.Dispose()

    # Inner Core Die (Orange square in center)
    $coreSize = [float]($chipSize * 0.44)
    $coreX = [float]($center - ($coreSize / 2))
    $coreY = [float]($chipY + (($chipSize - $coreSize) / 2))
    $coreRadius = [float]($coreSize * 0.22)
    $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.016))
    $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius
    $corePen.Dispose()
    $orangeChipPen.Dispose()

    # Glowing Cyan Light in Chip Core
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
    $dotSize = [float]($Size * 0.016)
    $g.FillEllipse($dotBrush, [float]($center - ($dotSize / 2)), [float]($coreY + ($coreSize / 2) - ($dotSize / 2)), $dotSize, $dotSize)
    $dotBrush.Dispose()

    # ----------------------------------------------------
    # 8. CYBER SUPPORT HEADSET (ARCHING ABOVE & EMBRACING CHIP)
    # ----------------------------------------------------
    $headsetRadius = [float]($circleDiam * 0.28)
    $headsetX = [float]($center - $headsetRadius)
    $headsetY = [float]($chipY - ($Size * 0.11))
    $headsetDiam = [float]($headsetRadius * 2)

    $headsetPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.024))
    $headsetPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $headsetPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    # Arc from 195 to 345 degrees (clean top arch)
    $g.DrawArc($headsetPen, $headsetX, $headsetY, $headsetDiam, $headsetDiam, 192, 156)
    $headsetPen.Dispose()

    # Left & Right Ear Cushions (Aligned cleanly with sides of headset arch)
    $cupWidth = [float]($Size * 0.048)
    $cupHeight = [float]($Size * 0.15)
    $cupRadius = [float]($cupWidth / 2)
    $cupY = [float]($chipY + ($chipSize * 0.02))

    $leftCupX = [float]($headsetX - ($cupWidth * 0.15))
    $rightCupX = [float]($headsetX + $headsetDiam - ($cupWidth * 0.85))

    $cupBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 23, 38))
    $cupPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.016))
    $cupPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    Draw-RoundedRectangle -g $g -pen $cupPen -brush $cupBrush -x $leftCupX -y $cupY -width $cupWidth -height $cupHeight -radius $cupRadius
    Draw-RoundedRectangle -g $g -pen $cupPen -brush $cupBrush -x $rightCupX -y $cupY -width $cupWidth -height $cupHeight -radius $cupRadius

    $cupBrush.Dispose()
    $cupPen.Dispose()

    # Microphone Boom (Graceful sweep)
    $micPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.015))
    $micPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $micPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $micPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $startPt = New-Object System.Drawing.PointF([float]($leftCupX + ($cupWidth / 2)), [float]($cupY + ($cupHeight * 0.88)))
    $ctrlPt1 = New-Object System.Drawing.PointF([float]($leftCupX + ($cupWidth / 2)), [float]($chipY + $chipSize + ($Size * 0.08)))
    $ctrlPt2 = New-Object System.Drawing.PointF([float]($center - ($Size * 0.12)), [float]($chipY + $chipSize + ($Size * 0.08)))
    $endPt = New-Object System.Drawing.PointF([float]($center - ($Size * 0.04)), [float]($chipY + $chipSize + ($Size * 0.055)))

    $micPath.AddBezier($startPt, $ctrlPt1, $ctrlPt2, $endPt)
    $g.DrawPath($micPen, $micPath)
    $micPath.Dispose()
    $micPen.Dispose()

    # Glowing Microphone Tip
    $micTipX = [float]($center - ($Size * 0.042))
    $micTipY = [float]($chipY + $chipSize + ($Size * 0.040))
    $micTipW = [float]($Size * 0.044)
    $micTipH = [float]($Size * 0.028)
    $micTipBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 113, 32))
    $micTipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 255, 255), [float]($Size * 0.005))
    Draw-RoundedRectangle -g $g -pen $micTipPen -brush $micTipBrush -x $micTipX -y $micTipY -width $micTipW -height $micTipH -radius ([float]($micTipH * 0.45))
    $micTipBrush.Dispose()
    $micTipPen.Dispose()

    # ----------------------------------------------------
    # 9. BADGE AT BOTTOM: "SOPORTE TI" / "HELP DESK"
    # ----------------------------------------------------
    $badgeW = [float]($circleDiam * 0.52)
    $badgeH = [float]($Size * 0.076)
    $badgeX = [float]($center - ($badgeW / 2))
    $badgeY = [float]($circleY + $circleDiam - ($Size * 0.155))
    $badgeRadius = [float]($badgeH * 0.35)

    $badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 24, 40))
    $badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.007))
    Draw-RoundedRectangle -g $g -pen $badgePen -brush $badgeBrush -x $badgeX -y $badgeY -width $badgeW -height $badgeH -radius $badgeRadius
    $badgeBrush.Dispose()
    $badgePen.Dispose()

    # Badge Text
    $fontFamily = "Segoe UI"
    $fontBadge = New-Object System.Drawing.Font($fontFamily, [float]($Size * 0.030), [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252))

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $textRect = New-Object System.Drawing.RectangleF($badgeX, [float]($badgeY - 1), $badgeW, $badgeH)
    $g.DrawString($BadgeText, $fontBadge, $textBrush, $textRect, $sf)

    $fontBadge.Dispose()
    $textBrush.Dispose()
    $sf.Dispose()

    # Save High-Resolution 1024x1024 PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()

    Write-Output "Generated Support Logo: $OutputPath"
}

# 1. Main Support Logo (SOPORTE TI)
$docPath = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logoRedondo_soporte.png"
Generate-Logo-Redondo-Soporte-Ultra -OutputPath $docPath -Size 1024 -BadgeText "SOPORTE TI"

$publicPath = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logoRedondo_soporte.png"
Copy-Item $docPath $publicPath -Force

# 2. HelpDesk variant (HELP DESK)
$docPathHd = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logoRedondo_helpdesk.png"
Generate-Logo-Redondo-Soporte-Ultra -OutputPath $docPathHd -Size 1024 -BadgeText "HELP DESK"

$publicPathHd = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logoRedondo_helpdesk.png"
Copy-Item $docPathHd $publicPathHd -Force

Write-Output "ALL SUPPORT LOGOS GENERATED SUCCESSFULLY!"
