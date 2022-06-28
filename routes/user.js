const Express = require('express')
const router = Express.Router()
const UserController = require('../controllers/user')
const isAuth = require('../middleware/is-auth')
const isGuest = require('../middleware/guest')

//home routes
router.get('/', isGuest, UserController.loginPage)
router.get('/dashboard', isAuth, UserController.getData)
router.get('/user-list', isAuth, UserController.getUserList)
router.get('/create-user', isAuth, UserController.getCreateUser)
router.post('/login', UserController.login)
router.get('/sign-up', UserController.getRegisterUser)
router.post('/logout', UserController.logout)
router.post('/store-user', UserController.storeData)
router.get('/user', UserController.getUserById)

module.exports = router