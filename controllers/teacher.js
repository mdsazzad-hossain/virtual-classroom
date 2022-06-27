const path = require('path');
const Teacher = require('../models/teacher');


exports.loginPage = (req, res, next)  => {
    console.log(req.query.title)
    res.render('./auth/login', {pageName: 'teacher-login', q: req.query.q || ''});
}

exports.login = (req, res, next)  => {
    req.session.isLoggedIn = true;
    const mathch = Teacher.findOne({password: req.body.password})
        .then((r) => {
            res.status(200);
            res.redirect('/dashboard');
            
        })
        .catch((err) => {
            console.log(err);
        })
}