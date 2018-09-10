var express = require('express');
var router = express.Router();
const { getAllPhoto } = require('../controllers/unsplashController');

router.get('/', getAllPhoto)

module.exports = router
