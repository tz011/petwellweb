#!/bin/bash

echo "🛒 Setting up PetWellHub Shopping Cart System..."

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first:"
    echo "   - On macOS: brew services start mongodb-community"
    echo "   - On Ubuntu: sudo systemctl start mongod"
    echo "   - On Windows: net start MongoDB"
    exit 1
fi
echo "✅ MongoDB is running"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Seed the database
echo "🌱 Seeding database with products..."
cd ../backend
node seed.js
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "1. Start backend:  cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "🧪 Test the cart by:"
echo "1. Opening http://localhost:3000"
echo "2. Scrolling to the Store section"
echo "3. Adding products to cart"
echo "4. Clicking the cart icon to view/manage cart"
echo ""
echo "🐛 If you encounter issues:"
echo "1. Check browser console for JavaScript errors"
echo "2. Check backend console for API errors"  
echo "3. Verify MongoDB is running and accessible"
echo "4. Check network tab in browser dev tools for failed API calls"