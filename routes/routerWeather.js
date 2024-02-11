const express = require('express');
const {getWeather} = require('../controller/weatherController')
const router = express.Router();

router.use(express.static('public'));

router.get("/", getWeather);

module.exports = router;
