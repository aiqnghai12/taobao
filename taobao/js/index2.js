// const url = "./";
!function(){

	//   右边的导航 
    const url = "http://10.31.162.16/";
    !function($){
      
        // 商品类表加载类
        class creatgoodslist {
            // 传入 php地址 传入父元素 传入需要分类的参数
            constructor(url,parent,Spanadd) {
                this.spanadd = Spanadd;
                this.$fat = parent;  // 父元素
                this.liList = null;
                this.first = 0;      // 商品开始的位置
                this.url = url;      
                this.bool = true;    // 延迟加载的标识
                this.init();         // 初始化 + 创建 + 添加
                if(!this.spanadd)    //  如果没有有分类的参数  则需要懒加载
                this.winScroll();
            }
    
            //  初始化
            init() {
            if(this.spanadd)
                this.num = 200
            else
                this.num = 10
    
                // 数据获取
                $.ajax({
                    type: "post",
                    url: this.url,
                    dataType: "json",
                    data:{
            // bool:this.bool,     //  通过传输bool   来实现 获取的值是哪个部分的。  获取多少  如果是1  则是hots的  获取多个
                    num:this.num ,   // 获取的数量
                    first:this.first
                    },
                    success:data=>{
              this.bool = true;
                        this.first += this.num;
              this.data = data;
                        if(this.$fat.hasClass("goods_ul_host")){
                            this.creatLiList_host();
                        }else{
                            this.creatLiList();
                        }
                        this.creatgoods_li_click();
                    }
                })
            }
        
            
            //  懒加载   
               creatLiList(){
                             var str = "";
                $.each(this.data,(index,item)=>{
                    str += `<li class="goods_li" value="${item.id}"><img src="${item.goods_img}" alt="">
                   <p>${item.goods_name}</p>
                  <h4><span>￥</span>${item.goods_price}</h4>
                  <h3><span>销量:</span>${item.goods_number}</h3>
                  <div class="Similarbaby"><p><span class="iconfont">&#xe973;</span><span>找相似</span><br>
                    <a>发现更多相似的宝贝</a>
                    </div>
                 </li>`;
                })
                this.$fat.html(this.$fat.html()+str);
               
                        
                        $(".goods_li").children().css("cursor","pointer").on("click",function(){
            let goods_id = $(this).parents(".goods_li").val();
            window.location.href =  url+"taobao/goods.html?"+goods_id;
            })
    
            $(".goods_li").hover(function(){
                $(this).children(".Similarbaby").css("bottom","0");
            },function(){
                $(this).children(".Similarbaby").css("bottom","-80px");
            })
    
    
                if(this.first>=35){
                $(window).off("scroll",this.windowlayout);
            }
                 }
                 
         winScroll(){
                $(window).on("scroll",this,this.windowlayout).attr({
                    bool:true
                })
             }
             windowlayout(e){
                 let _this = e.data;
                if(this.bool){
                    this.bool = false;
         setTimeout(()=>{
                let scroll = $(window).scrollTop();
                let top = document.body.clientHeight-document.documentElement.clientHeight;
                if(scroll+600>=top ){
                                _this.init();
                            }
                            this.bool = true;
             },400)
                            // _this.bool = true;
                }
    
    
    }
    
    
          
               creatLiList_host(){
                let str = "";
                let host_arr = [];
                $.each(this.data,(index,item)=>{
                    if(host_arr.indexOf(item.goods_class)==-1)
                    host_arr.push(item.goods_class);
                    str += `<li class="goods_li goods_host_li ${item.goods_class}"  value="${item.id}" style="display:none"><img src="${item.goods_img}" alt="">
                    <p>${item.goods_name}</p>
                     ${ (item.goods_title=="包邮" ? "<img class='baoyou' src='../src/img/baoyou.png'/>"  : `<h6>${item.goods_title}</h6>`   )}
                   <h4><span>￥</span>${item.goods_price}</h4>
                   <h3><span>销量:</span>${item.goods_number}</h3>
                  </li>`;
                })
                let host_class ="<span>"+host_arr.join("</span><span>")+"</span>";
                 
                            this.spanadd.html(host_class);
                            this.$fat.html(str);
                $(`.${ host_arr[0] }`).slice(0,10).css("display","block");
                this.spanadd.on("click","span",function(){
                    $(`.goods_host_li`).css("display","none");
                    $(`.${$(this).html()}`).slice(0,10).css("display","block");
                })
    }
    
    
          creatgoods_li_click(){
            $(".goods_li").children().css("cursor","pointer").on("click",function(){
            let goods_id = $(this).parents(".goods_li").val();
            window.location.href =  url+"taobao/goods.html?"+goods_id;
            })
            }
    
        }
    
            $.creatgoodslist_$ = creatgoodslist;
        }(jQuery)
                             //  并给所有的li中除li以外的元素添加手型以及 点击详情页.
        
    
        ///  数据创建 商品页面   
        creatgoods_li_on();

        function creatgoods_li_on(){
            
            new $.creatgoodslist_$(url + "php/data/goods_all.php",$(".goods_ul_host"),$(".goods_class"));
            new $.creatgoodslist_$(url + "php/data/goods_all.php",$(".goods_ul_tuijian"));
    }
    
    
    
    //  右边的悬浮条子 
    !function($){
    const $fixedtool = $(".fixedtool");
    // 悬浮的说有个例   
    const $liList = $(".fixedtool li");
        let top_ = $fixedtool.offset().top;
        let prv = $liList.eq(0).css("background","orangered").children("a").css("color","#fff").parent()
        onclickascroll();
        hoverli();
    function onclickascroll(){
        $(window).on("scroll",function(){
            scrollwin();
        })
         $liList.on("click",function(){
             // 关闭滚动事件    
            $(window).off("scroll",scrollwin);
                
            //  点击返回顶上的
                if($(this).index(".fixedtool li")==5 || $(this).index(".fixedtool li")==0){
                    scroolli($liList.eq(0),1);}
                // 淘宝推荐
                if($(this).index(".fixedtool li")==4){
                    let litop = $("#taobao_tuijian").offset().top;
                    scroolli(this,litop-50);
                }
                // 热卖单品
                     if($(this).index(".fixedtool li")==3){
                     let litop =  $(".goods_host").offset().top;
                     scroolli(this,litop-50);
                }
                // 品质特色
                if($(this).index(".fixedtool li")==2){
                    let litop =  $(".fashion").offset().top;
                    scroolli(this,litop-50);
               }
               // 好店直播
               if($(this).index(".fixedtool li")==1){
                let litop =  $(".good_shop").offset().top;
                scroolli(this,litop-50);
           }
    
                // 动画结束后 开启滚动事件
            setTimeout(() => {
            $(window).on("scroll",scrollwin);
         }, 300); 
         })
        }
    function scroolli(_this,top){
        if(top)
        $("html,body").stop(true).animate({scrollTop:top-50},300);
        prv.css("background","#fff").children("a").css("color",prv.attr("value"));
        prv = $(_this).css("background","orangered").children("a").css("color","#fff").parent();
    }
    
    function hoverli(){
        $liList.slice(0,5).hover(
                function(){
          $(this).css("background","orangered").children("a").css("color","#fff");
            },function(){
                if($(this).attr("value")!==prv.attr("value"))
                $(this).css("background","#fff").children("a").css("color",$(this).attr("value"));
            })
    }
    
    
    // 滚动事件开启
    function scrollwin(){
        let fixedtoolli = $(".fixedtool li");
     let scroll = $(window).scrollTop();
         if(scroll>=top_ ){
             $fixedtool.css({
                 position:"absolute",
                 top:scroll+50+"px"
             })
             fixedtoolli.eq(5).css({
                 height:"50px"
             })
         }else{
            $fixedtool.css({
                 position:"absolute",
                 top:top_+"px"
             })
             fixedtoolli.eq(5).css({
                 height:0
             })
         }
         scroll +=300;
         if(scroll>=  $("#taobao_tuijian").offset().top){
            scroolli(fixedtoolli[4])  ;
         }else if(scroll>= $(".goods_host").offset().top){
            scroolli(fixedtoolli[3])  ;
         }else if(scroll>= $(".fashion").offset().top){
            scroolli(fixedtoolli[2])  ;
         }else if(scroll>= $(".good_shop").offset().top){
            scroolli(fixedtoolli[1])  ;
         }else{
            scroolli(fixedtoolli[0]) 
         }
          

    }
    }(jQuery)
    
    
    
     
     setTimeout(function(){
     
      //在js中引入
      $(document).ready(function () {
            $('#hearhtml').load('hear.html');
        });
     
     },1000);
    
     
}()