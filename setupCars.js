// Update all cars: add status, verified, convert price
db.cars.updateMany(
    {},
    [
      {
        $set: {
          status: "new",
          verified: false,
          price: {
            $cond: {
              if: { $eq: [{ $type: "$price" }, "string"] },
              then: {
                $convert: {
                  input: { $replaceAll: { input: "$price", find: ",", replacement: "" } },
                  to: "double",
                  onError: "$price",
                  onNull: 0
                }
              },
              else: { $toDouble: "$price" }
            }
          }
        }
      }
    ]
  );
  
  // Add year and brand
  db.cars.updateMany(
    { id: { $in: [1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] } },
    [
      {
        $set: {
          year: 2024,
          brand: {
            $switch: {
              branches: [
                { case: { $regexMatch: { input: "$name", regex: "BMW" } }, then: "BMW" },
                { case: { $regexMatch: { input: "$name", regex: "Mercedes" } }, then: "Mercedes-Benz" },
                { case: { $regexMatch: { input: "$name", regex: "Audi" } }, then: "Audi" },
                { case: { $regexMatch: { input: "$name", regex: "Porsche" } }, then: "Porsche" },
                { case: { $regexMatch: { input: "$name", regex: "Tesla" } }, then: "Tesla" },
                { case: { $regexMatch: { input: "$name", regex: "Lexus" } }, then: "Lexus" },
                { case: { $regexMatch: { input: "$name", regex: "Genesis" } }, then: "Genesis" },
                { case: { $regexMatch: { input: "$name", regex: "Rivian" } }, then: "Rivian" },
                { case: { $regexMatch: { input: "$name", regex: "Range Rover" } }, then: "Land Rover" },
                { case: { $regexMatch: { input: "$name", regex: "Volvo" } }, then: "Volvo" },
                { case: { $regexMatch: { input: "$name", regex: "Lucid" } }, then: "Lucid" },
                { case: { $regexMatch: { input: "$name", regex: "Maserati" } }, then: "Maserati" },
                { case: { $regexMatch: { input: "$name", regex: "Polestar" } }, then: "Polestar" },
                { case: { $regexMatch: { input: "$name", regex: "Rolls-Royce" } }, then: "Rolls-Royce" },
                { case: { $regexMatch: { input: "$name", regex: "Bentley" } }, then: "Bentley" },
                { case: { $regexMatch: { input: "$name", regex: "Lamborghini" } }, then: "Lamborghini" },
                { case: { $regexMatch: { input: "$name", regex: "Ferrari" } }, then: "Ferrari" }
              ],
              default: "Unknown"
            }
          }
        }
      }
    ]
  );
  
  // Update specific cars
  db.cars.updateOne({ id: 5 }, { $set: { year: 2015, brand: "Volkswagen" } });
  db.cars.updateOne({ id: 6 }, { $set: { year: 2024, brand: "Land Rover" } });
  db.cars.updateOne({ id: 7 }, { $set: { year: 2024, brand: "Mahindra" } });
  
  // Fix type field for id: 5, 6, 7
  db.cars.updateOne({ id: 5 }, { $set: { type: "Hatchback" } });
  db.cars.updateOne({ id: 6 }, { $set: { type: "SUV" } });
  db.cars.updateOne({ id: 7 }, { $set: { type: "SUV" } });
  
  // Update used cars (id: 25, 26, 27)
  db.cars.updateOne(
    { id: 25 },
    {
      $set: {
        name: "2021 BMW 3 Series",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
        price: 32500,
        type: "Sedan",
        fuel: "Petrol",
        mileage: "25000 km",
        engine: "2.0L 4-cylinder Turbo",
        transmission: "Automatic",
        year: 2021,
        brand: "BMW",
        status: "used",
        verified: true,
        owner: "1st Owner",
        location: "New York, NY",
        kmsDriven: 25000
      }
    }
  );
  
  db.cars.updateOne(
    { id: 26 },
    {
      $set: {
        name: "2020 Mercedes-Benz C-Class",
        image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 35900,
        type: "Sedan",
        fuel: "Diesel",
        mileage: "30500 km",
        engine: "2.0L 4-cylinder",
        transmission: "Automatic",
        year: 2020,
        brand: "Mercedes-Benz",
        status: "used",
        verified: true,
        owner: "2nd Owner",
        location: "Los Angeles, CA",
        kmsDriven: 30500
      }
    }
  );
  
  db.cars.updateOne(
    { id: 27 },
    {
      $set: {
        name: "2022 Audi A4",
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=2000",
        price: 38500,
        type: "Sedan",
        fuel: "Petrol",
        mileage: "15000 km",
        engine: "2.0L 4-cylinder",
        transmission: "Automatic",
        year: 2022,
        brand: "Audi",
        status: "used",
        verified: true,
        owner: "1st Owner",
        location: "Chicago, IL",
        kmsDriven: 15000
      }
    }
  );
  
  // Verify data
  print("New cars count:", db.cars.countDocuments({ status: "new" }));
  print("Used cars count:", db.cars.countDocuments({ status: "used" }));
  print("Total cars:", db.cars.countDocuments());