
const Entity = require('./model');

exports.getAll = (req,res)=>{
        Entity.find({},(err,entities)=>{
            if(err) {
               return  res.send({'err':err})
            };
            res.send(entities);
        });
}

exports.createOne = (req,res)=>{
    let newEntity = new Entity({
        entityName:req.body.entityName
    });
    newEntity.save((err,obj)=>{
        if(err) {
            return res.send({'err':err})
        };
        res.send(obj);
    })
}

exports.getOne = (req,res)=>{
    let id = req.params.id;
    Entity.findById(id,(err,obj)=>{
        if(err) {
            return res.send({'err':err})
        };
        res.send(obj);
    })
}

exports.deleteOne= (req,res)=>{
    let id = req.params.id;
    Entity.findByIdAndDelete(id,(err)=>{
        if(err) {
            return res.send({'err':err})
        };
        res.send('Deleted')
    })
}