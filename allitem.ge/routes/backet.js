var router = require('express').Router();

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

module.exports = router;