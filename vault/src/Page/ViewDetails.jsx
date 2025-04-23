import React from 'react';
import { X, Car, Fuel, Settings, Calendar } from 'lucide-react';
import '../assets/ViewDetails.css'; 

const ViewDetails = ({ car, onClose }) => {
  return (
    <div className="view-details-overlay">
      <div className="view-details-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="car-details-content">
          <div className="car-gallery">
            <img src={car.image} alt={car.name} className="main-image" />
          </div>

          <div className="car-header">
            <h2>{car.name}</h2>
            <div className="price-section">
              <div className="price-tag">${car.price}</div>
            </div>
          </div>

          <div className="specifications">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <Car size={20} />
                <div>
                  <h4>Type</h4>
                  <p>{car.type}</p>
                </div>
              </div>
              <div className="spec-item">
                <Fuel size={20} />
                <div>
                  <h4>Fuel Type</h4>
                  <p>{car.fuel}</p>
                </div>
              </div>
              <div className="spec-item">
                <Settings size={20} />
                <div>
                  <h4>Engine</h4>
                  <p>{car.engine}</p>
                </div>
              </div>
              <div className="spec-item">
                <Calendar size={20} />
                <div>
                  <h4>Year</h4>
                  <p>2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="additional-info">
            <h3>Additional Information</h3>
            <ul>
              <li>
                <strong>Transmission:</strong> {car.transmission}
              </li>
              <li>
                <strong>Mileage:</strong> {car.mileage}
              </li>
            </ul>
          </div>

          <div className="action-buttons">
            <button className="contact-dealer">Contact Dealer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;