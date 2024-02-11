const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },

    username: {
        type: String,
        unique: true
    },

    password: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    creationDate: {
        type:Date,
        default: Date.now
    },

    updateDate:{
        type:Date,
        default: Date.now
    },

    deletionDate: {
        type:Date,
        default: Date.now
    }


})


module.exports = mongoose.model("User", userSchema)