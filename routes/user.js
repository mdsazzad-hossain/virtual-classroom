const Express = require('express')
const router = Express.Router()
const UserController = require('../controllers/user')

//home routes
router.get('/dashboard', UserController.getData)
router.get('/user-list', UserController.getUserList)
router.get('/create-user', UserController.getCreateUser)
router.get('/sign-up', UserController.getRegisterUser)
router.post('/store-user', UserController.storeData)

module.exports = router