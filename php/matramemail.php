<?php
//    邮箱验证   通过url带验证码    让验证码为true。


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
      $ip = $_SERVER["REMOTE_ADDR"];
  }else{
    exit("非法操作");
}

// $query = $conn->query(" select * from emaildata where email = '{$email}' and ip = '{$ip}'");
// while($row = $query->fetch_assoc()){
//     $bool = $row['stop'];
// }
//  测试阶段
$query = $conn->query(" select * from emaildata where email = '{$email}' and ip = '{$ip}'");
$row = $query->fetch_assoc()

$sql ="update emaildata set stop ='1' where email='{$email}' and ip = '{$ip}'";
$query = $conn->query($sql);

if($row){
    exit "不能重复发送";
}

//    通过死循环，不断的寻找邮箱有没有验证好。      如果在两分钟之内还没有验证好 ajax则断开，返回错误。
//    通过$bool 的 false和true进行 循环的标记。  当值被验证 则跳出循环。返回数据。
$bool = true;
while($bool){
    $query = $conn->query(" select * from emaildata where email = '{$email}' and really = '1' and ip = '{$ip}'");
    while($query->fetch_assoc()){
        $bool = false;
    }
}
//   当邮箱验证完成后，则发送跳转页面，   前端就算直接进入，也要再次判断邮箱的really的值有没有验证为1. 有则注册并完成账号密码的写入，否则显示邮箱未完成。
echo 'http://10.31.162.16/taobao/newUsermailPassword.html';
$conn -> close();

