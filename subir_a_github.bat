@echo off
chcp 65001 > nul
title SINCRONIZADOR DUAL GITHUB - INTEPE S.A.S.
cd /d "%~dp0"

echo ================================================================
echo   INTEPE S.A.S. - SINCRONIZADOR DUAL AUTOMATICO A GITHUB
echo ================================================================
echo   [1] Repositorio Vercel:    https://github.com/NagiosGit/web_intepe.git
echo   [2] Repositorio Respaldo:  https://github.com/IntepeGit/web_intepe.git
echo ================================================================
echo.

set /p mensaje="Escribe el mensaje del cambio (o presiona ENTER para 'Actualizacion INTEPE'): "
if "%mensaje%"=="" set mensaje=Actualizacion INTEPE - %date% %time%

echo.
echo [1/4] Preparando todos los archivos modificados...
git add -A

echo.
echo [2/4] Empaquetando cambios con el mensaje: "%mensaje%"...
git commit -m "%mensaje%"

echo.
echo [3/4] Subiendo a repositorio 1: NagiosGit (Produccion Vercel)...
git push https://github.com/NagiosGit/web_intepe.git main

echo.
echo [4/4] Subiendo a repositorio 2: IntepeGit (Respaldo Corporativo)...
git push https://github.com/IntepeGit/web_intepe.git main

echo.
echo ================================================================
echo   TODO ACTUALIZADO Y SINCRONIZADO CON EXITO EN AMBOS GITHUB!
echo ================================================================
echo.
echo Vercel se encargara de compilar y publicar en:
echo 👉 https://web-intepe.vercel.app
echo.
pause
