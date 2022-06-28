const Path = require('path');
const BodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const toastr = require('express-toastr');
const Express = require('express')
const csrf  = require('csurf')
const flash = require('connect-flash');
const ExpressLayouts = require('express-ejs-layouts')
const Mongoose = require('mongoose')
const UserRoutes = require('./routes/user')
const TeacherRoutes = require('./routes/teacher')
// const ErrorController = require('./controllers/error')

const dbUrl = "mongodb://localhost:27017/virtual_classroom"
const app = Express();
const csrfProtection = csrf();
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions'
  });
  

//template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(flash());
app.use(toastr());
app.use(ExpressLayouts);
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Express.static('public'));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  app.use(csrfProtection);

//routes
// app.use(ErrorController.get404)
app.use(UserRoutes)
app.use(TeacherRoutes)

//db connection
Mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useUndifiedTopology: true
})
    .then((res) => {
        console.log('App listening port 3001.Connection successfull!')
    }).catch((err) => {
        console.log(err);
    });

app.listen(3001);