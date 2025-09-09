@echo off
echo 🏥 Medical Mystery Game - Deployment Script
echo ===========================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python to run the local server.
    pause
    exit /b 1
)

echo ✅ Python found

REM Check if all required files exist
set "missing_files="
if not exist "index.html" set "missing_files=%missing_files% index.html"
if not exist "game.js" set "missing_files=%missing_files% game.js"
if not exist "cases.js" set "missing_files=%missing_files% cases.js"
if not exist "style.css" set "missing_files=%missing_files% style.css"
if not exist "glossary.js" set "missing_files=%missing_files% glossary.js"
if not exist "performance-monitor.js" set "missing_files=%missing_files% performance-monitor.js"

if not "%missing_files%"=="" (
    echo ❌ Missing required files:%missing_files%
    pause
    exit /b 1
)

echo ✅ All required files found

REM Run tests if test runner exists
if exist "test-runner.js" (
    echo 🧪 Running tests...
    node test-runner.js >nul 2>&1
    if %errorlevel% neq 0 (
        echo ⚠️  Node.js not found or tests failed. Continuing anyway...
    ) else (
        echo ✅ Tests passed
    )
)

REM Find available port (simplified - just use 8000)
set PORT=8000

echo 🚀 Starting local server on port %PORT%...
echo 📱 Open your browser and go to: http://localhost:%PORT%
echo 🛑 Press Ctrl+C to stop the server
echo.

REM Start the server
python -m http.server %PORT%