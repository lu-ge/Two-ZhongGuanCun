var str = decodeURIComponent(window.location.search);
var arr = str.substr(6,5);
var id = str.substr(12,3);

$.get('../json/' + arr + '.json',function(res){
    console.log(res);
        var string = '';
    
    res.forEach(function(item){
         
        if(item.id  == id){
            var img = item.img.split(',');
            string += 
        `
            <div class="pc-slide">
                <div class="view">
                    <div class="swiper-container swiper-container-horizontal" id="swiper-container">
                        <a class="arrow-left" href="#"></a>
                        <a class="arrow-right" href="#"></a>
                        <div class="swiper-wrapper" style="transform: translate3d(-450px, 0px, 0px); transition-duration: 0ms;">
                            <div class="swiper-slide swiper-slide-prev" style="width:450px;">
                                <a href="#"
                                    target="_blank"><img style="width:450px;" src="../img/${img[1]}.jpg" alt=""></a>
                            </div>
                            <div class="swiper-slide swiper-slide-active" style="width:450px;">
                                <a href="#" style="display: block;"
                                    target="_blank"><img style="width:450px;" src="../img/${img[2]}.jpg" alt=""></a>
                            </div>
                            <div class="swiper-slide swiper-slide-next" style="width:450px;">
                                <a href="#" style="display: block;"
                                    target="_blank"><img style="width:450px;" src="../img/${img[3]}.jpg" alt=""></a>
                            </div>
                            <div class="swiper-slide" style="width:450px;">
                                <a href="#"
                                    target="_blank"><img style="width:450px;" src="../img/${img[4]}.jpg" alt=""></a>
                            </div>
                            <div class="swiper-slide" style="width:450px;">
                                <a href="#"
                                    target="_blank"><img style="width:450px;" src="../img/${img[5]}.jpg" alt=""></a>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="preview">
                    <a class="arrow-left" href="#"></a>
                    <a class="arrow-right" href="#"></a>
                    <div class="swiper-container swiper-container-horizontal">
                        <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
                            <div class="swiper-slide swiper-slide-active">
                                <img src="../img/${img[1]}.jpg" alt="">
                            </div>
                            <div class="swiper-slide active-nav swiper-slide-next">
                                <img src="../img/${img[2]}.jpg" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="../img/${img[3]}.jpg" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="../img/${img[4]}.jpg" alt="">
                            </div>
                           
                            <div class="swiper-slide slide5">
                                <img src="../img/${img[5]}.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="inform">
                <div class="inform-name">${item.goodName}</div>
                <div  class="inform-price">
                    <span>价<span>格</span></span>
                    <span>￥<span>${item.price}</span></span>
                </div>
                <div class="inform-count"><span>价<span>格</span></span>
                    <div class="inform-num">
                        <p>
                            <img src="../img/jian.png" alt="">
                        </p>
                        <p>1</p>
                        <p>
                            <img src="../img/jia.png" alt="">
                        </p>
                    </div>
                </div>
                <div class="inform-btn">
                    <p>加入购物车</p>
                </div>
            </div>
        `

        }

        
    })

    $(".det-content").html(string);
})



