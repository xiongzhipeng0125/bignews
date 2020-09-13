$(function() {
    var layer = layui.layer
    var form = layui.form

    //获取文章类别信息

    getArticle()

    function getArticle() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                var tableHtml = template('tpl-lable', res)

                $('tbody').html(tableHtml)
            }
        })
    }


    //添加文章分类的弹框
    var cateIndex = null
    $('#btnCate').on('click', function() {
        cateIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addForm').html()
        })
    })


    //添加文章分类
    $('body').on('submit', '#form', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                getArticle()

                layer.close(cateIndex)
            }
        })
    })



    //修改文章分类

    //编辑文章分类
    var cateIndexEdit = null

    $('body').on('click', '.btnEdit', function() {
        cateIndexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#editForm').html()
        })

        var cateId = $(this).attr('data-id')

        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${cateId}`,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                form.val('edit-form', res.data)
            }
        })
    })


    //提交文章分类
    $('body').on('submit', '#editform', function(e) {

        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                layer.msg(res.message)

                getArticle()

                layer.close(cateIndexEdit)
            }
        })
    })


    //删除文章分类
    $('body').on('click', '#btn-Del', function() {
        //获取id
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    getArticle()
                    layer.close(index)
                }
            })
        })
    })
})