const path = require('path')
const bcrypt = require('bcrypt');
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


exports.getData = (req, res, next) => {
    res.render('home', { pageName: 'home' })
}

exports.getTeacherList = (req, res, next) => {
    const listData = Teacher.find()
        .then((r) => {
            res.render('./teacher/list', {
                pageName: 'teacher-list',
                path: '/teacher-list',
                listData: r
            });

        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCreateTeacher = (req, res, next) => {
    res.render('./teacher/create', { pageName: 'create-teacher' })
}

exports.storeData = (req, res, next) => {
    const pass = bcrypt.hashSync('bacon', 8);
    const data = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: pass
    })
    data.save()
        .then((result) => {
            res.status(200);
            res.redirect('/teacher-list');
            return mailer.sendMail({
                to: req.body.email,
                from: 'admin@admin.com',
                subject: 'Teacher Login Link',
                text: 'Hello Teacher,',
                html: '<h4>Here is you login link.<a href="http://localhost:3000/?pageName=teacher-login">Click Here</a></br>Password:</4>' + ' ' + pass
            });
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.updateData = (req, res, next) => {

}

exports.deleteData = (req, res, next) => {

}