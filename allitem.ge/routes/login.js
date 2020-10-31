const express = require('express');
const fs = require('fs');
var router = express.Router();

function filter1(){
    return function(req,res,next){
        if(req.session.User!=null){
            res.redirect('/');
        }
        else{next();}
    }
}

router.get('/',filter1(),(req,res)=>{
    res.render('login',{'error':'','check':false});
})

router.post('/',(req,res)=>{
    var arr = [];
    var check = false;
    var data = fs.createReadStream('public/info/Users.json','utf8');
    data.on('data',(chunk)=>{
        arr = JSON.parse(chunk);
        if(!arr.length){
            res.render('login',{'error':'User not found'});
        }
        else{
            arr.forEach(element => {
                if(element.Email==req.body.Email && element.Password == req.body.Password){
                    req.session.User = element;
                    check = true;
                    res.redirect('/');
                }
            });
        }
        if(check==false){
            res.render('login',{'error':'User Not Found'});
        }
    })
})


function filter(){
    return function(req,res,next){
        if(req.session!=null){
            next();
        }
        else{res.redirect('/login');}
    }
}

router.get('/logout',filter(),(req,res)=>{
    req.session.User = null;
    res.redirect('/');
})

module.exports = router;