const express = require('express');
const router = express.Router();
const axios = require('axios');

const WeatherData = require('../models/Weather')
const ApiHistory = require('../models/ApiHistory')


const getWeather = async (req, res) => {
    const city = req.query.city
    console.log(city)
    const apiKey = "d178007c8e6d1a3bcd4d9b05c533326d"
    const unit = 'metric'
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    console.log(APIUrl)
    let weather;
    let error = null;
    try {
        const response = await axios.get(APIUrl);
        weather = response.data;

        const weatherData = new WeatherData({
            city: city,
            country: weather.sys.country,
            temperature: weather.main.temp,
            weatherDescription: weather.weather[0].description,
            feelsLike: weather.main.feels_like,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            windSpeed: weather.wind.speed,
            icon: weather.weather[0].icon

        })

        await weatherData.save()

        const weatherHistory = new ApiHistory({
            direction: '/weather',
            query: weatherData
          })
      
        await weatherHistory.save()

        
    } catch (error) {
        weather = null;
        error = "Error, Please try again";
    }


    const WeatherDataToEjs = await WeatherData.findOne({city: city}).sort({ createdAt: -1 })

    res.render("weather", { WeatherDataToEjs, error })}

module.exports = {getWeather: getWeather}
