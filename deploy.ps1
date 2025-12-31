# Probase Admin - Quick Deploy Script for Windows
# This script helps you prepare and deploy to Vercel

Write-Host "🚀 Probase Admin - Quick Deploy to Vercel" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if .env.local exists
Write-Host "📋 Step 1: Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path .env.local)) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Yellow
    Write-Host "Creating from template..."
    Copy-Item .env.example .env.local
    Write-Host "⚠️  Please update .env.local with your Supabase credentials" -ForegroundColor Yellow
    Write-Host "Press Enter when ready..."
    Read-Host
} else {
    Write-Host "✓ .env.local found" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host ""
Write-Host "📦 Step 2: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Type check
Write-Host ""
Write-Host "🔍 Step 3: Running type check..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Type check passed" -ForegroundColor Green
} else {
    Write-Host "✗ Type check failed" -ForegroundColor Red
    exit 1
}

# Step 4: Lint
Write-Host ""
Write-Host "🔍 Step 4: Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Lint check passed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Lint warnings found (continuing...)" -ForegroundColor Yellow
}

# Step 5: Build
Write-Host ""
Write-Host "🏗️  Step 5: Building for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed" -ForegroundColor Red
    exit 1
}

# Step 6: Git status
Write-Host ""
Write-Host "📝 Step 6: Checking git status..." -ForegroundColor Yellow
if (Test-Path .git) {
    git status --short
    Write-Host ""
    $response = Read-Host "Do you want to commit and push? (y/n)"
    if ($response -match '^[Yy]') {
        $commitMessage = Read-Host "Enter commit message"
        git add .
        git commit -m $commitMessage
        git push origin main
        Write-Host "✓ Code pushed to GitHub" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Not a git repository" -ForegroundColor Yellow
}

# Step 7: Deploy options
Write-Host ""
Write-Host "🚀 Step 7: Ready to deploy!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose deployment method:"
Write-Host "1) Deploy via Vercel Dashboard (Recommended)"
Write-Host "2) Deploy via Vercel CLI"
Write-Host "3) Skip deployment"
$deployChoice = Read-Host "Enter choice (1-3)"

switch ($deployChoice) {
    "1" {
        Write-Host ""
        Write-Host "📱 Deploy via Vercel Dashboard:" -ForegroundColor Green
        Write-Host "1. Go to https://vercel.com/dashboard"
        Write-Host "2. Click 'Add New...' → 'Project'"
        Write-Host "3. Import: git@github.com:ezdproduct/admin-probase.git"
        Write-Host "4. Add environment variables:"
        Write-Host "   - NEXT_PUBLIC_SUPABASE_URL"
        Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        Write-Host "5. Click 'Deploy'"
        Write-Host ""
        Write-Host "Opening Vercel Dashboard..."
        Start-Process "https://vercel.com/new"
    }
    "2" {
        Write-Host ""
        Write-Host "🔧 Checking Vercel CLI..." -ForegroundColor Yellow
        $vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelExists) {
            Write-Host "⚠️  Vercel CLI not found" -ForegroundColor Yellow
            Write-Host "Installing Vercel CLI..."
            npm i -g vercel
        }
        
        Write-Host "Logging in to Vercel..."
        vercel login
        
        Write-Host ""
        Write-Host "Deploying to production..."
        vercel --prod
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Deployment successful!" -ForegroundColor Green
        } else {
            Write-Host "✗ Deployment failed" -ForegroundColor Red
            exit 1
        }
    }
    "3" {
        Write-Host "Skipping deployment."
    }
    default {
        Write-Host "Invalid choice. Skipping deployment."
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ All done!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Documentation:"
Write-Host "  - README.md - General documentation"
Write-Host "  - DEPLOYMENT.md - Deployment guide (Vietnamese)"
Write-Host "  - CHECKLIST.md - Pre-deployment checklist"
Write-Host ""
Write-Host "🎉 Happy deploying!" -ForegroundColor Cyan
