const axios = require('axios');
const Calories = require('../models/calories');
const ApiHistory = require('../models/ApiHistory');

const getEn = async (req, res) => {
    const query = req.query.query; 
    const apiKey = 'L8MCUkhIRuwW8TjTfjzJbG2wcZBOWblxsQKr8gqJ';
    const apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${query}`;
    let activities;
    let error = null;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        activities = response.data[0];

        const activityData = new Calories({
            name: activities.name,
            calories_per_hour: activities.calories_per_hour,
            duration_minutes: activities.duration_minutes,
            total_calories: activities.total_calories
        });

        await activityData.save();

        const activityHistory = new ApiHistory({
            direction: '/calories/en',
            query: activityData,
            userId: req.session.user._id,
        });

        await activityHistory.save();

    } catch (error) {
        console.error("Error:", error.message);
        activities = null;
        error = 'An error occurred';
    }

    let caloriesDataTEjs = null;
    if (activities) {
        caloriesDataTEjs = await Calories.findOne({ name: activities.name }).sort({ createdAt: -1 });
        console.log(caloriesDataTEjs);
    }

    res.render("caloriesEn", { caloriesDataTEjs, error });
}

getRu = async (req, res) => {
    const query = req.query.query; 
    const apiKey = 'L8MCUkhIRuwW8TjTfjzJbG2wcZBOWblxsQKr8gqJ';
    const apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${query}`;
    let activities;
    let error = null;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        activities = response.data[0];

        const activityData = new Calories({
            name: activities.name,
            calories_per_hour: activities.calories_per_hour,
            duration_minutes: activities.duration_minutes,
            total_calories: activities.total_calories
        });

        await activityData.save();

        const activityHistory = new ApiHistory({
            direction: '/calories/ru',
            query: activityData,
            userId: req.session.user._id,
        });

        await activityHistory.save();

    } catch (error) {
        console.error("Error:", error.message);
        activities = null;
        error = 'An error occurred';
    }

    let caloriesDataTEjs = null;
    if (activities) {
        caloriesDataTEjs = await Calories.findOne({ name: activities.name }).sort({ createdAt: -1 });
        console.log(caloriesDataTEjs);
    }

    res.render("caloriesRu", { caloriesDataTEjs, error });
}

module.exports = {getEn: getEn, getRu: getRu}