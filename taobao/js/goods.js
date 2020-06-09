

!function($){
    const smallpicSf = $(".smallpic img");
    const bigpic = $(".bf .bigpic");
    const message = $(".message .title");
    const num = $(".message .num");
    const goodsnumber = document.querySelector(".goodsnumber");
    const but = document.querySelector(".but");
    const gouwuche = $("#shopcar .num");
    const left= document.querySelector(".left");
    const right= document.querySelector(".right");
    const goods_number =$(".goods_number");
    const original_num = $(".original_num");
    const goods_place = $(".goods_place");
    const goods_introduce = $("#goods_introduce");



 var str =  `<li class="goods_li m_r_goods_li" value="?id?">
              <div class="goods_li_div"><img src="?goods_img?" alt="">
               <p>￥<span class="goods_class_num">?goods_price?</span></p>
              </div>
              <p>?goods_name?</p>
          </li>`;
 var arr = ['id','goods_img','goods_price','goods_name'];

    leftAright();
    let cookie2 = new Cookiefn();
    const url = "http://10.31.162.16/";
    dataAdd();
    function dataAdd(){
let sp =   window.location.search.substring(1);

//  通过点击传过来的 域名id  通过ajax 获取响应的商品数据 
 $.ajax({
     type:"post",
     url:url+"php/data/goods_select_id.php",
     dataType:"json",
     data:{
         sid:sp
     },success:function(data){
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

//  左右按钮点击事件
 but.addEventListener("click",(e)=>{
     if(cookie2.selectCookie('arrsid') && cookie2.selectCookie('arrnum')){
         let arrsid = cookie2.selectCookie('arrsid').split(",");
         let arrnum = cookie2.selectCookie('arrnum').split(",");
        
         if(arrsid.indexOf(sp)!==-1){
           
         arrnum[arrsid.indexOf(sp)] = parseInt(arrnum[arrsid.indexOf(sp)])+parseInt(goodsnumber.value);
         if(arrnum[arrsid.indexOf(sp)]>100)
         arrnum[arrsid.indexOf(sp)]=99;
     }else{
         arrsid.push(sp);
         arrnum.push(parseInt(goodsnumber.value));
     }
     cookie2.addCookie('arrsid',arrsid,100);
     cookie2.addCookie('arrnum',arrnum,100);
     }else{
         cookie2.addCookie('arrsid',new Array(`${sp}`),100) ;
         cookie2.addCookie('arrnum',new Array(`${parseInt(goodsnumber.value)}`),100) ;
      }

         
         // 小图标方法
         gouwuchejingru();

             
 });
}


//  按照种类 查询 商品数据
function speciesquery(id,cat_two_id){   
           new $.creatgoodslist_$({
                url: url + "php/data/goods_select_class.php", 
                $fat: $(".m_r_goods_list"), 
                li: str,
                data:{id,cat_two_id},
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

 // console.log($("#hearhtml").children());
 if(cookie2.selectCookie('arrsid')){
 if(cookie2.selectCookie('arrsid').split(",").length==0){
     gouwuche.css("dispaly","none");
  }else{
     gouwuche.html(cookie2.selectCookie('arrsid').split(",").length) 
     gouwuche.css("dispaly","block");
  }
 }
}


//  左右按钮 修改数量方法   数量不超过99个 不少于1個 並不能輸入非数字的符号
function leftAright(){ 
  goodsnumber.oninput = e=>{
      e.target.value = e.target.value.replace(/[^0-9]/g,"");
      if(parseInt(e.target.value)<=0){
         e.target.value = 1;
      }else if(parseInt(e.target.value)>=99){
         e.target.value = 99;
      }
  }
 left.onclick = right.onclick = e=>{
  if($(e.target).hasClass("left")){
     goodsnumber.value = parseInt(goodsnumber.value)-1;
  }else{
     goodsnumber.value = parseInt(goodsnumber.value)+1;
  }
  if(parseInt(goodsnumber.value)<=0){
     goodsnumber.value = 1;
      }else if(parseInt(goodsnumber.value)>=99){
         goodsnumber.value = 99;
      }
 }
}
}(jQuery)


//  有问题 ！！！！！！！！！！！！
//  放大镜   类
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

