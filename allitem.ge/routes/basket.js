var router = require('express').Router();
var fs = require('fs');

function filter(){
    return function(req,res,next){
        if(req.session.User!=null){
            next();
        }
        else{
            res.redirect('/login');
        }
    }
}

router.get('/',filter(),(req,res)=>{
    res.render('basket');
})

function filter1(){
    return function(req,res,next){
        if(req.session.User!=null){
            next();
        }
        else{
            res.json("Please, log in");
        }
    }
}

function lastIndex(arr){
    let i;
    if(!arr.length){
        i=1;
    }
    else{
        i = arr.length+1;
    }
    return i;
}

router.post('/AddToCart',filter1(),async (req,res)=>{
    let i;
    let arr = JSON.parse(fs.readFileSync('public/info/basket.json','utf-8'));
    i = await lastIndex(arr); 
    arr.push({
        'Id' : i,
        'UserId' : req.session.User.Id,
        'ProductId' : req.body.id
    });
    fs.writeFileSync('public/info/basket.json',JSON.stringify(arr));
    return res.json("Hello");
})

module.exports = router;