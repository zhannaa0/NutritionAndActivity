const axios = require('axios');
const Nutrition = require('../models/Nutrition')
const ApiHistory = require('../models/ApiHistory')

const getEn = async (req, res) => {
    const query = req.query.nutrition; 
    const apiKey = 'L8MCUkhIRuwW8TjTfjzJbG2wcZBOWblxsQKr8gqJ';
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
    let nutrition;
    let error = null;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    nutrition = response.data[0];

    const nutritionData = new Nutrition({
        name: nutrition.name,
        calories: nutrition.calories,
        serving_size_g: nutrition.serving_size_g,
        fat_total_g: nutrition.fat_total_g,
        sodium_mg: nutrition.sodium_mg,
        cholesterol_mg: nutrition.cholesterol_mg,
        carbohydrates_total_g: nutrition.carbohydrates_total_g,
        sugar_g: nutrition.sugar_g
    })


    await nutritionData.save()
    console.log(activityData)

    const activityHistory = new ApiHistory({
      direction: '/nutrition/en',
      query: nutritionData,
      userId: req.session.user._id,
    })

    await activityHistory.save()

  } catch (error) {
        nutrition = null;
        error = 'error occured'
  }


  const nutritionDataTEjs = await Nutrition.findOne({ name: query }).sort({ createdAt: -1 });

  console.log(nutritionDataTEjs)
  res.render("nutritionEn", { nutritionDataTEjs, error })
}

const getRu = async (req, res) => {
    const query = req.query.nutrition; 
    const apiKey = 'L8MCUkhIRuwW8TjTfjzJbG2wcZBOWblxsQKr8gqJ';
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
    let nutrition;
    let error = null;
  
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
  
    nutrition = response.data[0];
  
    const nutritionData = new Nutrition({
        name: nutrition.name,
        calories: nutrition.calories,
        serving_size_g: nutrition.serving_size_g,
        fat_total_g: nutrition.fat_total_g,
        sodium_mg: nutrition.sodium_mg,
        cholesterol_mg: nutrition.cholesterol_mg,
        carbohydrates_total_g: nutrition.carbohydrates_total_g,
        sugar_g: nutrition.sugar_g
    })
  
  
    await nutritionData.save()
    console.log(activityData)
  
    const activityHistory = new ApiHistory({
      direction: '/nutrition/ru',
      query: nutritionData,
      userId: req.session.user._id,
    })
  
    await activityHistory.save()
  
  } catch (error) {
        nutrition = null;
        error = 'error occured'
  }
  
  
  const nutritionDataTEjs = await Nutrition.findOne({ name: query }).sort({ createdAt: -1 });
  
  console.log(nutritionDataTEjs)
  res.render("nutritionRu", { nutritionDataTEjs, error })
}

module.exports = {getEn: getEn, getRu: getRu}