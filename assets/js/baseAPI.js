// 这个方法用于在发送ajax请求之前进行配置相关的属性
//当发送#.ajax等等方法的时候,都活先触发这个方法
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
})