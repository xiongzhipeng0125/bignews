$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    var form = layui.form

    form.verify({
        //自定义名为pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //注册
    //获取layer内置方法
    var layer = layui.layer
        //注册表单注册事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                    //模拟点击行为 去登陆
                $('#link_login').click()
            }
        })
    })

    //登录
    $('#form_login').submit(function(e) {
        //阻止默认行为
        e.preventDefault()
            //获取后台数据
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')

                //将登陆成功后获取到的token字符串存储起来
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})