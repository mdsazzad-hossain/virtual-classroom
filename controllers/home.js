const path = require('path')
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const Teacher = require('../models/teacher');

const mailer = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: '44adf618471565', 
            pass: 'a503801092cc14'
        }
    });


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
        return mailer.sendMail({
            to: req.body.email,
            from: 'smtp.mailtrap.io',
            subject: 'Hello',
            text: 'Hello world?',
            html: '<b>Hello world?</b>'
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.updateData = (req, res, next)  => {

}

exports.deleteData = (req, res, next)  => {

}