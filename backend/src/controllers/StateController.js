

const StateModel = require("../models/StateModel");

// add state

const addState = async(req,res)=>{
    try{
        const savedState=await StateModel.create(req.body);
        res.status(201).json({
            message:"state saved successfully",
            data:savedState
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get state
const getState= async(req,res)=>{
    try{
        const states= await StateModel.find();
        res.status(200).json({
            message:" all states ",
            data:states
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addState,
    getState,
}