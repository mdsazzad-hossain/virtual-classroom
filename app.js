const Path = require('path');
const BodyParser = require('body-parser');
const Express = require('express')
const Mongoose = require('mongoose')
const ErrorController = require('./controllers/error')

const dbUrl = "mongodb://localhost:27017"
const app = Express();

//template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(BodyParser.urlencoded({extended: false}))
app.use(Express.static('public'))
// app.use(path.join(__dirname,'../', 'views', 'index.html'))

//routes
app.use(ErrorController.get404)

//db connection
Mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useUndifiedTopology: true
})
.then((res) => {
    console.log('App listening port 3000.Connection successfull!')
}).catch((err) => {
    console.log(err);
});

app.listen(3000);