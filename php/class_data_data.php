<?php
/*  二级菜单   数据哪取 */

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

$sql =" select * from class_data_data where id>='32'";
$query = $conn->query($sql);
$arr_data = array();
while($row_data = $query->fetch_assoc()){
    $arr_data[] = $row_data;
}

    echo json_encode($arr_data);
    // echo json_encode($arr_data);
$conn -> close();

