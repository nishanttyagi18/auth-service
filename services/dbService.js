const fs = require('fs');
const uuid = require('uuid').v4;

exports.findOne = (username) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db/Users.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const users = JSON.parse(data);
                const user = users.filter(user => user.username === username);
                resolve(user[0]);
            }
        });
    })
}

exports.save = (fname, lname, username, password) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db/users.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const users = JSON.parse(data);
                const uid = uuid();
                const user = { uid, fname, lname, username, password };
                users.push(user);
                fs.writeFile('./db/Users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                })
            }
        })
    })
}
