const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.User!=null){
        res.render('index',{'user':req.session.User.Name});
    }
    else{
        res.render('index',{'user':' '});
    }
})

module.exports = router;