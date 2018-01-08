<?php

    // 创建连接
    $conn = new mysqli("localhost", "root", "", "profile");

    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    } 

    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    //前端传过来的账号密码
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    //验证内容是否与数据库的记录吻合。
    $sql = "select * from user where (username='$username') AND (password='$password')";

    //执行上面的sql语句并将结果集赋给result。
    $result = $conn->query($sql);

    //如果失败返回fail
    if($result->num_rows>0){
        echo "success";
    }else{
        echo "fail";
    }
    
    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();

?>