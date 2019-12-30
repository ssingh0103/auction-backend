
const BidHistory = require('./model');
const Item = require('../item/model');
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
         bid = await BidHistory.findById(id);
        await BidHistory.findByIdAndDelete(id);

        const b = await  BidHistory.find({itemId:bid.itemId})
        let max =0;
        let lastOne =null;
        let lastName= null
        b.forEach(item=>{
            if(item.highestBid>max){
                max = item.highestBid
                lastOne = item.highestBidderEmail
                lastName =  item.highestBidderName
            }
        })
        

        Item.findOne({ _id: bid.itemId }, function (err, doc){
            doc.highestBid = max;
            doc.highestBidderEmail = lastOne;
            doc.highestBidderName = lastName;
            doc.save();
            res.send('Deleted');

          });
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