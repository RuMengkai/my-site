$(function() {

	//请求公共资源
	getCompart();
	//初始化banner左边的menu
	for (var i = 1; i < 15; i++) {
		$(".top-menu dd:nth-child("+(i+1)+") i").css("background-position-x", -24*i);
	}
	//today
	$(".brand_data a").on("mouseover",function() {
		$(this).children("div").children('.enter').css({"background":"#ff464e","color":"#fff"});
	});
	$(".brand_data a").on("mouseout",function() {
		$(this).children("div").children('.enter').css({"background":"#fff","color":"#ff464e"});
	});
	//goods list hover
	$(".goods-list").on("mouseover","li",function() {
		$(this).children(".good_bottom").children('a').css({"display":"block"});
	});
	$(".goods-list").on("mouseout","li",function() {
		$(this).children(".good_bottom").children('a').css({"display":"none"});
	});
	//轮播图
	turnPic();
	//倒计时
	djsClock();
	//加载goods list
	getGoodList();
	//跳转详情页
	$(".goods-list").on("click","li",function () {
		window.open("../tpl/details.html?n="+$(this).attr("class"));
	});
});

function turnPic() {
	var i=0;
	var _timer=0;
	function delay(){
		$("#btn span").eq(i).css("border-color","transparent");
		$("#images a").eq(i).css({
			"display":"none",
			"opacity":0.3
		});
		i++;
		if(i>=$("#images a").size()){
			i=0;
		}
		$("#images a").eq(i).css("display","block");
		$("#btn span").eq(i).css({"background-color":"#fff","border-color":"#fff"});
		player(true);
		$("#bannerbg").css("display","none");
	}
	function player(_cmd){

		$("#btn span").eq(i).css("background-color","#fff");
		$("#images a").eq(i).animate({
			"opacity":1,
		},600,function(){
			if(_cmd){
				window.clearTimeout(_timer);
				_timer=window.setTimeout(delay,2000);
			}else{stop
				$("#images a").eq(i).finish();
				window.clearTimeout(_timer);
			}
		});
	}
	player(true);
	
	function eventHandle(_current){
		$("#images a").eq(i).finish();
		$("#images a").css({
			"display":"none",
			"opacity":0.3
		});
		$("#btn span").css({
			"background-color":"#fff",
			"border-color":"transparent"
		});
		$(_current).css({
			"background-color":"#fff",
			"border-color":"#fff"
		});
		i=$(_current).index();
		$("#images a").eq(i).css({
			"display":"block"
		});
		window.clearTimeout(_timer);
		player(false);
	}
	$(".banner a").mouseover(function(){
		$("#images a").eq(i).finish();
	});
	$(".banner").mouseover(function(){
		window.clearTimeout(_timer);
		// $("#images a").eq(i).stop();
		$("#arrow div span").animate({opacity: '0.5'},200);
	});
	$(".banner").mouseleave(function(){
		player(true);
		$("#arrow div span").animate({opacity: '0'},200);
	});
	$("#btn span").mouseenter(function(){
		eventHandle(this);
	});
	$("#arrow span.left").click(function(){
		eventHandle($("#btn span").eq(--i)[0]);
	});
	$("#arrow span.right").click(function(){
		eventHandle($("#btn span").eq(++i)[0]);
	});
}
function djsClock() {
	function clock(time){
		var _nowDate=new Date();
		var _stopDate=new Date(time);
		var _date=new Date(_stopDate.getTime()-_nowDate.getTime());
		var _day=_date.getDate();
		var _hours=_date.getHours()-8;
		var _Minutes=_date.getMinutes();
		var _Seconds=_date.getSeconds();
		var _code='<span class="icon_time"></span>';
		_code+='<span class="brand-days">'+_day+'天</span>';
		_code+='<span class="brand-hours">'+_hours+'时</span>';
		_code+='<span class="brand-minutes">'+_Minutes+'分</span>';
		_code+='<span class="brand-seconds">'+_Seconds+'秒</span>';
		return _code;
	}
	var _timer_djs=0;
	function djs(time){
		(function start() {
			clearTimeout(_timer_djs);
			$(".djs").html(clock(time));
			_timer_djs=setTimeout(start,1000);
		})();
	}
	$.ajax({
		url: '../api/data.json',
		type: 'POST',
		dataType: 'json',
		data: null,
	})
	.done(function (data) {
		djs(data[0]["time"]);//倒计时
	})
	.fail(function() {
		console.log("error");
	})
}
function getGoodList() {
	var _s=10;
	var _state=1;//控制异步同步。
	window.onscroll=function(){
		var scrollh=$(document).scrollTop()//滚动条高度
		var pmh=$(window).height();//页面（屏幕）高度
		var conh=$(document).height();//浏览器内容高度
		// console.log(scrollh+"|"+pmh+"|"+conh);
		// console.log(conh);
		//显示fixed-top
		if(scrollh>=pmh){
			$(".fixed-top").css("display","block");
			$(".returntop").css("display","block");
		}else{
			$(".fixed-top").css("display","none");
			$(".returntop").css("display","none");
		}
		if(scrollh+pmh+360>=conh){
			if (_state!=0) {
				_state=0;
				readGood(_s,_s+30);//读取图片
				_s=_s+30;
			}
		}
	}
	readGood(0,10);//加载goods
	function readGood(_min,_max){
		if (_min<_max) {
			$.ajax({
				url: '../api/goodsList.json',
				type: 'POST',
				dataType: 'json',
				data: null,
			})
			.done(function (data) {
				goodsload(data,_min,_max);
				_state=1;

			})
			.fail(function() {
				console.log("error");
			})
		}
	}
	//请求回来的json数据处理
	function goodsload(data,_min,_max) {
		var str="";
		var _length=0;
		for (var key in data) {
			_length++;
		}
		console.log(_min+"-"+(_max<_length?_max:_length));
		for (var key=_min;key<_max && _min<_length;key++,_min++) {
			str+='<li class='+key+'>';
			str+='<a href="../tpl/details.html?n='+key+'" target="_blank"><div class="'+data[key]["img_icon"]+'"></div>';
			str+='	<img src="'+data[key]["img_good"]+'">';
			str+='	<div class="like"><i></i></div>';
			str+='</a>';
			str+='<p>';
			str+='	<span>'+data[key]["baoyou"]+'</span>';
			str+='	<a href="#" target="_blank">'+data[key]["desc"]+'</a>';
			str+='	<span class="state">上新</span>';
			str+='</p>';
			str+='<div class="good_bottom">';
			str+='	<div class="price">';
			str+='		<em>￥</em>'+data[key]["price"]+'';
			str+='	</div>';
			str+='	<span>';
			str+='		<s><em>￥</em>'+data[key]["sprice"]+'</s>';
			str+='	</span>';
			str+='	<div class="source">';
			str+='		<em class="'+data[key]["smalllogo"]+'"></em>';
			str+='		<span>'+data[key]["source"]+'</span>';
			str+='	</div>';
			str+='	<a href="#">';
			str+=		data[key]["go"];
			str+='	</a>';
			str+='</div>';
			str+='</li>';
		}
		//将请求回的信息添加到页面
		$(".goods-list").append(str);
	}
}
function getCompart() {
	//请求toolbar
	$.ajax({
		url: '../tpl/toolbar.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$("#toolbar").html(data);
	})
	.fail(function() {
		console.log("toolbar error");
	});
	//请求heard
	$.ajax({
		url: '../tpl/heard.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".header").html(data);
	})
	.fail(function() {
		console.log("header error");
	});
	//请求mainNav
	$.ajax({
		url: '../tpl/nav.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".mainNav").html(data);
		$(".fi").addClass("first");
	})
	.fail(function() {
		console.log("mainNav error");
	});
	//请求右边侧栏
	$.ajax({
		url: '../tpl/rightfixed.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$("body").append(data);
		getJs();//获取js
	})
	.fail(function() {
		console.log("rightfixed error");
	});
	//请求footer
	$.ajax({
		url: '../tpl/footer.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".foot").html(data);
	})
	.fail(function() {
		console.log("toolbar error");
	});
}
function getJs() {
	$.ajax({
		url: '../js/compart.js',
		type: 'POST',
		dataType: 'script',
		data: null,
	})
	.done(function (data) {
		data;
	})
	.fail(function() {
		console.log("js error");
	})
}