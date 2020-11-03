const express = require('express');
const fs = require('fs');
var router = express.Router();

function filter(){
    return function(req,res,next){
        if(req.session.User!=null){
            next();
        }
        else{
            res.redirect('/');
        }
    }
}

router.get('/',filter(),(req,res)=>{
    res.render('additem',{'check':true});
})

function lastIndex(arr){
    if(!arr.length){
        i=1;
    }
    else{
        i = arr.length+1;
    }
    return i;
}

router.post('/',async (req,res)=>{
    let i;
    let data = fs.readFileSync('public/info/Items.json','utf-8');
    let arr = JSON.parse(data);

    await(i = lastIndex(arr));

    let obj = {
        'Id' : i,
        'OwnerID' : req.session.User.Id,
        'ProductName' : req.body.productName,
        'Price' : req.body.Price,
        'Description' : req.body.text
    }
    arr.push(obj);
    fs.writeFileSync('public/info/Items.json',JSON.stringify(arr));

    res.redirect('/');
})
 
module.exports = router;