const express = require('express');
const routerAnimals = express.Router();
const axios = require('axios');
const Nasa = require('../models/Nasa')
const ApiHistory = require('../models/ApiHistory')

routerAnimals.use(express.static('public'));

const getNasa = async (req, res) => {
    const apiKey = 'BUzlc32hI3sOiPhJYdcCMZ2FSwt68hjjlX6VvP7s'; 
    const date = new Date().toISOString().split('T')[0]; 

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    console.log(apiUrl)
    let nasa;
    let error = null;
    try {
        const response = await axios.get(apiUrl);
        nasa = response.data;

        const nasaData = new Nasa({
            title: nasa.title,
            url: nasa.url,
            description: nasa.explanation,
            date: nasa.date 
        })

        await nasaData.save()

        const nasaHistory = new ApiHistory({
            direction: '/nasa',
            query: nasaData,
            userId: req.session.user._id,
          })
      
        await nasaHistory.save()


    } catch (error) {
        nasa = null;
        error = "Error, Please try again";
    }

    const nasaDataToEjs = await Nasa.findOne().sort({createdAt: -1})

    res.render("nasa", { nasaDataToEjs, error });
}


module.exports = {getNasa}


