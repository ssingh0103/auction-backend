const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description:{
        type: String,
    },
    identifier:{
        type:String
    },
    startingBid :{
        type: Number
    },
    incrementBid : {
        type: Number,
        min: 1
    },
    highestBid : {
        type: Number,
        default: null
    },
    highestBidderEmail : {
        type: String,
        default: null
    },
    highestBidderName: {
        type: String,
        default: null
    }
})


const Item = mongoose.model('Item',itemSchema);
module.exports = Item;