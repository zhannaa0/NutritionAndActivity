const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    name: {
        type: String
    },
    calories: {
        type: Number
    },
    serving_size_g: {
        type: Number
    },
    fat_total_g: {
        type: Number
    },
    sodium_mg: {
        type: Number
    },
    cholesterol_mg: {
        type: Number
    },
    carbohydrates_total_g: {
        type: Number
    },
    sugar_g: {
        type: Number
    },

}, 
{ timestamps: true 

});

module.exports = mongoose.model("Nutrition", nutritionSchema);
