const path = require('path')
const Teacher = require('../models/teacher')
exports.getData = (req, res, next)  => {
    res.render('home', {pageName: 'home'})
}

exports.getTeacherList = (req, res, next)  => {
    res.render('./teacher/list', {pageName: 'teacher-list'})
}

exports.getCreateTeacher = (req, res, next)  => {
    res.render('./teacher/create', {pageName: 'create-teacher'})
}

exports.storeData = (req, res, next)  => {
    const data = new Teacher({
        name: req.body.name,
        password: req.body.password,
    })
    data.save()
    .then((result)=>{
        console.log(result);
        req.toastr.success('Successfully logged in.');
        res.redirect('/teacher-list');
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.updateData = (req, res, next)  => {

}

exports.deleteData = (req, res, next)  => {

}