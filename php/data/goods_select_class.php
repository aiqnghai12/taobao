<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', '123sss', 'taobao');
//@符号 php的容错处理   (js try catch finally)
if ($conn -> connect_errno) {
    // printf("Connect failed: %s\n", $conn->connect_error);
    echo "数据库连接失败";
}
$conn->query('SET names utf8');


$cat_two_id = $_POST['cat_two_id'];
$sql ="select * from goods_all where cat_two_id = '{$cat_two_id}'";
$query = $conn->query($sql);

$arr = array();
while($row = $query->fetch_assoc()){
    $arr[] = $row;
}
if($arr){
    echo json_encode($arr);
}

else
echo false;
$conn -> close();