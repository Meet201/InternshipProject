import React, { useState } from 'react';
     import { Shield, Car, PenTool as Tool, Battery, Disc, Sparkles, Radio, Wifi, Camera, Umbrella, DollarSign, Star, ShoppingCart, Heart, Info } from 'lucide-react';
     import { Elements } from '@stripe/react-stripe-js';
     import { loadStripe } from '@stripe/stripe-js';
     import PaymentModal from '../Components/PaymentModal.jsx';
     import '../assets/Accessory.css';

     // Initialize Stripe with your Publishable Key
     const stripePromise = loadStripe('pk_test_51RGk4cROlkCSWLULF6sy2YStx2KG6YbwgrMkopOsciG2y1LIwAcm9A44YLKFqXX82GiwGOVWdye8QPX6HNrqUvV500PVjDCwAA');

     const Accessory = ({ carType, carModel }) => {
       const [selectedCategory, setSelectedCategory] = useState('all');
       const [selectedAccessory, setSelectedAccessory] = useState(null);

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
         <Elements stripe={stripePromise}>
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

                       <button 
                         className="add-to-cart"
                         onClick={() => setSelectedAccessory(accessory)}
                       >
                         <ShoppingCart size={18} />
                         Add to Cart
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             {selectedAccessory && (
               <PaymentModal
                 accessory={selectedAccessory}
                 onClose={() => setSelectedAccessory(null)}
               />
             )}
           </div>
         </Elements>
       );
     };

     export default Accessory;