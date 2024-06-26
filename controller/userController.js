class UserController {
    viewUserRegistrationPage(req, res) {
        res.render('register');
    }
    viewUserLoginPage(req, res) {
        res.render('login');
    }
}


module.exports = new UserController();