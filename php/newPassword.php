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
      $password = $_POST["password"];
  }else{
    exit("非法操作");
}

$bool = false;
//  验证 邮箱是否验证成功  成功really为1
$sql =" select * from emaildata where email = '{$email}' and really = '1'";
$query = $conn->query($sql);
while($query->fetch_assoc()){
    $bool = true;
}
//     邮箱标记 clear 为1    1则表示 验证过了
$sql ="update emaildata set clear ='1' where email='{$email}'";
$query = $conn->query($sql);

//  如果验证成功   
if($bool){
//   用户信息注册成功后 放入 user_email 数据库表
$sql ="INSERT INTO user_email(id,email,password,data) values(null,'{$email}','{$password}',NOW())";
$query = $conn->query($sql);
//  游侠验证成功了   但信息不完整.
if($query)
echo "成功";
else{
echo "失败";
}
}else{
echo "邮箱缺少验证";
}
$conn -> close();

