<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');


$sid = $_POST['arrsid'];
$row = array();
foreach($sid as $item){
$sql ="select * from goods_all where id = $item";
$query = $conn->query($sql);
if($roa = $query->fetch_assoc()){
$row[] = $roa;
}
}

echo json_encode($row);
// echo json_encode($row);
// $sql ="select * from goods_all where id = $sid";
// $query = $conn->query($sql);
// if($query){
// $row = $query->fetch_assoc();
// echo json_encode($row) ;}
// else
// echo false;
$conn -> close();