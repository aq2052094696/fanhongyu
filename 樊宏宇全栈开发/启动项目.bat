@echo off
chcp 65001 >nul
title Fanhy 全栈典藏展厅 - 启动器
echo.
echo   ============================================
echo      Fanhy 全栈典藏展厅  樊宏宇 24001010618
echo   ============================================
echo.
echo   正在启动后端服务，请稍候...
echo.
cd /d %~dp0backend
start "" http://localhost:8618
node app.js
pause
