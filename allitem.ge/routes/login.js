const express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('login',{'error':''});
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
                    res.redirect('/');
                }
                else{
                    res.render('login',{'error':'User not found'});
                }
            });
        }
    })
})

module.exports = router;