const ReviewModel = require("../models/ReviewModel");

// add Review

const addReview = async(req,res)=>{
    try{
        const savedReview=await ReviewModel.create(req.body);
        res.status(201).json({
            message:"Review saved successfully",
            data:savedReview
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get Review
const getReview= async(req,res)=>{
    try{
        const review= await ReviewModel.find();
        res.status(200).json({
            message:" all Review ",
            data:review
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addReview,
    getReview,
}