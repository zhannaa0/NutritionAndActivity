const express = require('express');
const routerAnimals = express.Router();
const axios = require('axios');
const AnimalData = require('../models/Animal')
const ApiHistory = require('../models/ApiHistory')

const getAnimal = async (req, res) => {
    const animal = req.query.animal; 
    const apiKey = 'L8MCUkhIRuwW8TjTfjzJbG2wcZBOWblxsQKr8gqJ';
    const apiUrl = `https://api.api-ninjas.com/v1/animals?name=${animal}`;
    let animals;
    let error = null;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    animals = response.data[0];

    const animalData = new AnimalData({
    name: animals.name,
    sciname: animals.taxonomy.scientific_name,
    feature: animals.characteristics.most_distinctive_feature ,
    slogan: animals.characteristics.slogan ,
    group: animals.characteristics.group,
    color: animals.characteristics.color,
    lifespan: animals.characteristics.lifespan,
    skin_type:animals.characteristics.skin_type,
    weight: animals.characteristics.weight,
    locations: animals.locations
    })

    await animalData.save()

    const animalHistory = new ApiHistory({
      direction: '/animals',
      query: animalData,
      userId: req.session.user._id,
    })

    await animalHistory.save()

  } catch (error) {
        animals = null;
        error = 'error occured'
  }

  const animalDataToEjs = await AnimalData.findOne().sort({ createdAt: -1 })
  console.log(animalDataToEjs)
  res.render("animals", { animalDataToEjs, error })
  
}

module.exports = {getAnimal}