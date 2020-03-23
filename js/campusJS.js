
/* 同步加载
    var map = new AMap.Map('container', {
        zoom:15.4,//缩放级别，数值越大则比例尺越大
        center: [117.1445210000, 34.2151070000],//中心点坐标 中国矿业大学南湖校区
        viewMode:'3D'//使用3D视图
    });

*/

//异步加载，减少阻塞
window.onLoad  = function(){
    var map = new AMap.Map('container', {
        zoom:15.4,//缩放级别，数值越大则比例尺越大
        center: [117.1445210000, 34.2151070000],//中心点坐标 中国矿业大学南湖校区
        viewMode:'3D'//使用3D视图
    });
}
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f4e095be087630133e20de9ce76e2fa8&callback=onLoad';
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);