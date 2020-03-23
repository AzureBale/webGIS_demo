/*===================Content Menu=============

此JS脚本中，包括了以下功能和定义：
 1.初始化地图对象，加载地图
 2.页面清除函数的定义 及 其点击调用函数
 3.点击按钮 出现/隐藏 下拉栏
    3.1屏幕过小时，点击隐藏面板
 4.点击地图获取坐标函数 的定义
 5.点击地图获取坐标函数 的调用函数
 6.三种方式 的 路线规划函数 的 定义：
    6.1步行
    6.2骑行
    6.3驾驶
 7.路线规划集成函数 的 定义：
    //统一三种方式的调用接口
 8.出行方式选择 的 点击调用函数
 9.路线规划集成函数 的 点击调用函数
 10.关键词搜索函数 的 定义
 11.关键词搜索函数 的（搜索框输入参数）调用函数
 12.关键词搜索函数 的（按钮参数）调用函数
 13.关键词搜索函数 的（按钮参数）调用函数 的点击调用函数
 14.总结
 ——Edited by YBY
===================== end Menu ==============*/

//__________#1初始化地图对象，加载地图
var map = new AMap.Map("container", {
    resizeEnable: true, //可缩放
    center: [117.1445210000, 34.2151070000],//中心点坐标 中国矿业大学南湖校区
    zoom: 15.5 //地图显示的缩放级别
});

//__________end #1

//__________#2 绑定 页面清除 按钮，定义其点击响应函数：
document.getElementById("clickOff").onclick = clickOff;
function clickOff(){
    log.success("清除页面成功!"); 
    map.clearMap();
    document.getElementById('result').innerHTML = "";
    document.getElementById('panel').innerHTML = "";
    document.getElementById('textId').value = "输入关键字";
}
//__________end #2

//__________#3 菜单点击功能:
function myFunction() {//点击按钮，下拉菜单在 显示/隐藏 之间切换:

    document.getElementById("myDropdown").classList.toggle("show");
}
function buttonClickSHowlist() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

window.onclick = function(event) { 
    //屏幕过小，隐藏面板
 //判断当前按钮状态

    log.success(document.body.clientHeight);

  if (!event.target.matches('#dropbtn')) {//点击下拉菜单以外区域隐藏:
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('#dropbtn2')) {
    var dropdowns = document.getElementsByClassName("dropdown-content2");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
    
function hidePanel(){
      document.getElementById('cleanScreen').style.display = 'none';
    // document.getElementById('result').style.display = 'none';
      document.getElementById('textRoute').style.display = 'none';
      document.getElementById('text').style.display = 'none';
     // document.getElementById('panel').style.display = 'none';
      document.getElementById('routePanel').style.display = 'none';
      document.getElementById('coordinate').style.display = 'none';
      document.getElementById('anySearchPanel').style.display = 'none';
      countHide1=0;
      document.getElementById('hidePanel').innerText = '显示面板';
}
function showPanel(){
      document.getElementById('cleanScreen').style.display = 'flex';
      // document.getElementById('result').style.display = 'flex';
      document.getElementById('textRoute').style.display = 'flex';
      document.getElementById('text').style.display = 'flex';
      // document.getElementById('panel').style.display = 'flex';
      document.getElementById('routePanel').style.display = 'flex';
      document.getElementById('coordinate').style.display = 'flex';
      document.getElementById('anySearchPanel').style.display = 'flex';
      countHide1=1;
      document.getElementById('hidePanel').innerText = '隐藏面板';
}
function hideResult(){
    document.getElementById('result').style.display = 'none';
    countHide2=0;
    document.getElementById('hideResult').innerText = '显示结果';
}
function showResult(){
    document.getElementById('result').style.display = 'flex';
    countHide2=1;
    document.getElementById('hideResult').innerText = '隐藏结果';
}
function hideRoutePanel(){
    document.getElementById('panel').style.display = 'none';
    countHide3=0;
    document.getElementById('hideRoutePanel').innerText = '显示导航';
}
function showRoutePanel(){
    document.getElementById('panel').style.display = 'flex';
    countHide3=1;
    document.getElementById('hideRoutePanel').innerText = '关闭导航';
}

var countHide1=1; //判断当前按钮状态
var countHide2=1;
var countHide3=1;

$(document).ready(function(){

  $("#hidePanel").click(function(){
if (countHide1)
    hidePanel();
    else showPanel();});

  $("#hideResult").click(function(){
if (countHide2)
    hideResult();
    else showResult();});

  $("#hideRoutePanel").click(function(){
if (countHide3)
    hideRoutePanel();
    else showRoutePanel();
  });

});
//__________end #3



//__________#4 点击地图获取坐标 函数定义：
function GetFromClick(e){ //鼠标单击事件
    //这里的 e 是一个对象，其属性包含了经纬度坐标信息
    var text = '此处经纬度为= [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] ';
    document.querySelector("#text").innerText = text;
}
//__________end #4

//__________#5 点击地图获取坐标函数 的调用函数:
document.getElementById("clickGet").onclick = clickGet;
function clickGet(){
    var countx = 3; 
    //定义一个局部变量，用于记录之后两次点击地图所获取的坐标值
    //每次点击“计算路径”按钮之后，初始化该变量
    document.getElementById('text').innerText = "点击地图获取坐标";    
    map.on('click', GetFromClick);
}
//__________end #5


//__________#6 路线规划函数:
    //______#6.1 步行 路线规划函数：
function walkingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
    //传入的四个参数依次为：第一个点的经度、纬度，第二个点的经度、纬度

    var walking = new AMap.Walking({//步行路线规划对象的实例化  
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

    //______#6.2 骑行 路线规划函数：
function ridingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
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

    //______#6.3 驾车 路线规划函数：
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
//__________end #6

//__________#7 路线规划集成函数：
function showInfoClick(e){ //鼠标单击事件
    //console.log("Let's see what is e： \n"+e);
    //这里的 e 是一个对象，包含了经纬度坐标信息
    var text = '已选择起点';
    document.querySelector("#textRoute").innerText = text;
    if (countx===3) { 
        a1 = e.lnglat.getLng(); 
        a2 = e.lnglat.getLat();
        text = '已选择起点，请继续点击选择目的地';
        document.querySelector("#textRoute").innerText = text;
        }
    if (countx===2) {
        a3 = e.lnglat.getLng();
        a4 = e.lnglat.getLat();
        text = '已选择终点';
    document.querySelector("#textRoute").innerText = text;
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
       text = '已完成路线规划';
    document.querySelector("#textRoute").innerText = text;
    }
}
//__________end #7

//__________#8 出行方式选择按钮 点击响应函数：
var transportation='walking'; //出行方式默认为步行
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
//__________end #8


//__________#9 绑定 路线规划 按钮，定义其点击响应函数：
var county=1; //定义全局变量，使得加载一次页面alert提醒只弹出一次

document.getElementById("clickOn").onclick = clickOn;
function clickOn(){//响应触发之后的操作：
    countx=3;
    if (county) {
    alert("连续单击两次即可完成路径规划！");} 
    map.on('click', showInfoClick);
}
//__________end #9



//__________#10 关键词搜索函数 定义：
function searchKeyword(getKeyword){//该查找方式为 限定 多边形范围查找 
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
        //多边形定义↓
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
//__________end #10

//__________#11 关键词搜索函数 的 （搜索框输入参数）调用函数：
function buttonClickSearch(){  
var keywordValue = document.getElementById("textId").value;
searchKeyword(keywordValue);
    } 
//__________end #11

//__________#12 关键词搜索函数 的 （按钮参数）调用函数：
function searchThis(ex) {
var keywordValue = ex;
searchKeyword(keywordValue);
}
//__________end #12


//__________#13 固定搜索按钮的点击事件响应函数：
  //方法1：使用DOM监听函数进行点击事件的响应：
var button1 = document.getElementById('bt1'); //1.获取DOM元素：
function buttonClick(){  //2.添加事件监听函数
var listener1 = AMap.event.addDomListener(button1, 'click',searchThis('餐厅'));
    }
  //__end 方法1

  //方法2：直接获取按钮的点击事件：
function buttonClick2(){  
    searchThis('博学楼');
    }
function buttonClick3(){  
    searchThis('超市'); 
}
function searchLib(){
    searchThis('图书馆');
}
function searchGym(){
    searchThis('体育');
}
function searchPark(){
    searchThis('停车');
}
  //__end 方法2
//__________end #13

//__________#14 总结
/*
1.AMap.Map
    AMap.Map的实例化需要在id="contain" 的<div>加载完成之后进行
     AMap.Map的实例化统一使用 var map = new AMap.Map;
    一般不要用其他命名,因为addToolbar.js里面写死了一个实例：map,
    用其他的名字会导致这个插件功能失效。

2.路线规划方法
    .1整个路线规划方法的实现分为三步：实例化、获取参数、使用方法；
    .2使用方法：将方法封装成函数，用点击事件进行调用；
    .3其他方式的封装使用也同理

3.生命周期
    .1如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量,
    生命周期为：在页面关闭之后销毁
    .2在函数内用var声明，则为局部变量，生命周期为：函数结束后销毁=undefined
 
4.插件之间的冲突
    Amap.walking和Amap.riding以及Amap.driving，这三者之间互相冲突，后加载的
    API会覆盖先加载的API，所以不能使用同步加载的方式，在HTML中用<script>标签
    将三个标签一次性引入。正确的方法是使用异步加载：
        AMap.plugin('AMap.Driving',function(){//异步加载插件
             var toolbar = new AMap.ToolBar();
             map.addControl(toolbar);
        });  
5.AMap.Map未实例化的原因
    若引入的js文件中有bug，例如，注释符号只写了前半部分、缺少分号括号等等

*/
//__________end #14