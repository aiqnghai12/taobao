  // let timerscecond = 10.00
    // setInterval(()=>{
    //     timerscecond -= 0.01
    //     $(".timersetout").html((timerscecond).toFixed(2))
    // },10)

 

//  数组合并去重
// var arr1 = [1,2,34,5,6,-1,32,4]
// var arr2 = [1,24,5,6,12,-1,4]
//  console.log(new Set([...arr1,...arr2]))


//    ./ 
const url = "http://10.31.162.16/";
const eMail = document.querySelector(".eMail");
const yanzhneg = document.querySelector(".yanzhneg");
const subeMail = document.querySelector(".subeMail");
const zhuce = document.querySelector(".zhuce");
const $registration_information = $(".registration_information li");
let cookie = new Cookiefn();
var timer ;
let bool = true;
var sp =  null;
 //  放入的滑动的父元素   父元素  图片路径数组
 let imgs =   new  $.$ImageA({$fat : $("#Image_authen"),
  imgs : ['../src/img/fengjiahua1.jpg','../src/img/fengjiahua2.jpg','../src/img/fengjiahua3.jpg'],
 //  color:"green",
 //  min_width:0.1,
 //  min_height:0.1,
  success:function(data){
     message_send(data);
  },
  error:function(error){
      console.log(error);
  }
 }).closeAndopen();

 init();
 registration(0);
function init(){
    // 邮箱输入 事件
eMail.onblur = e=>{
  if((/^\w{5,}\@[a-zA-Z0-9]{2,}\.(com|net|org)(\.cn)?$/).test(e.target.value)){
     eMail.style.border = "1px solid green";
     yanzhneg.innerHTML = "√";
     yanzhneg.style.color = "green";
     imgs.closeAndopen(1);
     eMail.bool = true;
  }else{
     imgs.closeAndopen();
     eMail.style.border = "1px solid red";
     yanzhneg.style.color = "red";
     yanzhneg.innerHTML = "X请输入正确的邮箱";
     eMail.bool = false;
  }
 }
}


!function(window){
       const email = document.querySelector(".email");
       const url = "http://10.31.162.16/";
       const password = document.querySelectorAll(".password");
       const submit = document.querySelector("#account_information .submit");
       const passwordTwoSpan = document.querySelector(".passwordTwoSpan");
       const passwordOneSpan = document.querySelector(".passwordOneSpan");

       function init(){
         email.innerHTML =sp;
         password[0].oninput = e=>{
            let passwordvalue = password[0].value;
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let regnumber =  /[a-z]+/;
            let regW = /[\W\_]+/; 
            let $count = 0;//  技术
            if(regnum.test(passwordvalue) ){ $count ++ ;}
            if(regupper.test(passwordvalue) ){  $count ++ ;}
            if(regnumber.test(passwordvalue) ){ $count ++ ;}
            if(regW.test(passwordvalue)){$count ++ ;}
           if ((/^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\W\_]{8,16}$/).test(password[0].value)){
             passwordOneSpan.innerHTML = " √ 字母开头 含有数字 8-16位 ";
             passwordOneSpan.style.color = "green";
             passwordOneSpan.bool = true;
             console.log(12);
             console.log($count);
             switch($count){
                case 3: passwordOneSpan.innerHTML +="中";  passwordOneSpan.style.color = "orange";
                break;
                case 4: passwordOneSpan.innerHTML +="强";
                break;
            }
           }else{
             passwordOneSpan.innerHTML = "× 字母开头 含有数字 8-16位 ";
             passwordOneSpan.style.color = "red";
             passwordOneSpan.bool = false;
             switch($count){
                case 1: passwordOneSpan.innerHTML +="弱"; 
                break;
                case 2: passwordOneSpan.innerHTML +="中"; 
                break;
            }
           }
           

         }

          password[1].oninput = e=>{
              if(password[1].value==password[0].value){
                 passwordTwoSpan.innerHTML = "√";
                 passwordTwoSpan.bool = true;
                 passwordTwoSpan.style.color = "green";
              }else{
                 passwordTwoSpan.innerHTML = "×";
                 passwordTwoSpan.bool = false;
                 passwordTwoSpan.style.color = "red";
              }
          }
                 submit.onclick = e=>{
                     if(passwordOneSpan.bool && passwordTwoSpan.bool){
                        $.ajax({
                            type:"post",
                            url:url+"php/newPassword.php",
                            data:{
                                email:sp,
                                password:hex_sha1(password[1].value)
                            },success:function(data){
                                if(data=="成功")
                                {
                                 registration(2);
                                 $("#account_information").css("display","none")
                                 $("#usersuccess").css("display","block");
                                     let timerscecond = 10.00
                                     let timer = setInterval(()=>{
                                         timerscecond -= 0.01
                                         if(timerscecond<=0){
                                         clearInterval(timer);
                                         window.location.href = "./denglu.html";
                                         }
                                         
                                         $(".timersetout").html((timerscecond).toFixed(2));
                                     },10)
                                }
                               else{
                                   alert(data);
                               }
                            }
                        })
                     }
                 }
       }
       window.passwordyanzheng = init;
     }(window)



 //发送邮箱事件
 function message_send(text){
    if(eMail.bool){
          $.ajax({
              type:"post",
              url:url+"php/PHPMailer/email.php",
              data:{
                 text:eMail.value
              },success:function(data){
                 if(data==1 || data==="数据库连接失败"){
                 eMail.style.border = "1px solid #ccc";
                 alert("你已经注册了");
                 setTimeout(function(){ window.location.href = "./denglu.html"; },500)
              
                 }else{
                     cookie.addCookie('email',eMail.value);
                     httpemailajax();
                 // alert("你还没注册")
                 }
              }
          })
          text.html("验证成功");
    }else{
     subeMail("输入邮箱格式错误");
    }
    subeMail.disabled = true;
  setTimeout(() => {
     subeMail.disabled = false;
  }, 120000);

  }

//  信息发送到后台  后台成功接收验证后 跳转页面
function httpemailajax(){
$.ajax({
 type:"post",
 url:url+"php/matramemail.php",
 data:{
    email:eMail.value
 },
 timeout:120000,
 success:function(data){
     registration(1);
    $(".message_input").css("display","none");
    $("#account_information").css("display","block");
    sp = cookie.selectCookie("email")
    window.passwordyanzheng();
 },error:function(error){
     console.log(error);
 }
})

}


//  导航条变色
function registration(index){

$registration_information.css({
    borderColor:"#ccc",
    color:"#ccc"
})
$registration_information.children("span").css({
 background:"#ccc"
})
$registration_information.eq(index).css({
    borderColor:"orange",
    color:"#000"
})
$registration_information.children("span").eq(index).css({
    background:"orange"
})

}




