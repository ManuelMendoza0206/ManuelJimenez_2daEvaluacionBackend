
const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');


router.get('/actors', actorController.getAllActors);

module.exports = router;