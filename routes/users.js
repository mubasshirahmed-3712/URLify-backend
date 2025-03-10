const User=require('../models/User');
const router=require('express').Router();
const bcrypt=require('bcrypt');

//get a user
router.get("/:id",async(req,res)=>{

    try{
        const user= await User.findById(req.params.id);
        const {password,updatedAt,...other}=user._doc
         res.status(200).json(user)
        console.log("I AM WORKINGGG")
    }
    catch(err){
        res.status(500).json("ERROR : "+err);
    }

})

module.exports=router