const express = require('express');
const router = express.Router();
const axios = require('axios');
const ApiHistory = require('../models/ApiHistory')

const CatImage =  require('../models/CatImage')

const getCats = async (req, res) => {
    const API_URL = `https://api.thecatapi.com/v1/`;
    const API_KEY = "live_sic9DFUHgMtX3vLlRz28pXy9vmxlOiSIMfHmusWyoXrUYWUEl3vd49MDXZgOZlOp";

    try {
    const url = `${API_URL}images/search?x-api-key=${API_KEY}`;
    const response = await axios.get(url);

    const randomCatImage = response.data[0];

    const savedCatImageURL = new CatImage({
        url: randomCatImage.url
    })

    await savedCatImageURL.save()

    const catsHistory = new ApiHistory({
        direction: '/catgen',
        query: savedCatImageURL
      })
  
    await catsHistory.save()

    const catImageToEjs = await CatImage.findOne().sort({createdAt: -1})
    console.log(catImageToEjs)
    

    res.render("catgen", { catImage: catImageToEjs }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {getCats}
