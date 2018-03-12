<?php
//连接数据库
$mysqli =  mysqli_connect('localhost', 'root', 'rmk18835113134', 'rmk1');
//设置编码
mysqli_query($mysqli,"SET NAMES utf8");
if (!$mysqli){
	echo "数据库连接失败";
}
//查询留言数据
$query="select * from rmk_message order by id desc";
$result=$mysqli->query($query);
$data="";
if($result) {
	$num=1;
	if($result->num_rows>0){                                               //判断结果集中行的数目是否大于0
		while($row =$result->fetch_array() ){                        //循环输出结果集中的记录
			if($num!=$result->num_rows){
				$data .='"'.$row[0].'":{"name":"'.$row["name"].'","message":"'.$row["message"].'","date":"'.$row["date"].'"},';
			}else{
				$data .='"'.$row[0].'":{"name":"'.$row["name"].'","message":"'.$row["message"].'","date":"'.$row["date"].'"}';
			}
			$num++;
		}
		$data='{'.$data.'}';
		echo $data;
	}
}else {
	echo "查询失败";
}
$mysqli->close();
?>