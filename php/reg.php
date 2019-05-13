<?php
require 'conn.php';
if (isset($_POST['tel']) || isset($_POST['submit'])) {
  $tel = @$_POST['tel'];
} else {
  exit('非法操作');
}

$query = "select * from registorlist where tel='$tel'";
$result = mysql_query($query);

if (mysql_fetch_array($result)) { //如果有值代表用户名存在。
  echo 'false'; //有重复
} else {
  echo 'true'; //没有重复
}

//如果单击注册按钮,按钮的值为注册,将表单的值添加的数据库.
if (isset($_POST['submit']) && $_POST['submit'] == "立即注册") {
  $tel = $_POST[ 'tel']; //username：表单的名称
  $pass = md5($_POST['password']);
  $confirm = $_POST['confirm'];
  //添加语句
  $query = "insert registorlist(telid,tel,password,confirm,regdate) values(null,'$tel','$pass','$confirm',NOW())";
  mysql_query($query);
  header('location:login.html'); //页面的跳转
}






?>
