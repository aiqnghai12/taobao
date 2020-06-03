    //  图片滑动验证 类 案例  研究1 
    !function($){
        // 图片验证案例 
        //   option =   {$fat : $("#Image_authen"),
        //  imgs : ['./img/fengjiahua1.jpg','./img/fengjiahua2.jpg','./img/fengjiahua3.jpg'],
        //  success:function(data){
        //      console.log("成功返回")
        //  },
        //  error:function(error){
        //      console.log("失败返回")
        //  }
        // }
       class Image_authentication{
           constructor(option){
               // 颜色
               this.color = "green";
               // 图的 宽高
               this.min_width = 0.1;
               this.min_height = 0.1;

               Object.assign(this,option);
               //  获取父元素的宽高 位置
               this.w = this.$fat.width();
               this.h = this.$fat.height();
               this.x = this.$fat.offset().left;
               this.y = this.$fat.offset().top;
               this.init();
           }
           //  任务  创建3个 图片 大图img 小图url 遮掩  
           // 创建 滑动 滑动变色 文字在滑动按钮和滑动变色之间。  大小按照父元素的宽高来。
           init(){
           if( $.type( this.imgs)!== "array"){
               this.error($.type( this.imgs)+"图片需要数组");
               return false;
           }
           
           // 第一步 创建滑动 ,overflow:"hidden"
           this.$fat.css({position:"relative",overflow:"hidden"});
           // 创建滑动按钮
           this.$box = this.ce("div",{width:this.h-2+"px",height:this.h-2+"px",background:"#fff",fontSize:"12px",lineHeight:this.h-4+"px",zIndex:"100",
           border:"1px solid #000",position:"absolute",left:0,top:0,textAlign:"center",cursor:"move"},this.$fat);
           this.$box.html(">>");
           // 创建活动颜色框
           this.$box_bottom = this.ce("div",{width:this.w+"px",height:this.h+"px",background:this.color,zIndex:"80",
           position:"absolute",left:-this.w+this.h+"px",top:0},this.$fat)
           // 创建 文字 
           this.$text = this.ce("div",{width:this.w+"px",height:this.h+"px",background:"rgba(0,0,0,0)",fontSize:"12px",lineHeight:this.h+"px",zIndex:"90",
           position:"absolute",left:0,top:0,textAlign:"center"},this.$fat)
           this.$text.html("请滑动验证");
           // 任务2   创建图片 框
           this.$img_div = this.ce("div",{border:"1px solid #f5f5f5",background:"#ccc",textAlign:"center",top:this.y-30-this.w*0.6+"px",
           width:this.w+20+"px",height:this.w*0.6+20+"px"
           ,left:this.x-10+"px",position:"absolute"});
           //  创建 图片
           // 随机图片
           let src =  this.imgs[this.ramnum(0,this.imgs.length-1)];
           this.$img_max = this.ce("img",{width:this.w+"px",top:"10px",left:"10px",height:this.w*0.6+"px",
           position:"absolute"},this.$img_div);
           this.$img_max.prop("src",src);
           //  创建 小图标 
           // 创建随机位置
           this.img_x = this.ramnum(this.w*0.4,this.w-5-this.w*this.min_width);
           this.img_y = this.ramnum(5,this.w*0.6-5-this.w*this.min_width);
           this.$img_min = this.ce("div",{background:` no-repeat url(${src})`,width:this.w*this.min_width-1+"px",height:this.w*this.min_height-1+"px",     
           position:"absolute",left:"6px",top:this.img_y+10+"px",backgroundSize:`${this.w}px ${this.w*0.6}px`,zIndex:"99",
           border:"1px solid #555",
           backgroundPosition:`-${this.img_x}px -${this.img_y}px`},this.$img_div);
                   // 创建 阴影 
           this.$img_shadow = this.ce("div",{width:this.w*this.min_width+"px",height:this.w*this.min_height+"px",zIndex:"98",
           position:"absolute",left:6+this.img_x+"px",top:this.img_y+10+"px",background:"rgba(0,0,0,.4)"},this.$img_div)
           

           // 添加移动事件
           this.boxmousedown();
           }
          // 滑动静止与 开启
          closeAndopen(data){
          if(!data || data=="false" || data==false){
            this.$box.css({background:"red",cursor:"not-allowed"})
            this.$box.html("X")
              this.$box.off();
          }else{
            this.$box.css({background:"#fff",cursor:"pointer"})
            this.boxmousedown();  
            this.$box.html(">>")
          }
          return this;
          }



           // 添加移动事件
           boxmousedown(){
               // 按下
           this.$box.on("mousedown",e=>{
               // 获取点击的位置
               this.box_x = e.clientX;
               // 点击后 添加 图片盒子 img_div 到页面
            $("html").append(this.$img_div[0]);
                // 按下 移动
                $(window).on("mousemove",e=>{
                    //  移动按钮
                    let left = e.clientX-this.box_x ;
                    left <= 0 ? left=0 : (left>=this.w-this.h? left = this.w-this.h : "" )
                    this.$box.css("left",left+"px");
                    this.$box_bottom.css("left",left-this.w+"px")
                // 移动图片
                    this.$img_min.css("left",left+6+"px")
                })
                // 松开
                $(window).on("mouseup",e=>{
                    $(window).off("mousemove");
                    $(window).off("mouseup");
                
                    // 判断 图片   this.$img_min 和 图片  this.$img_shadow 阴影的 位置  
                //  高度相同   判断 x 位置  允许有误差 2 px
                this.difference = this.$img_shadow.offset().left-this.$img_min.offset().left;
                
                if( this.difference <= 2 && this.difference>= -2){
                    this.$img_min.css("left",6+this.img_x+"px")
                    this.success(this.$text);
                    this.$box.off("mousedown");
                    this.$box_bottom.animate({
                        left:0
                    },1000);
                    this.$box.animate({
                        left:this.w-this.h
                    },1000);
                    // 验证成功  删除所有图片   box 验证成功 重新 开始
                    setTimeout(() => {
                        this.$img_shadow.remove();
                        this.$img_max.remove();
                        this.$img_min.remove();
                        this.$img_div.remove();
                        this.$box.remove();
                        this.$text.html("发送成功");
                    }, 1600);
                }else{
                    this.$box.css("left",0);
                    this.$img_min.css("left",6+"px")
                    this.$box_bottom.css("left",-this.w+"px")
                }
                })  
            return false;
           })
           }
           //  随机插件
           ramnum(min,max){
           return Math.round(Math.random()*(max-min)+min);
           }
           //  jquery 创建
           ce(type,style,parent){
               let elem = document.createElement(type);
               Object.assign(elem.style,style);
               if(parent)
               parent.append(elem);
               return $(elem);
           }
       }
     $.$ImageA = Image_authentication;
    }(jQuery)