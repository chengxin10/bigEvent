$(function () {
    // 初始化富文本编辑器
    initEditor()
    var form = layui.form;
    $.ajax({
        method: "GET",
        url: "/my/article/cates",

        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return ("获取文章分类失败")
            }
            var htmlStr = template("art_cate", res);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        }
    });

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })

    $("#coverFile").on("change", function (e) {
        var files = e.target.files;
        if (files.length == 0) {
            return
        }
        var imageURL = URL.createObjectURL(files[0])
        console.log(imageURL)
        $image.cropper("destroy").attr("src", imageURL).cropper(options)

    })

    var art_states = "已发布";
    $("#btnSave2").on("click", function () {
        art_states = "草稿";
    })
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append("state", art_states);
        $image.cropper("getCroppedCanvas", {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            fd.append("cover_img", blob)
            publishArticle(fd)
        })



    })
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }

        })
    }
})