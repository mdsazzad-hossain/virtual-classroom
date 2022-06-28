const path = require('path')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');

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

exports.getUserList = (req, res, next) => {
    const listData = User.find()
        .then((r) => {
            res.render('./user/list', {
                pageName: 'user-list',
                path: '/user-list',
                listData: r
            });

        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCreateUser = (req, res, next) => {
    res.render('./user/create', { pageName: 'create-user' })
}

exports.getRegisterUser = (req, res, next) => {
    res.render('./auth/register', { pageName: 'user-login' })
}

exports.storeData = (req, res, next) => {
    const pass = bcrypt.hashSync('bacon', 8);
    const data = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: pass,
        type: 'Admin'
    })
    data.save()
        .then((result) => {
            res.status(200);
            res.redirect('/user-list');
            return mailer.sendMail({
                to: req.body.email,
                from: 'admin@admin.com',
                subject: 'Login Link',
                text: `Hello ${req.body.name},`,
                html: '<h4>Here is you login link.<a href="http://localhost:3000/?pageName=user-login">Click Here</a></br>Password:</4>' + ' ' + pass
            });
        })
        .catch((err) => {
            console.log(err)
        })
}


exports.loginPage = (req, res, next)  => {
    console.log(req.query.title)
    res.render('./auth/login', {pageName: 'user-login', q: req.query.q || ''});
}

exports.updateData = (req, res, next) => {

}

exports.deleteData = (req, res, next) => {

}