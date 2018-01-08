/* 
* @Author: Marte
* @Date:   2018-01-04 16:53:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 17:38:04
*/
require.config({

    paths:{
        'jq':'../lib/jquery-3.2.1',
    },
    
});

require(['jq'],function(){

    var container = document.querySelector('.main .container');
    var main = document.querySelector('.main');

    //取cookie
    var cookies = document.cookie ;
    //把尾部guid=00x去掉
    var ck_len = cookies.length;

    var status = [231,233,297,299,576,454,457,910];
    if(!status.includes(ck_len)){
        cookies = cookies.slice(0,ck_len-10);
    }

    if(cookies.length){
        cookies = cookies.split('; ');
        cookies.forEach(function(item){
            var arr = item.split('=');
            if(arr[0]==='list'){
                arrAll = JSON.parse(arr[1]);
            }
        })
    }
    console.log(arrAll);

    //li长度
    var len = arrAll.length;

    //页面一加载：则生成html结构
    func();

    //若无此模块：手动F12清空cookie后，回到detail.html则会在原来的基础上改变cookie
    if(cookies=='' || arrAll==''|| cookies== "list=[]"){
        console.log(cookies);
        var now = new Date();
        now.setDate(now.getDate()-100);
        document.cookie = 'list=x;expires=' + now.toUTCString();
    }

    //qty--,qty++，删除单个商品功能，输入商品数量
    main.onclick = function(e){
        e = e || window.event ;
        var target = e.target || e.srcElement;

        //qty--
        if(target.className === 'reduce'){
            
            var qty = target.nextElementSibling.value;
            var currentLi = target.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid');

            //由guid改变对应的arrAll中的qty
            for(i=0;i<arrAll.length;i++){
                if(arrAll[i].id===guid){
                    arrAll[i].qty--;
                }
            }
            //如果qty为0,相当于删除商品
            for(i=0;i<arrAll.length;i++){
                if(arrAll[i].qty===0){
                    //重新存cookie
                    arrAll.forEach(function(item,idx){
                        if(item.id == guid){
                            arrAll.splice(idx,1);
                        }
                    })
                    console.log(arrAll);
                    var now = new Date();
                    now.setDate(now.getDate()+100);
                    document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires' + now.toUTCString();

                }
            }

            //存cookie
            var now = new Date();
            now.setDate(now.getDate()+100);
            document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires' + now.toUTCString();

            //重新取新的cookie，写html                
            func();            
        }

        //qty++
        if(target.className === 'add'){
            var qty = target.previousElementSibling.value;
            var currentLi = target.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid');

            //由guid改变对应的arrAll中的qty
            for(i=0;i<arrAll.length;i++){
                if(arrAll[i].id===guid){
                    arrAll[i].qty++;
                }
            }
            console.log(arrAll,currentLi,guid);

            //存cookie
            var now = new Date();
            now.setDate(now.getDate()+100);
            document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires' + now.toUTCString();

            //重新取新的cookie，写html                
            func();            
        }

        //删除单个商品
        if(target.className === 'del'){
                       
            // 获取当前li
            var currentLi = target.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid');                 
            //重新存cookie
            arrAll.forEach(function(item,idx){
                if(item.id == guid){
                    arrAll.splice(idx,1);
                }
            })

            var now = new Date();
            now.setDate(now.getDate()+100);
            document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires' + now.toUTCString();

            //取新的cookie，写html                
            func();
        }

    }

    //输入商品数量
    // $(container).on('blur','.inputQty',function(){

    //     var guid = $(this).closest('li').attr('data-guid');
    //     var qty = this.value;

    //     //由guid改变对应的arrAll中的qty
    //     for(j=0;j<len;j++){
    //         if(arrAll[j].id==guid){
    //             arrAll[j].qty = qty;
    //         }
    //     }
    //     console.log(arrAll);

    //     //存储cookie前先看本身有无cookie(一个类似取的过程)
    //     //有则：cookie => arrAll[]
    //     var cookies = document.cookie ;
    //     if(cookies.length){
    //         cookies = cookies.split('; ');
    //         cookies.forEach(function(item){
    //             var arr = item.split('=');
    //             if(arr[0]==='list'){
    //                 arrAll = JSON.parse(arr[1]);
    //             }
    //         })
    //     }

    //     //存cookie
    //     var now = new Date();
    //     now.setDate(now.getDate()+100);
    //     document.cookie = 'list=' + JSON.stringify(arrAll) + ';expires' + now.toUTCString();

    //     //重新取新的cookie，写html                
    //     func(); 
    // })

    // inputQty.onkeydown = function(e){
    //     if(e.keyCode===13){
    //         console.log(inputQty.value);
    //     }
    // }  

    //清空购物车
    var clearBtn = document.querySelector('.clearAll .clearBtn');
    clearBtn.onclick = function(){

        container.innerHTML = '';
        //存cookie
        var now = new Date();
        now.setDate(now.getDate()+100);
        document.cookie = 'list=x;expires' + now.toUTCString();

        //清空arrAll
        arrAll = [];

        //再次给total样式              
        var total = document.createElement('li');
        total.className = 'total';
        total.innerHTML = `<span>总金额：</span>
                            <span>￥0</span>`;
        container.appendChild(total);

        main.style.height = '58px';

        //bug:清空后，回到详情页再添加，会在原来基础上添加商品
    }

    //函数：写html,并计算总价
    function func(){
        var totalPrice = 0;
        //存放总价的数组
        var arr2 = [totalPrice];
        var ul = document.createElement('ul');

        ul.innerHTML = arrAll.map(function(item){
            
            //总价、总节省的
            totalPrice = item.price * item.qty ;
            totalPrice.toFixed(2);
            arr2[0] += totalPrice;
            return `<li data-guid=${item.id}>
                        <div class="div_input">
                            <input type="checkbox" class="select" />
                        </div>
                        <img src="${item.img}"/>
                        <p class="title">${item.title}</p>
                        <div class="qty">
                            <span class="reduce">-</span>
                            <input type="text" class="inputQty" value="${item.qty}"/>
                            <span class="add">+</span>
                        </div>
                        <p class="price">${item.price}</p>
                        <p class="totalPrice">${totalPrice}</p>
                        <div class="operation">
                            <p class="del">删除</p>
                            <p class="collect">收藏</p>
                        </div>
                    </li>`;
        }).join('');
        //先清空
        container.innerHTML = '';
        //总价li
        var liTotal = document.createElement('li');
        liTotal.className = 'total';

        ul.appendChild(liTotal);
        container.appendChild(ul);

        //计算总价 arr2[0]
        var total = document.getElementsByClassName('total')[0];
        
        total.innerHTML = `<span>总金额：</span>
                            <span>${arr2[0]}</span>`;
                

        main.style.height = arrAll.length*100 + 58 + 'px';              
    }

   

})