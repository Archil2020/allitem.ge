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

router.post('/',(req,res)=>{
    var arr = [];
    var i;
    var obj = null;
    var readStream = fs.createReadStream('public/info/Items.json','utf-8');
    readStream.on('data',(chunk)=>{
        arr = JSON.parse(chunk);
        if(!arr.length){
            i = 1;
        }
        else{
            i = arr.length+1;
        }
        obj = {
            'Id' : i,
            'OwnerID' : req.session.User.Id,
            'ProductName' : req.body.productName,
            'Price' : req.body.Price,
            'Description' : req.body.text
        }
        arr.push(obj);
        fs.createWriteStream('public/info/Items.json','utf-8').write(JSON.stringify(arr));
    })
    res.redirect('/');
})
 
module.exports = router;