const router = require('express').Router();
const { signup, signin } = require('../controllers/authController');
const { validationRules, validate } = require('../middleware/validation');

router.post('/signup', validationRules(), validate, signup);

router.post('/signin', signin);

module.exports = router;