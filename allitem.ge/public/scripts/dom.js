var pass = document.getElementById('pass');
var checkbox = document.getElementById('check');

checkbox.addEventListener("click",()=>{
    if(checkbox.checked == true){
        pass.setAttribute('type','text');
    }
    else{
        pass.setAttribute('type','password');
    }
})