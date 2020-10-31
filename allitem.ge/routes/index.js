const express = require('express');
const fs = require('fs');
var router = express.Router();

function filter(){
    return function(req,res,next){
        if(req.session.User!=null){
            res.render('index',{'user':req.session.User.Name,'check':true,arr});
            next();
        }
        else{
            res.render('index',{'user':' ','check':false,arr});
            next();
        }
    }
}

router.get('/',filter(),(req,res)=>{
    var arr = [];// global scope
    let readData = fs.createReadStream('public/info/Items.json','utf8');//local scope
    readData.on('data',function(chunck){
        arr = JSON.parse(chunk);
    })

    readData.close();


},filter());

module.exports = router;