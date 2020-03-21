    // 初始化地图对象，加载地图
    var map = new AMap.Map("container", {
        resizeEnable: true, //可缩放
        center: [117.1445210000, 34.2151070000],//中心点坐标 中国矿业大学南湖校区
        zoom: 15.5 //地图显示的缩放级别
    });


    //路径规划
    function walkingRoute(aLongitude,bLatitude,xLongitude,yLatitude){
    //步行导航
    var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    }); 
    //根据起终点坐标规划步行路线
    var Longitude1 = aLongitude;
    var Latitude1 = bLatitude;
    var Longitude2 = xLongitude;
    var Latitude2 = yLatitude;    
    walking.search([Longitude1, Latitude1], [Longitude2,Latitude2], function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            log.success('绘制步行路线完成')
        } else {
            log.error('步行路线数据查询失败' + result)
        } 
    });
    }


    var countx =3;
    //var a1,a2,a3,a4;
    //!!!!!!!!!!!!!!!!!如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量。!!!
    function showInfoClick(e){ //鼠标单击事件
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        document.querySelector("#text").innerText = text;
    if (countx===3) {
    console.log("1 countx="+countx);      
     a1 = e.lnglat.getLng(); //如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量。!!
    console.log("countx="+countx+" a1 = "+a1); 
    //console.log("a1:"+ Object.prototype.toString.call(a1));  
     a2 = e.lnglat.getLat();
    //console.log("a2:"+ Object.prototype.toString.call(a2));  
    //    console.log("1 xGetFromMap = "+xGetFromMap);   
     //   console.log("1 yGetFromMap = "+yGetFromMap); 
    }
    if (countx===2) {
    console.log("2 countx="+countx);  
    console.log("countx="+countx+" a1 = "+a1); 
     a3 = e.lnglat.getLng();
     a4 = e.lnglat.getLat();

      //  console.log("2 aGetFromMap = "+aGetFromMap);   
     //   console.log("2 bGetFromMap = "+bGetFromMap); 
    }
    countx--;
    if (countx===1) {
    //alert(a1);
    console.log("3.1 countx="+countx+" a1:"+a1);
  /*a1=117.14495;
    a2=34.21713;
    a3=117.151774;
    a4=34.217041;
    */
    console.log("3.2 countx="+countx+" a1:"+a1);
    walkingRoute(a1,a2,a3,a4);
  //  log.success("寻路成功"); 
    //    walkingRoute(117.14495,34.21713,117.151774,34.217041);
  //fk getLng()!!
    }

    }

  /*  function showInfoDbClick(e){
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置双击了地图！'
        document.querySelector("#text").innerText = text;
    }*/
   // function showInfoMove(){
   //     var text = '您移动了您的鼠标！'
   //     document.querySelector("#text").innerText = text;
   // }
    // 事件绑定
    function clickOn(){

        countx=3; 
        map.on('click', showInfoClick);
        //map.on('dblclick', showInfoDbClick);
       // map.on('mousemove', showInfoMove);
    }
    // 解绑事件
   
    

    function clickOff(){
        log.success("清除页面成功!"); 

       // document.getElementById('panel').innerHTML = "";
        map.clearMap();
        document.getElementById('result').innerHTML = "";
        document.getElementById('panel').innerHTML = "";
      //  map.off('click', showInfoClick);
      //  map.off('dblclick', showInfoDbClick);
       // map.off('mousemove', showInfoMove);
    }
    
    // 给按钮绑定事件
    document.getElementById("clickOn").onclick = clickOn;
    document.getElementById("clickOff").onclick = clickOff;

//搜索!!!!!!!!!!!!!!!!!!!!!
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
        //多边形查
        var polygonArr = [//多边形覆盖物节点坐标数组
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
    var button1 = document.getElementById('bt1'); 
    var button2 = document.getElementById('bt2');
    var button3 = document.getElementById('bt3');  
    //定义button2为bt2的DOM元素
    function buttonClick(){  
    var listener1 = AMap.event.addDomListener(button1, 'click',searchThis(cenima));
        } 
    function buttonClick2(){  
    var listener2 = AMap.event.addDomListener(button2, 'click',searchThis(classroom));
        }
    function buttonClick3(){  
    var listener3 = AMap.event.addDomListener(button3, 'click',searchThis(shop));
        }      
