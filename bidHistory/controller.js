
const BidHistory = require('./model');

exports.createItemHistory= async (body)=>{
    try{
        let bidHistory = new BidHistory({
            itemId:body.itemId,
            highestBid: body.highestBid,
            highestBidderEmail: body.highestBidderEmail,
            highestBidderName: body.highestBidderName
        });
        let obj = await bidHistory.save();
        res.send(obj)
    }catch(e){
        res.send({'err':e});
    }
   
}

exports.getAll = async (req,res)=>{
    try{
        let bidHistories = await BidHistory.find();
        res.send(bidHistories);
    }catch(e){
        res.send({'err':e});
    }
}

exports.createOne = async (req,res)=>{
    try{
        let newBidHistory = new BidHistory({
            itemId:req.body.itemId,
            highestBid: req.body.highestBid,
            highestBidderEmail: req.body.highestBidderEmail,
            highestBidderName: req.body.highestBidderName
        });
        let obj = await newBidHistory.save();
        res.send(obj)
    }catch(e){
        res.send({'err':e});
    }
}

exports.getOne = async (req,res)=>{
    try{
        let id = req.params.id;
        let bidHistory = await BidHistory.findById(id);
        res.send(bidHistory)
    }catch(e){
        res.send(e);
    }
}

exports.deleteOne= async (req,res)=>{
    try{
        let id = req.params.id;
        await BidHistory.findByIdAndDelete(id);
        res.send('Deleted');
    }catch(e){
        res.send({'err':e})
    }
}


exports.updateOne =async (req,res)=>{
    try{
        let id = req.params.id;
       const up = await BidHistory.findByIdAndUpdate(id,req.body,{new: true});
       res.send(up);
    }catch(e){
        res.send({'err':e})
    }
}