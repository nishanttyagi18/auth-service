const { body, validationResult } = require('express-validator');

const validationRules = () => {
    return [
        body('username').notEmpty().withMessage("fields can't be empty"),
        body('username').isLength({ min: 4 }).withMessage('username check failed'),
        body('username').isAlpha().withMessage('username check failed'),
        body('username').isLowercase().withMessage('username check failed'),
        body('password').notEmpty().withMessage("fields can't be empty"),
        body('password').isLength({ min: 5 }).withMessage('password check failed'),
        body('password').isAlphanumeric().withMessage('password check failed'),
        body('password').matches('[A-Z]').withMessage('password check failed'),
        body('password').matches('[0-9]').withMessage('password check failed'),
        body('fname').notEmpty().withMessage("fields can't be empty"),
        body('fname').isLength({ min: 2 }).withMessage('fname or lname check failed'),
        body('fname').isAlpha().withMessage('fname or lname check failed'),
        body('lname').notEmpty().withMessage("fields can't be empty"),
        body('lname').isLength({ min: 2 }).withMessage('fname or lname check failed'),
        body('lname').isAlpha().withMessage('fname or lname check failed')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        result: false,
        error: errors.array()[0].msg,
    })
}

module.exports = {
    validationRules,
    validate,
}