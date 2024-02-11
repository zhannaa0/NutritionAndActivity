const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: {
        type: String
    },
    sciname: {
        type: String
    },
    feature: {
        type: String
    },
    slogan: {
        type: String
    },
    group: {
        type: String
    },
    color: {
        type: String
    },
    lifespan: {
        type: String
    },

    skin_type:{
        type: String
    },
    weight: {
        type: String
    },

    locations:{
        type: [String]
    }
}, 
{ timestamps: true 

});

module.exports = mongoose.model("Animals", animalSchema);
