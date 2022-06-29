const Express = require('express')
const router = Express.Router()
const ClassController = require('../controllers/class')
const isAuth = require('../middleware/is-auth')


router.get('/class-list', isAuth, ClassController.getClassList)
router.get('/create-class', isAuth, ClassController.createClassPage)
router.post('/store-class', isAuth, ClassController.storeClass)
router.get('/edit-class', isAuth, ClassController.editClass)
router.post('/update-class', isAuth, ClassController.updateClass)

module.exports = router