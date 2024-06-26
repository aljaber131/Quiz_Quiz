const express = require('express');
const jwt = require('../utils/jwt')
const roleController = require('../controller/roleController')
const authController = require('../controller/authController');
const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res))
router.get('/authenticated', (req, res, next) => jwt.verifyToken(req, res, next), (req, res, next) => verifyRole(req, res, next), (req, res, next) => roleController.assignRole(req, res, next),
    (req, res) => {
        res.json({ message: 'This is a protected route', user: req.user });
    })
module.exports = router; 