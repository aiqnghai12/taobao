<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');


if(isset($_POST['user'])){
    $user = $_POST['user'];
    $password = $_POST["password"];
    $shopcar = $_POST["shopcar"];
}else{
  exit("非法操作");
}

$sql ="select * from user_email where email = '{$user}' and password = '{$password}' ";
$query = $conn->query($sql);
$row = $query->fetch_assoc();


if($shopcar){
       echo json_encode($row);
}else{
    if($row){
        echo "1?http://10.31.162.16/taobao/index.html" ;
        }
        else
        echo "0?账号密码错误";
}



$conn -> close();