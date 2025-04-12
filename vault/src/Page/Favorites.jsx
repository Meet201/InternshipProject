import React from 'react';
import { Heart, AlertCircle, Clock3, Star } from 'lucide-react';
import "../assets/Favorites.css";

const Favorites = ({ cars, toggleFavorite }) => {
  const favoriteCars = cars.filter(car => car.isFavorite);

  return (
    <div className="favorites-container">
      <h2 className="favorites-header">
        <Heart className="icon" /> Favorite Cars
      </h2>
      <div className="favorites-grid">
        {favoriteCars.length > 0 ? (
          favoriteCars.map(car => (
            <div key={car.id} className="favorites-card">
              <div className="favorites-image">
                <img src={car.image} alt={car.name} />
                <button
                  className={`favorites-btn ${car.isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(car.id)}
                >
                  <Heart color={car.isFavorite ? 'red' : 'black'} />
                </button>
              </div>
              <div className="favorites-info">
                <h2>{car.name}</h2>
                <p className="favorites-price">{car.price}</p>
                <div className="favorites-specs">
                  <div>
                    <Clock3 className="icon" />
                    <span>{car.specs.year}</span>
                  </div>
                  <div>
                    <AlertCircle className="icon" />
                    <span>{car.specs.mileage}</span>
                  </div>
                  <div>
                    <Star className="icon" />
                    <span>{car.specs.fuelType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="favorites-empty">
            <Heart size={48} />
            <h2>No favorites yet</h2>
            <p>Start adding cars to your favorites list!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
