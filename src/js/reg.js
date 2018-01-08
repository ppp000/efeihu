/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 11:50:17
*/
require.config({

    paths:{
        'jq':'../lib/jquery-3.2.1'
    },
    shim:{
    }
});

require(['jq'],function(){

    //提交表单
    $('.btn .reg').click(function(){
        var _username = $('#username').val();
        var _password = $('#password').val();

        $.ajax({

            url:'../api/reg.php',
            data:{
                username:_username,
                password:_password
            },
            success:function(data){
                if(data === 'success'){
                    console.log(data);
                    $('.btn .reg').attr('href','../index.html');
                }
                else{
                    $('<div/>').html('账号密码错误').addClass('active').appendTo($(document.body));
                }
            }
        })
        
    })

})
