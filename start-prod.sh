#!/bin/bash

# Script to run the portfolio application from production build
# Usage: ./start-prod.sh [port]

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default port
PORT=${1:-3000}

echo -e "${GREEN}🚀 Starting portfolio application in production mode...${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing dependencies...${NC}"
    npm install
fi

# Build the application
echo -e "${GREEN}📦 Building application...${NC}"
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo -e "${GREEN}🌐 Starting server on port ${PORT}...${NC}"
    
    # Set the port and start the application
    PORT=$PORT npm start
else
    echo -e "${RED}❌ Build failed. Please check the errors above.${NC}"
    exit 1
fi
