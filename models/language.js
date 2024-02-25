const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LanguageSchema = new Schema({
  language: {
    type: String,
    enum: ['ru', 'en'], 
  },
  value: String,
});

module.exports = mongoose.model("Language", LanguageSchema)