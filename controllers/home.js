const path = require('path')
const Teacher = require('../models/teacher')
exports.getData = (req, res, next)  => {
    res.render('home', {pageName: 'home'})
}

exports.getTeacherList = (req, res, next)  => {
    const listData = Teacher.find()
    .then((r)=>{
        res.render('./teacher/list', {
            pageName: 'teacher-list',
            path: '/teacher-list',
            listData: r
        });

    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.getCreateTeacher = (req, res, next)  => {
    res.render('./teacher/create', {pageName: 'create-teacher'})
}

exports.storeData = (req, res, next)  => {
    const data = new Teacher({
        name: req.body.name,
        email: req.body.email,
    })
    data.save()
    .then((result)=>{
        res.status(200);
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