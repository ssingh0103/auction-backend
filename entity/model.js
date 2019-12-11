const mongoose = require('mongoose');


const entitySchema = new mongoose.Schema({
    entityName: {
        type: String,
        required: [true, 'You need entityName']
    }
})


const Entity = mongoose.model('Entity',entitySchema);
module.exports = Entity;