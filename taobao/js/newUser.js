!function($){

const url = "http://10.31.162.16/";
const eMail = $(".eMail");
const yanzhneg = $(".yanzhneg");
const subeMail = $(".subeMail");
const zhuce = document.querySelector(".zhuce");
const $registration_information = $(".registration_information li");
let cookie = new Cookiefn();
var timer ;
let bool = true;
var sp =  null;
//  调用 图片验证 类  进行渲染。
 //  放入的滑动的父元素   父元素  图片路径数组
 let imgs =   new  $.$ImageA({$fat : $("#Image_authen"),
  imgs : ['../src/img/fengjiahua1.jpg','../src/img/fengjiahua2.jpg','../src/img/fengjiahua3.jpg'],
 //  color:"green",
 //  min_width:0.1,
 //  min_height:0.1,
  success:function(data){
     message_send(data);  // 回调函数   验证成功后返回 调用 message_send方法 并传入图片验证的数字 元素
  },
  error:function(error){
      console.log(error);
  }
  //  图片验证的 开关    1为开 0 为关
 }).closeAndopen();

 init();
 // 导航条 样式  下标传入为0
 registration(0);
function init(){
    // 邮箱输入 事件   通过失焦 进行 验证
eMail.on('blur',e=>{
    if((/^\w{5,}\@[a-zA-Z0-9]{2,}\.(com|net|org)(\.cn)?$/).test(e.target.value)){
       eMail.css("border","1px solid green");
       yanzhneg.html("√");
       yanzhneg.css("color","green");
       imgs.closeAndopen(1);   // 验证成功 图片开关 打开
       eMail.attr("bool",true);   // 标记是否验证成功
    }else{
       imgs.closeAndopen();  // 验证失败 图片开关 关闭
       eMail.css("border","1px solid red");
       yanzhneg.css("color","red");
       yanzhneg.html( "X请输入正确的邮箱");
       eMail.attr("bool",false);  //  标记
    }
   })
}


!function(window){
       const email = $(".email");
       const url = "http://10.31.162.16/";
       const password = $(".password");   // 一起获取两个密码验证的表单。
       const submit = $("#account_information .submit");
       const passwordTwoSpan = $(".passwordTwoSpan").attr("bool",false);
       const passwordOneSpan = $(".passwordOneSpan").attr("bool",false);
       function init(){    //  密码函数方法   输入密码函数
         email.html(sp);   // email从sp中提取了 sp
         password.eq(0).on ("input",e=>{   // 密码表单输入 事件 
            let passwordvalue = password.eq(0).val();
            let regnum = /\d+/;   //  有数字
            let regupper = /[A-Z]+/;  // 有大写字母
            let regnumber =  /[a-z]+/;  //  有小写字母
            let regW = /[\W\_]+/;   // 有其他字符
            let $count = 0;//  技术
            if(regnum.test(passwordvalue) ){ $count ++ ;}  
            if(regupper.test(passwordvalue) ){  $count ++ ;}
            if(regnumber.test(passwordvalue) ){ $count ++ ;}
            if(regW.test(passwordvalue)){$count ++ ;}
           if ((/^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\W\_]{8,16}$/).test(passwordvalue)){
            passwordOneSpan.html("√ 字母开头 含有数字 8-16位 ").attr("bool",true).css("color","green");
             switch($count){
                case 3: passwordOneSpan.html(passwordOneSpan.html()+"中").css("color","orange");
                break;
                case 4:  passwordOneSpan.html(passwordOneSpan.html()+"强"); 
                break;
            }
           }else{
            passwordOneSpan.html("× 字母开头 含有数字 8-16位 ").attr("bool",false).css("color","red");
             switch($count){
                case 1: passwordOneSpan.html(passwordOneSpan.html()+"弱"); 
                break;
                case 2: passwordOneSpan.html(passwordOneSpan.html()+"中"); 
                break;
            }
           }
         }) 
         //  密码重复表单
          password.eq(1).on("input",e=>{
            if( password.eq(1).val()== password.eq(0).val()){
               passwordTwoSpan.html("√").attr("bool",true).css("color","green");
            }else{
                passwordTwoSpan.html("×和密码不相同").attr("bool",false).css("color","red");
            }
        })
                // 按钮点击
                 submit.on("click",e=>{
             //  当两个 bool 属性 都为 "true" 时   验证成功 发送数据集到后台 保存到数据库
                    if(passwordOneSpan.attr("bool")=="true" && passwordTwoSpan.attr("bool")=="true"){
                       $.ajax({
                           type:"post",
                           url:url+"php/newPassword.php",
                           data:{
                               email:sp,   //发送 email 账号
                               password:hex_sha1(password.eq(0).val()) // 发送加密后的密码
                           },success:function(data){
                               if(data=="成功")
                               {
                                registration(2); // 成功后 导航条变换  
                                $("#account_information").css("display","none")  //  成功获取 后 切换
                                $("#usersuccess").css("display","block");
                                    let timerscecond = 10.00  //  跳转计时器  点击和 时间到达都会跳转。
                                    let timer = setInterval(()=>{
                                        timerscecond -= 0.01
                                        if(timerscecond<=0){
                                            timerscecond = 0;
                                        clearInterval(timer);
                                        window.location.href = "./denglu.html"; // 跳转到主页面
                                        }
                                        $(".timersetout").html((timerscecond).toFixed(2));
                                    },10)  
                               }
                              else{
                                  alert(data);
                              }
                           }
                       })
                    }else{
                        if(passwordTwoSpan.attr("bool")!=="true"){
                            passwordTwoSpan.html("×和密码不相同").css("color","red");
                        }
                        if(password.eq(0).val()===""){
                            passwordOneSpan.html("×密码不能為空 ").attr("bool",false).css("color","red");
                        }
                    }
                }) 
       }
       window.passwordyanzheng = init;
     }(window)



 //验证邮箱是否注册  成功后调用
 function message_send(text){
          $.ajax({
              type:"post",  
              url:url+"php/PHPMailer/email.php",
              data:{
                 text:eMail.val()     // 传入输入的邮箱的内容
              },success:function(data){
                 if(data==1 || data==="数据库连接失败"){
                 eMail.css("border","1px solid #ccc");
                 //  后台查找后  返回了 已经注册 则表示已经注册
                 alert("你已经注册了");
                 //  跳转 到登录页面
                 setTimeout(function(){ window.location.href = "./denglu.html"; },500)    
                 }else{
                     //  成功调用后  说明已经发送出邮箱已经验证成功了。 则把邮箱保存在cookie中。
                     cookie.addCookie('email',eMail.val());

                     httpemailajax();
                 // alert("你还没注册")
                 }
              }
          })
          text.html("邮箱验证成功");
  }

//  信息发送到后台  后台成功接收验证后 跳转页面
//  主要的验证邮箱的后台处理机制。   
function httpemailajax(){
$.ajax({// 传入邮箱   后台自动获取 ip 地址  发送后保存在数据库中。
 type:"post",
 url:url+"php/matramemail.php",
 data:{
    email:eMail.val()    
 },
 timeout:120000,    //  规定时间为2min钟 
 success:function(data){
     registration(1); //  成功验证后 改变导航条 
    $(".message_input").css("display","none");   //  改变样式，把验证影藏
    $("#account_information").css("display","block"); //  把密码设置 设置显示
    sp = cookie.selectCookie("email")    //  提取账户信息
    window.passwordyanzheng();    // 调用  验证密码信息的主函数方法     //  跳转到 密码验证 韩函数方法
 },error:function(error){
     console.log(error);
 }
})

}


//  导航条变色   通过传入的下标 进行导航条颜色变化效果
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

}(jQuery)