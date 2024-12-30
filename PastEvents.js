// const mongoose=require('mongoose');
// const {Schema}=mongoose;

// const pastSchema=Schema({
//     desc:{
//         type:String,
//         required:true
//     },
//     images:
//     {
//         type:String,
//         required:true,
//     }
// });

// const Past=mongoose.model('Past',pastSchema);


const mongoose = require('mongoose');

const pastEventsSchema = new mongoose.Schema({
    desc: { type: String, required: true },
    images: { type: String, required: false },
});

const PastEvents = mongoose.model('PastEvents', pastEventsSchema);

module.exports = PastEvents;