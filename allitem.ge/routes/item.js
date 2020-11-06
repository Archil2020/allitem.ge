var router = require('express').Router();
var fs = require('fs');
const e = require('express');

function check(){
    return function(req,res,next){
        if(req.session.User!=null){
            return true;
        }
        else{
            return false;
        }
    }
}

router.get('/:id',async (req,res)=>{
    let id = req.params.id;
    let check_result = await check();
    let arr = JSON.parse(fs.readFileSync('public/info/Items.json','utf-8'));
    arr.forEach(element => {
        if(element.Id == id){
            return res.render('Full',{'obj':element,'check':check_result});
        }    
    });
})

module.exports = router;