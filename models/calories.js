const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caloriesSchema = new Schema({
    name: {
        type: String
    },
    calories_per_hour: {
        type: Number
    },
    duration_minutes: {
        type: Number
    },
    total_calories: {
        type: Number
    }
}, 
{ timestamps: true 

});

module.exports = mongoose.model("Calories", caloriesSchema);
