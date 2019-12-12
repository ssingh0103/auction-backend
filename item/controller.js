
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
            highestBidderName: req.body.highestBidderName
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

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'margarette.dickens@ethereal.email',
        pass: 'JrCVsEy6p1GnMRaEXf'
    }
});

  
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
      
        var mailOptions = {
            from: 'agavaqif@gmail.com',
            to: lastOne,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
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