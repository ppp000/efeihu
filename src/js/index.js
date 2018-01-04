/* 
* @Author: Marte
* @Date:   2018-01-02 19:48:34
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-04 14:00:56
*/

// ÉèÖÃ±ðÃû
require.config({
    // Ä¬ÈÏdata-mainÎÄ¼þËùÔÚµÄÄ¿Â¼
    // baseUrl:'js',

    // ±ðÃû/ÐéÄâÂ·¾¶
    paths:{
        'jq':'../lib/jquery-3.2.1',
        'common':'../lib/common'
    },
    shim:{
        // ÉèÖÃÒÀÀµ
        // gdszoom:['jquery']
    }
});

//¼ÓÔØÄ£¿é²»Ê¹ÓÃºó×ºÃû:js
require(['jq','common'],function(){

    //ÂÖ²¥Í¼
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
        //ÕâÀïµÄthisÎªµ±Ç°dom½Úµã£¬¶ø·Çµ÷ÓÃ¶ÔÏó
        // $(this).addClass('active')
        //     .siblings().removeClass('active');

        var $content = $('.div8 .content').children();
        var $left_li = $('.div8 .fl li');

        //»ñÈ¡µ±Ç°Ë÷ÒýÖµ
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

