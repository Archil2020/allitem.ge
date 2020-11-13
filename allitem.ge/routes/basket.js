var router = require('express').Router();
var fs = require('fs');
const { json } = require('body-parser');

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

router.get('/',filter(),async (req,res)=>{
    var Product_ID_Arr = [];
    let Bask_data = fs.readFileSync('public/info/basket.json','utf8');
    let BasketArr = JSON.parse(Bask_data);
    for(let i = 0;i<BasketArr.length;i++){
        if(BasketArr[i].UserId === req.session.User.Id){
            Product_ID_Arr.push(BasketArr[i].ProductId);
        }
    }
    let Bask_ProdArr = [];
    let Prod_data = fs.readFileSync('public/info/Items.json','utf8');
    let Prod_Arr = JSON.parse(Prod_data);
    for (let i = 0; i < Prod_Arr.length; i++) {
        for (let k = 0; k < Product_ID_Arr.length; k++) {
            if(Prod_Arr[i].Id==Product_ID_Arr[k]){
                Bask_ProdArr.push(Prod_Arr[i]);
            }
        }
    }
    res.render('basket',{'arr':Bask_ProdArr});
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