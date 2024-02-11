const express = require('express');
const routerNasa = express.Router();
const {getNasa} = require('../controller/nasaController')

const ApiHistory = require('../models/ApiHistory')

routerNasa.use(express.static('public'));

routerNasa.get("/", getNasa );

module.exports = routerNasa;