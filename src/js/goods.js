/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-06 14:58:21
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

    //根据cookie传的id生成对应商品
    var cookies = document.cookie;
    var guid = cookies.slice(6,9);
    $.ajax({
        url:'../api/data/goodsList.json',
        success:function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].id==guid){
                    var curGoods = response[i];

                    var div5_fr = document.querySelector('.div5 .div5_fr');
                    div5_fr.innerHTML = `<p class="title">${curGoods.title}</p>
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
                                                <button class="buyBtn">立即购买</button>
                                                <button class="addCar">加入购物车<i></i></button>
                                                <a href="">分期付款<i></i></a>
                                                <a href="">加入收藏<i></i></a>
                                            </div>
                                        </div>`
                    break;
                }
            }
        }
    })

    $(function() {
        //放大镜实现js
        $(".jqzoom").jqueryzoom({
            xzoom: 300, //放大图的宽度(默认是 200)
            yzoom: 300, //放大图的高度(默认是 200)
            offset: 5, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });

        //底部图片hover切换实现js
        $('.b_container img').hover(function(){
          $('.jqzoom img').attr('src',$(this).attr('src'));
          $('.jqzoom img').attr('jqimg',$(this).attr('src'));
        },function(){
          $.noop();
        });
    });

})