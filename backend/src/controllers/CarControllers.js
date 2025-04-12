const CarModel = require("../models/CarModel");

// add car

const addCar= async(req,res)=>{
    try{
        const savedCar=await CarModel.create(req.body);
        res.status(201).json({
            message:"Car saved successfully",
            data:savedCar
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get Car
const getCar= async(req,res)=>{
    try{
        const car= await CarModel.find();
        res.status(200).json({
            message:" all car ",
            data:car
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addCar,
    getCar,
}