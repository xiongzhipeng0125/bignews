$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传按钮
    $('#uploadImg').on('click', function() {
        //模拟点击file按钮
        $('#file').click()
    })

    //上传图片
    //给一个change事件
    $('#file').on('change', function(e) {
        // console.log(e);
        //获取上传的图片的信息
        var filelist = e.target.files

        if (filelist.length === 0) {
            return layer.msg('请重新选择图片')
        }

        //获取到上传的具体图片
        var file = e.target.files[0]

        //将上传的图片转为URL格式
        var newImgURL = URL.createObjectURL(file)

        //将上传的图片替换的原来的图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })



    // 确认更改头像
    $('#sureImg').on('click', function() {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            // console.log(dataURL);

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //渲染新的头像
                window.parent.getUserInfo()
            }
        })
    })
})