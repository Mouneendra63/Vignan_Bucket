const mongoose=require('mongoose');
const { Schema } = mongoose;

const webinarSchema=Schema({
    desc:{
        type:String,
        required:true,
    },
    images:
    {
        type:String,
        required:true
    }
});

const Webinar=mongoose.model('Webinar',webinarSchema);