const path = require('path');
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const { response } = require('express');

exports.getStudentList = (req, res, next) => {
    Student.find()
    .then(response => {
        res.render('./teacher/student/list', {
            pageName: 'student-list', 
            csrfToken: req.csrfToken(), 
            type: req.session.type,
            studentList: response,
        });
    })
    .catch(err => {
        res.json(err);
    })
}

exports.createStudentPage = (req, res, next) => {
    console.log(req.query)
    res.render('./teacher/student/create', { 
        pageName: 'user-login', 
        csrfToken: req.csrfToken(), 
        errorMessage: req.flash('error') 
    })
}

exports.storeStudent = (req, res, next) => {
    const salt = bcrypt.genSaltSync(8);
    const pass = bcrypt.hashSync(req.body.password || '1234', salt);

    const studentData = new Student({
        name: req.body.name,
        student_id: req.body.student_id,
        email: req.body.email,
        password: pass,
        studentId: req.session.studentId,
    });

    studentData.save()
    .then(response => {
        req.flash('message', 'Student added successfull!');
        res.status(200)
        res.redirect('/student-list');
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
