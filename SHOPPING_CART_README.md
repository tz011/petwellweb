# Shopping Cart System - PetWellHub

## Overview
A comprehensive shopping cart system has been implemented for the PetWellHub application, featuring both backend API endpoints and frontend React components.

## Features

### Backend (Node.js/Express)
- **Cart Model**: MongoDB schema with session-based cart management
- **Cart Routes**: Full CRUD operations for cart management
- **Session Management**: Cookie-based session tracking
- **Stock Validation**: Real-time stock checking
- **API Endpoints**:
  - `GET /api/cart` - Get cart contents
  - `POST /api/cart/add` - Add item to cart
  - `PUT /api/cart/update/:itemId` - Update item quantity
  - `DELETE /api/cart/remove/:itemId` - Remove item from cart
  - `DELETE /api/cart/clear` - Clear entire cart
  - `GET /api/cart/summary` - Get cart summary (item count, total)

### Frontend (React)
- **Cart Context**: Global state management for cart
- **Cart Icon**: Header component with item count badge
- **Cart Modal**: Full-featured cart interface
- **Product Cards**: Individual product display with add-to-cart functionality
- **Products Page**: Complete product listing with filtering and pagination

## Components

### CartContext.jsx
- Manages cart state globally
- Handles API communication
- Provides cart operations (add, update, remove, clear)

### CartIcon.jsx
- Displays cart item count
- Shows loading states
- Opens cart modal on click

### CartModal.jsx
- Full cart interface
- Quantity controls
- Remove items
- Clear cart functionality
- Checkout button (placeholder)

### ProductCard.jsx
- Product display with images, pricing, ratings
- Quantity selector
- Add to cart functionality
- Stock status indicators

### ProductsPage.jsx
- Product grid with filtering
- Search functionality
- Category filtering
- Price range filtering
- Sorting options
- Pagination

## Installation & Setup

### Backend Dependencies
```bash
cd backend
npm install
```

### Frontend Dependencies
```bash
cd frontend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

## Usage

### Starting the Backend
```bash
cd backend
npm run dev
```

### Starting the Frontend
```bash
cd frontend
npm start
```

## API Endpoints

### Cart Operations
- **Get Cart**: `GET /api/cart`
- **Add Item**: `POST /api/cart/add` (body: `{productId, quantity}`)
- **Update Quantity**: `PUT /api/cart/update/:itemId` (body: `{quantity}`)
- **Remove Item**: `DELETE /api/cart/remove/:itemId`
- **Clear Cart**: `DELETE /api/cart/clear`
- **Get Summary**: `GET /api/cart/summary`

### Product Operations
- **Get Products**: `GET /api/products?category=dogs&search=premium&minPrice=10&maxPrice=100&sort=price&order=asc&page=1&limit=12`
- **Get Single Product**: `GET /api/products/:id`

## Features

### Session Management
- Automatic session ID generation
- 30-day cart expiration
- Cookie-based session tracking

### Stock Management
- Real-time stock validation
- Prevents adding out-of-stock items
- Quantity limits based on available stock

### User Experience
- Loading states for all operations
- Error handling with user feedback
- Responsive design
- Smooth animations and transitions

### Product Features
- Image fallbacks
- Rating display
- Price formatting
- Category badges
- Stock indicators

## Future Enhancements
- User authentication integration
- Checkout process
- Payment processing
- Order management
- Wishlist functionality
- Product reviews
- Inventory management
- Discount codes

## Technical Details

### Database Schema
```javascript
Cart {
  sessionId: String (unique)
  userId: ObjectId (optional, for future auth)
  items: [CartItem]
  total: Number
  itemCount: Number
  isActive: Boolean
  expiresAt: Date
}

CartItem {
  product: ObjectId (ref: Product)
  quantity: Number
  price: Number
}
```

### State Management
- React Context for global cart state
- Reducer pattern for state updates
- Optimistic updates for better UX

### Security
- Input validation on all endpoints
- Rate limiting
- CORS configuration
- Session security

## Testing
The system is ready for testing with the existing product data. You can:
1. Browse products in the Store section
2. Add items to cart with different quantities
3. View cart contents via the cart icon
4. Update quantities in the cart modal
5. Remove items from cart
6. Clear the entire cart

The cart persists across browser sessions using cookies and will expire after 30 days of inactivity. 