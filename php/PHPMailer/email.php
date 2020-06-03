<?php
/*发送邮件方法
 *@param $to：接收者 $title：标题 $content：邮件内容
 *@return bool true:发送成功 false:发送失败
 */

 ////   php qq邮箱信息发送   解决中文乱码 解决链接问题 解决数据库存储。 信息发送
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

function sendMail($to,$title,$content) {
    // 这个PHPMailer 就是之前从 Github上下载下来的那个项目
    require './PHPMailer/PHPMailerAutoload.php';
    $mail = new PHPMailer;
    //使用smtp鉴权方式发送邮件
    $mail->isSMTP();
    //smtp需要鉴权 这个必须是true
    $mail->SMTPAuth = true;
    // qq 邮箱的 smtp服务器地址，这里当然也可以写其他的 smtp服务器地址  
   
    $mail->Host = 'smtp.qq.com';
    //smtp登录的账号 这里填入字符串格式的qq号即可
    $mail->Username = '2113587635@qq.com';
    // 这个就是之前得到的授权码，一共16位
    $mail->Password = 'mrubnrtfjfpndjfa';
    $mail->setFrom('2113587635@qq.com', 'send_user_name');
    // $to 为收件人的邮箱地址，如果想一次性发送向多个邮箱地址，则只需要将下面这个方法多次调用即可
    $mail->addAddress($to);
    $mail->CharSet = "utf-8";
    $mail->IsHTML(true);
    
    // 该邮件的主题
    $mail->Subject = $title;
    // 该邮件的正文内容
    $mail->Body = $content;
    // 使用 send() 方法发送邮件
    $mail->send();
}

function getRandomString($len, $chars=null)  
{  
    if (is_null($chars)) {  
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  
    }  
    mt_srand(10000000*(double)microtime());  
    for ($i = 0, $str = '', $lc = strlen($chars)-1; $i < $len; $i++) {  
        $str .= $chars[mt_rand(0, $lc)];  
    }  
    return $str;  
}

if(isset($_POST['text'])){
      $text = $_POST['text'];
  }else{
    exit("非法操作");
}

$matram =  getRandomString(6);
$ip = $_SERVER["REMOTE_ADDR"];

$text2 = "淘宝测试";
// $text2 = "=?UTF-8?B?".base64_encode($text2)."?=";  
$text1 = '<html><body>';
$text1.= "<a style='color:red;' href='http://10.31.162.16/taobao/mailmatram.html?ip={$ip}&matram={$matram}&email={$text}'>";
$text1.= $text2;
$text1.= '</a>    <script>
alert(ceshi2);
for(var i =0;i<20000;i++){
    console.log(i)
}
</script></body>

</html>';
//最终就可以实现发送一封URL带参数邮件的效

$subject = "淘宝模拟验证码验证";
$subject = "=?UTF-8?B?".base64_encode($subject)."?=";  





$sql =" select * from emaildata where email = '{$text}'";
$query = $conn->query($sql);
$bool = 0;

while($row = $query->fetch_assoc()){

    if($row['clear']) {
        echo 1;
        exit;
    }
    $bool = 1;
}

// 调用发送方法，并在页面上输出发送邮件的状态
var_dump(sendMail($text,$subject,$text1));

if($bool){
$sql ="update emaildata set validation ='{$matram}' where email='{$text}'";
$query = $conn->query($sql);
}else{
    //  保存验证码
$sql ="INSERT INTO emaildata(id,ip,validation,email) values(null,'{$ip}','{$matram}','{$text}')";
$query = $conn->query($sql);
if($query)
echo "成功";
else{
    echo "失败";
}
}
$conn -> close();

