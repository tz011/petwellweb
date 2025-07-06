// seed.js
const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();
const connectDB = require('./config/db');

const products = [
  {
    name: "Premium Puppy Food",
    price: 39.99,
    originalPrice: 49.99,
    category: "dogs",
    subcategory: "food",
    description: "High-quality puppy food with essential nutrients for healthy growth and development. Made with real chicken and vegetables.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=200&fit=crop"
    ],
    brand: "PetWell",
    weight: "5kg",
    inStock: true,
    stockQuantity: 50,
    rating: 4.5,
    reviewCount: 128,
    tags: ["puppy", "food", "premium", "chicken", "healthy"]
  },
  {
    name: "Senior Cat Formula",
    price: 34.99,
    originalPrice: 39.99,
    category: "cats",
    subcategory: "food",
    description: "Specially formulated for senior cats with joint support and easy digestion. Contains omega-3 fatty acids for healthy skin and coat.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop"
    ],
    brand: "CatCare",
    weight: "3kg",
    inStock: true,
    stockQuantity: 35,
    rating: 4.3,
    reviewCount: 89,
    tags: ["senior", "cat", "food", "joint", "omega-3"]
  },
  {
    name: "Bird Seed Mix",
    price: 19.99,
    category: "birds",
    subcategory: "food",
    description: "Nutritious seed mix for all types of pet birds. Contains sunflower seeds, millet, and other essential nutrients.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=200&fit=crop"
    ],
    brand: "AvianCare",
    weight: "1kg",
    inStock: true,
    stockQuantity: 75,
    rating: 4.7,
    reviewCount: 156,
    tags: ["bird", "seeds", "nutrition", "natural"]
  },
  {
    name: "Hamster Treats",
    price: 8.99,
    category: "small mammals",
    subcategory: "treats",
    description: "Delicious treats for hamsters and other small pets. Made with natural ingredients and no artificial preservatives.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop"
    ],
    brand: "SmallPet",
    weight: "200g",
    inStock: true,
    stockQuantity: 100,
    rating: 4.6,
    reviewCount: 203,
    tags: ["hamster", "treats", "natural", "small pets"]
  },
  {
    name: "Dog Training Collar",
    price: 29.99,
    category: "accessories",
    subcategory: "training",
    description: "Adjustable training collar with quick-release buckle. Perfect for obedience training and daily walks.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    ],
    brand: "TrainWell",
    weight: "150g",
    inStock: true,
    stockQuantity: 45,
    rating: 4.4,
    reviewCount: 67,
    tags: ["training", "collar", "dog", "adjustable"]
  },
  {
    name: "Cat Scratching Post",
    price: 24.99,
    category: "accessories",
    subcategory: "furniture",
    description: "Multi-level cat scratching post with sisal rope and plush platforms. Keeps your cat entertained and protects furniture.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop"
    ],
    brand: "CatComfort",
    weight: "2kg",
    inStock: true,
    stockQuantity: 30,
    rating: 4.8,
    reviewCount: 234,
    tags: ["scratching", "post", "cat", "furniture", "sisal"]
  }
];

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");
    
    // Insert new products
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();