# PetWellHub Backend API

A comprehensive backend API for the PetWellHub pet care platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Product Management**: Full CRUD operations with filtering, sorting, and pagination
- **Contact Form**: Email notifications with validation and security
- **Newsletter System**: Email subscription management with preferences
- **AI Signup**: Registration for upcoming AI features
- **Security**: Rate limiting, input validation, CORS protection
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/petwellhub
   
   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RECEIVER_EMAIL=admin@petwellhub.com
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Security
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Setup

1. **Seed the database with sample products**
   ```bash
   node seed.js
   ```

2. **Verify the connection**
   The server will automatically connect to MongoDB on startup.

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/categories/list` - Get all categories
- `GET /api/products/search/:query` - Search products

### Contact Form
- `POST /api/contact` - Submit contact form

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers (admin only)
- `DELETE /api/newsletter/:email` - Unsubscribe

### AI Signup
- `POST /api/ai-signup` - Register for AI features
- `GET /api/ai-signup` - Get all signups (admin only)
- `DELETE /api/ai-signup/:email` - Remove signup

## 🔧 Query Parameters

### Products Filtering
```
GET /api/products?category=dogs&minPrice=10&maxPrice=50&inStock=true&sort=price&order=asc&page=1&limit=12
```

- `category`: Filter by pet category
- `search`: Search in name, description, brand
- `minPrice`/`maxPrice`: Price range filter
- `inStock`: Filter by stock availability
- `sort`: Sort by name, price, rating, createdAt
- `order`: asc or desc
- `page`: Page number for pagination
- `limit`: Items per page (max 100)

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs validated and sanitized
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error responses

## 📊 Data Models

### Product
```javascript
{
  name: String (required),
  price: Number (required),
  originalPrice: Number,
  category: String (enum),
  subcategory: String,
  description: String,
  image: String (required),
  images: [String],
  brand: String,
  weight: String,
  inStock: Boolean,
  stockQuantity: Number,
  rating: Number,
  reviewCount: Number,
  tags: [String],
  isActive: Boolean
}
```

### Newsletter
```javascript
{
  email: String (required, unique),
  preferences: {
    weekly: Boolean,
    monthly: Boolean,
    promotions: Boolean,
    petType: String
  },
  isActive: Boolean,
  source: String
}
```

### AI Signup
```javascript
{
  email: String (required, unique),
  petType: String,
  interests: [String],
  isActive: Boolean
}
```

## 🚨 Error Handling

The API returns consistent error responses:

```javascript
{
  "error": "Error message",
  "details": ["Validation errors array"]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **Email Not Sending**
   - Check EMAIL_USER and EMAIL_PASS in .env
   - Ensure Gmail app password is set
   - Check firewall/network settings

3. **CORS Errors**
   - Verify allowed origins in server.js
   - Check frontend URL configuration

4. **Rate Limiting**
   - Reduce request frequency
   - Check rate limit configuration

### Logs
The server logs all requests and errors. Check console output for debugging information.

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-app-password
JWT_SECRET=your-production-jwt-secret
```

### Recommended Hosting
- **Backend**: Heroku, Railway, or DigitalOcean
- **Database**: MongoDB Atlas
- **Email**: Gmail SMTP or SendGrid

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Create an issue in the repository 