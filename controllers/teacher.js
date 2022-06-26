const path = require('path')
// const Teacher = require('../models/teacher');


exports.teacherLoginPage = (req, res, next)  => {
    res.render('./auth/login', {pageName: 'teacher-login'});
}