
const maindenglu = document.querySelectorAll(".maindenglu");
 const textSelect = document.querySelectorAll(".textSelect span");
 const inputText =Array.from(document.querySelectorAll(".inputText"));
 const otherA = document.querySelectorAll(".otherA a");
 const Switchicon = document.querySelector(".Switchicon");
 const warning = document.querySelector("#warning");
 init();
 function init(){
     textSelect[0].onclick =textSelect[1].onclick = (e)=>{
        e.target.style.borderBottom = " 2px solid #000";
           if(textSelect[0]==e.target){
            textSelect[1].style.borderBottom = " none";
            inputText.forEach((item,index)=>{
               item.style.display =  index<2? "flex" : "none";
               otherA.forEach(item=>{
                   item.style.display = "block";
               })
            })
           }else{
            textSelect[0].style.borderBottom = " none";
            inputText.forEach((item,index)=>{
                item.style.display = index<2?"none" : "flex";
            })
            otherA.forEach(item=>{
                item!==otherA[0]    ?  item.style.display = "none" : "";
               })
           }
     }
Switchicon.bool = true;
Switchicon.onclick = e=>{
    if(Switchicon.bool){
    Switchicon.innerHTML = "&#xe63b;"
    maindenglu[0].style.display = "none";
    maindenglu[1].style.display = "block";
    }else{
        Switchicon.innerHTML = "&#xe642;"
        maindenglu[1].style.display = "none";
    maindenglu[0].style.display = "block";
    }
    
    e.preventDefault();
Switchicon.bool = !Switchicon.bool;
return false;
 }
}



//   登陆 插件
!function(window){
//   登录验证类   
class userApassword{
//   传 账号 密码以及 点击 元素.
constructor(option){
this.settings = {
    user: document.querySelector(".data-user"),  // 账号
    password:document.querySelector(".data-password"), //密码
    sumbit:document.querySelector(".sumbit"), // 登录按钮
    type:"normal",    //验证账号类型
    validation:false,   // 是否验证
    href:"www.baidu.com",    //跳转的页面
    onkeyEnter:true,        // 是否用过回车进行登录
    url:"php/taobao.php"       // 后台接口.
}
this.option = option;   //接收配置
//初始化
this.init();
// 按钮点击事件   验证
this.BTN();
}
// 初始化
init(){
Object.assign(this.settings,this.option);
// 是否  输入验证
let _this = this.settings;
//  验证 意味着需要判断是否要验证  除 false 和 字符串 "false" 以外 默认验证
if(_this.validation!==false && _this.validation!=="false" ){
//  统一的 不能为空的验证    
  // 验证需要 通过类型来判断验证的是邮箱登录还是手机号码登录。 需要验证type 属性
   //暂时不写   因为先使用的是 不需要验证;
   if( _this.type=="email"){}
}

}

//   点击元素添加点击事件。
BTN(){
    let _this = this.settings;
    try{
        _this.sumbit.onclick = e =>{
      this.dataAjax(_this);
    }
    }catch{
    }
    window.addEventListener("keyup",e=>{
        if(e.keyCode==13)
        this.dataAjax(_this);
    })

}


dataAjax(_this){
//   验证账号密码不为空
if(_this.user.value==""){
    warning.textContent = "账号不能为空";
}else if(_this.password.value==""){
    warning.textContent = "密码不能为空";
}else{
    // 
    $.ajax({
    type:"post",
    url:_this.url,
    data:{
      user:  _this.user.value,
      password:  hex_sha1( _this.password.value)
    },
    success:function(data){
        data  = data.split("?");
        if(data[0]=="1"){
          _this.success(hex_sha1( _this.password.value),_this.user.value);
          window.location.href = data[1];
        }else{
          warning.textContent = data[1];
        }
    },
    error:function(error){
        console.log(error);
    }
})
}}}
window.userApassword = userApassword;
}(window)
let cookie = new Cookiefn();

var obj = {
   url:"http://10.31.162.16/taobao/php/userpassword/user_email.php",
   success:function(password,email){
    cookie.addCookie("password",password);
    cookie.addCookie("email",email);
   }
}
new userApassword(obj);
