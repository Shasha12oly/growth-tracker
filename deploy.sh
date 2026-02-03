#!/bin/bash

# 🚀 Growth Tracker Pro - Deployment Script
# This script helps prepare and deploy the application to Render

set -e

echo "🚀 Starting Growth Tracker Pro deployment preparation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    print_error "server.js not found. Please run this script from the project root."
    exit 1
fi

print_success "✓ Found server.js in current directory"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_NODE="14.0.0"

if [ "$(printf '%s\n' "$REQUIRED_NODE" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_NODE" ]; then
    print_success "✓ Node.js version $NODE_VERSION is compatible"
else
    print_error "Node.js version $NODE_VERSION is too old. Required: >= $REQUIRED_NODE"
    exit 1
fi

# Check if website directory exists
if [ ! -d "website" ]; then
    print_error "website directory not found!"
    exit 1
fi

print_success "✓ Found website directory"

# Check critical files
CRITICAL_FILES=(
    "website/signup-pro.html"
    "website/dashboard-pro.html"
    "website/tasks-pro.html"
    "website/analytics-pro.html"
    "website/badges-pro.html"
    "website/css/professional.css"
    "website/css/themes.css"
    "website/css/navigation.css"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Critical file missing: $file"
        exit 1
    fi
done

print_success "✓ All critical files found"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
    print_success "✓ Dependencies installed"
else
    print_success "✓ Dependencies already installed"
fi

# Test server startup
print_info "Testing server startup..."
NODE_ENV=development timeout 5s npm start > /dev/null 2>&1 || {
    print_error "Server failed to start"
    exit 1
}
print_success "✓ Server starts successfully"

# Check git status
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_warning "Git repository not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    print_success "✓ Git repository initialized"
else
    print_info "Git repository found"
    
    # Check if there are uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Committing them..."
        git add .
        git commit -m "Update for deployment"
        print_success "✓ Changes committed"
    else
        print_success "✓ No uncommitted changes"
    fi
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No remote repository set. Please set it up:"
    echo "   git remote add origin https://github.com/your-username/growth-tracker-pro.git"
    echo "   git push -u origin main"
else
    print_success "✓ Remote repository found"
    
    # Push to remote
    print_info "Pushing to remote repository..."
    git push origin main
    print_success "✓ Code pushed to remote repository"
fi

# Create production environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_warning "No .env file found. Creating from template..."
    cp .env.example .env
    print_info "Please edit .env file with your production settings"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Push your code to GitHub (already done if remote was set)"
echo "   2. Go to render.com and create a new Web Service"
echo "   3. Connect your GitHub repository"
echo "   4. Use these settings:"
echo "      - Environment: Node"
echo "      - Build Command: npm install"
echo "      - Start Command: npm start"
echo "      - Health Check Path: /signup-pro.html"
echo "   5. Add environment variables:"
echo "      - NODE_ENV=production"
echo "      - PORT=10000"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
print_success "Ready to deploy to Render! 🚀"
