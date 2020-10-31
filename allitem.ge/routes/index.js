const express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/',(req,res)=>{
    var arr = [];
    fs.createReadStream('public/info/Items.json','utf-8').on('data',(chunk)=>{
        arr = JSON.parse(chunk);
        if(req.session.User!=null){
            res.render('index',{'user':req.session.User.Name,'check':true,arr});
        }
        else{
            res.render('index',{'user':' ','check':false,arr});
        }
    })
});

module.exports = router;