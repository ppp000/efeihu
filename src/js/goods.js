/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 16:59:26
*/
require.config({

    paths:{
        'jq':'../lib/jquery-3.2.1',
        'jqzoom':'../lib/jqzoom/jquery.jqzoom-2.2'
    },
    shim:{
        jqzoom:['jq']
    }
});

require(['jq','jqzoom'],function(){

    //根据list传的id生成对应商品
    var cookies = document.cookie;
    var len = cookies.length
    var guid = cookies.slice(len-4,len-1);

    //cookie为空时guid的默认值
    if(guid=='') guid=001;
    console.log(guid);

    //默认值
    if(cookies.length==10){
        guid = cookies.slice(6,9);
    }

    //当前商品
    var curGoods;

    $.ajax({
        url:'../api/data/goodsList.json',
        success:function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].id==guid){
                    curGoods = response[i];

                    //生成页面
                    var container = document.querySelector('.div5 .container');
                    container.innerHTML = '';
                    container.innerHTML = 
                        `<div class="div5_fl">
                            <div class="t_container">
                                <div class="jqzoom">
                                <img src="${curGoods.minImg}" jqimg="${curGoods.bigImg}"/>
                            </div>
                            </div>
                            <div class="b_container">
                                <img src="${curGoods.bigImg}" />
                                <img src="../img/commonBig.jpg" />
                                <img src="${curGoods.bigImg}" />
                                <img src="../img/commonBig.jpg" />
                                <i class="prev"></i>
                                <i class="next"></i>
                            </div>    
                            <div class="div5_b">
                                <a href="">浏览更多图片</a>
                                <p>分享到：</p>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div>
                        <div class="div5_fr">
                            <p class="title">${curGoods.title}</p>
                                        <p class="type">LCD-60TX85A</p>
                                        <p class="price">
                                            <span>飞虎价：</span>
                                            <span>¥ </span>
                                            <span>${curGoods.price}</span>
                                            <span class="goodsId">商品编号：${curGoods.id}</span>
                                        </p>
                                        <p class="div5_p1">
                                            本次消费最多可用9000点积分(抵现金：¥300元) 
                                            <a href="">如何获取积分？</a>
                                        </p>
                                        <p class="div5_p2">
                                            <span>温馨提示：该商品不支持</span>
                                            <span>货到付款</span>
                                        </p>
                                        <p class="div5_p3">
                                            <span>库存：</span>
                                            <span>送至</span>
                                        </p>
                                        <p class="div5_p4">
                                            <span>服务：</span>
                                            <span>由</span>
                                            <a>飞虎乐购</a>
                                            <span>发货，并提供售后服务</span>
                                        </p>
                                        <p class="div5_p5">
                                            <span>商品评价：</span>
                                            <i></i>
                                            <a href="">(共0条评论)</a>
                                        </p>
                                        <div class="buy">
                                            <div class="buy1">
                                                <span class="buy_span">我要买：</span>
                                                <span class="reduce btn">-</span>
                                                <input type="text" value="${curGoods.qty}"/>
                                                <span class="add btn">+</span>
                                            </div>
                                            <div class="buy2">
                                                <button class="buyBtn">立即购买<a href="car.html"></a></button>
                                                <button class="addCar">加入购物车<i></i></button>
                                                <a href="">分期付款<i></i></a>
                                                <a href="">加入收藏<i></i></a>
                                            </div>
                                        </div>
                        </div>
                        `
                    break;
                }
            }

            //添加购物车模块
            var addCar = document.querySelector('.div5 .addCar');
            var buyBtn = document.querySelector('.div5 .buyBtn');

            //商品id
            console.log(guid,curGoods);

            var arrAll=[];
            //存储cookie前先看本身有无cookie(一个类似取的过程)
            //有则：cookie => arrAll[]
            var cookies = document.cookie ;
            if(cookies.length){
                cookies = cookies.split('; ');
                cookies.forEach(function(item){
                    var arr = item.split('=');
                    if(arr[0]==='list'){
                        arrAll = JSON.parse(arr[1]);
                    }
                })
            }

            //点击按钮后把数据存储到cookie
            addCar.onclick = ()=>func();
            buyBtn.onclick = ()=>func(); 

            //函数：添加到购物车
            function func(e){
                e = e || window.event ;
                var target = e.target || e.srcElement ; 

                //存cookie分两种情况：商品本身为0 =>1；1=>+1
                for(i=0;i<arrAll.length;i++){
                    //商品为1 =>+1
                    var idx = arrAll[i].id;
                    if(idx==guid){
                        arrAll[i].qty++;
                        break;
                    }
                }
                console.log(arrAll);
                //两值相等说明未走上边的if，也就是qty为1;
                if(i==arrAll.length){
                    arrAll.push(curGoods);
                }

                var now = new Date();
                now.setDate(now.getDate()+100);
                document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires=' + now.toUTCString()+';path=/';
            }

        }
    })

    //放大镜:图片加载完再执行放大镜
    var timer = setTimeout(function(){
        $(".jqzoom").jqueryzoom({
            xzoom: 300, //放大图的宽度
            yzoom: 300, //放大图的高度
            offset: 5, //离原图的距离
            position: "right", //放大图的定位
            preload: 1
        });

        //底部图片hover切换实现js
        $('.b_container img').hover(function(){
          $('.jqzoom img').attr('src',$(this).attr('src'));
          $('.jqzoom img').attr('jqimg',$(this).attr('src'));
        },function(){
          $.noop();
        });
    },20)

    //回到顶部
    var $toTop = $('.toTop');
    window.onscroll = function(){
        scrollY>=100 ? $toTop.animate({opacity:1}) : $toTop.css({opacity:0});
    }

    $toTop.click(()=>{
        scrollTo(0,0); 
        $toTop.animate({opacity:0});
    })

})