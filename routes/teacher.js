const Express = require('express')
const router = Express.Router()
const TeacherController = require('../controllers/teacher')


router.get('/', TeacherController.loginPage)
router.post('/login', TeacherController.login)

module.exports = router