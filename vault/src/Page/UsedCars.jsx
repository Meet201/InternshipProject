import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Car, Fuel, Settings, DollarSign, ChevronDown, Heart, X, Star, Shield, ThumbsUp } from 'lucide-react';
import ContactSellerModal from '../Components/ContactSellerModal';
import '../assets/UsedCars.css';
import api from '../utils/api';

const UsedCars = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [contactCar, setContactCar] = useState(null);
    const [usedCars, setUsedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    useEffect(() => {
        const fetchUsedCars = async () => {
            try {
                setLoading(true);
                const response = await api.get('/car/getallcars');
                if (response.data && Array.isArray(response.data.data)) {
                    const usedCarsData = response.data.data.filter(car => car.status === 'used');
                    const processedCars = usedCarsData.map(car => ({
                        ...car,
                        reviews: car.reviews || 0,
                        rating: car.rating || 4.5,
                        features: car.features || ['Air Conditioning', 'Power Steering', 'Power Windows'],
                        specs: car.specs || {
                            engine: car.engine || 'Unknown',
                            power: '255 hp',
                            torque: '295 lb-ft',
                            acceleration: '5.6 seconds (0-60 mph)',
                            topSpeed: '155 mph',
                            fuelEconomy: '26 city / 36 highway'
                        },
                        images: car.images || [car.image || '/placeholder.jpg', car.image || '/placeholder.jpg'],
                        kmsDriven: car.kmsDriven || 0,
                        owner: car.owner || 'Unknown',
                        location: car.location || 'Contact for location'
                    }));
                    setUsedCars(processedCars);
                } else {
                    setError('Invalid data format received from the server');
                }
            } catch (err) {
                console.error('Error fetching used cars:', err);
                setError('Failed to load used cars. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsedCars();
    }, []);

    const filteredCars = usedCars.filter(car => {
        const carPrice = parseFloat(car.price) || 0;
        const minPrice = parseFloat(filters.priceRange.min) || 0;
        const maxPrice = parseFloat(filters.priceRange.max) || Infinity;
        const matchesPrice = carPrice >= minPrice && carPrice <= maxPrice;
        const matchesBrand = filters.brand === 'all' || (car.brand && car.brand.toLowerCase() === filters.brand.toLowerCase());
        const matchesYear = filters.year === 'all' || (car.year && car.year.toString() === filters.year);
        const matchesFuel = filters.fuel === 'all' || (car.fuel && car.fuel.toLowerCase() === filters.fuel.toLowerCase());
        const matchesTransmission = filters.transmission === 'all' || (car.transmission && car.transmission.toLowerCase() === filters.transmission.toLowerCase());
        const matchesBodyType = filters.bodyType === 'all' || (car.type && car.type.toLowerCase() === filters.bodyType.toLowerCase());
        const matchesMileage = filters.mileage === 'all' || (() => {
            const kms = parseFloat(car.kmsDriven) || 0;
            if (filters.milage === '90000+') return kms >= 90000;
            const [min, max] = filters.milage.split('-').map(Number);
            return kms >= min && (max ? kms <= max : true);
        })();
        const matchesOwners = filters.owners === 'all' || (car.owner && car.owner.toLowerCase() === filters.owners.toLowerCase());
        return matchesPrice && matchesBrand && matchesYear && matchesFuel && 
               matchesTransmission && matchesBodyType && matchesMileage && matchesOwners;
    });

    const resetFilters = () => {
        setFilters({
            priceRange: { min: 0, max: 100000 },
            brand: 'all',
            year: 'all',
            fuel: 'all',
            transmission: 'all',
            bodyType: 'all',
            mileage: 'all',
            owners: 'all'
        });
    };

    const ViewDetailsModal = ({ car, onClose }) => (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content bg-white" onClick={e => e.stopPropagation()}>
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
                            ${car.price.toLocaleString()}
                        </div>
                    </div>
                    <div className="car-description">
                        <p>{car.description || `This ${car.year} ${car.brand} ${car.name.replace(`${car.year} ${car.brand}`, '').trim()} is a well-maintained vehicle with excellent performance and features.`}</p>
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
                        <button className="contact-seller" onClick={() => { onClose(); setContactCar(car); }}>
                            Contact Seller
                        </button>
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
                            value={filters.priceRange.min || ''}
                            onChange={e => setFilters({
                                ...filters,
                                priceRange: { ...filters.priceRange, min: e.target.value ? parseInt(e.target.value) : 0 }
                            })}
                        />
                        <span>to</span>
                        <input 
                            type="number" 
                            placeholder="Max Price"
                            value={filters.priceRange.max || ''}
                            onChange={e => setFilters({
                                ...filters,
                                priceRange: { ...filters.priceRange, max: e.target.value ? parseInt(e.target.value) : 100000 }
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
                    <h4>Owners</h4>
                    <select 
                        value={filters.owners}
                        onChange={e => setFilters({ ...filters, owners: e.target.value })}
                    >
                        <option value="all">All Owners</option>
                        <option value="1st owner">1st Owner</option>
                        <option value="2nd owner">2nd Owner</option>
                    </select>
                </div>
                <div className="filters-actions">
                    <button className="reset-filters" onClick={resetFilters}>Reset All</button>
                    <button className="apply-filters" onClick={onClose}>Apply Filters</button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <div className="loading-container">Loading used cars...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    return (
        <div className="used-cars-container">
            <div className="used-cars-header">
                <div className="header-content">
                    <h1>Used Cars</h1>
                    <p>Find certified pre-owned cars with complete peace of mind</p>
                </div>
            </div>
            <div className="filters-section">
                <div className="filters-container">
                    <div className="filter-groups">
                        <div className="filter-group">
                            <label>Budget</label>
                            <select
                                value={filters.priceRange.min === 0 && filters.priceRange.max === 100000 ? 'all' : `${filters.priceRange.min}-${filters.priceRange.max}`}
                                onChange={e => {
                                    const [min, max] = e.target.value === 'all' ? [0, 100000] : e.target.value.split('-').map(Number);
                                    setFilters({ ...filters, priceRange: { min, max } });
                                }}
                            >
                                <option value="all">All Budgets</option>
                                <option value="0-20000">Under $20,000</option>
                                <option value="20000-30000">$20,000 - $30,000</option>
                                <option value="30000-40000">$30,000 - $40,000</option>
                                <option value="40000-100000">$40,000+</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Brand</label>
                            <select
                                value={filters.brand}
                                onChange={e => setFilters({ ...filters, brand: e.target.value })}
                            >
                                <option value="all">All Brands</option>
                                <option value="bmw">BMW</option>
                                <option value="mercedes-benz">Mercedes-Benz</option>
                                <option value="audi">Audi</option>
                                <option value="toyota">Toyota</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Year</label>
                            <select
                                value={filters.year}
                                onChange={e => setFilters({ ...filters, year: e.target.value })}
                            >
                                <option value="all">All Years</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Fuel Type</label>
                            <select
                                value={filters.fuel}
                                onChange={e => setFilters({ ...filters, fuel: e.target.value })}
                            >
                                <option value="all">All Types</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
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
                {filteredCars.length === 0 ? (
                    <div className="no-cars-found">No used cars found matching your criteria</div>
                ) : (
                    filteredCars.map(car => (
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
                                        ${car.price.toLocaleString()}
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
                                        <span>{car.kmsDriven.toLocaleString()} km</span>
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
                                    <button className="contact-seller" onClick={() => setContactCar(car)}>
                                        Contact Seller
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {selectedCar && (
                <ViewDetailsModal
                    car={selectedCar}
                    onClose={() => setSelectedCar(null)}
                />
            )}
            {contactCar && (
                <ContactSellerModal
                    car={contactCar}
                    onClose={() => setContactCar(null)}
                />
            )}
            <AdvancedFilters show={showFilters} onClose={() => setShowFilters(false)} />
        </div>
    );
};

export default UsedCars;