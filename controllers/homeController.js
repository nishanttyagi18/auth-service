const User = require("../services/dbService");

exports.home = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne(username);
        res.json({
            result: true,
            data: {
                fname: user.fname,
                lname: user.lname,
                password: user.password,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error' });
    }
}


