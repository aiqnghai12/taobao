
const inputSearch = $(".inputSearch");  //  搜索框
const inputSearch_scroll = $("#suspension .inputSearch");  //搜索框2
const searchfadaj = $(".searchfadaj");   // 小图标
const searchfadaj_scroll = $("#suspension .searchfadaj");   // 小图标
const searchinput = $(".searchinput");   // 父元素
const searchinput_scroll = $("#suspension .searchinput");
const csgoTWOSpan = $(".csgoTWO span");  // 不重要

var sousuo=0;
initStyle();
function initStyle(){
 csgoTWOSpan.on("click",()=>{
  csgoTWOSpan.parent().css("display","none");
}) 
}
window.onload = ()=>{
  //   如果 搜索框有 value 值， 则需要把图标 图标影藏.
   if( inputSearch.val()!==""){
      searchfadaj.css("display","none");
   }else{
    searchfadaj.css("display","block");
   }
   if( inputSearch_scroll.val()!==""){
    searchfadaj_scroll.css("display","none");
 }else{
  searchfadaj_scroll.css("display","block");
 }




}


//   jsosp 数据 传入   回调函数接收成功后  渲染数据
function jsonpheader(data){
   //  数据传入 
   inputselect(searchinput[0],data);  //  渲染数据方法
  //  inputselect(searchinput[1],data);
   }
//   第二个回调函数
   function jsonpheader_scroll(data){
    //  数据传入
    inputselect(searchinput_scroll[0],data);
   //  inputselect(searchinput[1],data);
    }


   // 初始化 
   class search{
      constructor(input,jsonp,searchfadaj){
   this.searchfadaj = searchfadaj;  // 小图标
   this.input = input;  //  输入框
   this.jsonp = jsonp;  // 回调函数名
      }

      creat(){
        // 添加 聚焦和改变 事件
        this.input.on("focus input",()=>{
          if( this.input.val()!==""){
            this.searchfadaj.css("display","none");
          }else{
            this.searchfadaj.css("display","block");
          }
          let scripts = document.createElement("script");
          //创建scripts  回调
          scripts.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.input.val()}&_ksTS=1589778414101_315&callback=${this.jsonp}&k=1&area=c2c&bucketid=5`
          document.body.appendChild(scripts);
       }) 
      }
}



   init();
function init(){
  //  创建数据传输的script 标签    jsonpheader 为数据 的回调函数 后面的是显示的小图标元素
     let headerSearch = new search(inputSearch,"jsonpheader",searchfadaj).creat();
    //  searchinput
    let headerSearch_scroll = new search(inputSearch_scroll,"jsonpheader_scroll",searchfadaj_scroll).creat();


      //  失去聚焦 取消所有
      inputSearch.on("blur",function(){
        setTimeout(function(){$(".inputselect_ul").remove()},100);
       })
      inputSearch_scroll.on("blur",function(){
        setTimeout(function(){$(".inputselect_ul").remove()},100);
       })



     
}

// https://suggest.taobao.com/sug?code=utf-8&q=&_ksTS=1589778414101_315&callback=jsonpheader&k=1&area=c2c&bucketid=5


// 传入搜索框和 数据  渲染数据  传入父元素和 data
function inputselect(parent,data){
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
  let li = ce("li",{height:parent.offsetHeight+"px",cursor:"pointer",fontSize:"12px",lineHeight:"28px",
  height:"28px",background:"#fff",textIndent:" 1em"},ul);
  li.innerHTML = item[0];
  
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
//  如果   有另外 携带的magic 数据  则需要二次创建.
  if(data.magic){

  //  ce("span",{},)

  new massagemin(ul,data.magic,data.result.length).creatmassage();

}
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



 class massagemin{
   //    parent 搜索框   data 数据  length 数据长度
    constructor(parent,data,length){
       this.parent = parent;
       this.data = data;
       this.length = length;
    }
    creatmassage(){
      //  小图标的添加
       this.data.forEach((item,index)=>{
         let div = ce("div",{position:"absolute",height: this.length*28+"px",background:"#f9f9f9"
      ,right:"0",top:"0",width:"300px",display:"none",paddingLeft:"20px"},this.parent)
      div.innerHTML+= `${this.parent.children[item.index-1].textContent}`;
  let spanli =  ce("span",{position:"absolute",width:"13px",
      height:"13px",right:"350px",lineHeight:"32px"},this.parent.children[item.index-1]);
      spanli.innerHTML = ">"
      item.data.forEach(item2=>{
         div.innerHTML+="<br><br>";
         /*分类 小图标信息 */
         item2.forEach(item3=>{
            div.innerHTML+= `<span style="cursor:pointer;border:1px solid #ccc;width:70px;font-size:13px;
            height:30px;line-height:30px;text-align:center;background:#fff;display:inline-block">${item3.title}</span>`;
         })
      })
      div.addEventListener("mousemove",(e)=>{
     if(e.target.tagName=="SPAN"){
        e.target.style.background = "red";
        e.target.style.color = "#fff";
     }
      })
      div.addEventListener("mouseout",(e)=>{
         if(e.target.tagName=="SPAN"){
            e.target.style.background = "#f9f9f9";
            e.target.style.color = "#888";
         }
          })
        this.parent.children[item.index-1].styleDiv = div;
         /* 初始化为1的显示 */
        index===0 ?   this.parent.children[item.index-1].style.background = "#f5f5f5":"";
        index===0 ?   this.parent.children[item.index-1].styleDiv.style.display = "block":"";
       })
    }
 }