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

function Generate-Logo-Redondo-Gmail {
    param(
        [string]$OutputPath,
        [int]$Size = 1024,
        [bool]$TransparentBorder = $true
    )

    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    $g.Clear([System.Drawing.Color]::Transparent)

    $center = [float]($Size / 2)
    # Circle diameter with safety margin (88% of canvas, leaving 6% margin all around)
    $circleRadius = [float]($Size * 0.44)
    $circleDiam = [float]($circleRadius * 2)
    $circleX = [float]($center - $circleRadius)
    $circleY = [float]($center - $circleRadius)

    # 1. Outer Ambient Neon Glow (Orange & Cyan aura)
    for ($i = 1; $i -le 8; $i++) {
        $glowPad = [float]($circleX - ($i * 4))
        $glowDiam = [float]($circleDiam + ($i * 8))
        $alpha = [int](16 * (9 - $i))
        $glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 255, 113, 32), [float]($i * 3.5))
        $g.DrawEllipse($glowPen, $glowPad, $glowPad, $glowDiam, $glowDiam)
        $glowPen.Dispose()
    }

    # 2. Main Circular Container (Deep Slate-Navy gradient matching web palette #0F172A / #1E293B)
    $p1 = New-Object System.Drawing.PointF([float]$circleX, [float]$circleY)
    $p2 = New-Object System.Drawing.PointF([float]($circleX + $circleDiam), [float]($circleY + $circleDiam))
    $circleBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $p1,
        $p2,
        [System.Drawing.Color]::FromArgb(255, 24, 34, 53),   # #182235 (Slate-Navy top)
        [System.Drawing.Color]::FromArgb(255, 11, 15, 23)    # #0B0F17 (Deep Navy bottom)
    )
    $g.FillEllipse($circleBrush, $circleX, $circleY, $circleDiam, $circleDiam)
    $circleBrush.Dispose()

    # 3. Concentric Inner Cyber Ticks & Orbit Rings
    $orbitPen1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), [float]($Size * 0.003))
    $orbitPen1.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $orbitDiam1 = [float]($circleDiam * 0.88)
    $orbitX1 = [float]($center - ($orbitDiam1 / 2))
    $g.DrawEllipse($orbitPen1, $orbitX1, $orbitX1, $orbitDiam1, $orbitDiam1)
    $orbitPen1.Dispose()

    $orbitPen2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 0, 229, 255), [float]($Size * 0.0025))
    $orbitDiam2 = [float]($circleDiam * 0.76)
    $orbitX2 = [float]($center - ($orbitDiam2 / 2))
    $g.DrawEllipse($orbitPen2, $orbitX2, $orbitX2, $orbitDiam2, $orbitDiam2)
    $orbitPen2.Dispose()

    # 4. Neon Orange Primary Border Ring
    $ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.016))
    $g.DrawEllipse($ringPen, $circleX, $circleY, $circleDiam, $circleDiam)
    $ringPen.Dispose()

    # 5. Inner White Micro-Glow Line
    $innerGlowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(100, 255, 255, 255), [float]($Size * 0.003))
    $innerPad = [float]($Size * 0.015)
    $g.DrawEllipse($innerGlowPen, [float]($circleX + $innerPad), [float]($circleY + $innerPad), [float]($circleDiam - ($innerPad * 2)), [float]($circleDiam - ($innerPad * 2)))
    $innerGlowPen.Dispose()

    # 6. Tech HUD Cardinal Marks (Top, Bottom, Left, Right)
    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 229, 255), [float]($Size * 0.012))
    $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $tickLen = [float]($Size * 0.035)

    # Top Tick
    $g.DrawLine($hudPen, $center, [float]($circleY + 4), $center, [float]($circleY + 4 + $tickLen))
    # Bottom Tick
    $g.DrawLine($hudPen, $center, [float]($circleY + $circleDiam - 4), $center, [float]($circleY + $circleDiam - 4 - $tickLen))
    # Left Tick
    $g.DrawLine($hudPen, [float]($circleX + 4), $center, [float]($circleX + 4 + $tickLen), $center)
    # Right Tick
    $g.DrawLine($hudPen, [float]($circleX + $circleDiam - 4), $center, [float]($circleX + $circleDiam - 4 - $tickLen), $center)
    $hudPen.Dispose()

    # ----------------------------------------------------
    # 7. DRAW CENTRAL MICROCHIP (Safe Zone Centered)
    # ----------------------------------------------------
    $chipSize = [float]($circleDiam * 0.40)
    $chipX = [float]($center - ($chipSize / 2))
    $chipY = [float]($center - ($chipSize / 2))
    $chipRadius = [float]($chipSize * 0.18)

    # A. Chip Background (Darker Slate Inner Squircle)
    $chipBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 38))
    Draw-RoundedRectangle -g $g -pen $null -brush $chipBgBrush -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius
    $chipBgBrush.Dispose()

    # B. Outer CPU Processor Body (Thick Orange Line)
    $orangePenThick = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.026))
    $orangePenThick.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $orangePenThick -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

    # C. Outer Pins (3 Top, 3 Bottom, 3 Left, 3 Right)
    $pinCount = 3
    $pinLen = [float]($chipSize * 0.18)
    $pinThickness = [float]($Size * 0.020)
    $pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), $pinThickness)
    $pinPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $step = [float]($chipSize / ($pinCount + 1))

    for ($p = 1; $p -le $pinCount; $p++) {
        $pos = [float]($chipX + ($p * $step))
        # Top Pins
        $g.DrawLine($pinPen, $pos, $chipY, $pos, [float]($chipY - $pinLen))
        # Bottom Pins
        $g.DrawLine($pinPen, $pos, [float]($chipY + $chipSize), $pos, [float]($chipY + $chipSize + $pinLen))

        $posV = [float]($chipY + ($p * $step))
        # Left Pins
        $g.DrawLine($pinPen, $chipX, $posV, [float]($chipX - $pinLen), $posV)
        # Right Pins
        $g.DrawLine($pinPen, [float]($chipX + $chipSize), $posV, [float]($chipX + $chipSize + $pinLen), $posV)
    }
    $pinPen.Dispose()

    # D. Inner Silicon Core Die (Orange square in center)
    $coreSize = [float]($chipSize * 0.44)
    $coreX = [float]($center - ($coreSize / 2))
    $coreY = [float]($center - ($coreSize / 2))
    $coreRadius = [float]($coreSize * 0.22)
    $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.020))
    $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius
    $corePen.Dispose()
    $orangePenThick.Dispose()

    # E. Micro Cyan Core Light in Center
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
    $dotSize = [float]($Size * 0.016)
    $g.FillEllipse($dotBrush, [float]($center - ($dotSize / 2)), [float]($center - ($dotSize / 2)), $dotSize, $dotSize)
    $dotBrush.Dispose()

    # Save High-Resolution 1024x1024 PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()

    Write-Output "Successfully generated: $OutputPath"
}

# 1. Generate logoRedondo.png in Documentos/Logo/
$docPath = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logoRedondo.png"
Generate-Logo-Redondo-Gmail -OutputPath $docPath -Size 1024

# 2. Copy to public/logo/ for direct web/asset use
$publicPath = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logoRedondo.png"
Copy-Item $docPath $publicPath -Force
Write-Output "Copied to: $publicPath"
