import React, { useEffect, useState } from "react";
import "../assets/Compare.css";
import "../assets/Navbar.css";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { Bar, Pie, PolarArea } from "react-chartjs-2";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Compare = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [trims, setTrims] = useState([]);
  const [carspecs, setCarSpecs] = useState([]);

  // variables
  const [ShowDataA, setShowDataA] = useState(false);
  const [ShowDataB, setShowDataB] = useState(false);
  const [disableAddButtonA, setDisableAddButtonA] = useState(false);
  const [disableAddButtonB, setDisableAddButtonB] = useState(false);
  const [CarMakeA, setCarMakeA] = useState("");
  const [CarMakeB, setCarMakeB] = useState("");
  const [maxSpeedA, setMaxSpeedA] = useState(0);
  const [maxSpeedB, setMaxSpeedB] = useState(0);

  // engine
  const [CapacityA, setCapacityA] = useState(0);
  const [CylinderLayoutA, setCylinderLayoutA] = useState(0);
  const [EmissionStandardsA, setEmissionStandardsA] = useState(0);
  const [EngineHpA, setEngineHpA] = useState(0);
  const [EngineHpRpmA, setEngineHpRpmA] = useState(0);
  const [EngineTypeA, setEngineTypeA] = useState(0);
  const [InjectionTypeA, setInjectionTypeA] = useState(0);
  const [MaximumTorqueA, setMaximumTorqueA] = useState(0);
  const [RangeA, setRangeA] = useState(0);
  const [NumberOfCylindersA, setNumberOfCylindersA] = useState(0);
  const [CapacityB, setCapacityB] = useState(0);
  const [CylinderLayoutB, setCylinderLayoutB] = useState(0);
  const [EmissionStandardsB, setEmissionStandardsB] = useState(0);
  const [EngineHpB, setEngineHpB] = useState(0);
  const [EngineHpRpmB, setEngineHpRpmB] = useState(0);
  const [EngineTypeB, setEngineTypeB] = useState(0);
  const [InjectionTypeB, setInjectionTypeB] = useState(0);
  const [MaximumTorqueB, setMaximumTorqueB] = useState(0);
  const [RangeB, setRangeB] = useState(0);
  const [NumberOfCylindersB, setNumberOfCylindersB] = useState(0);

  // Body and Dimensions
  const [bodyTypeA, setbodyTypeA] = useState(0);
  const [lengthA, setlengthA] = useState(0);
  const [widthA, setwidthA] = useState(0);
  const [heightA, setheightA] = useState(0);
  const [wheelbaseA, setwheelbaseA] = useState(0);
  const [curbWeightA, setcurbWeightA] = useState(0);
  const [fullWeightA, setfullWeightA] = useState(0);
  const [numberOfGearsA, setnumberOfGearsA] = useState(0);
  const [valvesPerCylinderA, setvalvesPerCylinderA] = useState(0);
  const [bodyTypeB, setbodyTypeB] = useState(0);
  const [lengthB, setlengthB] = useState(0);
  const [widthB, setwidthB] = useState(0);
  const [heightB, setheightB] = useState(0);
  const [wheelbaseB, setwheelbaseB] = useState(0);
  const [curbWeightB, setcurbWeightB] = useState(0);
  const [fullWeightB, setfullWeightB] = useState(0);
  const [numberOfGearsB, setnumberOfGearsB] = useState(0);
  const [valvesPerCylinderB, setvalvesPerCylinderB] = useState(0);

  // graph1 - fuel economy
  const [CityFuelA, setCityFuelA] = useState(0);
  const [HighwayFuelA, setHighwayFuelA] = useState(0);
  const [MixedFuelA, setMixedFuelA] = useState(0);
  const [CityFuelB, setCityFuelB] = useState(0);
  const [HighwayFuelB, setHighwayFuelB] = useState(0);
  const [MixedFuelB, setMixedFuelB] = useState(0);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_HOST = import.meta.env.VITE_API_HOST;
  const BASE_URL = "https://car-specs.p.rapidapi.com/v2/cars";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/makes`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      })
      .then((response) => {
        setMakes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching makes:", error);
      });
  }, []);

  const fetchModels = async (makeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/makes/${makeId}/models`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const fetchGenerations = async (modelId) => {
    try {
      const response = await axios.get(`${BASE_URL}/models/${modelId}/generations`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      setGenerations(response.data);
    } catch (error) {
      console.error("Error fetching generations:", error);
    }
  };

  const fetchTrims = async (generationId) => {
    try {
      const response = await axios.get(`${BASE_URL}/generations/${generationId}/trims`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      setTrims(response.data);
    } catch (error) {
      console.error("Error fetching trims:", error);
    }
  };

  const fetchCarSpecs = async (trimId) => {
    try {
      const response = await axios.get(`${BASE_URL}/trims/${trimId}`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      setCarSpecs(response.data);
      console.log("Car Specs:", response.data);
    } catch (error) {
      console.error("Error fetching car specs:", error);
    }
  };

  const handleMakeChange = (e) => {
    const makeId = e.target.value;
    fetchModels(makeId);
  };

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    fetchGenerations(modelId);
  };

  const handleGenerationsChange = (e) => {
    const generationsId = e.target.value;
    fetchTrims(generationsId);
  };

  const handleTrimsChange = (e) => {
    const trimsId = e.target.value;
    fetchCarSpecs(trimsId);
  };

  const handleShowDataA = () => {
    setShowDataA(true);
    setDisableAddButtonA(true);
    setCarMakeA(carspecs.make + ' ' + carspecs.model + ' ' + carspecs.trim);
    setCapacityA(carspecs.capacityCm3);
    setCylinderLayoutA(carspecs.cylinderLayout);
    setEmissionStandardsA(carspecs.emissionStandards);
    setEngineHpA(carspecs.engineHp);
    setEngineHpRpmA(carspecs.engineHpRpm);
    setEngineTypeA(carspecs.engineType);
    setInjectionTypeA(carspecs.injectionType);
    setMaximumTorqueA(carspecs.maximumTorqueNM);
    setNumberOfCylindersA(carspecs.numberOfCylinders);
    setRangeA(carspecs.rangeKm);
    setbodyTypeA(carspecs.bodyType);
    setlengthA(carspecs.lengthMm);
    setwidthA(carspecs.widthMm);
    setheightA(carspecs.heightMm);
    setwheelbaseA(carspecs.wheelbaseMm);
    setcurbWeightA(carspecs.curbWeightKg);
    setfullWeightA(carspecs.fullWeightKg);
    setMaxSpeedA(carspecs.maxSpeedKmPerH);
    setvalvesPerCylinderA(carspecs.valvesPerCylinder);
    setnumberOfGearsA(carspecs.numberOfGears);
    setCityFuelA(parseFloat(carspecs.cityFuelPer100KmL?.replace(",", ".")));
    setHighwayFuelA(parseFloat(carspecs.highwayFuelPer100KmL?.replace(",", ".")));
    setMixedFuelA(parseFloat(carspecs.mixedFuelConsumptionPer100KmL?.replace(",", ".")));
  };

  const handleShowDataB = () => {
    setShowDataB(true);
    setDisableAddButtonB(true);
    setCarMakeB(carspecs.make + ' ' + carspecs.model + ' ' + carspecs.trim);
    setCapacityB(carspecs.capacityCm3);
    setCylinderLayoutB(carspecs.cylinderLayout);
    setEmissionStandardsB(carspecs.emissionStandards);
    setEngineHpB(carspecs.engineHp);
    setEngineHpRpmB(carspecs.engineHpRpm);
    setEngineTypeB(carspecs.engineType);
    setInjectionTypeB(carspecs.injectionType);
    setMaximumTorqueB(carspecs.maximumTorqueNM);
    setNumberOfCylindersB(carspecs.numberOfCylinders);
    setRangeB(carspecs.rangeKm);
    setbodyTypeB(carspecs.bodyType);
    setlengthB(carspecs.lengthMm);
    setwidthB(carspecs.widthMm);
    setheightB(carspecs.heightMm);
    setwheelbaseB(carspecs.wheelbaseMm);
    setcurbWeightB(carspecs.curbWeightKg);
    setfullWeightB(carspecs.fullWeightKg);
    setMaxSpeedB(carspecs.maxSpeedKmPerH);
    setvalvesPerCylinderB(carspecs.valvesPerCylinder);
    setnumberOfGearsB(carspecs.numberOfGears);
    setCityFuelB(parseFloat(carspecs.cityFuelPer100KmL?.replace(",", ".")));
    setHighwayFuelB(parseFloat(carspecs.highwayFuelPer100KmL?.replace(",", ".")));
    setMixedFuelB(parseFloat(carspecs.mixedFuelConsumptionPer100KmL?.replace(",", ".")));
  };

  const handleRemoveDataA = () => {
    setShowDataA(false);
    setDisableAddButtonA(false);
    setCarMakeA("");
    setMaxSpeedA(0);
    setCityFuelA(0);
    setHighwayFuelA(0);
    setMixedFuelA(0);
  };

  const handleRemoveDataB = () => {
    setShowDataB(false);
    setDisableAddButtonB(false);
    setCarMakeB("");
    setMaxSpeedB(0);
    setCityFuelB(0);
    setHighwayFuelB(0);
    setMixedFuelB(0);
  };

  const FuelA = {
    labels: ['City', 'Highway', 'Mixed'],
    datasets: [{
      data: [parseFloat(CityFuelA), parseFloat(HighwayFuelA), parseFloat(MixedFuelA)],
      label: ['Fuel consumption'],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  const FuelB = {
    labels: ['City', 'Highway', 'Mixed'],
    datasets: [{
      data: [parseFloat(CityFuelB), parseFloat(HighwayFuelB), parseFloat(MixedFuelB)],
      label: ['Fuel consumption'],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  const DimensionsA = {
    labels: ['Length', 'Width', 'Height'],
    datasets: [{
      data: [parseFloat(lengthA), parseFloat(widthA), parseFloat(heightA)],
      label: ['Dimensions'],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  const DimensionsB = {
    labels: ['Length', 'Width', 'Height'],
    datasets: [{
      data: [parseFloat(lengthB), parseFloat(widthB), parseFloat(heightB)],
      label: ['Dimensions'],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  const EngineA = {
    labels: ['No. of Cylinders', 'No. of Gears', 'Valves Per Cylinder'],
    datasets: [{
      data: [parseFloat(NumberOfCylindersA), parseFloat(numberOfGearsA), parseFloat(valvesPerCylinderA)],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  const EngineB = {
    labels: ['No. of Cylinders', 'No. of Gears', 'Valves Per Cylinder'],
    datasets: [{
      data: [parseFloat(NumberOfCylindersB), parseFloat(numberOfGearsB), parseFloat(valvesPerCylinderB)],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }],
  };

  return (
    <div className="compare-container">
      {/* <nav className="navbar">
        <div className="left-section">
          <a href="/" className="logo">CarCompare</a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/Compare">Compare</a></li>
            <li><a href="/Timeline">Timeline</a></li>
          </ul>
        </div>
        <div className="auth-buttons">
          <a href="/favorites" className="favorites-link">
            <span className="heart-icon">♥</span>
          </a>
          <a href="/login" className="nav-button login">Login</a>
        </div>
      </nav> */}

      <div className="compare-header">
        <div>
          <h1 className="compare-heading">Compare Cars</h1>
          <p className="compare-description">
            Select and compare two cars to see their specifications side by side.
          </p>
        </div>
      </div>

      <div className="compare-searchbox">
        <form className="row g-4">
          <div className="col-md-3">
            <label htmlFor="make" className="compare-form-label">Make:</label>
            <select name="make" id="make" className="compare-form-control" onChange={handleMakeChange}>
              <option value="">--Select Make--</option>
              {makes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="model" className="compare-form-label">Model:</label>
            <select name="model" id="model" className="compare-form-control" onChange={handleModelChange}>
              <option value="">--Select Model--</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="generation" className="compare-form-label">Generation:</label>
            <select name="generation" id="generation" className="compare-form-control" onChange={handleGenerationsChange}>
              <option value="">--Select Generation--</option>
              {generations.map((generation) => (
                <option key={generation.id} value={generation.id}>
                  {generation.yearFrom + " to " + generation.yearTo}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="trim" className="compare-form-label">Trim:</label>
            <select name="trim" id="trim" className="compare-form-control" onChange={handleTrimsChange}>
              <option value="">--Select Trim--</option>
              {trims.map((trim) => (
                <option key={trim.id} value={trim.id}>
                  {trim.trim}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="compare-section">
        <div className="row">
          <div className="col-md-6">
            <div className="compare-comparebox">
              <h3>{CarMakeA || "Car A"}</h3>
              {ShowDataA ? (
                <div className="compare-specs">
                  <button className="compare-removebutton" onClick={handleRemoveDataA}>Remove</button>
                  <h3>Engine Specifications</h3>
                  <hr />
                  <p>Capacity: <strong>{CapacityA} Cm3</strong></p>
                  <p>Cylinder Layout: <strong>{CylinderLayoutA}</strong></p>
                  <p>Emission Standards: <strong>{EmissionStandardsA}</strong></p>
                  <p>Engine HP: <strong>{EngineHpA} Hp</strong></p>
                  <p>Engine HP RPM: <strong>{EngineHpRpmA} Rpm</strong></p>
                  <p>Engine Type: <strong>{EngineTypeA}</strong></p>
                  <p>Injection Type: <strong>{InjectionTypeA}</strong></p>
                  <p>Maximum Torque: <strong>{MaximumTorqueA} NM</strong></p>
                  <p>Number of Cylinders: <strong>{NumberOfCylindersA}</strong></p>
                  <hr />
                  <h3>Body Specifications</h3>
                  <hr />
                  <p>Body Type: <strong>{bodyTypeA}</strong></p>
                  <p>Length: <strong>{lengthA} mm</strong></p>
                  <p>Width: <strong>{widthA} mm</strong></p>
                  <p>Height: <strong>{heightA} mm</strong></p>
                  <p>Wheelbase: <strong>{wheelbaseA} mm</strong></p>
                  <p>Curb Weight: <strong>{curbWeightA} Kg</strong></p>
                  <p>Full Weight: <strong>{fullWeightA} Kg</strong></p>
                  <hr />
                  <div className="compare-chart-container">
                    {CityFuelA && HighwayFuelA && MixedFuelA ? (
                      <Bar data={FuelA} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <hr />
                  <div className="compare-chart-container">
                    {lengthA && widthA && heightA ? (
                      <Pie data={DimensionsA} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <hr />
                  <div className="compare-chart-container">
                    {NumberOfCylindersA && numberOfGearsA && valvesPerCylinderA ? (
                      <PolarArea data={EngineA} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <p>Click "Add Car" to show data on your selected car.</p>
                  <button className="compare-comparebutton" onClick={handleShowDataA} disabled={disableAddButtonA}>Add Car</button>
                </>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="compare-comparebox">
              <h3>{CarMakeB || "Car B"}</h3>
              {ShowDataB ? (
                <div className="compare-specs">
                  <button className="compare-removebutton" onClick={handleRemoveDataB}>Remove</button>
                  <h3>Engine Specifications</h3>
                  <hr />
                  <p>Capacity: <strong>{CapacityB} Cm3</strong></p>
                  <p>Cylinder Layout: <strong>{CylinderLayoutB}</strong></p>
                  <p>Emission Standards: <strong>{EmissionStandardsB}</strong></p>
                  <p>Engine HP: <strong>{EngineHpB} Hp</strong></p>
                  <p>Engine HP RPM: <strong>{EngineHpRpmB} Rpm</strong></p>
                  <p>Engine Type: <strong>{EngineTypeB}</strong></p>
                  <p>Injection Type: <strong>{InjectionTypeB}</strong></p>
                  <p>Maximum Torque: <strong>{MaximumTorqueB} NM</strong></p>
                  <p>Number of Cylinders: <strong>{NumberOfCylindersB}</strong></p>
                  <hr />
                  <h3>Body Specifications</h3>
                  <hr />
                  <p>Body Type: <strong>{bodyTypeB}</strong></p>
                  <p>Length: <strong>{lengthB} mm</strong></p>
                  <p>Width: <strong>{widthB} mm</strong></p>
                  <p>Height: <strong>{heightB} mm</strong></p>
                  <p>Wheelbase: <strong>{wheelbaseB} mm</strong></p>
                  <p>Curb Weight: <strong>{curbWeightB} Kg</strong></p>
                  <p>Full Weight: <strong>{fullWeightB} Kg</strong></p>
                  <hr />
                  <div className="compare-chart-container">
                    {CityFuelB && HighwayFuelB && MixedFuelB ? (
                      <Bar data={FuelB} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <hr />
                  <div className="compare-chart-container">
                    {lengthB && widthB && heightB ? (
                      <Pie data={DimensionsB} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <hr />
                  <div className="compare-chart-container">
                    {NumberOfCylindersB && numberOfGearsB && valvesPerCylinderB ? (
                      <PolarArea data={EngineB} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <p>Click "Add Car" to show data on your selected car.</p>
                  <button className="compare-comparebutton" onClick={handleShowDataB} disabled={disableAddButtonB}>Add Car</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;