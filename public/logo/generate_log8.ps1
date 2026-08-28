Add-Type -AssemblyName System.Drawing

function Create-LOG8-Banner {
    param(
        [string]$OutputPath,
        [bool]$IsDarkMode = $true,
        [int]$Width = 720,
        [int]$Height = 1120
    )

    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # Colors
    if ($IsDarkMode) {
        $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 11, 14)) # #080B0E
        $cardBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 13, 18, 25)) # #0D1219
        $cardBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 255, 255, 255), 1.5)
        $textPrimary = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        $textSecondary = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184)) # Slate-400
        $textOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 113, 32)) # #FF7120
        $accentOrangePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 113, 32), 2)
        $accentCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255)) # Cyan
        $accentEmerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    } else {
        $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252)) # Slate-50
        $cardBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        $cardBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 226, 232, 240), 1.5)
        $textPrimary = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) # Slate-900
        $textSecondary = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 71, 85, 105)) # Slate-600
        $textOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 88, 12)) # #EA580C
        $accentOrangePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 234, 88, 12), 2)
        $accentCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 165, 233))
        $accentEmerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 5, 150, 105))
    }

    # Background
    $g.FillRectangle($bgBrush, 0, 0, $Width, $Height)

    # Grid background dots / lines
    $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(15, 255, 255, 255), 1)
    if (-not $IsDarkMode) {
        $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(15, 0, 0, 0), 1)
    }
    for ($x = 0; $x -lt $Width; $x += 32) {
        $g.DrawLine($gridPen, $x, 0, $x, $Height)
    }
    for ($y = 0; $y -lt $Height; $y += 32) {
        $g.DrawLine($gridPen, 0, $y, $Width, $y)
    }

    # Header Glow Gradient Arc
    $glowBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($Width, 200)),
        [System.Drawing.Color]::FromArgb(50, 255, 113, 32),
        [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
    )
    $g.FillRectangle($glowBrush, 0, 0, $Width, 240)

    # Fonts
    $fontFamily = "Segoe UI"
    $fontTitleLarge = New-Object System.Drawing.Font($fontFamily, 30, [System.Drawing.FontStyle]::Bold)
    $fontTitleSAS = New-Object System.Drawing.Font($fontFamily, 30, [System.Drawing.FontStyle]::Bold)
    $fontLegal = New-Object System.Drawing.Font($fontFamily, 12, [System.Drawing.FontStyle]::Bold)
    $fontNit = New-Object System.Drawing.Font("Consolas", 10.5, [System.Drawing.FontStyle]::Regular)
    $fontBadge = New-Object System.Drawing.Font("Consolas", 9.5, [System.Drawing.FontStyle]::Bold)
    $fontCardTitle = New-Object System.Drawing.Font($fontFamily, 13.5, [System.Drawing.FontStyle]::Bold)
    $fontCardDesc = New-Object System.Drawing.Font($fontFamily, 10.5, [System.Drawing.FontStyle]::Regular)
    $fontCardIcon = New-Object System.Drawing.Font("Segoe UI Emoji", 20, [System.Drawing.FontStyle]::Regular)
    $fontUrl = New-Object System.Drawing.Font("Consolas", 15, [System.Drawing.FontStyle]::Bold)
    $fontFooter = New-Object System.Drawing.Font("Consolas", 10.5, [System.Drawing.FontStyle]::Regular)

    $formatCenter = New-Object System.Drawing.StringFormat
    $formatCenter.Alignment = [System.Drawing.StringAlignment]::Center

    # 1. Header Badge
    $badgeRect = New-Object System.Drawing.Rectangle(150, 28, 420, 26)
    $badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 255, 113, 32))
    $badgeBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 113, 32), 1)
    $g.FillRectangle($badgeBg, $badgeRect)
    $g.DrawRectangle($badgeBorder, $badgeRect)
    $g.DrawString("⚡ SOLUCIONES CORPORATIVAS TI & OUTSOURCING", $fontBadge, $textOrange, 360, 33, $formatCenter)

    # 2. Main Logo Title
    $g.DrawString("INTEPE", $fontTitleLarge, $textPrimary, 260, 62)
    $g.DrawString("S.A.S.", $fontTitleSAS, $textOrange, 395, 62)

    # 3. Legal Name & NIT
    $g.DrawString("Informática y Tecnología Penagos S.A.S.", $fontLegal, $textSecondary, 360, 116, $formatCenter)
    $g.DrawString("NIT: 830.066.815-0 • BOGOTÁ, COLOMBIA", $fontNit, $textOrange, 360, 138, $formatCenter)

    # Decorative Line Under Header
    $g.DrawLine($accentOrangePen, 180, 168, 540, 168)

    # 4. Service Cards Grid (2 columns x 3 rows)
    $cardWidth = 320
    $cardHeight = 235
    $startX = 30
    $startY = 188
    $gapX = 20
    $gapY = 18

    $services = @(
        @{
            Title = "Mesa de Ayuda (L1/L2/L3)"
            Desc = "Soporte técnico integral, atención a usuarios remota y presencial, mesa de servicio y resolución ágil de incidencias TI."
            Icon = "🎧"
            Tag = "HELP DESK TI"
            Color = $textOrange
        },
        @{
            Title = "Servicio Técnico Especializado"
            Desc = "Diagnóstico, reparación de hardware, mantenimiento correctivo, repuestos corporativos y ensambles de alto rendimiento."
            Icon = "🛠️"
            Tag = "HARDWARE & LAB"
            Color = $accentCyan
        },
        @{
            Title = "Infraestructura & Servidores"
            Desc = "Diseño de redes cableadas/WiFi corporativas, servidores Windows/Linux, virtualización, firewalls y cloud computing."
            Icon = "☁️"
            Tag = "REDES & NUBE"
            Color = $accentEmerald
        },
        @{
            Title = "Desarrollo de Software a Medida"
            Desc = "Plataformas web, ERPs empresariales, sistemas agropecuarios y automatización sin cobros abusivos por usuario."
            Icon = "💻"
            Tag = "SOFTWARE & ERP"
            Color = $textOrange
        },
        @{
            Title = "Mantenimiento Preventivo"
            Desc = "Pólizas periódicas empresariales, limpieza profunda física, optimización de sistemas y copias de seguridad continuas."
            Icon = "🔄"
            Tag = "PÓLIZAS TI"
            Color = $accentCyan
        },
        @{
            Title = "Licenciamiento & Seguridad"
            Desc = "Software original, Google Workspace, Microsoft 365, antivirus corporativo ESET/Bitdefender y auditoría de software."
            Icon = "🔑"
            Tag = "LICENCIAS & SEGURIDAD"
            Color = $accentEmerald
        }
    )

    for ($i = 0; $i -lt $services.Count; $i++) {
        $row = [math]::Floor($i / 2)
        $col = $i % 2

        $x = $startX + ($col * ($cardWidth + $gapX))
        $y = $startY + ($row * ($cardHeight + $gapY))

        $cardRect = New-Object System.Drawing.Rectangle($x, $y, $cardWidth, $cardHeight)
        
        # Fill Card Background
        $g.FillRectangle($cardBgBrush, $cardRect)
        $g.DrawRectangle($cardBorderPen, $cardRect)

        # Corner HUD cyber accents
        $cornerLen = 12
        $g.DrawLine($accentOrangePen, $x, $y, $x + $cornerLen, $y)
        $g.DrawLine($accentOrangePen, $x, $y, $x, $y + $cornerLen)
        $g.DrawLine($accentOrangePen, $x + $cardWidth, $y + $cardHeight, $x + $cardWidth - $cornerLen, $y + $cardHeight)
        $g.DrawLine($accentOrangePen, $x + $cardWidth, $y + $cardHeight, $x + $cardWidth, $y + $cardHeight - $cornerLen)

        # Card Tag
        $tagFont = New-Object System.Drawing.Font("Consolas", 8.5, [System.Drawing.FontStyle]::Bold)
        $g.DrawString("// " + $services[$i].Tag, $tagFont, $services[$i].Color, ($x + 14), ($y + 12))

        # Icon
        $g.DrawString($services[$i].Icon, $fontCardIcon, $textPrimary, ($x + 12), ($y + 30))

        # Title
        $titleRect = New-Object System.Drawing.RectangleF(($x + 52), ($y + 30), ($cardWidth - 62), 48)
        $g.DrawString($services[$i].Title, $fontCardTitle, $textPrimary, $titleRect)

        # Separator inside card
        $sepPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1)
        if (-not $IsDarkMode) {
            $sepPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 0, 0, 0), 1)
        }
        $g.DrawLine($sepPen, ($x + 14), ($y + 86), ($x + $cardWidth - 14), ($y + 86))

        # Description
        $descRect = New-Object System.Drawing.RectangleF(($x + 14), ($y + 96), ($cardWidth - 28), 130)
        $g.DrawString($services[$i].Desc, $fontCardDesc, $textSecondary, $descRect)
    }

    # 5. Bottom Footer / URL Cockpit
    $footerY = $Height - 142
    $footerRect = New-Object System.Drawing.Rectangle(30, $footerY, ($Width - 60), 118)
    
    $footerBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 13, 18, 25))
    if (-not $IsDarkMode) {
        $footerBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    }
    $g.FillRectangle($footerBg, $footerRect)
    $g.DrawRectangle($accentOrangePen, $footerRect)

    # URL Banner Highlight
    $g.DrawString("🌐 https://www.intepe.net", $fontUrl, $textOrange, 360, ($footerY + 14), $formatCenter)
    $g.DrawString("📞 (+57) 313 386 2656  •  ✉️ soporte@intepe.net", $fontFooter, $textPrimary, 360, ($footerY + 48), $formatCenter)
    $g.DrawString("Calle 152A No. 54-68 • Bogotá D.C., Colombia", $fontFooter, $textSecondary, 360, ($footerY + 74), $formatCenter)

    # Save to file with max quality
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)
    
    $bitmap.Save($OutputPath, $codec, $encoderParams)

    $g.Dispose()
    $bitmap.Dispose()
}

# Generate LOG-8.jpg (Dark Cyber Mode - Main)
Create-LOG8-Banner -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\LOG-8.jpg" -IsDarkMode $true -Width 720 -Height 1120

# Generate LOG-8_Blanco.jpg (White Executive Mode)
Create-LOG8-Banner -OutputPath "c:\Users\WINTEPE\Desktop\PROYECTOS_IA\Web_Intepe\Documentos\Logo\LOG-8_Blanco.jpg" -IsDarkMode $false -Width 720 -Height 1120

Write-Output "Refined LOG-8.jpg and LOG-8_Blanco.jpg generated!"
