<?php
header('content-type:text/html;charset=utf-8');
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



if(isset($_POST['text'])){
      $text = $_POST['text'];
  }else{
    exit("非法操作");
}


$sql ="INSERT INTO emaildata(id,ip,validation,email) values(null,'{$ip}','{$matram}','{$text}')";
$query = $conn->query($sql);
if($query)
echo "成功";
else{
echo "失败";
}

$conn -> close();

