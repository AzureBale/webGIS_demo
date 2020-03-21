// 初始化地图对象，加载地图
var map = new AMap.Map("container", {
    resizeEnable: true, //可缩放
    center: [117.1445210000, 34.2151070000],//中心点坐标 中国矿业大学南湖校区
    zoom: 15.5 //地图显示的缩放级别
});

//###路径规划函数封装：
function walkingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
    //传入的四个参数依次为：第一个点的经度、纬度，第二个点的经度、纬度
    //--步行规划实例化  
    var walking = new AMap.Walking({
    map: map,
    panel: "panel"
    }); 
    /*声明四个局部变量来获取传入的四个参数*/
    var Longitude1 = aLongitude; 
    var Latitude1 = bLatitude;
    var Longitude2 = xLongitude;
    var Latitude2 = yLatitude;  
    //下面使用步行规划的.search方法 
    walking.search([Longitude1, Latitude1], [Longitude2,Latitude2], function(status, result) {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            log.success('绘制步行路线完成')
        } else {
            log.error('步行路线数据查询失败' + result)
        } 
    });
}

function ridingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
       //骑行导航
    var Longitude1 = aLongitude; 
    var Latitude1 = bLatitude;
    var Longitude2 = xLongitude;
    var Latitude2 = yLatitude; 

    var riding = new AMap.Riding({
        map: map,
        panel: "panel"
    }); 
    //根据起终点坐标规划骑行路线
    riding.search([Longitude1,Latitude1],[Longitude2,Latitude2], function(status, result) {
        // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
        if (status === 'complete') {
            log.success('绘制骑行路线完成')
        } else {
            log.error('骑行路线数据查询失败' + result)
        }
    });
}

function drivingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
       //骑行导航
    var Longitude1 = aLongitude; 
    var Latitude1 = bLatitude;
    var Longitude2 = xLongitude;
    var Latitude2 = yLatitude; 

    //构造路线导航类
    var driving = new AMap.Driving({
        map: map,
        panel: "panel"
    }); 
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(Longitude1, Latitude1), new AMap.LngLat(Longitude2, Latitude2), function(status, result) {
        if (status === 'complete') {
            log.success('绘制驾车路线完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
    });
}
var countx = 3; 
//定义变量控制点击路径规划之后，可以实施的次数
//用变量，方便后期添加用户自定义次数功能


//###鼠标点击获取坐标事件封装：
function GetFromClick(e){ //鼠标单击事件
    //console.log("Let's see what is e： \n"+e);
    //这里的 e 是一个对象，包含了经纬度坐标信息
    var text = '此处经纬度为= [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] '
    document.querySelector("#text").innerText = text;
}


//###鼠标点击事件封装： 路径规划
function showInfoClick(e){ //鼠标单击事件
    //console.log("Let's see what is e： \n"+e);
    //这里的 e 是一个对象，包含了经纬度坐标信息
    var text = '此处经纬度为= [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] '
    document.querySelector("#text").innerText = text;
    if (countx===3) { 
        a1 = e.lnglat.getLng(); 
        a2 = e.lnglat.getLat();
    }
    if (countx===2) {
        a3 = e.lnglat.getLng();
        a4 = e.lnglat.getLat();
    }
    countx--;
    if (countx===1) {
       if (transportation==='walking') {
          walkingRoute(a1,a2,a3,a4);}

       if (transportation==='riding') {
          ridingRoute(a1,a2,a3,a4);}
       if (transportation==='driving') {
          drivingRoute(a1,a2,a3,a4);}
        county=0;
    }

}

//##获取坐标点函数
function clickGet(){
    document.getElementById('text').innerText = "点击地图获取坐标";    
    map.on('click', GetFromClick);
}

var transportation='walking';

var county=1;
//###绘制路径按钮 响应触发函数：
function clickOn(){
    countx=3;
    if (county) {
    alert("连续单击两次即可完成路径规划！");} 
    map.on('click', showInfoClick);
}


//###清除路径按钮 响应触发函数：
function clickOffRoute(){
    log.success("清除路径成功!"); 
    map.clearMap();
    document.getElementById('result').innerHTML = "";
    document.getElementById('panel').innerHTML = "";
}

function clickOff(){
    log.success("清除页面成功!"); 
    map.clearMap();
    document.getElementById('result').innerHTML = "";
    document.getElementById('panel').innerHTML = "";
    document.getElementById('text').innerText = "点击下方按钮进行操作";
}


// 给按钮绑定事件
document.getElementById("clickOn").onclick = clickOn;
document.getElementById("clickOff").onclick = clickOff;
document.getElementById("clickGet").onclick = clickGet;
//document.getElementById("clickOffRoute").onclick = clickOffRoute;

//搜索功能函数封装：
function searchThis(ex) {

AMap.service(["AMap.PlaceSearch"], function() {
    var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
        pageSize: 31, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: "0516", // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "result", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视 口的可见范围
    });
    //多边形查询
    var polygonArr = [//多边形覆盖物节点坐标数组//范围为矿大校园
        [117.1379080000,34.2123060000],
        [117.1370440000,34.2125750000],
        [117.1362810000,34.2131020000],
        [117.1438210000,34.2218550000],
        [117.1499570000,34.2203820000],
        [117.1566520000,34.2189150000],
        [117.1443780000,34.2060440000],
        [117.1360360000,34.2092230000]

    ];
    var polygon = new AMap.Polygon({
        path: polygonArr,//设置多边形边界路径
        strokeColor: "#FF33FF", //线颜色
        strokeOpacity: 0.2, //线透明度
        strokeWeight: 3,    //线宽
        fillColor: "#1791fc", //填充色
        fillOpacity: 0.35//填充透明度
    });
    if (ex==='餐厅') {
      placeSearch.searchInBounds("餐厅", polygon);
    }
    if(ex==='教室'){
      placeSearch.searchInBounds("博学|公共教学", polygon);          
    }
    if(ex==='超市'){
      placeSearch.searchInBounds("超市|商店", polygon);          
    }

    
});
}


var cenima = '餐厅';
var classroom = '教室';
var shop = '超市';

//获取DOM元素：
var button1 = document.getElementById('bt1'); 
var button2 = document.getElementById('bt2');
var button3 = document.getElementById('bt3');  

//定义查询按钮的三个点击事件：
function buttonClick(){  
var listener1 = AMap.event.addDomListener(button1, 'click',searchThis(cenima));
    } 
function buttonClick2(){  
var listener2 = AMap.event.addDomListener(button2, 'click',searchThis(classroom));
    }
function buttonClick3(){  
var listener3 = AMap.event.addDomListener(button3, 'click',searchThis(shop));
    }      


// ===自定义搜索===
function searchKeyword(getKeyword){
    console.log("执行关键词搜索函数");

    var keyword=getKeyword;
    AMap.service(["AMap.PlaceSearch"], function() { //function为回调函数
    console.log("实例化PlaceSearch");
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类

            pageSize: 31, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "0516", // 兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "result", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视 口的可见范围
        });
        //多边形查
        var polygonArr = [//多边形覆盖物节点坐标数组/范围为矿大校园
            [117.1379080000,34.2123060000],
            [117.1370440000,34.2125750000],
            [117.1362810000,34.2131020000],
            [117.1438210000,34.2218550000],
            [117.1499570000,34.2203820000],
            [117.1566520000,34.2189150000],
            [117.1443780000,34.2060440000],
            [117.1360360000,34.2092230000]

        ];
        var polygon = new AMap.Polygon({
            path: polygonArr,//设置多边形边界路径
            strokeColor: "#FF33FF", //线颜色
            strokeOpacity: 0.2, //线透明度
            strokeWeight: 3,    //线宽
            fillColor: "#1791fc", //填充色
            fillOpacity: 0.35//填充透明度
        });
        //关键字查询
        console.log("查询前");
        placeSearch.searchInBounds(keyword,polygon,function(status, result) { //function为回调函数
/*A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.*/
        if (status==='no_data') {
        log.error("没有找到结果，请重新输入关键词");           
        }else{
        log.success("查找成功！"); 
        }
          });

    });
}

var buttonSearch = document.getElementById('search1');  
//定义button2为bt2的DOM元素
function buttonClickSearch(){  
var keywordValue = document.getElementById("textId").value;
searchKeyword(keywordValue);
    } 
//---------出行方式--------------





function buttonClickWalking(){  
    AMap.plugin('AMap.Walking',function(){//异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
    });
    document.getElementById('dropbtn').innerText = "步行";
    transportation='walking';
} 


function buttonClickRiding(){  
    AMap.plugin('AMap.Riding',function(){//异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
    });   
    transportation='riding';
    document.getElementById('dropbtn').innerText = "骑行";

} 

function buttonClickDriving(){  

    AMap.plugin('AMap.Driving',function(){//异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
    });   
    transportation='driving';
document.getElementById('dropbtn').innerText = "驾车";

} 


 /*  为什么上面地图实例化不用其他不会引起歧义的命名？
 因为addToolbar.js里面写死了一个实例：map
 用其他的名字会导致这个功能失效
 所以只能将就了 */
/*
小结：
1.整个步行路线规划方法的实现分为三步：实例化、获取参数、使用方法；
2.使用方法：将方法封装成函数，用点击事件进行调用；
*/ 
/*!
1.如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量,
  生命周期为：在页面关闭之后销毁
2.在函数内用var声明，则为局部变量，生命周期为：函数结束后销毁=undefined
 */

  // function showInfoMove(){
   //     var text = '您移动了您的鼠标！'
   //     document.querySelector("#text").innerText = text;
   // }
    // 事件绑定   
    // function showInfoMove(){
   //     var text = '您移动了您的鼠标！'
   //     document.querySelector("#text").innerText = text;
   // }
    // 事件绑定