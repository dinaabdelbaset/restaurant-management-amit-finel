@echo off
echo ========================================================
echo Starting Cloudflare Tunnel for Laravel API (port 8000)...
echo ========================================================
"%~dp0cloudflared.exe" tunnel --url http://127.0.0.1:8000
pause
