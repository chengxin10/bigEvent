$(function () {
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            //配置请求头

            success: function (res) {
                 console.log(res)
                // console.log(res.data)
                if (res.status !== 0) {
                    return layui.layer.msg("获取数据失败")
                }
                renderAvatar(res.data)
            },
            complete: function (res) {
                console.log(res)
                if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                    location.href = "/login.html";

                    localStorage.removeItem("token");
                }
            }
        });
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        if (user.user_pic !== null) {
            //使用图片渲染头像
            $(".layui-nav-img").attr("src", user.user_pic).show();
            $(".text-avatar").hide();
        } else {
            //使用用户名的第一个字母的大写形式渲染头像
            var first = name[0];
            $(".layui-nav-img").hide()
            $(".text-avatar").html(first.toUpperCase()).show()
        }
    }
    //退出
    $("#exitBtn").on("click", function () {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            location.href = "/login.html";
            localStorage.removeItem("token")
            layer.close(index);
        });
    })
})