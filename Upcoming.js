const mongoose=require('mongoose');
const {Schema}=mongoose;

const upcomingSchema=Schema({
    desc:{
        type:String,
        required:true
    },
});

const Upcoming=mongoose.model('Upcoming',upcomingSchema);