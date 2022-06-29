const path = require('path');
const Class = require('../models/class');
const bcrypt = require('bcrypt');
const { response } = require('express');

exports.getClassList = (req, res, next) => {
    Class.find()
    .then(response => {
        res.render('./teacher/class/list', {
            pageName: 'class-list', 
            csrfToken: req.csrfToken(), 
            type: req.session.type,
            classList: response,
        });
    })
    .catch(err => {
        res.json(err);
    })
}

exports.createClassPage = (req, res, next) => {
    res.render('./teacher/class/create', { 
        pageName: 'create-class', 
        csrfToken: req.csrfToken(), 
        editMode: false, 
        type: req.session.type,
        message: req.flash('error')
    })
}

exports.storeClass = (req, res, next) => {
    const classData = new Class({
        name: req.body.name,
        description: req.body.description,
        invite_code: 'http://localhost:3001/student-register?invitation-code='+bcrypt.genSaltSync(8),
        userId: req.session.userId,
    });

    classData.save()
    .then(response => {
        req.flash('message', 'Class created successfull!');
        res.status(200)
        res.redirect('/class-list');
    })
}

exports.editClass = (req, res, next) => {
    Class.findOne({_id: req.query.id})
    .populate('userId')
    .exec((err, response) => {
        res.render('./teacher/class/create', { 
            pageName: 'create-class', 
            csrfToken: req.csrfToken(), 
            editMode: true, 
            type: req.session.type,
            errorMessage: req.flash('error'),
            data: response
        })
    });
}

exports.updateClass = (req, res, next) => {
    
}
