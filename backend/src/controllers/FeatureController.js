const FeatureModel = require("../models/FeaturesModel");

// add Feature

const addFeature = async(req,res)=>{
    try{
        const savedFeature=await FeatureModel.create(req.body);
        res.status(201).json({
            message:"Feature saved successfully",
            data:savedFeature
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get Feature
const getFeature= async(req,res)=>{
    try{
        const features= await FeatureModel.find();
        res.status(200).json({
            message:" all Features ",
            data:features
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addFeature,
    getFeature,
}