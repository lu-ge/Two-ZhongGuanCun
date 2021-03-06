class Login{
    constructor(){
        
        this.addEvent();
        this.logEvent();
        this.arr=[false,false];
        this.request();
    }
    addEvent(){
        var that=this;
        // 手机号
        $(".phone").on("blur",function(){
            let user_name=$(this).val();
            if(!user_name){
                alert("请输入手机号");
                return;
            }
            var phone_reg=/^1\d{10}$/;
            if(phone_reg.test(user_name)){
                that.arr[0]=true;
            }else{
                alert("输入格式不正确");
                that.arr[0]=false;
            }
            console.log(that.arr);
            // 验证密码
            $(".password").on("blur",function(){
                var psw_reg=/^\d{5,10}$/;
                if(psw_reg.test($(this).val())){
                    that.arr[1]=true;
                    // console.log("输入格式正确")
                }else{
                    alert("密码格式不正确");
                    that.arr[1]=false;
                }
            })
        })
    }
    // 点击登录
    logEvent(){
        let that = this;
        $(".loginBtn").on("click",function(){
            console.log(that.arr)
            if(that.arr.indexOf(false) === -1){
                let user_name=parseInt($(".phone").val());
                let user_pwd=$(".password").val();
                // console.log(user_name);

                let cookieStr = $.cookie("registers") ? $.cookie("registers") : '';
                let cookieObj = convertStrToObj(cookieStr);

                console.log(cookieObj);
                if(user_name in cookieObj){
                    if(user_pwd === cookieObj[user_name]){
                        alert('登录成功');
                        location.href="../index.html";
                        return;
                    }else{
                        alert("密码错误");
                    }
                    return;
                }else{
                    alert("用户名不存在,去注册");
                }
            }
        })
    }

    request(){
        $.ajax({
            type: "GET",
            url: "./php/index01.php",
            success:function (data) {
                data=JSON.parse(data);
                let str1='';
                $.each(data,(index,value)=>{
                    console.log(index,value);
                    let str=`
                    <li class="lins">
                        <a href="#" class="product">
                            <img src="${value.url}" alt="">
                            <p class="pro-name">${value.title}</p>
                            <p class="pro-price">${value.price}</p>
                        </a>
                    </li>
                    `
                    str1 += str;
                    $(".con-content-right").html(str1);
                })
            },
        })
    }
}


