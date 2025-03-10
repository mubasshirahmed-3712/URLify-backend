const Shorturl = require('../models/Shorturl');
const User = require('../models/User')
const router=require('express').Router();


//To create new urls
router.post("/", async (req, res)=>{
    const newUrl=await Shorturl(req.body)
    
    try{
        
        const url=await newUrl.save();
        res.redirect(url.full)
    }
    catch(err){
        res.status(500).json("ERROR FOUND : "+err)
    }
})

//to get the urls
router.get("/get/:username", async(req,res)=>{
    try{
        const { q }=req.query;

        const keys = ["note", "short", "full"];

        const user= await User.findOne({username:req.params.username});
        const urls= await Shorturl.find({userId:user._id})
        const search = (urls)=>{
            return urls.filter(
              url=> keys.some(key=>url[key].toLowerCase().includes(q.toLowerCase()))
              );
            }
        res.json(search(urls));
        // res.status(200).json(urls);
    }
    catch(err){
        res.status(500).json("ERROR: "+err)
    } 
})


router.get("/:shorturl", async(req, res)=>{
    const shortUrl=await Shorturl.findOne({short: req.params.shorturl})
    if(shortUrl==null)
    res.status(404)
    shortUrl.clicks++;
    shortUrl.save()
    res.status(200).json(shortUrl.full)
})

//To redirect it to the the website


module.exports=router