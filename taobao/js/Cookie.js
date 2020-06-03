class Cookiefn{
    //增 改
addCookie(key,value,day){
let dat = new Date();
dat.setDate(dat.getDate()+day);
// console.log(dat.getDate())
document.cookie = `${key}=${encodeURIComponent(value)}; expires=${dat};path=/`;}
    //查
selectCookie(name){
 let arr = 0;
decodeURIComponent(document.cookie).split("; ").forEach((item,index)=>{
    if(name===item.split("=")[0]){
        arr = item.split("=")[1];
    }
}
)
return arr;
}
//删
clearCookie(name) {     
    this.addCookie(name,"",-1);
}
}