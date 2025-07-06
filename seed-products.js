const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();
require('./config/db');

const products = [
  { name: "Premium Puppy Food", price: "$39.99", category: "dogs", image: "https://placehold.co/300x200 " },
  { name: "Senior Cat Formula", price: "$34.99", category: "cats", image: "https://placehold.co/300x200 " },
  { name: "Bird Seed Mix", price: "$19.99", category: "birds", image: "https://placehold.co/300x200 " },
  { name: "Hamster Treats", price: "$8.99", category: "small mammals", image: "https://placehold.co/300x200 " },
];

Product.insertMany(products)
  .then(() => {
    console.log("Products seeded!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error seeding products:", err);
    mongoose.connection.close();
  });