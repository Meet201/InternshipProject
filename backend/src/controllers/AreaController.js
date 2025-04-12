const AreaModel = require("../models/AreaModel");

// add area

const addArea = async(req,res)=>{
    try{
        const savedArea=await AreaModel.create(req.body);
        res.status(201).json({
            message:"area saved successfully",
            data:savedArea
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get area
const getArea = async(req,res)=>{
    try{
        const areas= await AreaModel.find().populate("cityId").populate("stateId");
        res.status(200).json({
            message:" all areas ",
            data:areas
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addArea,
    getArea,
}