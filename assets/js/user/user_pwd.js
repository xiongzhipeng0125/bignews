$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        //密码验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //新旧密码验证
        samePwd: function(value) {
            var oldPwd = $('.layui-form [name=oldPwd]').val()

            if (value === oldPwd) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            var newPwd = $('.layui-form [name=newPwd]').val()

            if (value !== newPwd) {
                return '两次密码输入不一致'
            }
        }
    })


    // 修改密码
    $('#changePwd').submit(function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //将用$获取的元素转换成dom元素 再使用reset的DOM方法重置表单
                $('#changePwd')[0].reset()

                //移除location里的token
                localStorage.removeItem('token')

                //跳转到login页面
                //top:当前窗口的最顶层浏览器窗口
                top.window.location.href = '/login.html'
            }
        })
    })
})