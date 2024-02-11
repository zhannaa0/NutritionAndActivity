const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const catSchema = new Schema({
    url: {
        type: String,
        required: true
    }
}, 
{ timestamps: true 

});


module.exports = mongoose.model("CatImage", catSchema)