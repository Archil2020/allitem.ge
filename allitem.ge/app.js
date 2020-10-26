const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')

const IndexRouter = require('./routes/index');
const LoginRouter = require('./routes/login');
const RegistRouter = require('./routes/regist');

var app = express();
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {  }
  }))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.use(express.static("public"));

app.use('/',IndexRouter);
app.use('/login',LoginRouter);
app.use('/regist',RegistRouter);

app.listen(3000,'localhost');