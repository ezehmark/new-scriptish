#!/bin/bash

# Setup script for Scriptish Backend

echo "🚀 Setting up Scriptish Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✓ pnpm version: $(pnpm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration before running the server."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm run prisma:generate

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database and email configuration"
echo "2. Run 'pnpm run prisma:migrate' to create database tables"
echo "3. Run 'pnpm run dev' to start the development server"
echo ""
echo "For more information, see README.md and API_DOCS.md"
