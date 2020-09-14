class Register{
    constructor(){
        this.phoneEvent();
        this.signEvent();
        this.arr=[false,false,false,false];
    }
    //手机号注册
    phoneEvent(){
        this.addPhone();
        // 点击出现验证并验证验证码
        let that = this;
        $(".account-node-btn").on("click",function(){
            $(".codelook").css("display","block");
            let code = that.randomCode();
            $(".codelook").text(code)
            $(".codelook").css("color",that.randomColor());
            $(".account-note").on("blur",function(){
                $(".codelook").css("display","none");
                if($(this).val()==$(".codelook").text()){
                    $(".account-node-btn").next().text("验证成功");
                    that.arr[1]=true;
                    console.log("arr[1]=true");
                    // 验证密码
                    $("#psws").on("blur",function(){
                        if(!$(this).val()){
                            $(this).next().text("请输入你的密码");
                            return;
                        }
                        let psw_reg=/^\d{5,10}$/;
                        if(psw_reg.test(parseInt($(this).val()))){
                            $(this).next().text('正确');
                            that.arr[2]=true;
                            console.log("arr[2]=true");
                        }else{
                            $(this).next().text("密码格式不正确");
                            that.arr[2]=false;
                        }
                    })
                }else{
                   alert("验证码不正确");
                    that.arr[1]=false;
                }
            })
        })
        // 确认密码
        $("#sure").on("blur",function(){
            if(!$(this).val()){
                $(this).next().text("请再次输入密码");
                return;
            }
            let sure_reg=parseInt($("#psws").val());
            console.log(sure_reg);

            if($(this).val() == sure_reg){
                $(this).next().text('正确');
                that.arr[3]=true;
                console.log("arr[3]=true");
            }else{
                $(this).next().text("与原密码不符");
                that.arr[3]=false;
            }
        })
    }
    addPhone(){
        let that = this;
        $("#phone").on("blur",function(){
            let user_name = $(this).val();
            if(!user_name){
                $(this).next().text("请输入手机号");
                return;
            }
            let phone_reg = /^1\d{10}/;
            if(phone_reg.test(user_name)){
                $(this).next().text('正确');
                that.arr[0] = true;
                console.log("arr[0]=true")
            }else{
                $(this).next().text("手机号格式不正确");
                that.arr[0]=false;
            }
            //获取cookie
            let cookieStr = $.cookie("registers") ? $.cookie("registers") : '';
           
			let cookieObj = convertStrToObj(cookieStr);
            if(cookieObj){
                // console.log(cookieObj)
                if(user_name in cookieObj){
                    alert('手机号已存在！');
                    that.arr[0] = false;
                    return;
                }else{
                    that.arr[0] = true;
                    console.log("arr[0]=true");
                }
            }
        })
    }

    


    // 随机验证码
    randomCode(){
        var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var num="";
        for(var i=0;i<6;i++){
            var nn=parseInt(Math.random()*n.length);
            num+=n[nn];
        }
        // console.log(num)
        return num
    }
    // 随机颜色
    randomColor(){
        var col="#";
        var num="0123456789ABCDEFabcdef";
        for(var i=0;i<6;i++){
            var cc=parseInt(Math.random()*num.length);
            col+=num[cc];
        }
        return col;
    }
    signEvent(){
        let that=this;
        // 手机号
        $("#sub").on("click",function(){
            console.log(that.arr);
            if(that.arr.indexOf(false)===-1){
                //获取 用户名
                let user = $("#phone").val();
                //获取密码
                let pwd = $("#psws").val();
                //获取cookie
                let cookieStr = $.cookie("registers") ? $.cookie("registers") : '';
           
			    let cookieObj = convertStrToObj(cookieStr);
                cookieObj[user]=pwd;

                console.log(cookieObj);
                $.cookie("registers",JSON.stringify(cookieObj),{expires : 7,path : '/'});
                alert("注册成功！");
                location.href="./login.html";
            }
        })
        
    }
    
}

        
    