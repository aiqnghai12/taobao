!function($){
    //     var str = `<li value="?id?">
    //   <img src="?goods_img?" alt="">
    //     <div class="title">
    //     <div class="same_style">
    //        <p>找相似</p><p>找同款</p>
    //      </div>
    //      <div class="title_back"></div>
    //     <div class="title_num">
    //        <p><span>￥</span>?goods_price?<span>包邮</span></p><p><span>?goods_number?</span>人付款</p>
    //      </div>
    //        <div class="title_text">?goods_name?</div>
    //       <div class="title_prace"><div><span><h6></h6><h6></h6><h6></h6></span><a href="">?goods_store?</a></div><p>?goods_place?</p></div>
    //       <div class="title_host"><span class="iconfont_2 iconfont_2_3"></span><span class="iconfont_2 iconfont_2_1"></span><span class="iconfont_2 iconfont_2_2"></span><span class="iconfont_down iconfont_down_2"></span></div>
    //      </div>
    // </li>`
            //   new $.creatgoodslist_$({
            //        url: url + "php/data/goods_all.php", 
            //        $fat: $(".li_goods"), 
            //        li: str, 
            //        arr: goods_list_arr ,
            //        href:url+"taobao/goods.html?",
            //        first:500
            //     });     演示
    
        // 商品类表加载类 
        class creatgoodslist {
            // 传入 php地址 传入父元素 传入需要分类的参数
            constructor(option) {
                this.first = 0; // 初始位置
                this.num = 10;  // 每次的数量
                this.liList = "";
                this.LazyLoading = false;  // 是否懒加载
                this.LazyStyle = 1;  // 懒加载类型
                this.href = "https://taobao.com" ;  // 商品点击跳转 页面
                Object.assign(this,option);
                this.init();         // 初始化 + 创建 + 添加
            }
            //  初始化
            init() {
                // 数据获取
                $.ajax({
                    type: "get",
                    url: this.url, 
                    dataType: "json",
                    data:{
                    num:this.num ,   // 获取的数量
                    first:this.first // 初始地址传递
                    },
                    success:data=>{
                        this.data = data;
                        this.creatLiList();
                        // this.creatgoods_li_click();
                    }
                })
            }
        
            
            //  懒加载   
               creatLiList(){
                   //  遍历  添加 商品  
                $.each(this.data,(index,item)=>{
                let liString =  this.arr.reduce((value,item2,index)=>{
                    return  value.replace(`?${item2}?`,item[`${item2}`]); 
                    },this.li)
                 this.liList += liString;
                })
                this.$fat.html(this.liList);
                this.creatgoods_li_click();
                 } 
          creatgoods_li_click(){
              let _this = this;
              //  带有 goods_li 类的子元素 就是商品元素 value中 含有 id 跳转用
            this.$fat.children(".goods_li").on("click",function(){
            let goods_id = $(this).val();
                window.location.href = _this.href +"?"+ goods_id;
            })
            }
        }
            $.creatgoodslist_$ = creatgoodslist;
        }(jQuery)