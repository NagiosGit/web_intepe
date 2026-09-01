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

function Generate-Google-Workspace-Files {
    param(
        [string]$BaseDir = "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo"
    )

    # Exact Google Workspace constraints: 320 x 132 pixels
    $width = 320
    $height = 132

    # Array of formats to generate:
    # 1. Transparent PNG
    # 2. White Background PNG
    # 3. White Background JPEG

    $configs = @(
        @{ Name = "logo_google_workspace.png"; IsTransparent = $true; Format = [System.Drawing.Imaging.ImageFormat]::Png },
        @{ Name = "logo_google_workspace_blanco.png"; IsTransparent = $false; Format = [System.Drawing.Imaging.ImageFormat]::Png },
        @{ Name = "logo_google_workspace.jpg"; IsTransparent = $false; Format = [System.Drawing.Imaging.ImageFormat]::Jpeg }
    )

    foreach ($cfg in $configs) {
        $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($bitmap)
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

        if ($cfg.IsTransparent) {
            $g.Clear([System.Drawing.Color]::Transparent)
        } else {
            $g.Clear([System.Drawing.Color]::White)
        }

        # ----------------------------------------------------
        # 1. ICON ON LEFT (INTEPE Squircle + Microchip)
        # ----------------------------------------------------
        $iconSize = 96.0
        $iconX = 12.0
        $iconY = [float](($height - $iconSize) / 2)
        $radius = [float]($iconSize * 0.22)

        # Squircle Background (#0F172A)
        $squircleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
        Draw-RoundedRectangle -g $g -pen $null -brush $squircleBrush -x $iconX -y $iconY -width $iconSize -height $iconSize -radius $radius
        $squircleBrush.Dispose()

        # HUD Corner Brackets in Orange (#FF7120)
        $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 2.5)
        $hudPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $hudPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        $cornerLen = [float]($iconSize * 0.18)

        # Top-Left HUD
        $g.DrawLine($hudPen, [float]($iconX + 3), [float]($iconY + 3 + $cornerLen), [float]($iconX + 3), [float]($iconY + 3))
        $g.DrawLine($hudPen, [float]($iconX + 3), [float]($iconY + 3), [float]($iconX + 3 + $cornerLen), [float]($iconY + 3))

        # Bottom-Right HUD
        $g.DrawLine($hudPen, [float]($iconX + $iconSize - 3 - $cornerLen), [float]($iconY + $iconSize - 3), [float]($iconX + $iconSize - 3), [float]($iconY + $iconSize - 3))
        $g.DrawLine($hudPen, [float]($iconX + $iconSize - 3), [float]($iconY + $iconSize - 3), [float]($iconX + $iconSize - 3), [float]($iconY + $iconSize - 3 - $cornerLen))
        $hudPen.Dispose()

        # Central CPU Chip inside Squircle
        $chipSize = [float]($iconSize * 0.46)
        $chipX = [float]($iconX + (($iconSize - $chipSize) / 2))
        $chipY = [float]($iconY + (($iconSize - $chipSize) / 2))
        $chipRadius = [float]($chipSize * 0.18)

        $orangePenThick = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 2.8)
        $orangePenThick.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
        Draw-RoundedRectangle -g $g -pen $orangePenThick -brush $null -x $chipX -y $chipY -width $chipSize -height $chipSize -radius $chipRadius

        # Outer Pins
        $pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 2.3)
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
        $corePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 2.0)
        $corePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
        Draw-RoundedRectangle -g $g -pen $corePen -brush $null -x $coreX -y $coreY -width $coreSize -height $coreSize -radius $coreRadius
        $corePen.Dispose()
        $orangePenThick.Dispose()

        # ----------------------------------------------------
        # 2. TYPOGRAPHY ON RIGHT
        # ----------------------------------------------------
        $fontFamily = "Segoe UI"
        $fontMain = New-Object System.Drawing.Font($fontFamily, 22.0, [System.Drawing.FontStyle]::Bold)
        $fontSAS = New-Object System.Drawing.Font($fontFamily, 22.0, [System.Drawing.FontStyle]::Bold)
        $fontSub = New-Object System.Drawing.Font($fontFamily, 7.2, [System.Drawing.FontStyle]::Bold)

        $brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))  # Slate #0F172A
        $brushOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 88, 12)) # Dark Orange #EA580C
        $brushSlate = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 100, 116, 139)) # Slate Grey #64748B

        $textX = [float]($iconX + $iconSize + 12.0)
        $textY = 32.0

        # Title: INTEPE S.A.S.
        $g.DrawString("INTEPE", $fontMain, $brushDark, $textX, $textY)
        $intepeWidth = $g.MeasureString("INTEPE", $fontMain).Width
        $g.DrawString(" S.A.S.", $fontSAS, $brushOrange, [float]($textX + $intepeWidth - 6.0), $textY)

        # Subtitle: Informatica y Tecnologia Penagos
        $g.DrawString("Informatica y Tecnologia Penagos", $fontSub, $brushSlate, [float]($textX + 1.0), 74.0)

        $fontMain.Dispose()
        $fontSAS.Dispose()
        $fontSub.Dispose()
        $brushDark.Dispose()
        $brushOrange.Dispose()
        $brushSlate.Dispose()

        # Save File
        $targetFile = Join-Path $BaseDir $cfg.Name
        $bitmap.Save($targetFile, $cfg.Format)
        $g.Dispose()
        $bitmap.Dispose()

        # Also copy to public/logo/
        $publicTarget = Join-Path "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\public\logo" $cfg.Name
        Copy-Item $targetFile $publicTarget -Force

        $fileSize = (Get-Item $targetFile).Length
        Write-Output "Created: $($cfg.Name) (Size: $($fileSize) bytes)"
    }
}

Generate-Google-Workspace-Files
