#!/bin/bash

# Medical Mystery Game - Deployment Script
echo "🏥 Medical Mystery Game - Deployment Script"
echo "==========================================="

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python is not installed. Please install Python to run the local server."
    exit 1
fi

echo "✅ Python found: $PYTHON_CMD"

# Check if all required files exist
required_files=("index.html" "game.js" "cases.js" "style.css" "glossary.js" "performance-monitor.js")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ Missing required files:"
    printf '%s\n' "${missing_files[@]}"
    exit 1
fi

echo "✅ All required files found"

# Run tests if test runner exists
if [ -f "test-runner.js" ]; then
    echo "🧪 Running tests..."
    if command -v node &> /dev/null; then
        node test-runner.js
        if [ $? -ne 0 ]; then
            echo "❌ Tests failed. Please fix issues before deployment."
            exit 1
        fi
        echo "✅ All tests passed"
    else
        echo "⚠️  Node.js not found. Skipping tests."
    fi
fi

# Find available port
PORT=8000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    PORT=$((PORT + 1))
done

echo "🚀 Starting local server on port $PORT..."
echo "📱 Open your browser and go to: http://localhost:$PORT"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the server
$PYTHON_CMD -m http.server $PORT