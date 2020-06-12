!function($){
    
        // 商品类表加载类 
        class creatgoodslist {
            // 传入 php地址 传入父元素 传入需要分类的参数
            constructor(option) {
                this.success = function(data){};
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
            init(url) { // 重新 渲染 传入 url 时调用
              if(url){
                  this.url = url; 
              }

                if(!this.data){
                // 数据获取
                $.ajax({
                    type: "post",
                    url: this.url, 
                    dataType: "json",
                    data:{
                    num:this.num ,   // 获取的数量
                    first:this.first // 初始地址传递
                    },
                    success:data=>{
                        this.goods_data = data;
                        this.creatLiList();
                        // this.creatgoods_li_click();
                    }
                })}
                else{
                   
                $.ajax({
                    type: "post",
                    url: this.url, 
                    dataType: "json",
                    data:this.data,
                    success:data=>{
                        this.goods_data = data;
                        this.creatLiList();
                        // this.creatgoods_li_click();
                    }
                })
            }
            }
        

               creatLiList(){
                   //  遍历  添加 商品  
                $.each(this.goods_data,(index,item)=>{
                if(this.data && this.data.cat_two_id)
                if(item.id==this.data.id || index>=16){
                    return;
                }
                let liString =  this.arr.reduce((value,item2,index)=>{
                     let regExp = new RegExp("\\?"+item2+"\\?","gim");
                    return  value.replace(regExp,item[`${item2}`]); 
                    },this.li)
                 this.liList += liString;
                })
                //  针对  数据库中没有的语句，需要自行添加进入的数据  如果存在 
                if(this.data && this.data.selfdata){
                    $.each(this.data.selfdata,(key,item)=>{
                      this.liList = item.reduce((value,item,index)=>{
                        return value.replace(`?${key}?`,item);
                      },this.liList)
                       //  特殊 处理 进行了 运算
                      if(key=="goods_num")
                      this.liList = item.reduce((value,item,index)=>{
                        return value.replace(`?${key}_all?`,
                        (this.goods_data[index].goods_price*item ).toFixed(2) )
                      },this.liList)
                    })
                }
                // this.liList = this.data.arrnum.reduce()

                this.$fat.html(this.liList);
  
                this.success(this.goods_data);     //  返回查询到的数据
                if(this.href!=="none")
                this.creatgoods_li_click();
                 } 
          creatgoods_li_click(){
              let _this = this;
              //  带有 goods_li 类的子元素 就是商品元素 value中 含有 id 跳转用
            this.$fat.children(".goods_li").on("click",function(){
            let goods_id = $(this).attr("value");
                window.location.href = _this.href +"?"+ goods_id;
            })
            }
        }
            $.creatgoodslist_$ = creatgoodslist;
        }(jQuery)