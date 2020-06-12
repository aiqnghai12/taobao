const inputSearch_scroll = $("#suspension .inputSearch");  //搜索框2
const searchinput_scroll = $("#suspension .searchinput");

var sousuo = 0;
//   jsosp 数据 传入

//   第二个回调函数
   function jsonpheader_scroll(data){
    //  数据传入
    inputselect(searchinput_scroll,data);
   //  inputselect(searchinput[1],data);
    }

   // 初始化
   class search{
      constructor(input,jsonp){
   this.input = input;
   this.jsonp = jsonp;
      }

      creat(){
        this.input.on('focus', ()=>{
          let scripts = document.createElement("script");
          //创建scripts  回调
          scripts.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.input.val()}&_ksTS=1589778414101_315&callback=${this.jsonp}&k=1&area=c2c&bucketid=5`
          document.body.appendChild(scripts);
       })
     
       this.input.on('input', ()=>{
        let scripts = document.createElement("script");
        //创建scripts  回调
        scripts.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.input.val()}&_ksTS=1589778414101_315&callback=${this.jsonp}&k=1&area=c2c&bucketid=5`
        document.body.appendChild(scripts);
     })
}
}
   init();
function init(){
  //  创建数据传输的script 标签    jsonpheader 为数据 的回调函数
    //  searchinput
    let headerSearch_scroll = new search(inputSearch_scroll,"jsonpheader_scroll").creat();
      //  失去聚焦 取消所有
      inputSearch_scroll.on("blur",function(){
        setTimeout(function(){$(".inputselect_ul").remove()},100);
       })
}

// https://suggest.taobao.com/sug?code=utf-8&q=&_ksTS=1589778414101_315&callback=jsonpheader&k=1&area=c2c&bucketid=5


// 传入搜索框和 数据
function inputselect(parent,data){
  parent = parent[0];
   if(parent.lastElementChild.tagName=="UL"){
      parent.lastElementChild.style.border = "none";
      $(parent.lastElementChild).remove();
   }
   //   如果有数据  则创建 下拉框
   if(data.result.length!==0){
   let ul = ce("ul",{position:"absolute",top:parent.offsetHeight-5+"px",
width:parent.offsetWidth+"px",border:"1px solid #ccc",listStyle:"none",zIndex:"1000"},parent);
    $(ul).addClass("inputselect_ul");
/* 下拉的li */
data.result.forEach((item,index)=>{
  let li = ce("li",{cursor:"pointer",fontSize:"12px",lineHeight:"28px",
  height:"28px",background:"#fff",textIndent:" 1em"},ul);
  li.innerHTML =`<strong>${inputSearch_scroll.val()}</strong>`+item[0].replace(inputSearch_scroll.val(),"");//  ---------------------
  li.addEventListener("mousemove",(e)=>{
    if(sousuo!==e.target){
    e.target.style.background = "#f5f5f5";
    if(sousuo){
    sousuo.style.background = "#fff";
    if(sousuo.styleDiv)
    sousuo.styleDiv.style.display="none";
   }
    sousuo = e.target;
    if(e.target.styleDiv)
   e.target.styleDiv.style.display="block";}
  });
 //  创建的一级搜索   添加点击事件。 
  li.addEventListener("click",()=>{
     window.location.href=`https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${item[0]}`;
  })
  })
//  ul.addEventListener("mouseout",(e)=>{

//    if(sousuo){
//       sousuo.style.background = "#fff";
//       if(sousuo.styleDiv)
//       sousuo.styleDiv.style.display="none";}
//      sousuo = 0;
// }) 

}
}

//   元素创建函数 .
   function  ce(type,style,parent){
   let elem = document.createElement(type);
   Object.assign(elem.style,style);
   if(parent){
      parent.appendChild(elem);
   }
   return elem;
 }

 //https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=阿迪达斯


