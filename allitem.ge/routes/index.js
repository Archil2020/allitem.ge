const express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/',async (req,res)=>{
    let data = fs.readFileSync('public/info/Items.json','utf-8');
    let array = await JSON.parse(data);
    if(req.session.User==null){
        res.render('index',{'user':' ','check':false,'arr':array});
    }
    else{
        res.render('index',{'user':req.session.User.Name,'check':true,'arr':array});
    }
});

module.exports = router;