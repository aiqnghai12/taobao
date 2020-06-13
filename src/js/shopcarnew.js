

!function($){
 const url = "http://10.31.162.16/";
 const cookie = new Cookiefn();
 // 获取购物车数据初始化
 let arrsid = cookie.selectCookie('arrsid') ?  cookie.selectCookie('arrsid').split(",") : "null";
  // 购物车数量 数组
 let arrnum =cookie.selectCookie('arrnum') ?  cookie.selectCookie('arrnum').split(",") : "null";
var li = `
<div><li class="radius radius_goods_store"  value="?id?"><p class="radius_goods_store" value="?goods_state?"></p> <h6 class="iconfont_taobao iconfont_taobao_1"></h6>店铺: <p class="goods_store">?goods_state?</p>
<p class="iconfont_gif iconfont_gif_1"></p> 
 <p><span class="iconfont_taobao iconfont_taobao_3"><span>优惠券</span><span class="iconfont_taobao_2 iconfont_taobao"></span></span></p>
</li><div class="discount_div"><p>2件7.5折</p>  <p>满两件打7.5折</p> </div>
                               <div class="goods_li"  value="?id?"> <li class="radius"> <div><p class="radius_goods"  value="?goods_state?" ></p></div> </li>
                                    <li class="goods_choose"><span><img src="?goods_small_logo?" alt=""> </span></li>
                                    <li class="goods_name"><p> <div class="goods_name_div goods_div">
                                        <p value="?id?">?goods_name?</p>
                                        <div><img src="//assets.alicdn.com/sys/common/icon/trade/xcard.png" alt="">
                                            <img src="//img.alicdn.com/tps/i3/T1bnR4XEBhXXcQVo..-14-16.png" alt="">
                                        <img src="//img.alicdn.com/tps/i2/TB1XY_zGpXXXXbeXXXXAz6UFXXX-16-16.png" alt=""></div>
                                    </div> </p></li>
                                    <li class="goods_class"><p>
                                        <div class="goods_class_div goods_div">
                                          类别: <span>?goods_class?</span>><span>?cat_two_id?</span>><span>?cat_three_id?</span>
                                        </div>
                                    </p></li>
                                    <li class="goods_price"><p>
                                        <div class="g_price_div goods_div">
                                          <p>￥<span> ?goods_price?</span></p>
                                          <p>￥<span> ?goods_price?</span></p> </div></p></li>
                                    <li class="goods_number"><p><div class="goods_number_div goods_div"> <span>-</span><input type="text" value="?goods_num?"><span>+</span>
                                        </div>
                                    </p></li><li class="goods_money"><p>  <div class="goods_money_div goods_div">  <p>￥<span class="goods_num_all">?goods_num_all?</span></p>  </div></p></li>  <li class="operation"><p> <div class="operation_div goods_div ">
                                            <p>移入收藏夹</p> <p class="goods_remove">删除</p> <p class="operation_span">相似宝贝<span class="iconfont_taobao_2 iconfont_taobao"></span></p>
                                        </div> </p></li> </div></div>`
var arr = ['goods_small_logo','id','goods_state','goods_name','goods_class','cat_two_id','cat_three_id','goods_price']
     var str2 = `<div class="goods_li" value="?id?">
<img src="?goods_img?" alt="">
<p>￥<span>?goods_price?</span><span class="old_price">￥<span>?goods_price?</span> </span>  </p>
<div>?goods_name?</div>
<div>销量 <span>?goods_number?</span><span class="iconfont_2 iconfont_2_1"></span><span class="iconfont_2 iconfont_2_2"></div>
</div> `

     var arr2 = ['goods_img','id','goods_price','goods_number','goods_name']
     new $.creatgoodslist_$({
                   url: url + "php/data/goods_all.php", 
                   $fat: $(".goods_lilist_br"), 
                   li:str2,
                   arr:arr2,
                   num:25,
                   first:500,
                   href:"./goods.html",
                   success:function(data){
                   }
            }); 
  



        
      //  数据改变类  封装   通过点击事件的cookie 改变 做到 数据的增删改。   并存入数据库。
      //  需要获取对应的 账号 密码信息 需要从cookie 中获取  
      //  需要一个 默认的获取cookie所有数据的方法
     !function($){
          class goods_data_change{
              constructor(option){
                Object.assign(this,option)
                this.cookie = new Cookiefn();
                this.arrsid = arrsid;
                this.arrnum = arrnum;
                this.password = this.cookie.selectCookie("password");
                this.user = this.cookie.selectCookie("email");
                this.numberAll = 0;
                this.priceAll = 0;
                // this.cookie
                this.init();
               }
         // init 初始化 创建点击事件   左右添加按钮   删除按钮 
          init(){  let _this = this;
            this.$radius.css("backgroundPosition","0 -20px");
            this.addradius_checked();
              //  确定按钮 群     选中按钮 添加 点击事件-----------------
            this.$radius.on("click",function(){
                if($(this).css("backgroundPosition") == "0% 0%"  )
                $(this).css("backgroundPosition","0 -20px");
                else{
                    $(this).css("backgroundPosition","0% 0%");
                }
                _this.radiusinput($(this));
            })
           // input 
            this.$input.on("input",e=>{ //  数量输入标点input 添加输入事件----------------
                let goods_index = this.data.id.indexOf($(e.target).parents(".goods_li").attr("value")) 
                 let goods =  this.data[goods_index];
         e.target.value = e.target.value.replace(/[^0-9]/g,"");
         if(parseInt(e.target.value)<1 || e.target.value==""){
            e.target.value = 1;
         }else if(parseInt(e.target.value)>=99){
            e.target.value = 99;
         }
         
         this.stylenumchange(goods.goods_price,goods_index,parseInt(e.target.value))
        
            }) 
     
           // 左右点击数量
             this.$bettons.on("click",function(){ //  左右数量++ -- 的点击事件---------------
                 let goods_index = _this.data.id.indexOf($(this).parents(".goods_li").attr("value")) 
                 let goods =     _this.data[goods_index];
                 let $input = $(this).siblings("input");
                 if( $(this).index() == 0 ){
                    if(parseInt($input.val())>1)
                    $input.val($input.val()-1)
                 }else{
                    if(parseInt($input.val())<99)
                    $input.val(parseInt($input.val())+1)
                 }
                 _this.stylenumchange(goods.goods_price,goods_index,parseInt($input.val()))
             })

            // 删除
            this.$remove.on("click",function(){ //  删除 一个的按钮 添加点击事件-----------
                let goods_index = _this.data.id.indexOf($(this).parents(".goods_li").attr("value"))             
                //     console.log(_this.arrsid); 
                    _this.removegoods(goods_index);
            })
            //  删除全部
            this.$removeAll.on("click",function(){ //  删除全部   删除全部按钮 的点击事件添加------------
              this.arrindex = [];
              _this.addradius_checked().forEach((item,index)=>{
              this.arrindex[index] =  _this.data.id.indexOf($(item).parents(".goods_li").attr("value"))
              })
              _this.removegoods(this.arrindex);
            })

            //  保存购买的商品的数量加成 + 删除   
            $(".settlement").on("click",()=>{ //  结算按钮的事件添加 和 删除类似  但在数据库中追加了数量添加-------
                this.arrindex = [];
                this.arr_goods_number = [];
                this.arr_goods_id = [];
              this.addradius_checked().forEach((item,index)=>{
              this.arrindex[index] =  _this.data.id.indexOf($(item).parents(".goods_li").attr("value"))
              })
              
              $.each(this.arrindex,(index,item)=>{
                this.arr_goods_number[index] = parseInt(this.data[item].goods_number)+parseInt(this.$input.eq(item).val());
                this.arr_goods_id[index] = this.data.id[item];
              })
              $.ajax({
                  type:"post",
                  url:url+"php/data/goods_all_update.php",
                  data:{
                    arrnumber:this.arr_goods_number,
                    arrsid: this.arr_goods_id 
                }
              })
              this.removegoods(this.arrindex);
            })
            this.offsetTop =   this.$Basic_information_bottom.offset().top;
            let thisheight =   this.$Basic_information_bottom.height();
            $(window).on("scroll",()=>{ //  滚动条事件 结算 根据自己原先的位置进行 固定定位  -----------------
              let scrollTop =   $(window).scrollTop();
                 if(scrollTop < this.offsetTop+20+thisheight-document.documentElement.clientHeight){
                    this.$Basic_information_bottom.css({
                        position:"fixed",bottom:0,left:0,right:0,
                        margin:"auto",zIndex:"1000"
                    })
                 }else{
                    this.$Basic_information_bottom.css({
                        position:"relative",
                        margin:"0 auto"
                    })
                 }
            })
            this.$Basic_information_bottom.css({
                position:"fixed",bottom:0,left:0,right:0,
                margin:"auto",zIndex:"1000"
            })
            // this.$Basic_information_bottom.
          }
           
    

          // 按钮 点击后 的处理方法。 通过 辨别 所有点击的按钮 的类 来 镜像逻辑
          //  传入点击的按钮  进行 类甄别
           radiusinput(_checked){
           let goods_id = _checked.parents(".goods_li").attr("value");   // 提取选中的 所有 按钮 
           let goods_index = this.data.id.indexOf(goods_id); //  如果是-1 则是 全选 和 店铺
        //    console.log(goods_index)

            //  按钮 有三种   店面 按钮               全选按钮             商品  按钮 
            //  需要进行逻辑 选择 radius_goods_store     radius_all   radius_goods
            if(_checked.hasClass("radius_goods_store")){
            $(`[value=${_checked.attr("value")}]`).css("backgroundPosition",`${_checked.css("backgroundPosition")}`);
            }else if(_checked.hasClass("radius_all")){
               this.$radius.css("backgroundPosition",`${_checked.css("backgroundPosition")}`);
            }else {
            if(_checked.css("backgroundPosition") =="0% 0%")
            $(`.radius[value=${goods_id}] p`).css("backgroundPosition","0% 0%");
            }

            if(this.addradius_checked.length==0){
                $(".settlement").css(" cursor","unset")
            }
                this.addradius_checked();
 
           }

           // 判断添加 radius_checked 类 方法
           addradius_checked(){
             let arrchecked = [];
             $.each($(".radius_goods")  ,(index,item)=>{
                 if( $(item).css("backgroundPosition") !== "0% 0%"){
                     arrchecked.push(item);
                 }
             })
            if(this.data.id.length!=arrchecked.length){
            $(".radius_all").css("backgroundPosition","0% 0%")
            }else{
                $(".radius_all").css("backgroundPosition","0 -20px")
            }
                   // jquery 可以 让数组对象 也可以 进行 jQuery方法。 
                arrchecked.forEach(item=>{
                let goods_li = $(item).parents(".goods_li");  
                this.numberAll +=parseInt(goods_li.find(".goods_number_div input").val());
                this.priceAll +=   parseFloat(goods_li.find(".goods_num_all").html());
            })
            $(".goods_amount span").eq(0).html(this.numberAll);
            this.numberAll = 0;
            $(".goods_price_all").html(this.priceAll.toFixed(2));
            this.priceAll = 0;

            if(arrchecked.length==0){
             $(".settlement").css("cursor","not-allowed")
            }else{
            $(".settlement").css("cursor","pointer")
            }
            return arrchecked;
           }
        //   各种点击 输入 后的样式改变    
        //                 单价    下标  数量 
            stylenumchange(goods,index,number){   
               this.arrnum[index] = number ;
               //  单个商品的 总价 变化  通过  input 的 num 进行计算
                this.$numAll.eq(index).html((goods*number).toFixed(2));
                this.mysqlupdate();
                this.addradius_checked();
            }
            
             //  删除           
            removegoods(index_){
            let  i = 0;
            let shopcargoodsdiv = $(".shop_goods_li").children("div");
            if(index_.forEach){
                index_.forEach(item1=>{
                    this.arrsid = this.arrsid.filter((item2,index)=>{
                   return (item1-i)!=index ? item2 : false
                 })
                 this.arrnum = this.arrnum.filter((item2,index)=>{
                   return (item1-i)!=index ? item2 : false
                 })
                 this.data.id =  this.data.id.filter((item,index)=>{
                   return index!=(item1-i) ? item : false
               })
                $.each(shopcargoodsdiv,(index,item)=>{
                  if(index==item1){
                      $(item).remove();  i++;
                  }
                })  
                })
            }else{
                shopcargoodsdiv.eq(index_).remove();
               this.arrsid = this.arrsid.filter((item,index)=>{
               return index!=index_ ? item : false
               })
               this.arrnum = this.arrnum.filter((item,index)=>{
                   return index!=index_ ? item : false
               })
                this.data.id =  this.data.id.filter((item,index)=>{
                   return index!=index_ ? item : false
               })
            }
            this.addradius_checked();
             this.mysqlupdate();
             $(document).ready(function () {
             $('#header').load('hear.html');
             });
             this.offsetTop = this.$Basic_information_bottom.offset().top;
            }
            // 数据传入后  添加到数据库 
              mysqlupdate(){
                  $(".goods_shopcarnum").html(this.arrsid.length);
            // 改变 cookie 值
            this.cookie.addCookie("arrsid",this.arrsid.join(","))
            this.cookie.addCookie("arrnum",this.arrnum.join(","))
            // this.arrsid  this.arrnum  根据 改变后台数据
            if(this.arrsid!==null)
            $.ajax({
                type:"post",
                url:url+"php/userpassword/user_shopcar_save.php",
                data:{
                    shopcar:this.arrsid.join(",") ,
                    shopcarnumber:this.arrnum.join(","),
                    user:this.user,
                    password:this.password
                }
            })
}
          }
     $.$goods_data_change = goods_data_change;
     }(jQuery)



     if(arrsid!=="null")
     new $.creatgoodslist_$({
       url: url + "php/data/goods_select_arrsid.php", 
       $fat: $(".shop_goods_li"), 
       li, 
       data:{
        arrsid,
        selfdata:{    // 自己另外加的属性。
            goods_num:arrnum
        }
       },
       arr,
       href:"none",
       success:function(data){
// $(".goods_name_div > p")
        data.id = [];
       //  给每个数组的 添加 id 属性 方便查询
       data.forEach((item,index)=>{
        data.id[index] = item.id
       })
       $(".goods_name_div > p").on("click",function(){
           window.location.href = './goods.html?'+$(this).attr("value");
       })
        $(".goods_shopcarnum").html(data.length);
           //  回调成功添加数据的函数   
           // 需要事件 和 改变的 li 有4个位置 
     new $.$goods_data_change({
         $Basic_information_bottom:$(".Basic_information_DIV"),
        $bettons:$(".goods_number_div span"),
         $input:$(".goods_number_div input"),
         $numAll:$(".goods_num_all"),
         $radius:$(".radius p[class!='iconfont_gif iconfont_gif_1']"),
         $remove:$(".goods_remove"),
         $removeAll:$(".goods_remove_all"),
         data
    });
} 
}); 


  //  垃圾代码  轮播商品
  let index = 0;
       let goods_host_timer =  setInterval(function(){
                index >=4 ? index=0 : index++;
                $('.goods_host_lilist ul li').css("background","#ccc").eq(index).css("background","red");
                    $(".goods_lilist_br").prop("scrollTop",index*319 );
            },3500)
            $('.goods_host_lilist ul li').hover(
                function(){
                    $('.goods_host_lilist ul li').css("background","#ccc");
                    $(this).css("background","red");
                    index = $(this).index();
                    $(".goods_lilist_br").prop("scrollTop",$(this).index()*319 )    
                }
            ,function(){
              
            })
            $(".goods_host_lilist").hover(()=>{
                clearInterval(goods_host_timer);
            },()=>{
                goods_host_timer = setInterval(function(){
                index >=4 ? index=0 : index++;
                $('.goods_host_lilist ul li').css("background","#ccc").eq(index).css("background","red");
                    $(".goods_lilist_br").prop("scrollTop",index*319 );
            },3500)
            })
          
          $(".shopcarnav  ul li").hover(
              function(){
            $(this).parents(".shopcarnav").find(".div_hr_min").stop(true).animate({
                marginLeft:$(this).offset().left-$(this).parents(".shopcarnav").offset().left+"px",
                width:$(this).width()+20+"px"
            },200)
          },function(){})

        }(jQuery)
          