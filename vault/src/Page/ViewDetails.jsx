import React from 'react';
import { X, Car, Fuel, Settings, Calendar } from 'lucide-react';

const ViewDetails = ({ car, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={car.image} alt={car.name} />
          </div>

          <div className="modal-details">
            <h2>{car.name}</h2>
            <div className="price-tag">${car.price}</div>

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

            <button className="contact-button">
              Contact Dealer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;