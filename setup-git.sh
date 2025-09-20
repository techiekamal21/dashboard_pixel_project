#!/bin/bash

# Dashboard Pixel Project - Git Setup Script

echo "🚀 Setting up Git repository for Dashboard Pixel Project..."

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Modern React Dashboard with animations and micro-interactions

Features:
- Pixel-perfect responsive design
- Smooth animations with Framer Motion
- Interactive charts with Recharts
- Material-UI components
- Cross-browser compatibility
- Performance optimized
- Ready for Vercel deployment"

# Set main branch
git branch -M main

echo "✅ Git repository initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'dashboard_pixel_project'"
echo "2. Run: git remote add origin https://github.com/yourusername/dashboard_pixel_project.git"
echo "3. Run: git push -u origin main"
echo "4. Deploy to Vercel by importing the GitHub repository"
echo ""
echo "🌐 Your dashboard will be live at: https://dashboard-pixel-project.vercel.app"