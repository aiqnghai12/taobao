
var url = "http://10.31.162.16/php/data/goods_all.php";
var url1 = "http://10.31.162.16/php/data/goods_all.php";
var url2 = "http://10.31.162.16/php/data/goods_all_price.php";
var url3 = "http://10.31.162.16/php/data/goods_all_number.php";
let str = `<li class="goods_li" value="?id?"> <img class="lazy" data-original="?goods_img?" 
   width='252' height='252'
   alt=""><div class="title"> <div class="same_style">  <p>找相似</p><p>找同款</p> </div><div class="title_back"></div>
   <div class="title_num"><p><span>￥</span>?goods_price?<span>包邮</span></p><p>销量:<span>?goods_number?</span></p></div><div class="title_text">?goods_name?</div> <div class="title_prace"><div><span><h6></h6><h6></h6><h6></h6></span><a href="">?goods_state?</a></div><p>?goods_prace?</p></div>
     <div class="title_host"><span class="iconfont_2 iconfont_2_3"></span><span class="iconfont_2 iconfont_2_1"></span><span class="iconfont_2 iconfont_2_2"></span><span class="iconfont_down iconfont_down_2"></span></div>
    </div></li>`
var str2 = 
`  <li class="goods_li" value="?id?"><img 
   src="?goods_img?"><div class="title_num"><div class="message"><div><p>喜欢</p><p>不喜欢</p></div><div><p>?goods_name?</p></div></div> <p><span class="iconfont_host"></span>￥<span class="number" >?goods_price?</span></p><p style="color: #ccc;font-size: 12px;">销量<span>?goods_number?</span></p></div>
</li>`

var str3 = `
<li class="goods_li" value="?id?"><img src="?goods_img?"   alt="">  <div class="A_G_L_title">  <p>￥<span>?goods_price?</span></p><div><p>?goods_name?</p></div> <div class="A_G_L_title_store"><p>?goods_state?</p><p>销量<span>?goods_number?</span></p></div> <div> <span class="iconfont_host"></span></div></li>`
                     // 商品 id 商品 图片  商品 价格   商品 名字      商品 销售数量    商品店面      商品地点
let goods_list_arr = ['id','goods_img','goods_price','goods_name','goods_number','goods_state','goods_prace'];
let goods_list_arr2 = ['id','goods_img','goods_name','goods_number','goods_price'];
let goods_list_arr3 = ['id','goods_img','goods_name','goods_number','goods_price','goods_state'];
      let goods_host =     new $.creatgoodslist_$({
              url: url, 
              $fat: $(".goods_host_list"), 
              li:str2,
              arr: goods_list_arr2 ,
              href:"./goods.html",
              first:200,
              num:8
           });
           new $.creatgoodslist_$({
              url: url, 
              $fat: $(".A_goods_liList"), 
              li:str3, 
              arr: goods_list_arr3 ,
              href:"./goods.html",
              first:800,
              num:5
           });

   

   //  分页封装方法。  
   /*--------------- 分页跳转 加载 类 ------------ */   
   !function($){
   /*  ----------------- 分页跳转 视例 ---------------- */
   // new $.$paging({
   //     $leftAright:$(".p_list_goods"),    //  左右按钮
   //     $num:$(".paging_goods"),      // 中间 涵盖有数字的按钮
   //     $span:$(".paging_list_span"), // ...  样式标签   
   //     $input:$(".paging_input input"),  //    页面跳转 的input表单 用于 输入页码
   //     $button:$(".paging_input a"),   //  确定通过 input 跳转页码 
   //     $number:$(".paging_input span"),  //  最大数量 显示标签 
   //     max:30         //  跳转最大页数规定
   // });

     class paging{
         /* 构造函数 */
         constructor(option){
           Object.assign(this,option);
           this.value = 1;   // 通过标记 决定一切   通过按钮 只改变 标记 
           this.num = 20;    // num为 加载个数  可以不需要   用于 创建时
           this.type = true;
           this.init();    // 初始化 创建点击 添加逻辑条件
           this.creatpaging_goods_lis();
         }
         /* 初始化 添加 点击事件  */
         init(){
          this.$number.html(this.max);
             // 正则 输入框不能输入 数字以外的
         this.$input.on("input",()=>{
             this.$input.val(this.$input.val().replace(/\D/g,""))  
             if(parseInt(this.$input.val())>=this.max){
               this.$input.val(this.max) 
             }else if(parseInt(this.$input.val())<=1){
               this.$input.val('1') 
             }})

         let _this = this;
         /* 数字按钮 点击事件 */
         this.$num.on("click",function(){
           _this.value = $(this).val();
           _this.creatpaging_goods_lis();
           _this. disable_left_right();
           _this.changdisplay();
         })
         this.$num.hover (
       function(){
           $(this).css({
               borderColor: "orangered",
               color: "#fff",
               background: "orangered"
           })
         },function(){
             if($(this).val()!=_this.value)
           $(this).css({
               borderColor: "#ccc",
               color: "#000",
               background: "#fff"
           })
         })


        this.disable_left_right();
       // this.$leftAright[0].attr("disabled",true) ;
                 /* 左右按钮 点击事件 */
         this.$leftAright.on("click",function(){
             /* 左右 唯一改变的 是 标记值 */
            if($(this).hasClass("p_list_left"))
             _this.value--;
             else
             _this.value++;
            _this.disable_left_right();
           _this.creatpaging_goods_lis();})
        /* 确定按钮 点击事件 通过 input 改变 表单 */
         this.$button.on("click",()=>{
           this.value = parseInt(this.$input.val());
           this.disable_left_right();
           this.creatpaging_goods_lis();
         })
         
         //  切换排序方式
         $(".goods_sort_left > li").on("click",e=>{
         $(".goods_sort_left > li").css({
                background:"#f5f5f5",
                borderColor:"rgba(0,0,0,0)",
                color:"#000"
         }).eq(0).css({borderLeftColor:"#ccc"})
        $(e.target).css({borderColor:"#ccc",
        background:"#fff"
        })
        if($(e.target).index()==0){
        url = url1;
        }else if($(e.target).index()==3){
           url = url2;
        }else if($(e.target).index()==1){
            url = url3;
        }
    this.creatpaging_goods_lis();
    })
         }

      
      // 冻结 左右条件语句
      /* 通过 value标记 判断 左右的是否点击 通过 printer-*events类的添加和删除来实现 */
      disable_left_right(){
               this.$leftAright.removeClass("pointer-events") ;
               this.$leftAright.css("color","#000");
           if(this.value<=1)  {
               this.$leftAright.eq(0).addClass("pointer-events") ;
               this.$leftAright.eq(0).css("color","#ccc");
           } else if(this.value>=this.max){
               this.$leftAright.eq(1).addClass("pointer-events") ;
               this.$leftAright.eq(1).css("color","#ccc");
           }
      }



     /* 通过 value 标记 数字按钮的 样式变化方法。 数字按钮中需要添加 value属性 才能正确通过juqery 的属性选择器 改变指定的 按钮样式 */
      creatpaging_goods_lis(){
       this.changdisplay();
       this.$num.css({ borderColor:"#ccc", background:"none", color:"#000"})
       this.$num.not( `[value!='${this.value}']`).css({borderColor:"orangered",background:"orangered",color:"#fff"})
       new $.creatgoodslist_$({
              url: url, 
              $fat: $(".li_goods"), 
              li:str, 
              arr: goods_list_arr ,
              href:"./goods.html",
              data:{
                num:this.num,
                first:(this.value-1)*this.num,
                type:this.type
              },
              success:function(data){
               $(function() { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式
                });
                });
              }
           });
      }


      /*   判断 逻辑 方法  统一通过 this.value 标记  */
      changdisplay(){
          /* 当 value 在4时  ... 需要显示 并视影藏的数字按钮 显示出来 */
          if(this.value>=4){
              this.$span.eq(0).css("display","block");
              this.$num.eq(this.value+1).css("display","block");
              this.$num.eq(this.value+2).css("display","none");
          }else{
              /* 因为是先改变value  再执行方法。 再 value标记 退回时 需要 吧指定的数字按钮手动 设置为none 并且 ... 消失 */
           this.$num.slice(5).css("display","none");
           this.$span.eq(0).css("display","none");
          }
          /* 先余着..  */
          if(this.value>=5 && this.value<=this.max-2){
              this.$num.slice(2).css("display","block")
           this.$span.eq(1).css("display","block");
              this.$num.slice(2).html((index,html)=>{
                  return this.value-2+index;
              }).val((index, value)=>{
                  return this.value-2+index;
              })
          }else if(this.value>=this.max-2){
           this.$num.css("display","block");
           this.$span.eq(1).css("display","none");
           this.$num.slice(2).html((index,html)=>{
                  return this.max+index-4;
              }).val((index, value)=>{
                  return this.max+index-4;
              })
          }else if(this.value){
           this.$num.val(index=>{
               return index+1;
           }).html(index=>{
               return index+1;
           })
          }
       //    else if(this.value==5){
       //     this.$num.slice(2).html((index,html)=>{
       //            return this.value-2+index;
       //        }).val((index, value)=>{
       //            return this.value-2+index;
       //        })
       //    }
      }
     
     }

    $.$paging = paging;
   }(jQuery)
   /*  ----------------- 分页跳转 实例 ---------------- */
   let $pagin  =  new $.$paging({
       $leftAright:$(".p_list_goods"),    //  左右按钮
       $num:$(".paging_goods"),      // 中间 涵盖有数字的按钮
       $span:$(".paging_list_span"), // ...  样式标签   
       $input:$(".paging_input input"),  //    页面跳转 的input表单 用于 输入页码
       $button:$(".paging_input a"),   //  确定通过 input 跳转页码 
       $number:$(".paging_input span"),  //  最大数量 显示标签 
       max:40        //  跳转最大页数规定
   });

   $(".srollfiexd_a").hide();
  $(window).on("scroll",function(){
      if($(window).scrollTop()>=600)
      $(".srollfiexd_a").show(100);
      else
      $(".srollfiexd_a").hide(100);
  })






