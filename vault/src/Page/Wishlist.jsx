import React, { useState } from 'react';
import { Heart, Share2, Car, Star, AlertCircle, Clock3, Trash2 } from 'lucide-react';
import "../assets/Wishlist.css";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "BMW X5",
      price: "$65,000",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2070&q=80",
      specs: {
        year: 2024,
        mileage: "25 mpg",
        fuelType: "Petrol",
      },
      dateAdded: "2024-03-15",
    },
    {
      id: 2,
      name: "Mercedes-Benz GLE",
      price: "$75,000",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2070&q=80",
      specs: {
        year: 2024,
        mileage: "28 mpg",
        fuelType: "Hybrid",
      },
      dateAdded: "2024-03-14",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>
          <Heart className="heart-icon" /> My Wishlist
        </h1>
        <p>{wishlistItems.length} vehicles saved</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="car-image">
                <img src={item.image} alt={item.name} />
                <div className="card-actions">
                  <button className="action-btn share">
                    <Share2 size={20} />
                  </button>
                  <button className="action-btn remove" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="car-info">
                <h2>{item.name}</h2>
                <p className="price">{item.price}</p>
                <div className="specs">
                  <div>
                    <Clock3 className="icon" />
                    <span>{item.specs.year}</span>
                  </div>
                  <div>
                    <AlertCircle className="icon" />
                    <span>{item.specs.mileage}</span>
                  </div>
                  <div>
                    <Star className="icon" />
                    <span>{item.specs.fuelType}</span>
                  </div>
                </div>
                <div className="date-added">Added on {new Date(item.dateAdded).toLocaleDateString()}</div>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <Car size={48} />
          <h2>Your wishlist is empty</h2>
          <p>Start adding cars to your wishlist to keep track of your favorite vehicles!</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
