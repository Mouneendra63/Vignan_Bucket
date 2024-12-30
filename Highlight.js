const mongoose=require('mongoose');

const { Schema } = mongoose;

const highlights = new Schema({
    images:{
        type:String,
        required:true,
    }
});

const highlightsModel=mongoose.model("Highlights",highlights);
