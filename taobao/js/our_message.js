!function($){
    const $table2 = $(".table2 ul");	 
 
	$(".table1 li").hover(
	function(){
		$(this).css("color","red");
	 this.timer = setTimeout(()=>{

       $table2.css("display","none").eq($(this).index()).css("display","block");

	   $(".table1 li").css({
		border:"none",fontWeight:100
	   })
	   $(this).css({
		   borderBottom:"2px solid #000",fontWeight:600
	})},100)
	
	}
	,function(){
		$(this).css("color","#000");
		clearTimeout(this.timer);
	})

    $(".table2 ul li a").hover(function(){
      this.style.color = "red";
	},function(){
		this.style.color = "#000";
	})

   $(".taobao-icons ul li").hover(
		 function(){
          
	 },function(){

	 })

$(window).on("scroll",function(){

let  top = $(window).scrollTop();

if(top>=300){
	$("#suspension").stop(true).animate({
		top:0
	})
}else{
	$("#suspension").stop(true).animate({
		top:-80
	})
}
})
	}(jQuery)