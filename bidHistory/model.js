const mongoose = require('mongoose');


const bidHistorySchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    highestBid : {
        type: Number,
        required: true
    },
    highestBidderEmail : {
        type: String,
        required: true
    },
    highestBidderName: {
        type: String,
        required: true
    }
})


const BidHistory = mongoose.model('BidHistory',bidHistorySchema);
module.exports = BidHistory;