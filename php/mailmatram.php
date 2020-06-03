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
if(isset($_POST['email'])){
      $email = $_POST['email'];
      $ip = $_POST["ip"];
      $matram = $_POST["matram"];
  }else{
    exit("非法操作");
}

//    更新数据库，完成ip地址  邮箱和验证码的验证。   每次发送的验证码都是唯一的。邮箱和验证码匹配 则验证 成功吧really 改为 1;
$sql ="update emaildata set really ='1' where email='{$email}' and validation='{$matram}' and  ip='{$ip}' ";
$query = $conn->query($sql);

if($query){
    echo "邮箱验证成功";
}else{
    echo "邮箱验证失败";
}


$conn -> close();

