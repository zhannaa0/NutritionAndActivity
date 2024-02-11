const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const apiHistorySchema = new Schema({

    direction: {
        type: String
    },
    query: {
        type: Object
    }
}, 
{ timestamps: true 

});


module.exports = mongoose.model("apiHistory", apiHistorySchema)