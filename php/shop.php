<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');
$sql =' select * from taobaogoods';
$query = $conn->query($sql);
$arr = array();
while($row = $query->fetch_assoc()){
    $arr[] = $row;
}
echo json_encode($arr);
$query -> free_result();
$conn -> close();

//增
// INSERT INTO emaildata(id,ip,validation,email) values(null,'1','2','3')
// $tr = $conn->query($sql);
// $sql = "INSERT db values(null,'aiqinghai','123',1313,NOW())
// ,(null,'aiqinghai','123',1313,NOW())
// ,(null,'aiqinghai','123',1313,NOW())";
//删
// $sql = "delete from db where sid=2";
// $sql = "delete from db where sid%2=0";
// $sql = "delete from db where sid%2=0 and sid%4=0";
//改
// $sql = "update db set username ='条件' where sid=3" ;
// $sql = "update db set username ='条件',password='13554877ss' where sid=3" ;
//查
// $sql =' select * from db';
// $query = $conn->query($sql);
// $maxid = null;
// while($row = $query->fetch_array()){
//     $maxid = $row['id'];
// }

// $query->num_rows;//数据的条数
// $query->fetch_assoc();//数组


// while($row = $query->fetch_array()){
//     $arr.
// }

// if($tr){
//     echo   "成功添加";
//     //header() 函数向客户端发送原始的 HTTP 报头。
//   }
//   else {
//     echo "添加失败";
// }

// $query -> free_result();
//$conn -> close();