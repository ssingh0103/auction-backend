
const Item = require('./model');
const BidHistory = require('../bidHistory/model');

var nodemailer = require('nodemailer');

exports.getAll = async (req,res)=>{
    try{
        let items = await Item.find();
        res.send(items);
    }catch(e){
        res.send({'err':e});
    }
}

exports.createOne = async (req,res)=>{
    try{
        let newItem = new Item({
            title:req.body.title,
            description: req.body.description,
            identifier: req.body.identifier,
            startingBid: req.body.startingBid,
            incrementBid: req.body.incrementBid,
            highestBid: req.body.highestBid,
            highestBidderEmail: req.body.highestBidderEmail,
            highestBidderName: req.body.highestBidderName,
            images: req.body.images
        });
        let obj = await newItem.save();
        res.send(obj)
    }catch(e){
        res.send("err",e);
    }   
    
}

exports.getOne = async (req,res)=>{
    try{
        let id = req.params.id;
        let item =await Item.findById(id);
        let bidHistory = await BidHistory.find({itemId:id});
        let obj = item.toObject();
        obj.history= bidHistory;
        res.send(obj)
    }catch(e){
        res.send(e);
    }
}

exports.deleteOne= async (req,res)=>{
    try{
        let id = req.params.id;
        await Item.findByIdAndDelete(id);
        await BidHistory.find({itemId:id}).remove
        res.send('Deleted');
    }catch(e){
        res.send({'err':e})
    }
}

exports.updateOne =async (req,res)=>{
    try{
        let id = req.params.id;
       const up = await Item.findByIdAndUpdate(id,req.body,{new: true});
       res.send(up);
    }catch(e){
        res.send({'err':e})
    }
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: 'xactlyauction@gmail.com',
        pass: '39fkYf31QQV6'
    }
})

  
exports.updateHighBid = async (req,res)=>{
    try{
        let id = req.params.id;
        let newBidHistory = new BidHistory({
            highestBid: req.body.highestBid,
            highestBidderEmail: req.body.highestBidderEmail,
            highestBidderName: req.body.highestBidderName,
            itemId: id
            });
        const up = await Item.findByIdAndUpdate(id,req.body,{new: true});
        const b = await  BidHistory.find({itemId:id})
        let max =0;
        let lastOne =null;
        b.forEach(item=>{
            if(item.highestBid>max){
                max = item.highestBid
                lastOne = item.highestBidderEmail
            }
        })
        let msg =`You have been outbidded for item with title: ${req.body.title} and identifier: ${req.body.identifier}`;
        var mailOptions = {
            from: 'xactlyauction@gmail.com',
            to: lastOne,
            subject: 'You have been outbidded in xactly auctio',
            text: msg
          };
        let obj = await newBidHistory.save();

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.send(obj);

    }catch(e){
        res.send({'err':e});
    }
}
