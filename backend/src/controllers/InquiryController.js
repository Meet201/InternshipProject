
const InquiryModel = require("../models/InquiryModel");

// add Inquiry

const addInquiry = async(req,res)=>{
    try{
        const savedInquiry=await InquiryModel.create(req.body);
        res.status(201).json({
            message:"Inquiry saved successfully",
            data:savedInquiry
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get Inquiry
const getInquiry= async(req,res)=>{
    try{
        const inquiry= await InquiryModel.find();
        res.status(200).json({
            message:" all Inquiry ",
            data:inquiry
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addInquiry,
    getInquiry,
}