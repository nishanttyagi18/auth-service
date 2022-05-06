const router = require('express').Router();
const { home } = require('../controllers/homeController');
const verifyToken = require('../middleware/auth');

router.get('/me', verifyToken, home);

module.exports = router;