const express = require('express');
const routerAnimals = express.Router();
const {getAnimal} =  require('../controller/animalController')

routerAnimals.use(express.static('public'));

routerAnimals.get("/", getAnimal);



module.exports = routerAnimals;
