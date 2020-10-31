const router = require('express').Router();
const fs = require('fs');

function filter(){
    return function(req,res,next){
        if(req.session.User!=null){
            res.redirect('/');
        }
        else{next();}
    }
}

router.get('/',filter(),(req,res)=>{
    res.render('regist',{'check':false});
})

router.post('/',(req,res)=>{
    var arr = [];
    var i=0;
    var readstream = fs.createReadStream('public/info/Users.json','utf8');
    readstream.on('data',(chunk)=>{
        arr = JSON.parse(chunk);
        if(!arr.length){
            i=1;
        }
        else{
            i = arr.length +1;
        }
        var obj = {
            'Id':i,
            'Name':req.body.Name,
            'Email':req.body.Email,
            'Password':req.body.Password
        }
        arr.push(obj);
        fs.createWriteStream('public/info/Users.json','utf8').write(JSON.stringify(arr));
    })
    res.redirect('/login');
})

module.exports = router;