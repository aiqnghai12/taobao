const url = "http://10.31.162.16/taobao/";
	// 轮播图 大
	const lun_max = $(".main_lun .lun_max");
	const lun_max_imgs =new Array(); 
    const leftandright_max ={left:$(".lun_max .left"),right:$(".lun_max .right")};

   // 小
	const lun_min = $(".main_lun .lun_min");
	const lun_min_imgs =new Array();
    const leftandright_min ={left:$(".lun_min .left"),right:$(".lun_min .right")};

   imgajax1(lun_max_imgs,lun_min_imgs)
   function imgajax1(max,min){
      $.ajax({
		  type:"get",
		  url:url+"php/data/lun_.php",
		  success:function(data){
		  data = JSON.parse(data);
		  data.forEach(item=>{
			  if(item.name==="max"){
				max.push(item.href);
			  }else{
				  
				min.push(item.href.split("?"));
			  }
	
		  })
		   
		  init();
		  }
	  })
   }


    function init(){
	var obj_max = {
	fat : lun_max,
	imgs : lun_max_imgs,
	leftandright : leftandright_max
	}

	var obj_min = {
	fat : lun_min,
	imgs : lun_min_imgs,
	leftandright : leftandright_min
	}


    new lun_$(obj_max);
	new lun_$(obj_min);
	}

   //封装 轮播图
	!function(window){
	 class lun_{
		 constructor(option){
            Object.assign(this,option)
			this.list = new Array();
			this.liList = new Array();
			this.ul = null;
			this.w = this.fat.width();
			this.y = this.fat.height();
			this.len = this.imgs.length;
			this.num = null;
			this.prv = null;
			this.bool = true;
			this.init();
			this.leftaright();
			this.liListonclick();
			this.timerSet();
		 }


//  初始化创建   赋值   样式。
         init(){
			 this.fat.css("overflow","hidden");

			//  console.log(this.option);     图片生成 到this.list  中。
		    if(typeof this.imgs[0]==="string"){
				//  大的ul
				this.ul = this.ce("ul",{position:"absolute",background:"rgba(255,255,255,0.8)",padding:"2px",borderRadius:"8px",
				left:(this.w-7-this.imgs.length*(13))/2+"px",zIndex:"200",bottom:"20px"
				},this.fat);
				this.imgs.forEach((item,index)=>{
					this.list[index] = this.ce("img",{position:"absolute",width:this.w+"px",height:this.y+"px",display:"none"},this.fat);
					this.list[index].src = item;
					this.list[index].index = index;
					this.liList[index] = this.ce("li",{width:"10px",height:"10px",borderRadius:"50%",background:"#fff",cursor: "pointer",
					marginLeft:index==0 ?"0": "3px",float:"left"},$(this.ul));
					this.liList[index].index = index;
				}) 
				this.liList[0].style.background = "red"
                this.list[0].style.display = "flex";
                this.prv = this.list[0];
			}else{
				this.fat.css("padding-top","16px");
				//  小的ul
				this.ul = this.ce("ul",{position:"absolute",zIndex:"200",top:"15px",background:"red"
				},this.fat);
					this.imgs.forEach((item,index)=>{
					this.list[index] = this.ce("li",{position:"absolute",justifyContent:"center",alignItems: "center"
					,width:this.w+"px",height:this.y-18+"px",background:"#fff",listStyle:"none",display:"none"},this.fat);
					let len = item.length;
					this.list[index].index = index;
                    item.forEach(item=>{
						this.ce("img",{width:this.w/len-20+"px",margin:"0 5px"},$(this.list[index])).src = item;
					})

					this.liList[index] = this.ce("li",{width:this.w/this.len+"px",height:"4px",background:"#000",cursor: "pointer",
					float:"left"},$(this.ul));
					this.liList[index].index =index;
                    
				})
				// 理想生活上天猫
				this._title = this.ce("p",{position:"absolute",width:"200px",height:"50px",lineHeight:"20px",fontSize:"12px",left:"80px",top:"-2px"},this.fat)
		        this._title.innerHTML = "理想生活上天猫";
				this.num = this.ce("p",{position:"absolute",width:"20px",height:"20px",lineHeight:"20px",fontSize:"12px",right:0,top:"-2px"
			},this.fat)
			    this.num.innerHTML = `<span style='color:red'>1</span>/${this.len}`;
				this.list[0].style.display = "flex";
				this.liList[0].style.background = "red";
				this.prv = this.list[0];
			}
		 
		
	     


	     let Top = (this.y-$(this.leftandright.left).height())/2;
		 Object.assign(this.leftandright.left[0].style,{top:Top+"px",zIndex:"200",cursor: "pointer"});
		 Object.assign(this.leftandright.right[0].style,{top:Top+"px",zIndex:"200",right:0,cursor: "pointer"});

		 }
	 //  左右按钮 添加事件 功能 
         leftaright(){
			
            

			$(this.leftandright.left).on("click",e=>{
				this.leftBtnChang();
			})
		 	$(this.leftandright.right).on("click",e=>{
             this.rightBtnChang();
			})
		 }
	   
        timerSet(){
          
             this.lun_timer = setInterval(()=>{
			 this.rightBtnChang();
			 },4000)
           
		    this.leftandright.left.css("display","none");
		    this.leftandright.right.css("display","none");

			 this.fat.on("mouseover",()=>{
			    this.leftandright.left.css("display","block");
		    this.leftandright.right.css("display","block");
				 clearInterval(this.lun_timer);
			 })
			 this.fat.on("mouseout",()=>{
			    this.leftandright.left.css("display","none");
		    this.leftandright.right.css("display","none");
				this.lun_timer = setInterval(()=>{
					this.rightBtnChang();
			 },4000)
			 })
		}

        leftBtnChang(){
			if(this.bool){
				this.bool = false;
				this.index = this.prv.index==0 ? this.len-1 : this.prv.index-1;
				//  改变 liList 按钮 显示
				this.leftchang()
			  }
		}

        rightBtnChang(){
			if(this.bool){
					this.bool = false;
				this.index = this.prv.index==this.len-1 ? 0 : this.prv.index+1;
			   this.rightchang();
			  }
		}

         liListonclick(){
         $(this.ul).on("click",'li',e=>{
			if(this.bool){
              this.bool = false;
			  this.index = e.target.index;
			  if(this.index != this.prv.index)
		    	this.index < this.prv.index ? this.leftchang() : this.rightchang();
			}
		 })
		 }
        //  左轮播
		leftchang(){
			this.list[this.index].style.left = `-${this.w}px`;
				this.changliList();
                let lef = 0;
			    this.timer =   setInterval(()=>{
				this.list[this.index].style.left = `-${this.w-lef}px`;
				this.prv.style.left = `${lef}px`;
				if(lef>=this.w)
                 {
					this.list[this.index].style.left = "0";
				 clearInterval(this.timer);
				 this.prv.style.display = "none";
				 this.prv = this.list[this.index];
				 this.bool = true;
				 }
               lef +=32;
			   },16);
		}
		//  右轮播
        rightchang(){
			this.list[this.index].style.left = `${this.w}px`;
				this.changliList();
               let lef = 0;
			this.timer =   setInterval(()=>{
				this.list[this.index].style.left = `${this.w-lef}px`;
				this.prv.style.left = `${-lef}px`;
				if(lef>=this.w)
                 {
					this.list[this.index].style.left = "0";
				 clearInterval(this.timer);
				 this.prv.style.display = "none";
				 this.prv = this.list[this.index];
				 this.bool = true;
				 }
               lef +=32;
			   },16);
		}

	    changliList(){
			if(typeof this.imgs[0]==="string"){
				this.list[this.index].style.display = "block";
				this.liList[this.prv.index].style.background = "#fff";
				this.liList[this.index].style.background = "red";
			    }else{
				this.list[this.index].style.display = "flex";
				this.liList[this.prv.index].style.background = "#000";
				this.liList[this.index].style.background = "red";
				$(this.num).children("span")[0].innerHTML = this.index +1;
                }
		}


		 ce(type,style,parent){
		   let elem = document.createElement(type);
		   Object.assign(elem.style,style);
         if(parent)
		 parent.append(elem)
		 return elem;
		 }}

    window.lun_$ = lun_;
	}(window)