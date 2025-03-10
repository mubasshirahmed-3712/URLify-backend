const mongoose= require('mongoose');
const shortID= require('shortid')

const ShorturlSchema= new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    full:{
        type:String,
        required: true,
    },
    short:{
        type:String,
        required: true,
        default:shortID.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    note:{
        type:String,
        default:"Url"
    }
}, {
    timestamps:true
}

)

module.exports= mongoose.model("Shorturl",ShorturlSchema)