#!/bin/bash

# Sanity CORS Setup Script
# This script helps you add CORS origins to your Sanity project

echo "🔧 Sanity CORS Setup"
echo "===================="
echo ""

# Check if Sanity CLI is installed
if ! command -v sanity &> /dev/null; then
    echo "❌ Sanity CLI not found. Installing..."
    npm install -g @sanity/cli
    echo "✅ Sanity CLI installed"
    echo ""
fi

# Check if logged in
echo "Checking Sanity login status..."
if ! sanity projects list &> /dev/null; then
    echo "⚠️  Not logged in to Sanity. Please log in:"
    echo "   Run: sanity login"
    echo ""
    exit 1
fi

echo "✅ Logged in to Sanity"
echo ""

# Add CORS origins
echo "Adding CORS origins..."
echo ""

echo "1. Adding localhost:3000..."
sanity cors add http://localhost:3000 --credentials 2>/dev/null || echo "   (May already exist)"

echo "2. Adding production URL..."
sanity cors add https://limestone-fields.vercel.app --credentials 2>/dev/null || echo "   (May already exist)"

echo ""
echo "✅ CORS origins added!"
echo ""
echo "📝 Next steps:"
echo "   1. Restart your dev server: npm run dev"
echo "   2. Visit: http://localhost:3000/studio"
echo "   3. If you still see CORS errors, add manually in Sanity dashboard:"
echo "      https://sanity.io/manage → Your Project → Settings → API → CORS origins"
echo ""
