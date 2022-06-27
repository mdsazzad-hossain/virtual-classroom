const Express = require('express')
const router = Express.Router()
const HomeController = require('../controllers/home')

//home routes
router.get('/dashboard', HomeController.getData)
router.get('/teacher-list', HomeController.getTeacherList)
router.get('/create-teacher', HomeController.getCreateTeacher)
router.post('/store-teacher', HomeController.storeData)

module.exports = router