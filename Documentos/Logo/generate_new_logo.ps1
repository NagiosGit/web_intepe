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

function Generate-Logo-Icon {
    param(
        [string]$OutputPath,
        [int]$Size = 1024,
        [bool]$TransparentBg = $true
    )

    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    if (-not $TransparentBg) {
        $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 11, 14))
        $g.FillRectangle($bgBrush, 0, 0, $Size, $Size)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    # Center & Dimensions
    $pad = [float]($Size * 0.12)
    $boxSize = [float]($Size - ($pad * 2))
    $boxX = [float]$pad
    $boxY = [float]$pad
    $radius = [float]($boxSize * 0.22)

    # Outer Ambient Glow
    for ($i = 1; $i -le 6; $i++) {
        $glowPad = [float]($pad - ($i * 6))
        $glowSize = [float]($Size - ($glowPad * 2))
        $glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb([int](14 * (7 - $i)), 255, 113, 32), [float]($i * 4))
        Draw-RoundedRectangle -g $g -pen $glowPen -brush $null -x $glowPad -y $glowPad -width $glowSize -height $glowSize -radius ([float]($radius + $i * 4))
        $glowPen.Dispose()
    }

    # Main Card Squircle Background (#0D1219 / #111822)
    $p1 = New-Object System.Drawing.PointF([float]$boxX, [float]$boxY)
    $p2 = New-Object System.Drawing.PointF([float]($boxX + $boxSize), [float]($boxY + $boxSize))
    $cardBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $p1,
        $p2,
        [System.Drawing.Color]::FromArgb(255, 17, 24, 34),
        [System.Drawing.Color]::FromArgb(255, 8, 11, 14)
    )
    $cardBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 255, 255, 255), [float]($Size * 0.006))
    Draw-RoundedRectangle -g $g -pen $cardBorderPen -brush $cardBrush -x $boxX -y $boxY -width $boxSize -height $boxSize -radius $radius

    # Neon Orange HUD Corner Brackets
    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.026))
    $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cornerLen = [float]($boxSize * 0.18)

    # Top-Left HUD Corner
    $g.DrawLine($hudPen, [float]($boxX + 10), [float]($boxY + 10 + $cornerLen), [float]($boxX + 10), [float]($boxY + 10))
    $g.DrawLine($hudPen, [float]($boxX + 10), [float]($boxY + 10), [float]($boxX + 10 + $cornerLen), [float]($boxY + 10))

    # Bottom-Right HUD Corner
    $g.DrawLine($hudPen, [float]($boxX + $boxSize - 10 - $cornerLen), [float]($boxY + $boxSize - 10), [float]($boxX + $boxSize - 10), [float]($boxY + $boxSize - 10))
    $g.DrawLine($hudPen, [float]($boxX + $boxSize - 10), [float]($boxY + $boxSize - 10), [float]($boxX + $boxSize - 10), [float]($boxY + $boxSize - 10 - $cornerLen))

    # ----------------------------------------------------
    # DRAW CPU MICROCHIP IN CENTER
    # ----------------------------------------------------
    $chipSize = [float]($boxSize * 0.46)
    $chipX = [float](($Size - $chipSize) / 2)
    $chipY = [float](($Size - $chipSize) / 2)
    $chipRadius = [float]($chipSize * 0.18)

    $orangePenThick = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.032))
    $orangePenThick.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    # 1. Outer CPU Processor Body
    Draw-RoundedRectangle -g $g -pen $orangePenThick -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

    # 2. Outer Pins (Top, Bottom, Left, Right)
    $pinCount = 3
    $pinLen = [float]($chipSize * 0.18)
    $pinThickness = [float]($Size * 0.026)
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

    # 3. Inner Silicon Core Die
    $coreSize = [float]($chipSize * 0.44)
    $coreX = [float](($Size - $coreSize) / 2)
    $coreY = [float](($Size - $coreSize) / 2)
    $coreRadius = [float]($coreSize * 0.22)
    $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), [float]($Size * 0.026))
    $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius

    # Save PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()
}

function Generate-Logo-Full-Horizontal {
    param(
        [string]$OutputPath,
        [int]$Width = 2400,
        [int]$Height = 800,
        [bool]$DarkBg = $true
    )

    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    if ($DarkBg) {
        $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 11, 14))
        $g.FillRectangle($bgBrush, 0, 0, $Width, $Height)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    # 1. Draw Icon on Left
    $iconSize = 560.0
    $iconX = 80.0
    $iconY = [float](($Height - $iconSize) / 2)

    # Squircle Box
    $radius = [float]($iconSize * 0.22)
    $p1 = New-Object System.Drawing.PointF($iconX, $iconY)
    $p2 = New-Object System.Drawing.PointF([float]($iconX + $iconSize), [float]($iconY + $iconSize))
    $cardBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $p1,
        $p2,
        [System.Drawing.Color]::FromArgb(255, 17, 24, 34),
        [System.Drawing.Color]::FromArgb(255, 8, 11, 14)
    )
    $cardBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 3.0)
    Draw-RoundedRectangle -g $g -pen $cardBorderPen -brush $cardBrush -x $iconX -y $iconY -width $iconSize -height $iconSize -radius $radius

    # HUD Corners
    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 14.0)
    $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cornerLen = [float]($iconSize * 0.18)

    $g.DrawLine($hudPen, [float]($iconX + 6), [float]($iconY + 6 + $cornerLen), [float]($iconX + 6), [float]($iconY + 6))
    $g.DrawLine($hudPen, [float]($iconX + 6), [float]($iconY + 6), [float]($iconX + 6 + $cornerLen), [float]($iconY + 6))

    $g.DrawLine($hudPen, [float]($iconX + $iconSize - 6 - $cornerLen), [float]($iconY + $iconSize - 6), [float]($iconX + $iconSize - 6), [float]($iconY + $iconSize - 6))
    $g.DrawLine($hudPen, [float]($iconX + $iconSize - 6), [float]($iconY + $iconSize - 6), [float]($iconX + $iconSize - 6), [float]($iconY + $iconSize - 6 - $cornerLen))

    # CPU Chip
    $chipSize = [float]($iconSize * 0.46)
    $chipX = [float]($iconX + (($iconSize - $chipSize) / 2))
    $chipY = [float]($iconY + (($iconSize - $chipSize) / 2))
    $chipRadius = [float]($chipSize * 0.18)
    $orangePenThick = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 18.0)
    $orangePenThick.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $orangePenThick -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

    # Pins
    $pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 16.0)
    $pinPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pinPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $step = [float]($chipSize / 4)
    for ($p = 1; $p -le 3; $p++) {
        $pos = [float]($chipX + ($p * $step))
        $g.DrawLine($pinPen, $pos, $chipY, $pos, [float]($chipY - ($chipSize * 0.18)))
        $g.DrawLine($pinPen, $pos, [float]($chipY + $chipSize), $pos, [float]($chipY + $chipSize + ($chipSize * 0.18)))

        $posV = [float]($chipY + ($p * $step))
        $g.DrawLine($pinPen, $chipX, $posV, [float]($chipX - ($chipSize * 0.18)), $posV)
        $g.DrawLine($pinPen, [float]($chipX + $chipSize), $posV, [float]($chipX + $chipSize + ($chipSize * 0.18)), $posV)
    }

    # Core
    $coreSize = [float]($chipSize * 0.44)
    $coreX = [float]($chipX + (($chipSize - $coreSize) / 2))
    $coreY = [float]($chipY + (($chipSize - $coreSize) / 2))
    $coreRadius = [float]($coreSize * 0.22)
    $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 14.0)
    $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius

    # 2. Draw Typography on Right
    $fontFamily = "Segoe UI"
    $fontMain = New-Object System.Drawing.Font($fontFamily, 130, [System.Drawing.FontStyle]::Bold)
    $fontSAS = New-Object System.Drawing.Font($fontFamily, 130, [System.Drawing.FontStyle]::Bold)
    $fontLegal = New-Object System.Drawing.Font($fontFamily, 44, [System.Drawing.FontStyle]::Bold)
    $fontNit = New-Object System.Drawing.Font("Consolas", 34, [System.Drawing.FontStyle]::Regular)
    $fontTag = New-Object System.Drawing.Font("Consolas", 28, [System.Drawing.FontStyle]::Bold)

    $textMainColor = if ($DarkBg) { [System.Drawing.Color]::FromArgb(255, 255, 255, 255) } else { [System.Drawing.Color]::FromArgb(255, 15, 23, 42) }
    $textWhite = New-Object System.Drawing.SolidBrush($textMainColor)
    $textOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 113, 32))
    $textSlate = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
    $textCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))

    $textX = 720.0
    
    # Tag Badge
    $g.DrawString("// SOLUCIONES TI & DESARROLLO CORPORATIVO", $fontTag, $textCyan, $textX, 150.0)

    # Title: INTEPE S.A.S.
    $g.DrawString("INTEPE", $fontMain, $textWhite, $textX, 210.0)
    $g.DrawString(" S.A.S.", $fontSAS, $textOrange, ($textX + 580.0), 210.0)

    # Legal Name
    $g.DrawString("Informática y Tecnología Penagos S.A.S.", $fontLegal, $textSlate, $textX, 460.0)

    # NIT & Web
    $g.DrawString("NIT: 830.066.815-0  •  www.intepe.net  •  Bogotá, Colombia", $fontNit, $textOrange, $textX, 540.0)

    # Save PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()
}

# 1. Main logo.png requested by user in Documentos/Logo/
Generate-Logo-Icon -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo.png" -Size 1024 -TransparentBg $true

# 2. Dark Background version for profile avatars
Generate-Logo-Icon -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_perfil_avatar.png" -Size 1024 -TransparentBg $false

# 3. Horizontal Full Brandmark (Dark & Transparent)
Generate-Logo-Full-Horizontal -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_horizontal_completo.png" -Width 2400 -Height 800 -DarkBg $true
Generate-Logo-Full-Horizontal -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo_horizontal_transparente.png" -Width 2400 -Height 800 -DarkBg $false

# 4. Copy to public/logo/ for website assets
Copy-Item "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo.png" "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo.png" -Force
Copy-Item "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\logo.svg" "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo\logo.svg" -Force

Write-Output "ALL LOGOS GENERATED AND EXPORTED PERFECTLY!"
