const db = require('../connection/dbConnection')
class RoleController {
    assignRole(req, res, next) {
        const { user_id } = req.user.id
        const { type } = req.user.role
        const { rights } = req.body;
        db.query('INSERT INTO roles ?', { type: type, rights: rights, user_id: user_id }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    message: "role assigned"
                })
            }
        })
        next()
    }
}
module.exports = new RoleController()