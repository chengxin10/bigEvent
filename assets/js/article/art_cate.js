$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败")
                }
                var htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr)
            }
        });
    }
    var indexAdd = null;
    $(".layui-btn-sm").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类'
            , content: $("#dialog-add").html()
        });
    })
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("新增文章类别失败")
                }
                initArtCateList()
                layer.close(indexAdd);
                layer.msg("新增文章类别成功")
            }

        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败")
                }
                layer.msg("更新分类数据成功")
                initArtCateList()
                layer.close(indexEdit);
            }
        })
    })
    //删除
    $("body").on("click", "#btn-delete", function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
          
        $.ajax({
            method: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                console.log(res)
            }
        })
    })
})