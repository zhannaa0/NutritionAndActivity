const express = require('express');
const routerCat = express.Router();
const {getCats} = require('../controller/catController')


routerCat.get("/", getCats);


module.exports = routerCat;
