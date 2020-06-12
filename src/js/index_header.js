
!function(){
    // 二级表单创建  获取父元素
	const classheader =$("#classification .classheader ul");
	const classul =$(".classbody .classul");  // 获取二级父元素
	const url = "http://10.31.162.16/";
   init(); // 初始化
    function init(){
     $.ajax({
		 type:"get",
		 url:url+"php/data/header_web.php", // 链接数据库 进行渲染
		 success:function(data){
			 data = JSON.parse(data);   
			 creatli(data);  //成功后调用创建渲染函数
		 }
	 });
	 $.ajax({
		 type:"get",
		 url:url+"php/data/class_data.php",
		 success:function(data){
			 data = JSON.parse(data);
		     creatli2(data);    // 通过类创建调用二级类
		 }
	 });
	}
	function creatli(data){
		data.forEach((item,index)=>{
			classheader.html(classheader.html()+`<li><a href="${item.web_href}">${item.web_name}</a></li>`);
	index == 2 ? classheader.html(classheader.html()+"<span style='float:left;height:10px;font-size:12px'>|</span>") : "";
		})
	}
	function creatli2(data){
	data.forEach((item,index)=>{
		//   data_message 信息
		//    详细信息添加 到三个 类 字符串中 再一次性添加。
		let  str_1 = "<a href='./goods_list.html'>"+ item.title[0].data_message.split(" ").join("</a><a href='./goods_list.html'>") + "</a>";
		let  str_2 = "<a href='./goods_list.html'>"+ item.title[1].data_message.split(" ").join("</a><a href='./goods_list.html'>") + "</a>";
		let  str_3 = "<a href='./goods_list.html'>"+ item.title[2].data_message.split(" ").join("</a><a href='./goods_list.html'>") + "</a>";
	classul.html(classul.html()+ `<li><a href="./goods_list.html">${item.title[0].name}</a><span>/</span><a href="./goods_list.html">${item.title[1].name}</a><span>/</span><a href="./goods_list.html">${item.title[2].name}</a><span class="inc_">></span><div class="df_message">
	<div class="df_message_left">
	<div><h3>${item.title[0].name}</h3>
	${str_1}
	</div>
	<div><h3>${item.title[1].name}</h3>
	${str_2}
	</div>
	<div><h3>${item.title[2].name}</h3>
	${str_3}
	</div>
	</div>
	<div class="df_message_right"></div>
	</div></li>`) 
	})
	class_hover(); // 调用 class li 添加鼠标经过事件
}
  

   // 鼠标移动到class li
   // 创建的 class li 添加鼠标经过事件
  function class_hover(){
   var prv = null;
   //  给所用的 创建的li 添加 移动事件
	$(".classbody .classul li").hover(
	function(){
       this.timer = setTimeout(()=>{
		$(this).css({
		 background:'pink'
	  }).children("a").css("color","orangered");
	  $(this).children("span").css("color","orangered");
	  if(prv){
	  prv.css("display","none");
	}
      $(this).children(".df_message").css("display","block");
	  prv = $(this).children(".df_message");
	   },100);
	},function(){
       clearTimeout(this.timer);
		$(this).css({
		  background:'#fff'
	  }).children("a").css("color","#000");
	  $(this).children("span").css("color","#000");
	//   $(this).children(".df_message").css("display","none");
	})
$(".classbody .classul").hover("",function(){
	if(prv)
	prv.css("display","none");
})

dfMessageScroll(); // 添加滚动事件   都创建完成后 添加 滚动事件。
  }

// 
function dfMessageScroll(){
	 let dfmestop = 258;
     let wid = 526;
	$(window).on("scroll",()=>{ //  通过页面的 滚动条事件 进行 二级菜单的下移
	//  console.log($(".df_message")[0].clientHeight);
		let top = $(window).scrollTop();  
		if(top>=dfmestop && top<=dfmestop+wid){
			$(".df_message").css({
			top:top-dfmestop+50+"px"
			})
		}else{
			$(".df_message").css({
				top:"-4px"
			})
		}
	})
}
}()
