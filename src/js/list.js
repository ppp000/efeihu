/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-06 14:15:13
*/
require.config({

    paths:{
        'jq':'../lib/jquery-3.2.1'
    },
    shim:{
    }
});

require(['jq'],function(){

    var dataList = document.querySelector('.dataList');
    var page = document.querySelector('.page');

    //设置当前页码数,每页条目数
    var pageNo = 1;
    var qty = 30;
    var pageNum2;


    //生成li和页码
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 &&(xhr.status===200||xhr.status===304)){
            var data = JSON.parse(xhr.responseText).data;
            var total = JSON.parse(xhr.responseText).total;
            //生成li
            dataList.innerHTML = data.map(function(item){

                var res =   `<li data-guid="${item.id}" class="dataListLi">
                                <a href="goods.html" class="imgBox"><img src="${item.img}"/></a>
                                <p class="title">${item.title}</p>
                                <p class="price">￥${item.price}</p>
                                <div class="com">
                                    <span class="star">
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                    </span>
                                    <span class="comment">${item.comment}条评论</span>
                                </div>
                                <div class="btn">
                                    <a href="#" class="buyBtn">快速购买</a>
                                    <a href="#" class="addCar">加入购物车</a>
                                </div>
                            </li>`;

                //热销
                if(item.hot === 'true'){
                    res = `<li data-guid="${item.id}" class="dataListLi">
                                <i class="hot"></i>
                                <a href="goods.html" class="imgBox"><img src="${item.img}"/></a>
                                <p class="title">${item.title}</p>
                                <p class="price">￥${item.price}</p>
                                <div class="com">
                                    <span class="star">
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                        <i class="stari"></i>
                                    </span>
                                    <span class="comment">${item.comment}条评论</span>
                                </div>
                                <div class="btn">
                                    <a href="#" class="buyBtn">快速购买</a>
                                    <a href="#" class="addCar">加入购物车</a>
                                </div>
                            </li>`;
                }

                return res;
            }).join('');

            //生成星星:data[i].star控制内循环走多少次
            //外循环：找到li下的所有i
            var li = document.querySelectorAll('.dataListLi');
            var len = data.length;
            for(let i=0;i<len;i++){
                var stari = li[i].querySelectorAll('.stari');
                for(let j=0;j<data[i].star;j++){
                    stari[j].classList.add('starNum');
                }
            }

            //生成页码
            page.innerHTML = '';
            //页数
            var pageNum = Math.ceil(total/qty);
            //把变量传递出去
            pageNum2 = pageNum;

            page.innerHTML = '<span class="prev">上一页</span>';
            for(i=1;i<=pageNum;i++){
                var span = document.createElement('span');
                span.classList.add('ym');
                span.innerText = i;
                page.appendChild(span);
                if(i==pageNo){
                    span.classList.add('active');
                }
            }
            page.innerHTML += '<span class="next">下一页</span><span class="pageNum">共'+ pageNum +'页，到第</span><input type="text" class="skip" /><span>页</span><span class="confirm">确定</span>';

            //输入分页 跳转
            var skip = document.querySelector('.skip');
            var confirm = document.querySelector('.confirm');
            confirm.onclick = ()=>{
                pageNo = skip.value;
                window.scrollTo(0,324);
                xhr.open('get',`../api/goodsList.php?pageNo=${pageNo}&qty=${qty}`,true);
                xhr.send(null);
            }        

        }
    }
    xhr.open('get',`../api/goodsList.php?pageNo=${pageNo}&qty=${qty}`,true);
    xhr.send(null);

    //点击分页切换
    //因为是请求一样的数据，不同的位置而已，故用同个xhr即可
    page.onclick = function(e){
        e = e || window.event ;
        var target = e.target || e.srcElement;

        //点击数字切换
        if(target.classList.contains('ym')){
            pageNo = target.innerText ;
            window.scrollTo(0,324);
            xhr.open('get',`../api/goodsList.php?pageNo=${pageNo}&qty=${qty}`,true);
            xhr.send(null);
        }

        //点击上下张
        if(target.classList.contains('prev')){
            pageNo--;
            //溢出处理
            pageNo<1 ? pageNo=1 : true;
            window.scrollTo(0,324);
            xhr.open('get',`../api/goodsList.php?pageNo=${pageNo}&qty=${qty}`,true);
            xhr.send(null);
        }

        if(target.classList.contains('next')){
            pageNo++;
            //溢出处理
            pageNo>pageNum2 ? pageNo=pageNum2 : true ;
            window.scrollTo(0,324);
            xhr.open('get',`../api/goodsList.php?pageNo=${pageNo}&qty=${qty}`,true);
            xhr.send(null);
        }
    }

    //点击商品切换到详情页:存储商品id
    
    $('.dataList').on('click','.dataListLi',function(){
        var guid = $(this)[0].dataset.guid;
        //默认保存一周
        var now = new Date();
        now.setDate(now.getDate()+7);
        document.cookie = 'guid=' + JSON.stringify(guid) + ';expires=' + now.toUTCString()+';path=/';
    })


    //吸顶
    var right2 = document.querySelector('.main .right2');
    var $toTop = $('.toTop');
    window.onscroll = function(){
        if(scrollY>=100){
            right2.classList.add('fixed');
            $toTop.animate({opacity:1});
        }else{
            right2.classList.remove('fixed');
            $toTop.css({opacity:0});
        }
    }

    //回到顶部
    $toTop.click(()=>{
        scrollTo(0,0); 
        $toTop.animate({opacity:0});
    })

})