const Express = require('express')
const router = Express.Router()
const StudentController = require('../controllers/student')
const isAuth = require('../middleware/is-auth')
const isGuest = require('../middleware/guest')

router.get('/student-list', isAuth, StudentController.getStudentList)
router.get('/student-register', isGuest, StudentController.createStudentPage)
router.post('/store-student', isGuest, StudentController.storeStudent)
router.get('/edit-student', isAuth, StudentController.editStudent)
router.post('/update-student', isAuth, StudentController.updateStudent)

module.exports = router