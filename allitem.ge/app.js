const express = require('express');
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser')
var path = require('path');
var session = require('express-session')
const IndexRouter = require('./routes/index');
const LoginRouter = require('./routes/login');
const RegistRouter = require('./routes/regist');
//const AddItemRouter = require('./routes/addItem');

var app = express();
app.use(cookieParser())
//app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/',IndexRouter);
app.use('/login',LoginRouter);
app.use('/regist',RegistRouter);
//app.use('/additem',AddItemRouter);

app.listen(3000,'localhost');