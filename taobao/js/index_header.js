
!function(){

	const classheader = document.querySelector("#classification .classheader ul");
	const classul = document.querySelector(".classbody .classul");
	const url = "http://10.31.162.16/taobao/";
   init();
    function init(){
     $.ajax({
		 type:"get",
		 url:url+"php/data/header_web.php",
		 success:function(data){
			 data = JSON.parse(data);
			 creatli(data);
		 }
	 });
	 $.ajax({
		 type:"get",
		 url:url+"php/data/class_data.php",
		 success:function(data){
			 data = JSON.parse(data);
		     creatli2(data);
		 }
	 });
	}
	function creatli(data){
		data.forEach((item,index)=>{
			classheader.innerHTML += `<li><a href="${item.web_href}">${item.web_name}</a></li>`;
	index == 2 ? classheader.innerHTML+= "<span style='float:left;height:10px;font-size:12px'>|</span>" : "";
		})
	}
	function creatli2(data){
	data.forEach((item,index)=>{
		//   data_message 信息
		let  str_1 = "<a>"+ item.title[0].data_message.split(" ").join("</a><a>") + "</a>";
		let  str_2 = "<a>"+ item.title[1].data_message.split(" ").join("</a><a>") + "</a>";
		let  str_3 = "<a>"+ item.title[2].data_message.split(" ").join("</a><a>") + "</a>";
    
	classul.innerHTML += `<li><a href="">${item.title[0].name}</a><span>/</span><a href="">${item.title[1].name}</a><span>/</span><a href="">${item.title[2].name}</a><span class="inc_">></span><div class="df_message">
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
	</div></li>`
	});
	class_hover();
	}


   // 鼠标移动到class li

  function class_hover(){
   var prv = null;
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

dfMessageScroll();
  }


function dfMessageScroll(){
	 
	
	 let dfmestop = 258;
     let wid = 526;
	$(window).on("scroll",()=>{
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
