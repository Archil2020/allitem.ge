const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var path = require('path');
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var errorhandler = require('errorhandler')

const IndexRouter = require('./routes/index');
const LoginRouter = require('./routes/login');
const RegistRouter = require('./routes/regist');
const AddItemRouter = require('./routes/addItem');
const Concret_Item = require('./routes/item');
const basket = require('./routes/basket');

var app = express();
app.use(cookieParser())
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: new FileStore({
      path : './sessions',
      reapInterval: 10,
    }),
    cookie: {expires:1000*3600}
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/',IndexRouter);
app.use('/login',LoginRouter);
app.use('/regist',RegistRouter);
app.use('/additem',AddItemRouter);
app.use('/item',Concret_Item);
app.use('/basket',basket);

app.all('*',function(req, res){
  res.status(404);
  res.render('error');
});
app.listen(80,'localhost');