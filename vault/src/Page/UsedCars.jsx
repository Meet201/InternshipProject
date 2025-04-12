import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Car, Fuel, Settings, DollarSign, ChevronDown, Heart, X, Star, Shield, Gauge, Radio, Box, Users, ThumbsUp, AlertTriangle } from 'lucide-react';
import Accessory from './Accessory';
import "../assets/UsedCars.css";

const UsedCars = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    brand: 'all',
    year: 'all',
    fuel: 'all',
    transmission: 'all',
    bodyType: 'all',
    mileage: 'all',
    owners: 'all'
  });

  const usedCars = [
    {
      id: 1,
      name: "2021 BMW 3 Series",
      price: 32500,
      location: "New York, NY",
      mileage: "25,000",
      year: "2021",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true,
      description: "Well-maintained BMW 3 Series with full service history. Features include leather seats, sunroof, and advanced driver assistance systems.",
      features: [
        "Leather Seats",
        "Sunroof",
        "Navigation",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera"
      ],
      specs: {
        engine: "2.0L 4-cylinder Turbo",
        power: "255 hp",
        torque: "295 lb-ft",
        acceleration: "5.6 seconds (0-60 mph)",
        topSpeed: "155 mph",
        fuelEconomy: "26 city / 36 highway"
      },
      rating: 4.8,
      reviews: 48,
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=2000"
      ]
    },
    {
      id: 2,
      name: "2020 Mercedes-Benz C-Class",
      price: 35900,
      location: "Los Angeles, CA",
      mileage: "30,500",
      year: "2020",
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      owner: "2nd Owner",
      verified: true
    },
    {
      id: 3,
      name: "2022 Audi A4",
      price: 38500,
      location: "Chicago, IL",
      mileage: "15,000",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=2000",
      owner: "1st Owner",
      verified: true
    }
  ];

  const ViewDetailsModal = ({ car, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="car-gallery">
          <img src={car.images[0]} alt={car.name} className="main-image" />
          <div className="thumbnail-grid">
            {car.images.map((image, index) => (
              <img key={index} src={image} alt={`${car.name} view ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="car-details">
          <div className="car-header">
            <div>
              <h2>{car.name}</h2>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(car.rating) ? 'filled' : ''} />
                ))}
                <span>({car.reviews} Reviews)</span>
              </div>
            </div>
            <div className="price-tag">
              <DollarSign size={24} />
              {car.price.toLocaleString()}
            </div>
          </div>

          <div className="car-description">
            <p>{car.description}</p>
          </div>

          <div className="specifications">
            <h3>Key Specifications</h3>
            <div className="specs-grid">
              {Object.entries(car.specs).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <h4>{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="features">
            <h3>Features</h3>
            <div className="features-grid">
              {car.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <Shield size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="seller-info">
            <h3>Seller Information</h3>
            <div className="seller-details">
              <div className="seller-rating">
                <ThumbsUp size={20} />
                <span>Highly Rated Seller</span>
              </div>
              <div className="seller-location">
                <MapPin size={20} />
                <span>{car.location}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="schedule-test">Schedule Test Drive</button>
            <button className="contact-seller">Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdvancedFilters = ({ show, onClose }) => (
    <div className={`advanced-filters ${show ? 'show' : ''}`}>
      <div className="filters-header">
        <h3>Advanced Filters</h3>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="filters-body">
        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="range-inputs">
            <input 
              type="number" 
              placeholder="Min Price"
              value={filters.priceRange.min}
              onChange={e => setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, min: e.target.value }
              })}
            />
            <span>to</span>
            <input 
              type="number" 
              placeholder="Max Price"
              value={filters.priceRange.max}
              onChange={e => setFilters({
                ...filters,
                priceRange: { ...filters.priceRange, max: e.target.value }
              })}
            />
          </div>
        </div>

        <div className="filter-section">
          <h4>Mileage</h4>
          <select 
            value={filters.mileage}
            onChange={e => setFilters({ ...filters, mileage: e.target.value })}
          >
            <option value="all">All Mileage</option>
            <option value="0-30000">Under 30,000 miles</option>
            <option value="30000-60000">30,000 - 60,000 miles</option>
            <option value="60000-90000">60,000 - 90,000 miles</option>
            <option value="90000+">Over 90,000 miles</option>
          </select>
        </div>

        <div className="filter-section">
          <h4>Body Type</h4>
          <div className="body-type-options">
            {['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Truck'].map(type => (
              <button
                key={type}
                className={filters.bodyType === type.toLowerCase() ? 'active' : ''}
                onClick={() => setFilters({ ...filters, bodyType: type.toLowerCase() })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Features</h4>
          <div className="features-grid">
            {[
              'Leather Seats',
              'Sunroof',
              'Navigation',
              'Bluetooth',
              'Backup Camera',
              'Parking Sensors'
            ].map(feature => (
              <label key={feature} className="feature-checkbox">
                <input type="checkbox" />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <div className="filters-actions">
          <button className="reset-filters">Reset All</button>
          <button className="apply-filters" onClick={onClose}>Apply Filters</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="used-cars-container">
      <div className="used-cars-header">
        <div className="header-content">
          <h1>Used Cars</h1>
          <p>Find certified pre-owned cars with complete peace of mind</p>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <Search size={20} />
            <input type="text" placeholder="Search by make, model, or keyword" />
          </div>
          <div className="location-box">
            <MapPin size={20} />
            <input type="text" placeholder="Location" />
          </div>
          <button className="search-button">
            Search Cars
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-groups">
            <div className="filter-group">
              <label>Budget</label>
              <select>
                <option>Under $20,000</option>
                <option>$20,000 - $30,000</option>
                <option>$30,000 - $40,000</option>
                <option>$40,000+</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Brand</label>
              <select>
                <option>All Brands</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Audi</option>
                <option>Toyota</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Year</label>
              <select>
                <option>All Years</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Fuel Type</label>
              <select>
                <option>All Types</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>
          <button 
            className="more-filters-button"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={20} />
            More Filters
          </button>
        </div>
      </div>

      <div className="cars-grid-container">
        {usedCars.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              <img src={car.image} alt={car.name} />
              <button className="favorite-button">
                <Heart size={20} />
              </button>
              {car.verified && (
                <div className="verified-badge">
                  Certified
                </div>
              )}
            </div>
            
            <div className="car-content">
              <div className="car-header">
                <h3>{car.name}</h3>
                <div className="price">
                  <DollarSign size={16} />
                  {car.price.toLocaleString()}
                </div>
              </div>

              <div className="car-location">
                <MapPin size={16} />
                {car.location}
              </div>
              
              <div className="car-specs">
                <div className="spec">
                  <Calendar size={16} />
                  <span>{car.year}</span>
                </div>
                <div className="spec">
                  <Car size={16} />
                  <span>{car.mileage} km</span>
                </div>
                <div className="spec">
                  <Fuel size={16} />
                  <span>{car.fuel}</span>
                </div>
                <div className="spec">
                  <Settings size={16} />
                  <span>{car.transmission}</span>
                </div>
              </div>

              <div className="owner-info">
                <span className="owner-badge">{car.owner}</span>
              </div>

              <div className="car-actions">
                <button className="view-details" onClick={() => setSelectedCar(car)}>
                  View Details
                  <ChevronDown size={16} />
                </button>
                <button className="contact-seller">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdvancedFilters 
        show={showFilters}
        onClose={() => setShowFilters(false)}
      />

      {selectedCar && (
        <ViewDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
};

export default UsedCars;