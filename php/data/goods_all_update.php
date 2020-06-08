<?php
$headers　= "MIME-Version: 1.0\r\n";  
$headers .= "Content-type: text/plain; charset=utf-8\r\n";  
$headers .= "Content-Transfer-Encoding: 8bit\r\n";  
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');

// if(isset($_GET['num'])){
//     $num = $_GET['num'];
// }else{
//     exit "非法操作";
// }
// echo $_GET['num'];
$arrnumber = $_POST["arrnumber"];
$sid = $_POST['arrsid'];
$row = array();


foreach($sid as $key => $item){
    $sql ="update goods_all set goods_number = '{$arrnumber[$key]}' where id=$item";
$query = $conn->query($sql);
}

$conn -> close();

