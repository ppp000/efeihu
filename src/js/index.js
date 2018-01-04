/* 
* @Author: Marte
* @Date:   2018-01-02 19:48:34
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-04 10:40:14
*/

// 设置别名
require.config({
    // 默认data-main文件所在的目录
    // baseUrl:'js',

    // 别名/虚拟路径
    paths:{
        'jq':'../lib/jquery-3.2.1',
        'common':'../lib/common'
    },
    shim:{
        // 设置依赖
        // gdszoom:['jquery']
    }
});

//加载模块不使用后缀名:js
require(['jq','common'],function(){
    //div1
    var $div1_li1 = $('.div1_li1');
    var $div1_ul1 = $('.div1_ul1');

    $div1_li1.on('mouseenter',function(){
        $div1_ul1.css({display:'block'});
        $div1_li1.css({background:'#fff'});
    })
    .on('mouseleave',function(){
        $div1_ul1.css({display:'none'});
        $div1_li1.css({background:''});
    })

    var $div1_li2 = $('.div1_li2');
    var $div1_ul2 = $('.div1_ul2');

    $div1_li2.on('mouseenter',function(){
        $div1_ul2.css({display:'block'});
        $div1_li2.css({background:'#fff'});
    })
    .on('mouseleave',function(){
        $div1_ul2.css({display:'none'});
        $div1_li2.css({background:''});
    })

    //轮播图
    var ul = document.querySelector('.div4 ul');
    var page = document.querySelector('.page');
    var lis = ul.querySelectorAll('li');
    var len = lis.length;
    var index = 0;

    for(var i=0;i<len;i++){
        var span = document.createElement('span');
        span.classList.add('page_span');
        i===0 && span.classList.add('active')
        page.appendChild(span);
    }

    var timer = setInterval(function(){
        index++;
        if(index>len-1){
            index = 0;
        }
        $(lis).eq(index).fadeIn(600).siblings().fadeOut(400);

        $('.page_span').eq(index).addClass('active')
            .siblings().removeClass('active');
    },3000);

    //tab
    $('.div8').on('click','.tab ul li',function(){
        //这里的this为当前dom节点，而非调用对象
        // $(this).addClass('active')
        //     .siblings().removeClass('active');

        var $content = $('.div8 .content').children();
        var $left_li = $('.div8 .fl li');

        //获取当前索引值
        var idx = $(this).index();
        $content.eq(idx).css('display','block').siblings().css('display','none');

        $left_li.eq(idx).hasClass('odd') &&
        $left_li.eq(idx).addClass('active1')
            .siblings().removeClass('active1');

        $left_li.eq(idx).hasClass('even') &&
        $left_li.eq(idx).addClass('active2')
            .siblings().removeClass('active2');
        // fadeIn(600).siblings().fadeOut(400);
        
    })

    //brand
    $div10 = $('.div10');
    $div10_box = $('.div10_box');

    $div10.on('mouseenter','img',function(){
        $(this).next().animate({top:0});
    })
    $div10_box.on('mouseleave','img',function(){
        $(this).next().stop(true).animate({top:227});
    })

    //goods
    $div12 = $('.div12');

    $div12.on('mouseenter','li',function(){
        $(this).animate({top:-4});
    })
    .on('mouseleave','li',function(){
        $(this).stop(true).animate({top:0});
    })

})

