
const InsuranceModel = require("../models/InsuranceModel");

// add Insurance

const addInsurance = async(req,res)=>{
    try{
        const savedInsurance=await InsuranceModel.create(req.body);
        res.status(201).json({
            message:"Insurance saved successfully",
            data:savedInsurance
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get Insurance
const getInsurance= async(req,res)=>{
    try{
        const insurance= await InsuranceModel.find();
        res.status(200).json({
            message:" all Insurance ",
            data:insurance
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addInsurance,
    getInsurance,
}