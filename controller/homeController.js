class HomeController {
    viewHome(req, res) {
        res.render('index');
    };
}


module.exports = new HomeController();