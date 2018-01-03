/* 
* @Author: Marte
* @Date:   2018-01-02 19:48:34
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-02 20:47:17
*/
document.addEventListener('DOMContentLoaded',()=>{
    var ul = document.querySelector('.div4 ul');
    var page = document.querySelector('.page');
    var lis = ul.querySelectorAll('li');
    var len = lis.length;
    var index = 0;

    //生成页码
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
        console.log($('.page_span'));
        $(lis).eq(index).fadeIn(600).siblings().fadeOut(400);

        $('.page_span').eq(index).addClass('active')
            .siblings().removeClass('active');
    },3000);

})
