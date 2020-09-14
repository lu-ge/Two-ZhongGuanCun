class Login{
    constructor(){
        
        this.addEvent();
        this.logEvent();
        this.arr=[false,false];
    }
    addEvent(){
        var that=this;
        // 手机号
        $("#phone").on("blur",function(){
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
            $("#pwd").on("blur",function(){
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
        $(".submit").on("click",function(){
            console.log(that.arr)
            if(that.arr.indexOf(false) === -1){
                let user_name=parseInt($("#phone").val());
                let user_pwd=$("#pwd").val();
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
                    location.href="./register.html";
                }
            }
        })
    }
}