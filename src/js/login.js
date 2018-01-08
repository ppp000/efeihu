/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 17:10:27
*/
require.config({

    paths:{
        'jq':'../lib/jquery-3.2.1'
    },
    shim:{
    }
});

require(['jq'],function(){

    var username = document.querySelector('#username');
    var nextUn = username.nextElementSibling;
    var password = document.querySelector('#password');
    var nextPw = password.nextElementSibling;

    //输入时提示
    username.onfocus = function(){
        var _username = username.value;
        nextUn.innerHTML = '4-20位字符，可由英文，数字组成，字母开头';
        nextUn.style.display = 'block';

        username.onblur = function(){
            var reg = /^[a-z][\da-z\-]{3,19}$/i;
            if(!reg.test(_username)){
                $(nextUn).html('用户名格式不正确');
                return false;
            }
            $(nextUn).html('');
            nextUn.style.display = 'none';
        }
    }

    password.onfocus = function(){
        var _password = password.value;
        nextPw.innerHTML = '6-16位字符，可由英文，数字,特殊字符组成';
        nextPw.style.display = 'block';

        password.onblur = function(){
            var reg = /^\S{5,19}$/;
            if(!reg.test(_password)){
                $(nextPw).html('密码格式不正确');
                return false;
            }
            $(nextPw).html('');
            nextPw.style.display = 'none';
        }
    }


    //提交表单
    $('.btn').click(function(){
        var _username = $('#username').val();
        var _password = $('#password').val();

        $.ajax({

            url:'../api/login.php',
            data:{
                username:_username,
                password:_password
            },
            success:function(data){
                if(data.slice(0,2) == 'ok'){
                    $('<div/>').html('注册成功').addClass('active').appendTo($(document.body));
                }
                else{
                    $('<div/>').html('注册失败').addClass('active').appendTo($(document.body));
                }
            }
        })
        
    })

    //生成验证码
    function createCode(){
        var res = parseInt(Math.random()*10000);

        // 如果不够4位
        if(res<10){
            res = '000' +  res;
        }else if(res<100){
            res = '00' + res;
        }else if(res<1000){
            res = '0' + res;
        }
        return res;
    }
    var $show_yzm = $('.show_yzm');
    $show_yzm.html(createCode());

})
