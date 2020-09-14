
let str = decodeURIComponent(window.location.search);//  ?jump=count
let s_str = str.substr(1);//  jump=count
const arr = s_str.split('=')[1]; // count

$.get('../json/' + arr + '.json' , function(res){
    console.log(res);
        var string = '';
        res.forEach(function(item){
            var img = item.img.split(',')[0];
            string +=
            `
            <li class="lins">
                <a href="details.html?jump=count&${item.id}" id="${item.id}" class="image"><img src="../img/${img}.jpg" alt=""></a>
                <div class="title">
                    <a href="#">
                        ${item.goodName}
                    </a>
                </div>
                <div class="price-into">
                    ￥<span>${item.price}</span>
                    <div class="cart" id="buy"></div>
                </div>
            </li>
                
            `
        })
      $(".good-list").html(string);
})


class Cart{
    constructor(){
        this.addEvent();
    }
    addEvent(){
        //获取goodList
        $('.good-list').delegate('.lins #buy','click',function(event){
            //id
            let good_id = $(this).parent().prev().prev().attr("id");
            //src
            let good_src = $(this).parent().prev().prev().children('img').attr('src');
            //name
            let good_name = $(this).parent().prev().children('a').text();
            //价格
            let good_price = parseInt($(this).prev().text());
            
            /*
                key : carts
                value: 
                {
                    "sp1" : {

                    }
                }
            */
            //获取cookie
            let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
            //转对象
            let cookieObj = convertStrToObj(cookieStr);

            if(good_id in cookieObj){
                cookieObj[good_id].num ++;
            }else{
                cookieObj[good_id] = {
                    "name" : good_name,
                    "src" : good_src,
                    "price" : good_price,
                    "num" : 1
                }
            }
            $.cookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});

            alert('已添加购物车');
            location.href = 'cart.html';
        })
    }
}
 



			
