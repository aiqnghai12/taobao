    const navliList =Array.from(document.querySelectorAll("nav li"));   // 不重要 
    const gouwuche= document.querySelector("#shopcar .num");
    const url = "http://10.31.162.16/";
    let cookie2 = new Cookiefn();


    initStyle();
    function initStyle(){
    navliList.forEach((item,index)=>{
    item.style.float = index<4 ? "left" : "right";
    })
    }
    
    //   -----------------  父元素添加下菜单 类-------------
    !function($){
    class  oneMenu{
    
    // 下拉框需要父元素 添加的title数组  数组对应的跳转数组  ul 的宽度  ul 相对于父元素的位置 左上角 或 右上角
    constructor(option){
        this.success = function(data){}
    Object.assign(this,option)
    this.width = !this.width ? this.$fat.innerWidth() : this.width;
    this.liList = new Array();
    this. init();

    }
    //初始化 通过
    init(){
    //  应为需要定位父元素   用到绝对定位   所以父元素需要相对定位  自家加上
    this.$fat.css("position","relative")
    // 创建 一个ul 用作定位父元素    绝对定位 父元素可视宽度                  相对父元素 位置  top 父元素高度
    this.ul = this.ce("div",{position:"absolute",background:"#fff",width:this.width+"px",display:"none"
    ,overflowY:this.sroll ? "scroll" : "none",height: this.height ? this.height+"px": "none",zIndex:"300",
    left:this.direction ? 0 :"none",border :"1px solid #ccc",
    borderTop : "none",
    right:this.direction ? "none":0,top:this.$fat.height()-2+"px"
    },this.$fat);


   
    if(!this.customLi)
    this.creatLi();
    else
    this.creatcustomLi();

    this.$fat.hover(
    ()=>{
    this.ul.style.display="block"
    },()=>{
    this.ul.style.display="none"
    })

    this.success($(this.liList));

    }

    creatLi(){
            //  遍历 添加的一级菜单的 数组   创建 li 并添加 跳转数组
    $.each(this.titleList,(index,item)=>{
        this.liList[index] = this.ce("p",{height:this.$fat.height()+"px",fontSize:"12px"
        ,lineHeight:this.$fat.height()+"px",textIndent:"1em"
        ,cursor:"pointer",background:"#fff"},$(this.ul));
        this.liList[index].index = this.hrefList[index];
        this.liList[index].textContent = item;
        })
        $(this.liList).on("click",function(){
            $(this.parent).css("display","none");
            window.location.href =  this.index
            })
        $(this.liList).hover(
            function(){
            this.style.background="#f5f5f5";
            },function(){
                this.style.background="#fff";
            })


    }


    creatcustomLi(){
    $.each(this.customLi,(index,item)=>{
        this.liList[index] = item;
      this.ul.append(item);
    })

    }

    // 创建
    ce(type,style,parent){
    let elem = document.createElement(type);
    Object.assign(elem.style,style);
    parent.append(elem);
    return elem;
    }
    }
    $.oneMenu = oneMenu;
    }(jQuery)



    let arr1 = ['全国','中国大陆','中国香港','中国台湾','中国澳门','韩国','马来西亚','澳大利亚','澳大利亚','新加坡'];
    let arr2 = ['http://10.31.162.16/taobao','http://10.31.162.16/taobao','http://10.31.162.16/taobao',
    'http://10.31.162.16/taobao','http://10.31.162.16/taobao','http://10.31.162.16/taobao','http://10.31.162.16/taobao',
    'http://10.31.162.16/taobao','http://10.31.162.16/taobao','http://10.31.162.16/taobao'];

    //   -----------------  父元素添加下菜单 实例-------------
                new $.oneMenu({
                    titleList: arr1,   // 数据
                    hrefList: arr2,   // 导向
                    width: 120,    // ul 长
                    height:150,    // ul 搞
                    sroll: 1,          // 是否需要导航条
                    $fat: $(".SelectArea"),  // 父元素
                    direction: 1   // 靠左 1  靠右 0
                });
    
                new $.oneMenu({
                    titleList: ['已买到的宝贝','我的足迹'],
                    hrefList: arr2,
                    width:100,
                    $fat: $(".our_taobao"),
                    direction: 1
                });
               
                new $.oneMenu({
                    titleList: ['收藏的宝贝','收藏的店铺'],
                    hrefList: arr2,
                    width:80,
                    $fat: $(".collection"),
                    direction: 1
                });
                arr1 = ['免费开店','已卖出的宝贝','出售中的宝贝','卖家服务市场','卖家培训中心','体检中心','问商友']
                new $.oneMenu({
                    titleList: arr1,
                    hrefList: arr2,
                    width:120,
                    $fat: $(".maijiaconter"),
                    direction: 1
                });
                new $.oneMenu({
                    titleList: ['消费者客服','卖家客服'],
                    hrefList: arr2,
                    width:100,
                    $fat: $(".CustomerService"),
                    direction: 1
                });
               //  菜单
                new $.oneMenu({
                    titleList: ['消费者客服','卖家客服'],
                    hrefList: arr2,
                    width:1200,
                    $child:$("#Webnavigation .Webnavigation"),
                    $fat: $("#Webnavigation"),
                    direction: 0
                });





// ------------------- 用户购物车操作 类 -----------
//  用户购物车操作 类  包含了购物车的显示和后台数据的交互。
// 获取cookie  验证密码和账户 点击验证防火墙 并 实现购物车的保存和传出
!function($){
    class shopcarInitialize{
        constructor(option){
        Object.assign(this,option);
        try{ // 购物车商品 id 数组
            this.arrsid =  this.cookie.selectCookie('arrsid').split(",");
           }catch{
             this.arrsid = null;
                console.log("购物车没有数据")
            }
           
        this.password = this.cookie.selectCookie("password");
        this.email = this.cookie.selectCookie("email");
        this.init();
        }

         init(){
            if(this.password){
                this.Pleaselogin.html(this.email);
                this.Pleaselogin.parent().next().css("display","none");
                this.arrclick.forEach((item,index)=>{
                    item.attr("href",this.arrhref[index]);
                })
                
                // 验证成功后  需要改变
                // 账户菜单   拥有退出个和个人
                new $.oneMenu({
                    titleList: ['个人信息','退出'],   // 数据
                    hrefList: ['http://10.31.162.16/taobao/','http://10.31.162.16/taobao/'],   // 导向
                    width: 100,    // ul 长
                    height:50,    // ul 搞
                    $fat: $("#Pleaselogin"),  // 父元素
                    direction: 1,   // 靠左 1  靠右 0
                    success:function(list){
                        list.eq(1).on("click",function(){
                            cookie2.clearCookie("email");
                            cookie2.clearCookie("password");
                        })
                    }
                });
            

            }else{
                this.arrclick.forEach((item,index)=>{
                    index == this.mytaobao ? item.html("我的淘宝") : "";
                    item.attr("href","http://10.31.162.16/taobao/denglu.html");
                })
            }



            //   通过数组id  查询到返回商品数据 传入商品数据数组
            if(this.arrsid)
            this.ajax_goods_select(this.arrsid)
            // this.creat(this.arrsid);
         }


       //  通过数组id  查询到返回商品数据  接收商品数据数组
         ajax_goods_select(arrsid){
                $.ajax({
                    type:"post",
                    url:url+"php/data/goods_select_arrsid.php",
                    data:{
                        arrsid
                    },
                    success:data=>{
                    this.data =  JSON.parse(data);
                    this.creat(this.data);
                    }
                })
 
    

          


         }
          
        
          

         // 购物车 商品添加  ，添加到 页面中。
         creat(data){
            this.liList = new Array();
         data.forEach((item,index)=>{

          this.liList[index] = this.ce("li",{
              height:"80px",width:"383px",borderTop:index!=0 ? "1px solid #ccc" : "none",
              display:"flex",justifyContent: "center",alignItems: "center",cursor:"pointer"
            });
            this.liList[index].onclick = function(){
                window.location.href =  "http://10.31.162.16/taobao/goods.html?"+item.id;
            }
        
            this.liList[index].innerHTML = `<img src="${item.goods_img}" style="height:60px"> <span style="width:250px; font-size:12px;padding:2px 5px">${item.goods_name}</span>
            <span><span style="color:red">￥</span>${item.goods_price}</span>`
         })
           




            new $.oneMenu({
               customLi:this.liList,     // 自定义li 数组
               sroll: 1,
               width:400,
               height:300,
               $fat: $("#shopcarli"),
               direction: 1  
           });
            

         }

                
         ce(type,style,parent){
            let elem = document.createElement(type);
            Object.assign(elem.style,style);
            if(parent)
            parent.append(elem);
            return elem;
        }
       

    }

$.shopcarInitialize = shopcarInitialize;
}(jQuery)


//  购物车验证类   传入 在用户登录前后不同点击的按钮  
let arrclick = [$("#shopcar"),$("#favorites"),$("#mytaobao")];
//  购物车验证类 传入 在用户登录后点击的按钮 的 跳转   和按钮一一对应
let arrhref = ["http://10.31.162.16/taobao/shopcar.html","http://10.31.162.16/taobao/shopcar.html","http://10.31.162.16/taobao/shopcar.html"];
// ------------------- 用户购物车操作 实例 -----------
new $.shopcarInitialize({cookie : new Cookiefn(),
    arrclick:arrclick
    ,arrhref:arrhref
    ,Pleaselogin:$("#Pleaselogin"),
    shopcar:0,
    success:function(data){
    },
});





//  购物车小图标方法    记录id数量  自执行  
!function gouwuchejingru(){
    if(cookie2.selectCookie('arrsid')){
    if(cookie2.selectCookie('arrsid').split(",").length==0){
        gouwuche.style.display = "none";
     }else{
        gouwuche.innerHTML= cookie2.selectCookie('arrsid').split(",").length;
        gouwuche.style.display = "block" ;
     }
    }
}()


//  用户 登录后   cookie 购物车数据 和 mysql 数据库的交互
//------------- 用户数据合并类------------
!function($){
   class userShopcar{
     constructor(option){
    Object.assign(this,option);
      
      this.user_shopcar_id = (this.arrsid ? this.arrsid.split(",") : new Array() );
      this.arr_goods_number = (this.arrnumber ? this.arrnumber.split(",") : new Array() );
      this.obtainuserShopcar();
     }

     obtainuserShopcar(){

        $.ajax({
            type:"post",
            url:url+"php/userpassword/user_email.php",
            data:{
                user:this.user,password:this.password,shopcar:1
            },
            success:data=>{
               // 如果用户没有数据
                if(data!==null){
                    let user_json_shop =  JSON.parse(data).shopcar.split(",");
                    let user_json_num = JSON.parse(data).shopcar_number.split(",");
                    // 遍历后台购物车数据   有则数据相加   否则添加进入数组
                user_json_shop.forEach((item,index)=>{
                  if( this.user_shopcar_id.indexOf(item) != -1 ){
            this.arr_goods_number[index]= parseInt(this.arr_goods_number[index])+parseInt(user_json_num[index]);
                  }else{
            this.arr_goods_number.push(user_json_num[index]);  
            this.user_shopcar_id.push(item);
                  }
                })
                this.success(this.user_shopcar_id,this.arr_goods_number);
                                    //  得到合并的数据   返回实例对象数据
                    //  后台返回合并的数据
                    this.user_shopcar_id = this.user_shopcar_id.join(",");
                    this.arr_goods_number = this.arr_goods_number.join(",");
        }else{
            this.error("用户没有购物车数据")
        }

            if(this.user_shopcar_id[0]!==null)
            $.ajax({
                type:"post",
                url:url+"php/userpassword/user_shopcar_save.php",
                data:{
                    shopcar:this.user_shopcar_id ,
                    shopcarnumber:this.arr_goods_number,
                    user:this.user,
                    password:this.password
                }
            })

     

        }
        })

    }

   }


$.$userShopcar = userShopcar;

}(jQuery)

//------------- 用户数据合并 实例------------
  new $.$userShopcar(
      {
          arrsid:cookie2.selectCookie("arrsid"),
          arrnumber:cookie2.selectCookie("arrnum"),
          user:cookie2.selectCookie("email"),
          password:cookie2.selectCookie("password"),
          success:function(arrsid,arrnum){
             cookie2.addCookie("arrsid",arrsid.join(","))
             cookie2.addCookie("arrnum",arrnum.join(","))
            ///   ------------ 输出 购物车合并的数据
            // console.log(arrsid.join(","))
            // console.log(arrnum.join(","))
          },error:function(error){
              console.log(error)
          }
      }
    );

