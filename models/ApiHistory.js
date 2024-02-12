const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const apiHistorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

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