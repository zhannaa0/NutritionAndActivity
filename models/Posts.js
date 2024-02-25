const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Post = new Schema({
    image1: String,
    image2: String,
    image3: String,
    title_eng: String,
    title_ru: String,
    desc_eng: String,
    desc_ru: String,
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

}, 
{ timestamps: true 

})

module.exports = mongoose.model("Post", Post)