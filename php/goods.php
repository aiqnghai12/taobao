<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');


$sid = $_POST['sid'];
$sql ="select * from taobaogoods where sid = $sid";
$query = $conn->query($sql);
if($query){
$row = $query->fetch_assoc();
echo json_encode($row) ;}
else
echo false;
$conn -> close();