import React, { useState, useEffect } from 'react';
   import { Filter, ChevronDown, Car, Fuel, Settings, DollarSign, Calendar } from 'lucide-react';
   import ViewDetails from './ViewDetails';
   import CompareModel from './CompareModel';
   import ContactSellerModal from "../Components/ContactSellerModal.jsx"; // Add this
   import "../assets/NewCars.css";
   import api from '../utils/api';

   const NewCars = () => {
     const [activeFilter, setActiveFilter] = useState('all');
     const [priceRange, setPriceRange] = useState({ min: '0', max: 'Infinity' });
     const [selectedCar, setSelectedCar] = useState(null);
     const [contactCar, setContactCar] = useState(null); // Add this for contact modal
     const [compareList, setCompareList] = useState([]);
     const [showCompareModal, setShowCompareModal] = useState(false);
     const [cars, setCars] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       const fetchCars = async () => {
         try {
           setLoading(true);
           const response = await api.get('/car/getallcars');
           if (response.data && response.data.data) {
             const newCars = response.data.data.filter(car => car.status === 'new');
             setCars(newCars);
           } else {
             setError('Invalid data format received from the server');
           }
         } catch (err) {
           console.error('Error fetching cars:', err);
           setError('Failed to load cars. Please try again later.');
         } finally {
           setLoading(false);
         }
       };

       fetchCars();
     }, []);

     const toggleCompare = (car) => {
       if (compareList.find(c => c.id === car.id)) {
         setCompareList(compareList.filter(c => c.id !== car.id));
       } else if (compareList.length < 3) {
         setCompareList([...compareList, car]);
       }
     };

     const filteredCars = cars.filter(car => {
       const carPrice = parseFloat(car.price);
       const minPrice = priceRange.min === '' ? 0 : parseFloat(priceRange.min);
       const maxPrice = priceRange.max === 'Infinity' ? Infinity : parseFloat(priceRange.max);
       const withinPriceRange = carPrice >= minPrice && carPrice <= maxPrice;
       const matchesType = activeFilter === 'all' || car.type.toLowerCase() === activeFilter.toLowerCase();
       return withinPriceRange && matchesType;
     });

     const handlePriceChange = (e, bound) => {
       setPriceRange(prev => ({ ...prev, [bound]: e.target.value }));
     };

     if (loading) {
       return <div className="loading-container">Loading cars...</div>;
     }

     if (error) {
       return <div className="error-container">{error}</div>;
     }

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
                 <select 
                   className="price-select"
                   value={priceRange.min}
                   onChange={e => handlePriceChange(e, 'min')}
                 >
                   <option value="0">$0</option>
                   <option value="30000">$30,000</option>
                   <option value="50000">$50,000</option>
                   <option value="70000">$70,000</option>
                 </select>
                 <span>to</span>
                 <select 
                   className="price-select"
                   value={priceRange.max}
                   onChange={e => handlePriceChange(e, 'max')}
                 >
                   <option value="Infinity">$200,000+</option>
                   <option value="150000">$150,000</option>
                   <option value="100000">$100,000</option>
                   <option value="80000">$80,000</option>
                 </select>
               </div>
             </div>
           </div>
         </div>

         {/* Compare Bar */}
         {compareList.length > 0 && (
           <div className="compare-bar">
             <div className="compare-cars">
               {compareList.map(car => (
                 <div key={car.id} className="compare-car-item">
                   <img src={car.image} alt={car.name} />
                   <button onClick={() => toggleCompare(car)} className="remove-compare">×</button>
                 </div>
               ))}
               {Array(3 - compareList.length).fill(null).map((_, i) => (
                 <div key={`empty-${i}`} className="compare-car-item empty">
                   <div className="empty-slot">Add Car</div>
                 </div>
               ))}
             </div>
             <button 
               className="compare-button"
               onClick={() => setShowCompareModal(true)}
               disabled={compareList.length < 2}
             >
               Compare ({compareList.length}/3)
             </button>
           </div>
         )}

         {/* Cars Grid */}
         <div className="cars-grid-container">
           {filteredCars.length === 0 ? (
             <div className="no-cars-found">No cars found matching your criteria</div>
           ) : (
             filteredCars.map(car => (
               <div key={car.id} className="car-card">
                 <div className="car-image">
                   <img src={car.image} alt={car.name} />
                   <div className="car-type">{car.type}</div>
                 </div>
                 
                 <div className="car-content">
                   <h3>{car.name}</h3>
                   <div className="car-price">
                     <DollarSign size={18} />
                     <span>${car.price.toLocaleString()}</span>
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
                       <span>{car.year}</span>
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
                     <button 
                       className="contact-seller"
                       onClick={() => setContactCar(car)} // Add this
                     >
                       Contact Seller
                     </button>
                   </div>
                 </div>
               </div>
             ))
           )}
         </div>

         {/* View Details Modal */}
         {selectedCar && (
           <ViewDetails
             car={selectedCar}
             onClose={() => setSelectedCar(null)}
           />
         )}

         {/* Contact Seller Modal */}
         {contactCar && (
           <ContactSellerModal
             car={contactCar}
             onClose={() => setContactCar(null)}
           />
         )}

         {/* Compare Model */}
         {showCompareModal && (
           <CompareModel 
             cars={compareList}
             onClose={() => setShowCompareModal(false)}
           />
         )}
       </div>
     );
   };

   export default NewCars;