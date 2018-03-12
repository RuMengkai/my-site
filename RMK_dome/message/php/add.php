<?php
//连接数据库
$mysqli =  mysqli_connect('localhost', 'root', 'rmk18835113134', 'rmk1');
//设置编码
mysqli_query($mysqli,"SET NAMES utf8");
if (!$mysqli){
	echo "数据库连接失败";
}
//增加留言数据
$name=$_POST["name"];
$message=$_POST["message"];
$date=$_POST["date"];
$sql = "INSERT INTO rmk_message (name, message,date) VALUES ('".$name."', '".$message."','".$date."')";
if (mysqli_query($mysqli,$sql) != TRUE) {
	echo "INSERT attempt failed" ;
}
echo $sql;
$mysqli->close();
?>