import React, { useState } from 'react';
import { Filter, ChevronDown, Car, Fuel, Settings, DollarSign, Calendar } from 'lucide-react';
import ViewDetails from './ViewDetails';
import CompareModel from './CompareModel';
import "../assets/NewCars.css";

const NewCars = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);
  const [CompareList, setCompareList] = useState([]);
  const [showCompareModel, setShowCompareModel] = useState(false);

  const toggleCompare = (car) => {
    if (CompareList.find(c => c.id === car.id)){
      setCompareList(CompareList.filter(c => c.id !== car.id));
    }else if (CompareList.length < 3) {
      setCompareList([...CompareList,car]);
    }
  };

  const cars = [
    {
      id: 1,
      name: "2024 BMW X5",
      image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "62,900",
      type: "SUV",
      fuel: "Hybrid",
      mileage: "24/31",
      engine: "3.0L 6-cylinder",
      transmission: "8-speed automatic"
    },
    {
      id: 2,
      name: "2024 Mercedes-Benz C-Class",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
      price: "56,500",
      type: "Sedan",
      fuel: "Gasoline",
      mileage: "23/33",
      engine: "2.0L 4-cylinder",
      transmission: "9-speed automatic"
    },
    {
      id: 3,
      name: "2024 Audi e-tron GT",
      image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1000",
      price: "106,500",
      type: "Electric",
      fuel: "Electric",
      mileage: "238 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 4,
      name: "2024 Porsche Taycan",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "92,900",
      type: "Electric",
      fuel: "Electric",
      mileage: "242 mile range",
      engine: "Dual Motor",
      transmission: "2-speed"
    },
    {
      id: 5,
      name:"Volkswagen Polo 2015",
      image: "https://images.unsplash.com/photo-1556155304-28f97c2c4c62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "5,49,000",
      type:  "Petrol",
      fuel:  "Petrol",
      mileage: "164 mile range",
      engine: "Dual Motor",
      transmission: "Manual & Automatic"
    },
    {
      id: 6,
      name:"Defender",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSed2Yiu0DlzbF1hH9W894QVctS3WEBg6A9hQ&s",
      price: "6,49,000",
      type:  "Diesel",
      fuel:  "Diesel",
      mileage: "164 mile range",
      engine: "Dual Motor",
      transmission: "Manual & Automatic"
    },
    {
      id: 7,
      name:"Mahindra BE 6",
      image: "data:image/jpeg;base64,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",
      price:"18,90,000",
      type: "Electric",
      fuel: "Electric",
      mileage:"683 mile range",
      engine:"Electric",
      transmission:"Automatic"
    },
     // New cars added below
     {
      id: 8,
      name: "2024 Tesla Model S",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "89,990",
      type: "Electric",
      fuel: "Electric",
      mileage: "405 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 9,
      name: "2024 Lexus RX",
      image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "70,000",
      type: "SUV",
      fuel: "Hybrid",
      mileage: "31/28",
      engine: "2.5L 4-cylinder",
      transmission: "CVT"
    },
    {
      id: 10,
      name: "2024 Genesis G80",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "55,000",
      type: "Sedan",
      fuel: "Gasoline",
      mileage: "23/32",
      engine: "2.5L 4-cylinder",
      transmission: "8-speed automatic"
    },
    {
      id: 11,
      name: "2024 Rivian R1S",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "78,000",
      type: "Electric",
      fuel: "Electric",
      mileage: "316 mile range",
      engine: "Quad Motor",
      transmission: "Single-speed"
    },
    {
      id: 12,
      name: "2024 Range Rover Sport",
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "83,000",
      type: "SUV",
      fuel: "Hybrid",
      mileage: "19/26",
      engine: "3.0L 6-cylinder",
      transmission: "8-speed automatic"
    },
    {
      id: 13,
      name: "2024 Volvo XC90",
      image: "https://images.unsplash.com/photo-1619551734325-81aaf323686c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "57,000",
      type: "SUV",
      fuel: "Hybrid",
      mileage: "27/28",
      engine: "2.0L 4-cylinder",
      transmission: "8-speed automatic"
    },
    {
      id: 14,
      name: "2024 Lucid Air",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "87,400",
      type: "Electric",
      fuel: "Electric",
      mileage: "516 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 15,
      name: "2024 Maserati Ghibli",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "79,000",
      type: "Sedan",
      fuel: "Gasoline",
      mileage: "18/25",
      engine: "3.0L V6",
      transmission: "8-speed automatic"
    },
    {
      id: 16,
      name: "2024 Polestar 2",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "49,800",
      type: "Electric",
      fuel: "Electric",
      mileage: "270 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 17,
      name: "2024 Audi RS e-tron GT",
      image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1000",
      price: "145,900",
      type: "Electric",
      fuel: "Electric",
      mileage: "232 mile range",
      engine: "Dual Motor",
      transmission: "2-speed"
    },
    {
      id: 18,
      name: "2024 BMW i7",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "119,300",
      type: "Electric",
      fuel: "Electric",
      mileage: "318 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 19,
      name: "2024 Mercedes-AMG GT 63",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
      price: "142,600",
      type: "Sedan",
      fuel: "Gasoline",
      mileage: "16/21",
      engine: "4.0L V8",
      transmission: "9-speed automatic"
    },
    {
      id: 20,
      name: "2024 Porsche Panamera",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "92,400",
      type: "Sedan",
      fuel: "Hybrid",
      mileage: "22/29",
      engine: "2.9L V6",
      transmission: "8-speed automatic"
    },
    {
      id: 21,
      name: "2024 Rolls-Royce Spectre",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "413,000",
      type: "Electric",
      fuel: "Electric",
      mileage: "260 mile range",
      engine: "Dual Motor",
      transmission: "Single-speed"
    },
    {
      id: 22,
      name: "2024 Bentley Flying Spur",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "215,000",
      type: "Sedan",
      fuel: "Hybrid",
      mileage: "19/25",
      engine: "4.0L V8",
      transmission: "8-speed automatic"
    },
    {
      id: 23,
      name: "2024 Lamborghini Revuelto",
      image: "https://images.unsplash.com/photo-1632245889029-e406faaa34bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "608,000",
      type: "Supercar",
      fuel: "Hybrid",
      mileage: "11/14",
      engine: "6.5L V12 Hybrid",
      transmission: "8-speed dual-clutch"
    },
    {
      id: 24,
      name: "2024 Ferrari SF90 Stradale",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: "524,815",
      type: "Supercar",
      fuel: "Hybrid",
      mileage: "16/19",
      engine: "4.0L V8 Hybrid",
      transmission: "8-speed dual-clutch"
    }
  ];

   const filteredCars = activeFilter === 'all'
   ? cars
   :cars.filter(car => car.type.toLowerCase() === activeFilter);

  return (
    <div className="new-cars-container">
      {/* Header Section */}
      <div className="new-cars-header">
        <div className="header-content">
          <h1>New Cars</h1>
          <p>Explore our latest collection of brand new vehicles</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="filters-header">
            <Filter size={20} />
            <span>Filters</span>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'suv' ? 'active' : ''}`}
              onClick={() => setActiveFilter('suv')}
            >
              SUV
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'sedan' ? 'active' : ''}`}
              onClick={() => setActiveFilter('sedan')}
            >
              Sedan
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'electric' ? 'active' : ''}`}
              onClick={() => setActiveFilter('electric')}
            >
              Electric
            </button>
          </div>

          <div className="price-range">
            <label>Price Range</label>
            <div className="range-inputs">
              <select className="price-select">
                <option>$0</option>
                <option>$30,000</option>
                <option>$50,000</option>
                <option>$70,000</option>
              </select>
              <span>to</span>
              <select className="price-select">
                <option>$200,000+</option>
                <option>$150,000</option>
                <option>$100,000</option>
                <option>$80,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Bar */}
      {CompareList.length > 0 && (
        <div className="compare-bar">
          <div className="compare-cars">
            {CompareList.map(car => (
              <div key={car.id} className="compare-car-item">
                <img src={car.image} alt={car.name} />
                <button onClick={() => toggleCompare(car)} className="remove-compare">×</button>
              </div>
            ))}
            {Array(3 - CompareList.length).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="compare-car-item empty">
                <div className="empty-slot">Add Car</div>
              </div>
            ))}
          </div>
          <button 
            className="compare-button"
            onClick={() => setShowCompareModal(true)}
            disabled={CompareList.length < 2}
          >
            <Scale size={20} />
            Compare ({CompareList.length}/3)
          </button>
        </div>
      )}

      {/* Cars Grid */}
      <div className="cars-grid-container">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              <img src={car.image} alt={car.name} />
              <div className="car-type">{car.type}</div>
            </div>
            
            <div className="car-content">
              <h3>{car.name}</h3>
              <div className="car-price">
                <DollarSign size={18} />
                <span>{car.price}</span>
              </div>
              
              <div className="car-specs">
                <div className="spec-item">
                  <Fuel size={16} />
                  <span>{car.fuel}</span>
                </div>
                <div className="spec-item">
                  <Settings size={16} />
                  <span>{car.engine}</span>
                </div>
                <div className="spec-item">
                  <Calendar size={16} />
                  <span>2024</span>
                </div>
              </div>

              <div className="car-footer">
                <button 
                  className="view-details"
                  onClick={() => setSelectedCar(car)}
                >
                  View Details
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {selectedCar && (
        <ViewDetails
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}

      {/*Compare Model */}
      {showCompareModel && (
        <CompareModel 
           cars={compareList}
           onClose={() => setShowCompareModel(false)}
        />
      )}
    </div>
  );
}

export default NewCars;