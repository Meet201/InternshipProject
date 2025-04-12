const CityModel = require("../models/CityModel");

// add city

const addCity = async(req,res)=>{
    try{
        const savedCity=await CityModel.create(req.body);
        res.status(201).json({
            message:"city saved successfully",
            data:savedCity
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get city
const getCity = async(req,res)=>{
    try{
        const cities= await CityModel.find().populate("stateId");
        res.status(200).json({
            message:" all cities ",
            data:cities
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addCity,
    getCity,
}