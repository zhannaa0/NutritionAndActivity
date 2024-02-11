const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const nasaSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    title:{
        type: String
    }
}, 
{ timestamps: true 

});


module.exports = mongoose.model("nasa", nasaSchema)