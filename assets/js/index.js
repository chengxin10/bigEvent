$(function () {
    //显示注册
    $("#link_reg").on("click", function () {
        $(".login-box").hide().siblings(".reg-box").show();
    })
    //显示登录
    $("#link_login").on("click", function () {
        $(".reg-box").hide().siblings(".login-box").show();
    })

    var form = layui.form;

    //表单验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return ("两次输入的密码不一致！")
            }
        }
    })
    //注册
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()

        };
        $.post("http://ajax.frontend.itheima.net/api/reguser", data,
            function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg(res.message, { icon: 1 });
                $("#link_login").click();
            })
    })

    //登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: " http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 1 });
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })

})