$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //声明查询参数
    var q = {
        pagenum: 1, //当前的页码值
        pagesize: 2, //每页显示的条数.默认2
        cate_id: '', //文章分类的 id
        state: '' //文章的状态,已发布和草稿
    }

    //时间过滤
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
            // var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //获取文章列表
    initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var table = template('tpl-table', res)
                $('tbody').html(table)

                //调用处理分页的方法
                renderPage(res.total)
            }
        })
    }

    //渲染所有分类
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                var cateHtml = template('tpl-cate', res)
                    // console.log(cateHtml);
                $('.layui-form [name=cate_id]').html(cateHtml)

                form.render()
            }
        })
    }

    //筛选
    $('#choseForm').on('submit', function(e) {
        e.preventDefault()

        var newCate = $('[name=cate_id]').val()
        var newState = $('[name=state]').val()

        console.log(newCate);
        console.log(newState);

        q.cate_id = newCate
        q.state = newState

        initTable()
    })


    //分页处理
    function renderPage(total) {
        laypage.render({
            elem: 'renderpage', //分页展示的区域 注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页的条数
            curr: q.pagenum, //起始页面

            //页面的展示,是根据配置的顺序来展示的
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            //jump的触发方式有两种
            //1 初始化的时候 调用laypage.render
            //2 切换页码值的时候 会触发
            jump: function(obj, first) {
                q.pagenum = obj.curr

                //在jump回调函数中 可以取到所有配置的值
                //所以可以使用obj.limit 获取到最新的每页显示条数
                q.pagesize = obj.limit

                if (!first) {
                    initTable()
                }
            }
        })
    }



})