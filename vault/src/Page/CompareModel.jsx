import React from 'react';
import { X, Car, Fuel, Settings, Calendar, DollarSign } from 'lucide-react';

const CompareModal = ({ cars, onClose }) => {
  const specs = [
    { label: 'Price', key: 'price', icon: DollarSign },
    { label: 'Type', key: 'type', icon: Car },
    { label: 'Fuel', key: 'fuel', icon: Fuel },
    { label: 'Mileage', key: 'mileage', icon: Calendar },
    { label: 'Engine', key: 'engine', icon: Settings },
    { label: 'Transmission', key: 'transmission', icon: Settings },
    
  ];

  if (!cars || cars.length === 0){
    return(
      <div className="modal-overlay">
        <div className="compare-modal">
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <h2>No cars selected for comparison</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>Compare Vehicles</h2>

        <div className="compare-grid">
          {/* Header Row */}
          <div className="compare-row header">
            <div className="compare-cell label"></div>
            {cars.map(car, index => (
              <div key={car?.id  || index} className="compare-cell">
                <div className="car-image">
                  <img src={car?.image || '/placeholder.jpg'} alt={car?.name || 'Car'} />
                </div>
                <h3>{car?.name || 'Unknown'}</h3>
              </div>
            ))}
          </div>

          {/* Specs Rows */}
          {specs.map(spec => (
            <div key={spec.key} className="compare-row">
              <div className="compare-cell label">
                <spec.icon size={20} />
                <span>{spec.label}</span>
              </div>
              {cars.map(car => (
                <div key={car.id} className="compare-cell">
                  {car[spec.key] ?? 'N/A'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;