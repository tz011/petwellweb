import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState([]);

  // ✅ Newsletter subscription
  const handleSubscribe = () => {
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Subscribed successfully:", data);
        alert("Subscribed!");
      })
      .catch(err => {
        console.error("❌ Error subscribing:", err);
        alert("Something went wrong.");
      });
  };

  // ✅ Product API call on page load
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => console.log('📦 Products:', data))
      .catch(err => console.error('❌ Error fetching products:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>PetWellHub Newsletter</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={handleSubscribe}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Subscribe
        </button>

        <p className="mt-4 text-sm text-gray-300">Check browser console for products log 👇</p>
      </header>
    </div>
  );
}

export default App;
