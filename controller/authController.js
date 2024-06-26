
const jwt = require('../utils/jwt');
const db = require("../connection/dbConnection")

class AuthCntroller {
    register(req, res) {
        const { name, email, password, role } = req.body;
        db.query('SELECT email FROM user WHERE email =?', [email], (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.render('register', {
                    message: "That email is taken"
                })
            }
        })
        db.query('INSERT INTO user SET ?', { name: name, email: email, password: password, role: role }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.render('register', {
                    message: "User registared"
                })
            }
        })
    }

    login(req, res) {
        const { email, password } = req.body;
        db.query('SELECT * FROM user WHERE email =? ', [email], (err, results) => {
            if (err) {
                console.log(err);
                return res.render('register', {
                    message: "An Error occured"
                })
            }
            if (results.length > 0) {
                const { email, id, role, ...user } = results[0];
                if (user.password === password) {
                    const token = jwt.genarateToken({ email, id, role })
                    console.log(token)
                    return res.json({
                        message: "Login successful",
                        token: token
                    });
                } else {
                    res.send("Incorrect password")
                }
            } else {
                res.send("Email not found")
            }
        })
    }

}

module.exports = new AuthCntroller();