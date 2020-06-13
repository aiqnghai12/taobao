
 
 !function($){
 // 垃圾代码   利用 各种元素的点击事件 实现页面点击的效果
 const maindenglu = $(".maindenglu");     
 const textSelect =$(".textSelect span");
 const inputText =$(".inputText");
 const otherA = $(".otherA a");
 const Switchicon = $(".Switchicon");
 const warning = $("#warning"); //  显示 账号密码输入验证情况的 元素
 init(); // 各种点击切换元素的点击事件
 function init(){
     textSelect.on("click",e=>{
        e.target.style.borderBottom = " 2px solid #000";
           if(textSelect[0]==e.target){
            textSelect.eq(1).css("borderBottom","none");
          $.each(inputText,(index,item)=>{
               item.style.display =  index<2? "flex" : "none";
               $.each(otherA,(index,item)=>{
                   item.style.display = "block";
               })
            })
           }else{
            textSelect.eq(0).css("borderBottom","none");
            $.each(inputText,(index,item)=>{
                item.style.display = index<2?"none" : "flex";
            })
            $.each(otherA,(index,item)=>{
                item!==otherA[0]    ?  item.style.display = "none" : "";
            })
           }
     }) 
     
let bool = true;
Switchicon.on("click",e=>{
    if(bool){
    Switchicon.html("&#xe63b;");
    maindenglu.eq(0).css("display","none");
    maindenglu.eq(1).css("display","block");
    }else{
        Switchicon.html("&#xe642;");
        maindenglu.eq(1).css("display","none");
        maindenglu.eq(0).css("display","block");
    }
    e.preventDefault();
    bool = !bool;
return false;
 })  
}



//   登陆 插件
!function(window){
//   登录验证类   
class userApassword{
//   传 账号 密码以及 点击 元素.
constructor(option){
this.settings = {
    user: $(".data-user"),  // 账号
    password:$(".data-password"), //密码
    sumbit:$(".sumbit"), // 登录按钮
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
        _this.sumbit.on("click",e =>{
            this.dataAjax(_this);
          }) 
    }catch(error){
    }
    window.addEventListener("keyup",e=>{
        if(e.keyCode==13)
        this.dataAjax(_this);
    })

}


dataAjax(_this){
//   验证账号密码不为空
if(_this.user.val()==""){
    warning.html("账号不能为空");
}else if(_this.password.val()==""){
    warning.html( "密码不能为空");
}else{
    // 
    $.ajax({
    type:"post",
    url:_this.url,
    data:{
      user:  _this.user.val(),  //传入 账号
      password:  hex_sha1( _this.password.val())   // 传入密码 使用sha1密码加密 存入cookie的也是加密的
    },
    success:function(data){
        data  = data.split("?");
        if(data[0]=="1"){
          _this.success(hex_sha1( _this.password.val()),_this.user.val()); //回调函数  成功后返回账号和密码 
          window.location.href = "./index.html";     //  成功后跳转页面
        }else{ 
          warning.html(data[1]);
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
   url:"http://10.31.162.16/php/userpassword/user_email.php",
   success:function(password,email){
    cookie.addCookie("password",password);
    cookie.addCookie("email",email);
   }
}
//  登录 封装方法 调用
new userApassword(obj);

const backgroundimg = $(".backImg");

//  垃圾代碼  隨機 背景圖
let backgroundimgsarr = ['https://gtms01.alicdn.com/tps/i1/TB1GTCYLXXXXXcHXpXXcoeQ2VXX-2500-600.jpg',
'https://img.alicdn.com/tfs/TB1KURxGFP7gK0jSZFjXXc5aXXa-2500-600.png']
backgroundimg.css("backgroundImage","url(" + backgroundimgsarr[Math.floor(Math.random()*2)] + ")" ) ;

}(jQuery)