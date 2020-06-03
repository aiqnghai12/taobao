<?php
/*发送邮件方法
 *@param $to：接收者 $title：标题 $content：邮件内容
 *@return bool true:发送成功 false:发送失败
 */

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
$ip = $_SERVER["REMOTE_ADDR"];
$validation = $_POST['validation'];
// echo $validation;
//  保存验证码 and validation = $validation
$sql =" select * from emaildata where email = '{$email}' and validation = '{$validation}' and ip = '{$ip}' ";
$query = $conn->query($sql);
$arr = array();
while($row = $query->fetch_assoc()){
    $arr[] = $row;
}

if($arr){
    echo "验证成功";
}else{
    echo "验证码错误";
}

$conn -> close();

