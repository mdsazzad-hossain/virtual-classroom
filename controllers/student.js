const path = require('path');
const Student = require('../models/student');
const User = require('../models/user');
const Class = require('../models/class');
const bcrypt = require('bcrypt');
const { response } = require('express');

exports.getStudentList = (req, res, next) => {
    User.find({type: 'user'})
    .populated('classId')
    .exec(function (err, story){
        console.log(story);
        res.render('./teacher/student/list', {
            pageName: 'student-list', 
            csrfToken: req.csrfToken(), 
            type: req.session.type,
            studentList: story,
        });
    });
    // .then(response => {
    //     res.render('./teacher/student/list', {
    //         pageName: 'student-list', 
    //         csrfToken: req.csrfToken(), 
    //         type: req.session.type,
    //         studentList: response,
    //     });
    // })
    // .catch(err => {
    //     res.json(err);
    // })
}

exports.createStudentPage = async (req, res, next) => {
    await Class.findOne({invite_code: req.query.invitation}).then((data) => {
        if (data) {
            req.session.classId = data._id;
            res.render('./teacher/student/create', { 
                pageName: 'user-login', 
                csrfToken: req.csrfToken(), 
                errorMessage: req.flash('error') 
            })
        } else {
            res.render('404',{pageName: 'user-login'});
        }
    });
}

exports.storeStudent = (req, res, next) => {
    const salt = bcrypt.genSaltSync(8);
    const pass = bcrypt.hashSync(req.body.password, salt);
    const userData = new User({
        name: req.body.name,
        student_id: req.body.student_id,
        email: req.body.email,
        password: pass,
        classId: req.session.classId,
    });

    userData.save()
    .then(response => {
        req.flash('message', 'Student added successfull!');
        res.status(200)
        res.redirect('/');
    })
}

exports.editStudent = (req, res, next) => {
    // Class.findOne({_id: req.query.id})
    // .populate('classId')
    // .exec((err, response) => {
    //     res.render('./teacher/student/create', { 
    //         pageName: 'create-class', 
    //         csrfToken: req.csrfToken(), 
    //         editMode: true, 
    //         type: req.session.type,
    //         errorMessage: req.flash('error'),
    //         data: response
    //     })
    // });
}

exports.updateStudent = (req, res, next) => {
    
}
