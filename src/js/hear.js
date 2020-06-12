
    const url = "http://10.31.162.16/";   //表头全局
    let cookie2 = new Cookiefn();    //  cookie2 全局
    const gouwuche=$("#shopcar .num");   //  购物车数量 全局
    //   -----------------  父元素添加下菜单 类-------------
    !function($){
        const navliList =$("nav li");   // 不重要 
        initStyle();
        function initStyle(){
        $.each(navliList,(index,item)=>{
        item.style.float = index<4 ? "left" : "right";
        })
        }
    class oneMenu{
    // 下拉框需要父元素 添加的title数组  数组对应的跳转数组  ul 的宽度  ul 相对于父元素的位置 左上角 或 右上角
    constructor(option){
    this.success = function(data){}
    Object.assign(this,option)
    this.width = !this.width ? this.$fat.innerWidth() : this.width;
    this.liList = new Array();
    this. init();
    }
    
    //初始化 通过0
    init(){
    //  应为需要定位父元素   用到绝对定位   所以父元素需要相对定位  自家加上
    this.$fat.css("position","relative")
    // 创建 一个ul 用作定位父元素    绝对定位 父元素可视宽度                  相对父元素 位置  top 父元素高度
    this.ul = this.ce("div",{position:"absolute",background:"#fff",width:this.width+"px",display:"none"
    ,overflowY:this.sroll ? "scroll" : "none",height: this.height ? this.height+"px": "none",zIndex:"1000",
    left:this.direction ? ( this.directionbt ? "none" : 0)  :"none",border :"1px solid #ccc",
    borderTop : "none",
    right:this.direction ? ( this.directionbt ? -this.$fat.innerWidth()-2+"px" : "none" ) : (this.directionbt ? this.width+"px" :  0   ) ,  
    top: this.directionbt ?  0  : this.$fat.height()-2+"px"
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
        ,lineHeight:this.$fat.height()+"px",textIndent:"1em",width:"100%",float:this.float ? this.float : "none"
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
    $.$oneMenu = oneMenu;
    }(jQuery)



    let arr1 = ['全国','中国大陆','中国香港','中国台湾','中国澳门','韩国','马来西亚','澳大利亚','澳大利亚','新加坡'];
    let arr2 = ['./index.html','./index.html','./index.html',
    './index.html','./index.html','./index.html','./index.html',
    './index.html','./index.html','./index.html'];

    //   -----------------  父元素添加下菜单 实例-------------
                new $.$oneMenu({
                    titleList: arr1,   // 数据
                    hrefList: arr2,   // 导向
                    width: 120,    // ul 长
                    height:150,    // ul 搞
                    sroll: 1,          // 是否需要导航条
                    $fat: $(".SelectArea"),  // 父元素
                    direction: 1   // 靠左 1  靠右 0
                });
    
                new $.$oneMenu({
                    titleList: ['已买到的宝贝','我的足迹'],
                    hrefList: arr2,
                    width:100,
                    $fat: $(".our_taobao"),
                    direction: 1
                });
               
                new $.$oneMenu({
                    titleList: ['收藏的宝贝','收藏的店铺'],
                    hrefList: arr2,
                    width:80,
                    $fat: $(".collection"),
                    direction: 1
                });
                arr1 = ['免费开店','已卖出的宝贝','出售中的宝贝','卖家服务市场','卖家培训中心','体检中心','问商友']
                new $.$oneMenu({
                    titleList: arr1,
                    hrefList: arr2,
                    width:120,
                    $fat: $(".maijiaconter"),
                    direction: 1
                });

 
                //   菜單測試-----------1    加入是否和父元素在同一行   要解決  代碼地獄
                new $.$oneMenu({
                    titleList: ['消费者客服','卖家客服'],
                    hrefList: arr2,
                    width:100,
                    $fat: $(".CustomerService"),
                    direction: 1,
                    success:function(data){
                       }
                   });

                
               //  菜单  二级    再次 添加 float 属性   用作 li的 浮动。
                // new $.$oneMenu({
                //     customLi:this.liList,     // 自定义li 数组
                //     width:1200,
                //     height:300,
                //     $fat: $("#Webnavigation"),
                //     direction: 0
                // });
            //   创建 自定义 li的闭包   
!function($){

    class creatli{
    constructor(success){
        this.success = success;
    this.LiList =  new Array();
    
    this.creatli();
    }


    creatli(){
        $.ajax({
            type:"get",
            url:url+"php/class_data_data.php",
            success:data=>{
                this.customLi(JSON.parse(data))
            }
        })
     }
      customLi(data){
        data.forEach((item,index)=>{
            switch (index) {
                    case 0: this.color = "orangered" ; this.width = $(".main1").width()/16-10+"px";
                    break;
                    case 1: this.color = "green";this.width = $(".main1").width()/12-10+"px";
                    break;
                    case 2: this.color = "orange"; this.width = $(".main1").width()/12-10+"px";
                    break;
                    case 3:this.color = "blueviolet" ;this.width = $(".main1").width()/8-10+"px";
                    break;
            }
            this.LiList[index] = this.ce("li",{width:$(".main1").width()/4-20+"px",float:"left",
             borderRight:index < data.length-1 ?"1px solid #ccc" : "none",
        padding:"8px"})
        this.ce("p",{color:this.color,fontWeight:"600"},this.LiList[index]).textContent = item.name ;
        let color = this.color;
        item.data_message.split(" ").forEach(item=>{
         this.div =  this.ce("div",{width:this.width,float:"left",
          padding:"3px 0",marginTop:"7px"},this.LiList[index])
        $(this.ce("li",{borderRadius:"3px",fontSize:"12px",display:"inline-block",cursor:"pointer",
    padding:"2px 4px"},this.div)).html(item)
        .hover(function(){
          $(this).css({background:color,color:"#fff"})
        },function(){
            $(this).css({background:"none",color:"#000"})
        })
        })
        })

        // this.success(this.LiList);
        new $.$oneMenu({
            customLi:this.LiList,     // 自定义li 数组
            width:$(".main1").width(),
            height:370,
            $fat: $("#Webnavigation"),
            direction: 0
        });
     }
 
      ce(type,style,parent){
         let elem = document.createElement(type);
         Object.assign(elem.style,style);
         if(parent)
         $(parent).append(elem);
         return elem;
     }
    }
    $.$creatli = creatli;
}(jQuery)

new $.$creatli();




// ------------------- 用户购物车操作 类 -----------
//  用户购物车操作 类  包含了购物车的显示和后台数据的交互。
// 获取cookie  验证密码和账户 点击验证防火墙 并 实现购物车的保存和传出
!function($){
    class shopcarInitialize{
        constructor(option){
        Object.assign(this,option);
        try{ // 购物车商品 id 数组
            this.arrsid =  this.cookie.selectCookie('arrsid').split(",");
           }catch(error){
             this.arrsid = null;
                console.log("购物车没有数据")
            }
           
        this.password = this.cookie.selectCookie("password");
        this.email = this.cookie.selectCookie("email");
        this.init();
        }

         init(){
            if(this.password){
                this.Pleaselogin.hover(function(){$(this).css("background","#fff")},function(){$(this).css("background","#f5f5f5")})
                this.Pleaselogin.css("padding","0 16px");
                this.Pleaselogin.html(this.email);
                this.Pleaselogin.parent().next().css("display","none");
                this.arrclick.forEach((item,index)=>{
                    item.attr("href",this.arrhref[index]);
                })
                
                // 验证成功后  需要改变
                // 账户菜单   拥有退出个和个人
                new $.$oneMenu({
                    titleList: ['个人信息','退出'],   // 数据
                    hrefList: ['./index.html','./index.html'],   // 导向
                   
                    $fat: $("#Pleaselogin"),  // 父元素
                    direction: 1,   // 靠左 1  靠右 0
                    success:function(list){
                        list.eq(1).on("click",function(){
                         cookie2.clearCookie("email");
                         cookie2.clearCookie("password");
                         cookie2.clearCookie("arrsid");
                         cookie2.clearCookie("arrnum");
                        })
                    }
                });
            

            }else{
                this.arrclick.forEach((item,index)=>{
                    index == this.mytaobao ? item.html("我的淘宝") : ""; 
                    item.attr("href","./denglu.html");
                })
            }


      
            //   通过数组id  查询到返回商品数据 传入商品数据数组
            if(this.arrsid && this.arrsid[0]!=""){
            this.ajax_goods_select(this.arrsid)
            // this.creat(this.arrsid);
        }
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
                    this.data = JSON.parse(data);
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
                window.location.href =  "./goods.html?"+item.id;
            }
        
            this.liList[index].innerHTML = `<img src="${item.goods_img}" style="height:60px"> <span style="width:250px; font-size:12px;padding:2px 5px">${item.goods_name}</span>
            <span><span style="color:red">￥</span>${item.goods_price}</span>`
         })
           


            let height = this.liList.length < 4 ?  this.liList.length*82 : 320;

            new $.$oneMenu({
               customLi:this.liList,     // 自定义li 数组
               sroll: height < 310 ? 0 : 1,
               width:400,
               height,
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
let arrhref = ["./shopcarnew.html","./shopcarnew.html","./shopcarnew.html"];
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
        gouwuche.css("display","none");
     }else{
        gouwuche.html(cookie2.selectCookie('arrsid').split(",").length).css("display","block");
     }
    }
}()


//  用户 登录后   cookie 购物车数据 和 mysql 数据库的交互
//------------- 用户数据合并类------------
!function($){
   class userShopcar{
     constructor(option){
    Object.assign(this,option);
      //  如果有 arrsid 的值   则 传入 user_shopcar_id 分钟创建 array
      this.user_shopcar_id = (this.arrsid ? this.arrsid.split(",") : new Array() );
      this.arr_goods_number = (this.arrnumber ? this.arrnumber.split(",") : new Array());
      this.obtainuserShopcar();
     }

     obtainuserShopcar(){

        $.ajax({
            type:"post",
            url:url+"php/userpassword/user_email.php",
            data:{
                user:this.user,password:this.password,shopcar:1  //  数据库验证登录 是否正确
            },
            success:data=>{
               // 如果用户没有数据
               this.userdata = JSON.parse(data)
                if(data!=="null"){

                    //  data = JSON.parse(data);
                    if(this.userdata.shopcar!=""){
                      
                    let user_json_shop =  this.userdata.shopcar.split(",");
                    let user_json_num = this.userdata.shopcar_number.split(",");
                    // 遍历后台购物车数据   有则数据相加   否则添加进入数组
  
                user_json_shop.forEach((item,index)=>{
                  if(this.user_shopcar_id.indexOf(item) != -1 ){
            this.arr_goods_number[index]=parseInt(user_json_num[index]);
            
                  }else{
            this.arr_goods_number.push(user_json_num[index]);  
            this.user_shopcar_id.push(item);
                  }
                })
                this.success(this.user_shopcar_id,this.arr_goods_number);
                                    //  得到合并的数据   返回实例对象数据
                                }else{
                                    this.error("用户没有购物车数据")
                                }
        }else{
            this.error("用户错误没有登录")
        }
                    //  后台返回合并的数据
                    this.user_shopcar_id = this.user_shopcar_id.join(",");
                    this.arr_goods_number = this.arr_goods_number.join(",");
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
          },error:function(error){
              console.log(error)
          }
      }
    );

