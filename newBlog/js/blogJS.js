$(document).ready(function(){
	/*表示文档结构已经加载完成（不包含图片等非文字媒体文件）
	等价于  $(function(){
           do something;
           });
     等价于$().ready(function(){
      do something;
      }
     )
     */
    $(".mainMenu").click(function(){  //主导航栏元素的点击事件
  	$(".mainMenu").css("background-color","#f1f1f1");
    $(".mainMenu").css("color","black");
    var thisid=this.id;
    $(this).css("background-color","#4CAF50");
    $(this).css("color","white");
    });

    $(".contentMenu").click(function(){  //次导航栏元素的点击事件
  	$(".contentMenu").css("background-color","#f1f1f1");
    $(".contentMenu").css("color","black");
    var thisid=this.id;
    $(this).css("background-color","lightblue");
    $(this).css("color","white");
    });



    $("#c1li1").click(function(){  //导航栏元素点击事件1

   var xhr = new XMLHttpRequest();  //创建一个对象
/*
  alert("readyState is "+xhr.readyState);
  alert("status is "+xhr.status);
  */
  xhr.onreadystatechange=function(){

  if (xhr.readyState==4 && xhr.status==200)
		{
  document.getElementById("myDiv").innerHTML= xhr.responseText;  //当请求到来时，读取请求中的数据
		}
	}
  xhr.open('GET','text/test1.txt',true);  //设置ajax，.open()方法里面的三个参数分别是：要发送的请求类型、请求的url、表示是否异步发送请求的布尔值
  xhr.send();  //发出请求
     });

    $("#c1li2").click(function(){  //导航栏元素点击事件2
/*
  alert("readyState is "+xhr.readyState);
  alert("status is "+xhr.status);
  */
  var xhr2 = new XMLHttpRequest();  //创建一个对象
  xhr2.open('GET','text/test2.txt',true);  //设置ajax，.open()方法里面的三个参数分别是：要发送的请求类型、请求的url、表示是否异步发送请求的布尔值
  xhr2.send();  //发出请求

  xhr2.onreadystatechange=function(){

  if (xhr2.readyState==4 && xhr2.status==200)
		{
  document.getElementById("myDiv").innerHTML= xhr2.responseText;  //当请求到来时，读取请求中的数据
		}
	}
     });

});