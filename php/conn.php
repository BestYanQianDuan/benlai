<?php
header('content-type:text/html;charset="utf-8"');
//1.连接数据库
//定义常量
define('HOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');

$conn = @mysql_connect(HOST, USERNAME, PASSWORD); //@:容错,让错误不显示。
if (!$conn) {
  die('数据库连接错误:' . mysql_error());
}

//2.选择数据库,设置字符编码
mysql_select_db('benlai');
mysql_query('SET NAMES UTF8');
?>