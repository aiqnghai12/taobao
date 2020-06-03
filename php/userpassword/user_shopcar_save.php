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
    $shopcarnumber = $_POST['shopcarnumber'];
}else{
  exit("非法操作");
}
$sql ="update user_email set shopcar = '{$shopcar}',shopcar_number = '{$shopcarnumber}' where email = '{$user}' and password = '{$password}' ";
$query = $conn->query($sql);

if($query){
    echo "修改成功";
}else{
    echo "修改失败";
}



$conn -> close();