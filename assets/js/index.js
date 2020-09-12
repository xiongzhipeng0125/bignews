$(function() {
    // 获取用户数据信息
    getUserInfo()

    // 退出
    $('#btnLogout').on('click', function() {
        //提示是否确定退出登录
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储中的token
            localStorage.removeItem('token')
                //跳转回登录页面
            location.href = '/login.html'
                //关闭提示框
            layer.close(index)
        })
    })
})

//获取用户数据信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //渲染用户的信息
            renderAvatar(res.data)
        },
        // //如果不登录就手动跳转index页面 则强制跳转回login页面
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //删除token信息
        //         localStorage.removeItem('token')
        //             //跳转回登录界面
        //         location.href = '/login.html'
        //     }
        // }
    })
}


//渲染用户信息的函数
function renderAvatar(user) {
    //渲染用户的名称
    var name = user.nickname || user.username //获取昵称(优先昵称)或者用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //渲染用户的头像

    //如果返回的头像图片不是空值 name渲染图片
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //如果不是图片 则渲染文本 
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}