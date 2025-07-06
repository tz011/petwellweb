import React, { useState, useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";
import CartIcon from "./components/CartIcon";
import CartModal from "./components/CartModal";
import ProductsPage from "./components/ProductsPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("dogs");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showConsultationTooltip, setShowConsultationTooltip] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Track scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const speciesTabs = ["dogs", "cats", "birds", "small mammals"];
  const remedies = [
    {
      name: "Upset Stomach",
      vetApproved: true,
      steps: "Withhold food for 12 hours, offer small amounts of water, then bland rice and boiled chicken.",
      icon: "🤢",
      color: "from-red-500 to-pink-500"
    },
    {
      name: "Tick Removal",
      vetApproved: true,
      steps: "Use fine-tipped tweezers to grasp the tick close to the skin. Pull upward steadily without twisting.",
      icon: "🕷️",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Fleas",
      vetApproved: false,
      steps: "Bathe pet with warm water and mild soap. Consult your vet for proper flea treatment.",
      icon: "🦗",
      color: "from-yellow-500 to-orange-500"
    },
  ];

  const blogPosts = [
    {
      title: "Why I Became a Veterinarian",
      excerpt: "A heartfelt story about my journey into veterinary medicine and love for animals.",
      author: "Dr. Jane Doe",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      title: "The Rise of Plant-Based Diets for Pets",
      excerpt: "Exploring the pros and cons of plant-based diets and what's best for your furry friend.",
      author: "Dr. Jane Doe",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop"
    },
  ];

  const products = [
    {
      name: "Premium Puppy Food",
      price: "$39.99",
      category: "dogs",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&h=200&fit=crop"
    },
    {
      name: "Senior Cat Formula",
      price: "$34.99",
      category: "cats",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop"
    },
    {
      name: "Bird Seed Mix",
      price: "$19.99",
      category: "birds",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=200&fit=crop"
    },
    {
      name: "Hamster Treats",
      price: "$8.99",
      category: "small mammals",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop"
    },
  ];

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert(type === 'newsletter' ? "Thanks for subscribing!" : "Message sent successfully!");
    if (type === 'newsletter') setShowPopup(false);
  };

  const handleWhatsAppConsultation = () => {
    // Replace with your actual WhatsApp number and message
    const phoneNumber = "+1234567890"; // Replace with your vet's WhatsApp number
    const message = encodeURIComponent("Hi! I'd like to book an online consultation for my pet. Can you help me schedule an appointment?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartProvider>
      <div className="font-sans text-gray-800 bg-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <header className={`bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 ${scrollY > 100 ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 animate-pulse">
            PetWellHub
          </h1>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Education', 'Remedies', 'Store', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-teal-500 transition duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <CartIcon onCartClick={() => setShowCart(true)} />
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 animate-slideDown">
            <ul className="space-y-3">
              {['Home', 'Education', 'Remedies', 'Store', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="block hover:text-teal-500 transition duration-300 py-2" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-4 transform transition-all duration-700 hover:scale-105 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              Caring for Your Pet, Every Step of the Way.
            </h2>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">
              Trusted advice from veterinary experts. Expert care guidance. Always by your side when you need us most.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { text: "🐶 Dog Care Tips", color: "from-orange-500 to-red-500" },
                { text: "🐱 Cat Health Guide", color: "from-purple-500 to-pink-500" },
                { text: "💊 Home Remedies", color: "from-green-500 to-teal-500" },
                { text: "📞 Contact a Vet", color: "from-blue-500 to-indigo-500" }
              ].map((btn, i) => (
                <button 
                  key={i}
                  className={`bg-gradient-to-r ${btn.color} hover:shadow-lg text-white py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center font-medium`}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 animate-fadeInRight">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl blur opacity-20 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop"
                alt="Happy pets"
                className="relative rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Center */}
      <section id="education" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              Pet Education Center
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides and resources to help you provide the best care for your beloved pets.
            </p>
          </div>
          <div className="flex flex-wrap justify-center mb-12 space-x-2">
            {speciesTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 m-2 rounded-full capitalize transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Common Diseases", icon: "🩺", desc: "Learn symptoms, prevention, and treatments for common diseases in" },
              { title: "First Aid Guide", icon: "🩹", desc: "Essential first aid tips you should know before heading to the vet with your" },
              { title: "Health Check Routines", icon: "🔍", desc: "How to perform basic health checks at home for your" },
              { title: "FAQs", icon: "❓", desc: "Find answers to the most commonly asked questions about" }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.desc} <span className="font-semibold text-teal-600">{activeTab}</span>.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Remedies */}
      <section id="remedies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              Simple Home Remedies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vet-approved solutions for minor issues or things that require professional consultation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {remedies.map((r, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-teal-500 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-bl-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{r.name}</h3>
                <div
                  className={`inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4 ${
                    r.vetApproved
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                  }`}
                >
                  {r.vetApproved ? "✅ Vet-Approved" : "⚠️ Consult Your Vet First"}
                </div>
                <p className="text-gray-700 leading-relaxed">{r.steps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Coming Soon */}
      <section className="py-20 bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce">🤖</div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              AI Vet Assistant (Coming Soon)
            </h2>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">
              A 24/7 intelligent companion to answer basic pet health queries and provide personalized guidance.
            </p>
            <form
              onSubmit={(e) => handleSubmit(e, 'ai')}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? "⏳" : "Notify Me"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Store */}
      <section id="store" className="py-20 bg-white">
        <ProductsPage />
      </section>

      {/* Founder's Blog */}
      <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              From the Founder's Desk
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights, stories, and expert advice from our veterinary professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
                <p className="text-sm text-gray-500 font-medium">— {post.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Consultation Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          {/* Tooltip */}
          {showConsultationTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fadeIn">
              <div className="flex items-center space-x-2">
                <span>📞 Book Online Consultation</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
          
          {/* Main Consultation Button */}
          <button
            onClick={handleWhatsAppConsultation}
            onMouseEnter={() => setShowConsultationTooltip(true)}
            onMouseLeave={() => setShowConsultationTooltip(false)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl flex items-center justify-center group"
          >
            <div className="relative">
              <span className="text-2xl">💬</span>
              {/* Pulse animation */}
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Newsletter Popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
      >
        <span className="text-2xl">✉️</span>
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 relative transform transition-all duration-300 scale-100 opacity-100 shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition-colors"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              Stay in the Loop!
            </h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Get vet tips, exclusive deals, and more delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => handleSubmit(e, 'newsletter')}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* About & Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fadeInLeft">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
                About Us
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                PetWellHub was born out of a passion for animals and a desire to empower pet owners with reliable information and resources.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our mission is to help every pet live a longer, healthier life by offering vet-approved education, trusted products, and future AI support.
              </p>
            </div>
            <div className="animate-fadeInRight">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <form onSubmit={(e) => handleSubmit(e, 'contact')} className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  required
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                PetWellHub
              </h3>
              <p className="text-gray-400 mt-2">Empowering pet owners through knowledge and care.</p>
            </div>
            <div className="flex space-x-6">
              {['Facebook', 'Instagram', 'YouTube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PetWellHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
    </CartProvider>
  );
}