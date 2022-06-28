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
        user: '623fbe82aaa3a4',
        pass: '19cf811e86b38a'
    }
});


exports.getData = (req, res, next) => {
    res.render('home', { pageName: 'home', csrfToken: req.csrfToken() })
}

exports.getUserList = (req, res, next) => {
    const listData = User.find()
        .then((r) => {
            res.render('./user/list', {
                pageName: 'user-list',
                path: '/user-list',
                csrfToken: req.csrfToken(), 
                listData: r
            });

        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCreateUser = (req, res, next) => {
    
    res.render('./user/create', { pageName: 'create-user', csrfToken: req.csrfToken(), errorMessage: req.flash('error')})
}

exports.getRegisterUser = (req, res, next) => {
    
    res.render('./auth/register', { 
        pageName: 'user-login', 
        csrfToken: req.csrfToken(), 
        errorMessage: req.flash('error') 
    })
}

exports.storeData = (req, res, next) => {
    const pass = bcrypt.hashSync('bacon', 8);
    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: pass,
        type: req.body.type
    })
    data.save()
        .then((result) => {
            req.flash('error', 'Data store successfull!')
            res.status(200);
            res.redirect('/');
            if (req.session.isLoggedIn && req.body.type === 'Admin') {
                return mailer.sendMail({
                    to: req.body.email,
                    from: 'admin@admin.com',
                    subject: 'Login Link',
                    text: `Hello ${req.body.name},`,
                    html: '<h4>Here is you login link.<a href="http://localhost:3001/?q=user-login">Click Here</a></br>Password:</4>' + ' ' + pass
                });
            }
        })
        .catch((err) => {
            req.flash('error', err.errors['email'])
            console.log(err)
        })
}


exports.loginPage = (req, res, next)  => {
    res.render('./auth/login', {
        pageName: 'user-login', 
        csrfToken: req.csrfToken(), 
        q: req.query.q || '', 
        errorMessage: req.flash('error')
    });
}

exports.login = (req, res, next)  => {
    User.findOne({email: req.body.email, password: req.body.password})
    .then((user) => {
        if (!user) {
            req.flash('error', 'Invalid email and password!')
            return res.redirect('/')
        }
        req.session.isLoggedIn = true;
            console.log(user);
            // req.session.type = match.type;
            // req.flash('error', 'Login successfull!')
            // res.status(200);
            // res.redirect('/dashboard');
            // res.render('home', {
            //     pageName: 'home', 
            //     csrfToken: req.csrfToken()
            // });
            
        })
        .catch((err) => {
            req.flash('error', 'Invalid email and password!')
            console.log(err);
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

exports.updateData = (req, res, next) => {

}

exports.deleteData = (req, res, next) => {

}