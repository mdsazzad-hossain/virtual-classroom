const Express = require('express')
const router = express.Router()
const HomeController = require('../controllers/home')

//home routes
router.get('/', HomeController)