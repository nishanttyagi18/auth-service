const bcrypt = require('bcryptjs');
const User = require('../services/dbService')
const JWT = require('../utils/jwt')

exports.signup = async (req, res, next) => {

    if (!req.body.username || !req.body.password || !req.body.fname || !req.body.lname) {
        return res.status(400).json({
            result: false,
            error: "fields can't be empty"
        });
    }

    try {
        const { fname, lname, username, password } = req.body;
        const old_user = await User.findOne(username);
        if (old_user) {
            return res.status(400).json({
                result: false,
                error: "username already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.save(fname, lname, username, hashPassword);
        res.status(200).json({
            result: true,
            message: 'SignUp success. Please proceed to Signin',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error' });
    }
}


exports.signin = async (req, res, next) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            result: false,
            error: "Please provide username and password"
        });
    }

    try {
        const { username, password } = req.body;
        const user = await User.findOne(username);
        if (!user) {
            return res.status(401).json({
                result: false,
                error: 'Invalid username/password'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const token = await JWT.sign({ uid: user.uid, username: user.username, fname: user.fname });
        res.status(200).json({
            result: true,
            message: 'Signin success',
            jwt: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error' });
    }
}