const mongoose = require('mongoose')

const Schema =  mongoose.Schema


const weatherSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    temperature: {
        type: Number,
    },
    weatherDescription: {
        type: String,
    },
    feelsLike: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    pressure: {
        type: Number,
    },
    windSpeed: {
        type: Number,
    },
    icon: {
        type: String,
    }
    }, 
    { timestamps: true 

});
        
module.exports = mongoose.model("Weather", weatherSchema)