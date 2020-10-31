const express = require('express');
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
var path = require('path');

const IndexRouter = require('./routes/index');
const LoginRouter = require('./routes/login');
const RegistRouter = require('./routes/regist');
const AddItemRouter = require('./routes/addItem');

var app = express();
app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: ['cat'],

  // Cookie Options
  //maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/',IndexRouter);
app.use('/login',LoginRouter);
app.use('/regist',RegistRouter);
app.use('/additem',AddItemRouter);

app.listen(3000,'localhost');