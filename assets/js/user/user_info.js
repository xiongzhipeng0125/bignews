$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    //获取用户基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //将获取到的数据展示到文本框中
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置信息
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })


    //更新用户信息
    $('#changeUserInfo').submit(function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //调取父页面中的方法
                window.parent.getUserInfo()
            }
        })
    })
})