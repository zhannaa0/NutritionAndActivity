const express = require('express');
const router = express.Router();
const {getEn, getRu} = require('../controller/caloriesController')
router.use(express.static('public'));

router.get("/en", getEn);

router.get("/ru", getRu);

module.exports = router;
