const express = require('express');
const fs = require('fs');
var router = express.Router();

function filter1(){
    return function(req,res,next){
        if(req.session.User==null){
            next();
        }
        else{res.redirect('/');}
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
            for (let index = 0; index < arr.length; index++) {
                if(arr[index].Email==req.body.Email && arr[index].Password == req.body.Password){
                    req.session.User = arr[index];
                    check = true;
                    res.redirect('/');
                }
            }
        }
        if(!check){
            res.render('login',{'error':'User not found'})
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

router.get('/logout',filter(), async (req,res)=>{
    console.log(req.session.id);
    await req.session.destroy();
    res.redirect('/');
})

module.exports = router;