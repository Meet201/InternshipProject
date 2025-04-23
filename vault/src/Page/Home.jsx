import React from 'react';
import { Search, Car, Award, Shield, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import "../assets/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find Your Perfect Vehicle</h1>
            <p>Explore thousands of cars, compare prices, and make informed decisions with Vehicle Vault</p>
            
            {/* Search Bar */}
              {/* <div className="search-bar">
                <select className="search-select">
                  <option value="">All Brands</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                  <option>Tesla</option>
                </select>
                <select className="search-select">
                  <option value="">All Models</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Hatchback</option>
                  <option>Coupe</option>
                  <option>Convertible</option>
                </select>
                <button className="search-button">
                  <Search size={24} />
                  Search
                </button>
              </div> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Trusted Dealers</h3>
            <p>All our dealers are verified and trusted partners</p>
          </div>
          <div className="feature-card">
            <Award className="feature-icon" />
            <h3>Quality Assured</h3>
            <p>Every vehicle undergoes thorough quality checks</p>
          </div>
          <div className="feature-card">
            <Clock className="feature-icon" />
            <h3>Quick Process</h3>
            <p>Fast and hassle-free buying experience</p>
          </div>
        </div>
      </div>

      {/* Featured Cars */}
      <div className="featured-section">
        <div className="section-header">
          <h2>Featured Vehicles</h2>
          <button className="view-all-button">
            View All <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="cars-grid">
          {[
            {
              image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
              name: "BMW 3 Series",
              price: "$45,000",
              year: "2023"
            },
            {
              image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800",
              name: "Mercedes C-Class",
              price: "$52,000",
              year: "2023"
            },
            {
              image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800",
              name: "Audi A4",
              price: "$48,000",
              year: "2023"
            }
          ].map((car, index) => (
            <div key={index} className="car-card">
              <div className="car-image-container">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="car-image"
                />
              </div>
              <div className="car-details">
                <h3>{car.name}</h3>
                <div className="car-info">
                  <span className="car-price">{car.price}</span>
                  <span className="car-year">{car.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends */}
      <div className="trends-section">
        <div className="trends-container">
          <div className="trends-content">
            <h2>Market Trends</h2>
            <p>
              Stay updated with the latest market trends and make informed decisions about your vehicle purchase.
            </p>
            <div className="trends-cards">
              <div className="trend-card">
                <TrendingUp className="trend-icon" />
                <div>
                  <h4>Electric Vehicles on the Rise</h4>
                  <p>30% increase in EV sales this year</p>
                </div>
              </div>
              <div className="trend-card">
                <Car className="trend-icon" />
                <div>
                  <h4>SUV Market Growth</h4>
                  <p>SUVs dominate with 45% market share</p>
                </div>
              </div>
            </div>
          </div>
          <div className="trends-image">
            <img 
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800" 
              alt="Market Trends"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;