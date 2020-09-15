


			//获取cookie
			let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
			console.log(cookieStr);
			if(!cookieStr){
				$('.blank').css('display','block');
			}else{
				$('.blank').css('display','none');
				//转对象
				let cookieObj = convertStrToObj(cookieStr);
				//遍历布局
				for(let key in cookieObj){
					let good = cookieObj[key];
					$('.cart-content').append(
                    `
					<div class="cart-box-pro-box" data-good-id="${key}">
                        <div class="c-b-proImg">
                            <img src="${good.src}" alt="">
                        </div>
                        <span class="c-b-goodsName">${good.name}</span>
                        <span class="c-b-price">${good.price}</span>
                        <div class="c-b-proCount">
                            <span class="reduce">-</span><span class="c-b-proCount-input">${good.num}</span><span class="plus">+</span>
                        </div>
                        <span class="c-b-priceCount">${good.price * good.num}</span>
                        <span class="c-b-operation">删除</span>
                    </div>
					`);
				}
				
			
			}
			//减号
			$('.cart-box-pro-box').on('click','.reduce',function(event){
				let good_id = $(this).parent().parent().attr('data-good-id');
				let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
				//转对象
				let cookieObj = convertStrToObj(cookieStr);
				if(cookieObj[good_id].num > 1){
					cookieObj[good_id].num --;
				}			
				$.cookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
				$(this).next().html(cookieObj[good_id].num);
				$(this).parent().next().html(cookieObj[good_id].num * cookieObj[good_id].price);
			})
			//加号
			$('.cart-box-pro-box').delegate('.plus','click',function(event){
				let good_id = $(this).parent().parent().attr('data-good-id');
				let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
				//转对象
				let cookieObj = convertStrToObj(cookieStr);
				cookieObj[good_id].num ++;
							
				$.cookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
				$(this).prev().html(cookieObj[good_id].num);
				$(this).parent().next().html(cookieObj[good_id].num * cookieObj[good_id].price);
			})

			

			$('.cart-box-pro-box').on('click','.c-b-operation',function(){
				let good_id = $(this).parent().attr('data-good-id');
				let cookieStr = $.cookie('carts') ? $.cookie('carts'):'';
				let cookieObj = convertStrToObj(cookieStr);
				
				delete cookieObj[good_id];
				$.cookie('carts',JSON.stringify(cookieObj));
				$(this).parent().remove();
            })




			//商品数量
            var sum = 0;
            var allPrice = 0;
            
            let cookieObj = convertStrToObj(cookieStr);
            for(let key in cookieObj){
                let good = cookieObj[key];
                sum +=good.num;
                allPrice += good.price * good.num;
               
            }
               console.log(sum); 
            $(".cart-box .cart-class-num").html(sum);
            $(".submit .cart-choice-num").html(sum);
            $(".submit .cart-z-price-num").html(allPrice);

		   
			//清空购物车
                $('.delete-all').click(function(){
					let cookieStr = $.cookie('carts','',{expires : 7,path : '/'});
					location.href = "./cart.html";
                })
            
           
            


           
				
			
