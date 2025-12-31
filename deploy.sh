#!/bin/bash

# Probase Admin - Quick Deploy Script
# This script helps you prepare and deploy to Vercel

echo "🚀 Probase Admin - Quick Deploy to Vercel"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if .env.local exists
echo "📋 Step 1: Checking environment variables..."
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found!${NC}"
    echo "Creating from template..."
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Please update .env.local with your Supabase credentials${NC}"
    echo "Press Enter when ready..."
    read
else
    echo -e "${GREEN}✓ .env.local found${NC}"
fi

# Step 2: Install dependencies
echo ""
echo "📦 Step 2: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Step 3: Type check
echo ""
echo "🔍 Step 3: Running type check..."
npm run type-check
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Type check passed${NC}"
else
    echo -e "${RED}✗ Type check failed${NC}"
    exit 1
fi

# Step 4: Lint
echo ""
echo "🔍 Step 4: Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Lint check passed${NC}"
else
    echo -e "${YELLOW}⚠️  Lint warnings found (continuing...)${NC}"
fi

# Step 5: Build
echo ""
echo "🏗️  Step 5: Building for production..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Step 6: Git status
echo ""
echo "📝 Step 6: Checking git status..."
if [ -d .git ]; then
    git status --short
    echo ""
    echo "Do you want to commit and push? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Enter commit message:"
        read commit_message
        git add .
        git commit -m "$commit_message"
        git push origin main
        echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Not a git repository${NC}"
fi

# Step 7: Deploy options
echo ""
echo "🚀 Step 7: Ready to deploy!"
echo ""
echo "Choose deployment method:"
echo "1) Deploy via Vercel Dashboard (Recommended)"
echo "2) Deploy via Vercel CLI"
echo "3) Skip deployment"
read -r deploy_choice

case $deploy_choice in
    1)
        echo ""
        echo -e "${GREEN}📱 Deploy via Vercel Dashboard:${NC}"
        echo "1. Go to https://vercel.com/dashboard"
        echo "2. Click 'Add New...' → 'Project'"
        echo "3. Import: git@github.com:ezdproduct/admin-probase.git"
        echo "4. Add environment variables:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "5. Click 'Deploy'"
        echo ""
        echo "Opening Vercel Dashboard..."
        if command -v xdg-open > /dev/null; then
            xdg-open "https://vercel.com/new"
        elif command -v open > /dev/null; then
            open "https://vercel.com/new"
        else
            echo "Please open: https://vercel.com/new"
        fi
        ;;
    2)
        echo ""
        echo "🔧 Checking Vercel CLI..."
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        echo "Logging in to Vercel..."
        vercel login
        
        echo ""
        echo "Deploying to production..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Deployment successful!${NC}"
        else
            echo -e "${RED}✗ Deployment failed${NC}"
            exit 1
        fi
        ;;
    3)
        echo "Skipping deployment."
        ;;
    *)
        echo "Invalid choice. Skipping deployment."
        ;;
esac

echo ""
echo "=========================================="
echo -e "${GREEN}✅ All done!${NC}"
echo ""
echo "📚 Documentation:"
echo "  - README.md - General documentation"
echo "  - DEPLOYMENT.md - Deployment guide (Vietnamese)"
echo "  - CHECKLIST.md - Pre-deployment checklist"
echo ""
echo "🎉 Happy deploying!"
