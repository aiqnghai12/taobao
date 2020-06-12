
!function($){
    /* 详情页 */
    const smallpicSf = $(".smallpic img");   // 获取小图
    const bigpic = $(".bf .bigpic");   // 获取大图
    const message = $(".message .title");   // 获取 商品信息标签
    const num = $(".message .num");       //  获取 商品价格 标签
    const goodsnumber = $(".goodsnumber");  // 获取 数量表单
    const but = $(".but");       //  加入购物车按钮  
    const gouwuche = $("#shopcar .num");   // 获取购物车 数量标签
    const left=$(".left");  // 获取作左右按钮
    const right= $(".right");
    const goods_number =$(".goods_number");      // 获取销售数量标签
    const original_num = $(".original_num");      
    const goods_place = $(".goods_place");      // 获取店家 标签
    const goods_introduce = $("#goods_introduce");  
    let cookie2 = new Cookiefn();    // 创建cookie操作插件对象
    const url = "http://10.31.162.16/";   


 var str =  `<li class="goods_li m_r_goods_li" value="?id?">
              <div class="goods_li_div"><img src="?goods_img?" alt="">
               <p>￥<span class="goods_class_num">?goods_price?</span></p>
              </div>
              <p>?goods_name?</p>
          </li>`;
 var arr = ['id','goods_img','goods_price','goods_name'];
 let bool = true; // 防抖 标记，防止多次连续点击事件
    leftAright();
    dataAdd();
    function dataAdd(){
let goods_id_message = 0;
let sp =   window.location.search.substring(1); //  通过点击传过来的 域名id  通过ajax 获取响应的商品数据 
 $.ajax({
     type:"post",
     url:url+"php/data/goods_select_id.php",
     dataType:"json",
     data:{
         sid:sp  //  通过id 查询商品
     },success:function(data){
        goods_id_message = data;
        /*详情页 元素添加 id 商品 的各种样式,以及一些方法的实现 */
        $("title").html(data.goods_name)
         speciesquery(data.id,data.cat_two_id)
        smallpicSf.prop("src" ,data.goods_img)
        bigpic.prop("src" ,data.goods_img)
        message.html(data.goods_name);
        num.html(data.goods_price);
        goods_number.html(data.goods_number)
        $(".original_num").html((data.goods_price-0.1+100.1).toFixed(2)+"--"+(data.goods_price-0.1+200).toFixed(2))
        $(".goods_place").html(data.goods_prace)
        $("#goods_introduce").html(data.goods_introduce);
        $(".goods_state").html(data.goods_state);
        minImgscreat(data.piclistimg.split(","))
     }
 })  
// 初始化小图标
gouwuchejingru();

//  加入购物车点击事件
 but.on("click",e=>{
    if(!bool) return;
   bool = false;
     //   判断 是否 购物车有值 取值
     if(cookie2.selectCookie('arrsid') && cookie2.selectCookie('arrnum')){ //  当cookie 中 有数据时
         let arrsid = cookie2.selectCookie('arrsid').split(",");   
         let arrnum = cookie2.selectCookie('arrnum').split(",");
         if(arrsid.indexOf(sp)!==-1){   //  如果 在cookie中有id 有这个商品  则追加数量
        
         arrnum[arrsid.indexOf(sp)] = parseInt(arrnum[arrsid.indexOf(sp)])+parseInt(goodsnumber.val());
         if(arrnum[arrsid.indexOf(sp)]>100)//  如果商品数量达到上限 则 追加到99
         arrnum[arrsid.indexOf(sp)]=99;
     }else{
         arrsid.push(sp);   // 没有就商品id 和 数量都追加
         arrnum.push(parseInt(goodsnumber.val()));
     }
     cookie2.addCookie('arrsid',arrsid.join(","),100); // 重新存入 cookie
     cookie2.addCookie('arrnum',arrnum.join(","),100); //  重新存入 cookie
     }else{  //如果 购物车没有值 则 把
         cookie2.addCookie('arrsid',new Array(`${sp}`),100) ;
         cookie2.addCookie('arrnum',new Array(`${parseInt(goodsnumber.val())}`),100) ;
      }    

//  存入数据库  
        $.ajax({
            type:"post",
            url:url+"php/userpassword/user_shopcar_save.php",
            data:{
                shopcar:cookie2.selectCookie("arrsid") ,
                shopcarnumber:cookie2.selectCookie("arrnum"),
                user:cookie2.selectCookie("email"),
                password:cookie2.selectCookie("password")
            },
            success:function(){

     //  成功添加 后  出现购物车效果
                creatshopeffect(goods_id_message.goods_img,e.clientX,e.clientY);
                 
                 // 小图标方法
            }
        })

 });
}

 // 创建 效果盒子 以及 添加效果
function creatshopeffect(img,positionX,positionY){
  
  // 创建
  let elem = document.createElement("div"); //创建
 Object.assign(elem.style,{
    width:"90px",height:"90px",background:"url("+img+")",borderRadius:"80%",
    backgroundSize:"cover",position:"fixed",top:positionY-45+"px",left:positionX-45+"px"
 })

 but.append(elem);

 $(elem).stop(true).animate({
    top:1,
    left:860,borderRadius:"10%",
    width:0,height:0
 },700)
 $("html,body").stop(true).animate({scrollTop:0},400);
setTimeout(function(){
    bool = true;     
 $(elem).remove();   //  完成后销毁
 gouwuchejingru();    //  更新小图标 头
},700)

}


//  按照种类 查询 商品数据
function speciesquery(id,cat_two_id){
           new $.creatgoodslist_$({
                url: url + "php/data/goods_select_class.php", 
                $fat: $(".m_r_goods_list"), 
                li: str,
                data:{id,cat_two_id},   //  传入 id 和 二级分类  查询数据
                arr:arr ,
                href:url+"taobao/goods.html",
                first:500
             });    
}


        

function minImgscreat(arr){
let str = `<li><img src="${$(".smallpic img").prop("src")}" alt=""></li>`;
//    <div class="imgs_min">
//                   <li><img src="https://img14.360buyimg.com/n0/jfs/t1/97930/20/9251/822007/5e0ca9a6Ebc107a6a/901ea4294766a519.jpg" alt=""></li>
//    </div>
arr.forEach(item=>{
 str+=`<li><img src="${item}" alt=""></li>`;
})

$(".imgs_min").html(str);
 
$(".imgs_min li img").hover(
    function(){
    $(".smallpic img").prop("src",$(this).prop("src")) ;
    $(".bigpic").prop("src",$(this).prop("src")) ;
    $(this).parent().css({
        background:"red"
    })
    }
    ,function(){
     $(this).parent().css({
        background:"none"
    })
    })

}








//  购物车小图标方法    记录id数量
function gouwuchejingru(){
 //在js中引入
 $(document).ready(function () {
     $('#hearhtml').load('hear.html');
 });
}


//  左右按钮 修改数量方法   数量不超过99个 不少于1個 並不能輸入非数字的符号
function leftAright(){ 
  goodsnumber.on("input",e=>{
    e.target.value = e.target.value.replace(/[^0-9]/g,"");
    if(parseInt(e.target.value)<=0 || e.target.value==""){
       e.target.value = 1;
    }else if(parseInt(e.target.value)>=99){
       e.target.value = 99;
    }
}) 

 left.on("click", e=>{
       goodsnumber.val(parseInt(goodsnumber.val())-1) 
    if(parseInt(goodsnumber.val() )<=0)
       goodsnumber.val(1);
   })  
   right.on("click", e=>{
       goodsnumber.val(parseInt(goodsnumber.val())+1)
        if(parseInt(goodsnumber.val() )>=99)
           goodsnumber.val(99);
   })
}
}(jQuery)


//  ！！！！！！！！！！！！
//  放大镜  类     直接引用。
class Scale {
         constructor() {
             this.goods_main = document.querySelector("#goods_main");
             this.scale = document.querySelector('.scale');
             this.smallpic = document.querySelector('.smallpic');
             this.sf = document.querySelector('.sf');
             this.bigpic = document.querySelector('.bigpic');
             this.bf = document.querySelector('.bf');
         }
         init() {

this.sf.style.width = this.smallpic.offsetWidth * this.bf.offsetWidth / this.bigpic.offsetWidth + 'px';
                 //2.鼠标移入求小放的尺寸。
this.sf.style.height = this.smallpic.offsetHeight * this.bf.offsetHeight / this.bigpic.offsetHeight + 'px';
                //3.比例，注意比例一定要大于1(放大操作)，一定大的比小的。
this.bili = this.bigpic.offsetWidth / this.smallpic.offsetWidth; //1.鼠标移入移出小图，小放和大放会对应显示和隐藏。
             //  移入显示 
             this.smallpic.onmouseover = () => {
                 this.sf.style.visibility = 'visible';
                 this.bf.style.visibility = 'visible';
                 //4.鼠标移动的时候，小放跟随鼠标
                 this.smallpic.onmousemove = (ev) => {
                     var ev = ev || window.event;
                     this.move(ev);
                 }
             };

             // 一处隐藏
             this.smallpic.onmouseout = () => {
                 this.sf.style.visibility = 'hidden';
                 this.bf.style.visibility = 'hidden';
             };
         }
         move(ev) {
             let leftvalue = ev.pageX-this.scale.offsetLeft - this.sf.clientWidth/2;
             let topvalue = ev.pageY-this.scale.offsetTop - this.sf.clientHeight/2;
             if (leftvalue < 0) {
                 leftvalue = 0;
             } else if (leftvalue >= this.smallpic.clientWidth - this.sf.clientWidth) {
                 leftvalue = this.smallpic.clientWidth - this.sf.clientWidth;
             }
             if (topvalue < 0) {
                 topvalue = 0;
             } else if (topvalue >= this.smallpic.clientHeight - this.sf.clientHeight) {
                 topvalue = this.smallpic.clientHeight - this.sf.clientHeight;
             }
             this.sf.style.left = leftvalue + 'px';
             this.sf.style.top = topvalue + 'px';
             this.bigpic.style.left = -leftvalue * this.bili + 'px';
             this.bigpic.style.top = -topvalue * this.bili + 'px';
         }
     }
     new Scale().init();

$(".goods_list_Btns div").on("click",function(){
  if($(this).hasClass("goods_upbtn")){
         $(".m_r_goods_list").stop("true").animate({
             scrollTop:$(".m_r_goods_list").scrollTop()-628
         },500)   
  }else{
     $(".m_r_goods_list").stop("true").animate({
             scrollTop:$(".m_r_goods_list").scrollTop()+628
         },500)   
  }
})

