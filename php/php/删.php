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
if(isset($_POST['email'])){
      $email = $_POST['email'];
  }else{
    exit("非法操作");
}
// echo $validation;
//  保存验证码 and validation = $validation
$sql = "delete from db where sid=2";
$query = $conn->query($sql);


$conn -> close();

