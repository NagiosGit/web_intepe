@echo off
chcp 65001 > nul
echo ========================================================
echo   INTEPE S.A.S. - SINCRONIZADOR AUTOMATICO A GITHUB
echo ========================================================
echo.

set /p mensaje="Escribe el mensaje de la actualizacion (o presiona ENTER para 'Actualizacion web'): "
if "%mensaje%"=="" set mensaje=Actualizacion web INTEPE

echo.
echo [1/3] Agregando archivos modificados...
git add .

echo [2/3] Guardando cambios con el mensaje: "%mensaje%"...
git commit -m "%mensaje%"

echo [3/3] Subiendo cambios a GitHub...
git push origin main

echo.
echo ========================================================
echo   ¡ACTUALIZACION SUBIDA EXITOSAMENTE A GITHUB!
echo ========================================================
echo.
pause
