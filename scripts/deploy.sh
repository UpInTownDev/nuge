#!/bin/bash

# Nuge Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
BACKEND_SERVICE="nuge-backend"
MOBILE_PROFILE="preview"

echo -e "${GREEN}🚀 Starting Nuge deployment to $ENVIRONMENT...${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
echo -e "${YELLOW}📋 Checking required tools...${NC}"
if ! command_exists railway; then
    echo -e "${RED}❌ Railway CLI not found. Install with: npm install -g @railway/cli${NC}"
    exit 1
fi

if ! command_exists eas; then
    echo -e "${RED}❌ EAS CLI not found. Install with: npm install -g eas-cli${NC}"
    exit 1
fi

# Set environment-specific variables
if [ "$ENVIRONMENT" = "production" ]; then
    MOBILE_PROFILE="production"
    echo -e "${YELLOW}⚠️  Deploying to PRODUCTION environment${NC}"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Deployment cancelled${NC}"
        exit 1
    fi
fi

# Backend deployment
echo -e "${GREEN}🔧 Deploying backend...${NC}"
cd backend

# Run tests
echo -e "${YELLOW}🧪 Running backend tests...${NC}"
npm test

# Deploy to Railway
echo -e "${YELLOW}🚂 Deploying to Railway...${NC}"
railway up --service $BACKEND_SERVICE

# Run migrations
echo -e "${YELLOW}📊 Running database migrations...${NC}"
railway run npm run migrate:prod

cd ..

# Mobile deployment
echo -e "${GREEN}📱 Building mobile app...${NC}"
cd mobile

# Install dependencies
echo -e "${YELLOW}📦 Installing mobile dependencies...${NC}"
npm ci

# Build mobile app
echo -e "${YELLOW}🔨 Building mobile app for $MOBILE_PROFILE...${NC}"
eas build --platform all --profile $MOBILE_PROFILE --non-interactive

# Publish OTA update
if [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${YELLOW}📤 Publishing OTA update...${NC}"
    eas update --branch production --message "Production deployment $(date)"
else
    echo -e "${YELLOW}📤 Publishing OTA update to staging...${NC}"
    eas update --branch staging --message "Staging deployment $(date)"
fi

cd ..

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🎉 Nuge is now live on $ENVIRONMENT${NC}"
