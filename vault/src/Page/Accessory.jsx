import React, { useState } from 'react';
import { Shield, Car, PenTool as Tool, Battery, Disc, Sparkles, Radio, Wifi, Camera, Umbrella, DollarSign, Star, ShoppingCart, Heart, Info } from 'lucide-react';
import "../assets/Accessory.css";

const Accessory = ({ carType, carModel }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Accessories', icon: <Car size={20} /> },
    { id: 'protection', name: 'Protection', icon: <Shield size={20} /> },
    { id: 'performance', name: 'Performance', icon: <Tool size={20} /> },
    { id: 'electronics', name: 'Electronics', icon: <Battery size={20} /> },
    { id: 'interior', name: 'Interior', icon: <Sparkles size={20} /> },
    { id: 'exterior', name: 'Exterior', icon: <Disc size={20} /> }
  ];

  const accessories = [
    {
      id: 1,
      name: "Premium Floor Mats",
      category: "interior",
      price: 129.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&q=80&w=800",
      description: "All-weather, custom-fit floor mats with anti-slip technology",
      features: ["Waterproof", "Easy to clean", "Perfect fit", "Durable material"],
      compatibility: ["All Models"]
    },
    {
      id: 2,
      name: "Dash Camera Pro",
      category: "electronics",
      price: 199.99,
      rating: 4.7,
      reviews: 243,
      image: "data:image/jpeg;base64,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",
      description: "4K resolution dash cam with night vision and parking mode",
      features: ["4K Recording", "Night Vision", "GPS Tracking", "Mobile App"],
      compatibility: ["All Models"]
    },
    {
      id: 3,
      name: "Body Side Moldings",
      category: "protection",
      price: 89.99,
      rating: 4.5,
      reviews: 98,
      image: "data:image/jpeg;base64,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",
      description: "Color-matched side moldings to protect against door dings",
      features: ["Paint matched", "Easy installation", "Door protection", "UV resistant"],
      compatibility: ["Specific to car model"]
    },
    {
      id: 4,
      name: "Premium Roof Rack",
      category: "exterior",
      price: 299.99,
      rating: 4.9,
      reviews: 175,
      image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&q=80&w=800",
      description: "Aerodynamic roof rack system with quick-mount technology",
      features: ["Aerodynamic design", "Tool-free install", "High capacity", "Universal fit"],
      compatibility: ["SUV Models"]
    }
  ];

  const filteredAccessories = selectedCategory === 'all' 
    ? accessories 
    : accessories.filter(item => item.category === selectedCategory);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'filled' : ''}
      />
    ));
  };

  return (
    <div className="accessories-container">
      <div className="accessories-header">
        <h2>Recommended Accessories</h2>
        <p>Enhance your vehicle with our premium selection of accessories</p>
      </div>

      <div className="categories-scroll">
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="accessories-grid">
        {filteredAccessories.map(accessory => (
          <div key={accessory.id} className="accessory-card">
            <div className="accessory-image">
              <img src={accessory.image} alt={accessory.name} />
              <button className="favorite-button">
                <Heart size={20} />
              </button>
            </div>

            <div className="accessory-content">
              <h3>{accessory.name}</h3>
              
              <div className="accessory-rating">
                <div className="stars">
                  {renderStars(accessory.rating)}
                </div>
                <span>({accessory.reviews})</span>
              </div>

              <p className="accessory-description">{accessory.description}</p>

              <div className="features-list">
                {accessory.features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    <Shield size={14} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="compatibility-info">
                <Info size={16} />
                <span>Compatible with: {accessory.compatibility.join(', ')}</span>
              </div>

              <div className="accessory-footer">
                <div className="price">
                  <DollarSign size={18} />
                  <span>{accessory.price}</span>
                </div>

                <button className="add-to-cart">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessory;