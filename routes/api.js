const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
router.post('/user/create', userController.create);
router.post('/user/delete', userController.delete);
router.get('/user/profile', userController.getProfile);

const eventController = require('./../controllers/eventController');
router.get('/event', eventController.index);

const pumpController = require('./../controllers/pumpController');
router.post('/pump/water', pumpController.water);

const sensorController = require('./../controllers/sensorController');
router.get('/sensor/all', sensorController.readAll);

module.exports = router;