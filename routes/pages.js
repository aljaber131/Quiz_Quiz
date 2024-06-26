const express = require('express');
const homeController = require('../controller/homeController');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/', (req, res) => homeController.viewHome(req, res))

router.get('/register', (req, res) => userController.viewUserRegistrationPage(req, res));

router.get('/login', (req, res) => userController.viewUserLoginPage(req, res));

module.exports = router; 