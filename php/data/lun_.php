<?php
// 图数据

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


$sql =" select * from lun_";
$query = $conn->query($sql);
$arr = array();
while($row = $query->fetch_assoc()){
    $arr[] = $row;
}

if($arr){
    echo json_encode($arr);
}

$conn -> close();

