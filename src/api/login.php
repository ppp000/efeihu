<?php

    /*
        php操作数据库
            * 连接数据库： new mysqli()
            * 设置字符集：set_charset('utf8')
            * 获取查询结果集：query()
            * 使用查询结果集
                * fetch_all(MYSQLI_ASSOC)
                * fetch_assoc()
                * fetch_row()
            * 输出 echo
     */


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
    $password = isset($_GET['password']) ? $_GET['password'] : '123456';

    //查看用户名是否已经存在
    $sql = "select username from user where username='$username'";
    $result = $conn->query($sql);

    //如果失败返回fail
    if($result->num_rows>0){
        echo "fail";
    }else{
        // 密码md5加密
        $password = md5($password);

        $sql = "insert into user (username,password) values('$username','$password')";


        // 获取查询结果
        $result = $conn->query($sql);

        if ($result) {
            echo "ok";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();

?>