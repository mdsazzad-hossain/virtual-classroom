const Express = require('express')
const router = Express.Router()
const HomeController = require('../controllers/home')

//home routes
router.get('/', HomeController.getData)

module.exports = router