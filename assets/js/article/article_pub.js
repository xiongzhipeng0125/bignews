$(function() {
    var form = layui.form
    var layer = layui.layer

    initArt()

    //初始化发布文章页面
    function initArt() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message)

                //调用模板引擎渲染页面
                var artHtml = template('tpl-cate', res)

                $('#choseArt').html(artHtml)

                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //选择需要上传的图片
    $('#selectImg').on('click', function() {
        $('#file').click()
    })

    //获取上传后的图片并替换成裁剪区域
    $('#file').change(function(e) {
        var files = e.target.files

        if (files.length === 0) {
            return layer.msg(res.message)
        }

        //获取到上传的图片
        var file = e.target.files[0]

        //将上传的图片转成 URL 格式
        var newImgURL = URL.createObjectURL(files[0])

        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    //定义文章的发布状态
    var art_state = '已发布'

    //为存为草稿按钮 绑定点击事件函数
    $('#saveBtn2').on('click', function() {
        art_state = '草稿'
    })


    // 处理发布文章的请求
    $('#formArt').on('submit', function(e) {
        e.preventDefault()

        //生成FormData对象
        var fd = new FormData($(this)[0])

        //将state字段添加到FormData对象中
        fd.append('state', art_state)

        //打印查看数据是否处理成功
        // fd.forEach(function(v, k) {
        //     console.log(k, v);
        // })


        // 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)

                // 6. 发起 ajax 数据请求
                publishArt(fd)
            })

    })

    //发布文章
    function publishArt(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/article/article_list.html'
            }
        })
    }

})