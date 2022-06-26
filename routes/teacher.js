const Express = require('express')
const router = Express.Router()
const TeacherController = require('../controllers/teacher')


router.get('/teacher-login', TeacherController.teacherLoginPage)

module.exports = router