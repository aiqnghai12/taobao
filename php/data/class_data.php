<?php
/* 网页分类头  数据哪取 */

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

$sql =" select * from class_data_data";
$query = $conn->query($sql);
$arr_data = array();
while($row_data = $query->fetch_assoc()){
    $arr_data[] = $row_data;
}
// echo $validation;
//  保存验证码 and validation = $validation
$sql =" select * from class_data";
$query = $conn->query($sql);
$arr = array();
while($row = $query->fetch_assoc()){
    // foreach ($row as $val){  // 遍历数组
    //     echo $val;  
    // }
$str_ = explode(" ",$row['class_id']);
$row['title'] = array();

$row['title'][] =  $arr_data[$str_[0]-1];
$row['title'][] =  $arr_data[$str_[1]-1];
$row['title'][] =  $arr_data[$str_[2]-1];
// print_r($row['title']);

// $row['title'] = $arr_data[0];

// print_r($row["title"]);
    $arr[] = $row;
}

// echo $arr[1]['title'][1]['id'];



    echo json_encode($arr);
    // echo json_encode($arr_data);
$conn -> close();

