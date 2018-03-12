//rem布局
function initSize() {
	var _h = document.documentElement.clientWidth||document.body.clientWidth;
	var _size=_h/1280*100;
	document.documentElement.style.fontSize=_size+"px";
}

var _timer;
var _n=0;//控制图片
function bgloop() {
	clearTimeout(_timer);
	if(_n==5){
		_n=0;
	}
	switch(_n){
		case 0:$("#bg").animate({opacity:'0'},500,function () {
				$("#bg").attr("src","images/pub_159.jpg");
				$("#bg").animate({opacity:'1'},500);
				_n++;
			});break;
		case 1:$("#bg").animate({opacity:'0'},500,function () {
				$("#bg").attr("src","images/pub_288.jpg");
				$("#bg").animate({opacity:'1'},500);
				_n++;
			});break;
		case 2:$("#bg").animate({opacity:'0'},500,function () {
				$("#bg").attr("src","images/pub_350.jpg");
				$("#bg").animate({opacity:'1'},500);
				_n++;
			});break;
		case 3:$("#bg").animate({opacity:'0'},500,function () {
				$("#bg").attr("src","images/pub_43.jpg");
				$("#bg").animate({opacity:'1'},500);
				_n++;
			});break;
		case 4:$("#bg").animate({opacity:'0'},500,function () {
				$("#bg").attr("src","images/bg-desktop.jpg");
				$("#bg").animate({opacity:'1'},500);
				_n++;
			});break;
	}
	_timer=setTimeout( bgloop,5000);
}
function main(){
	var _body=document.getElementsByTagName('html')[0];
	var _bg=document.getElementById("bg");
	_bg.style.height=_body.clientHeight+"px";
	_body.style.overflow="hidden";
}
function over() {
	$(".aboutme a").on("mouseover",function () {
		$($(this).children("span")).stop();
		$($(this).children("span")).animate({width: '130'},100);
	});
	$(".aboutme a").on("mouseout",function () {
		$($(this).children("span")).stop();
		$($(this).children("span")).animate({width: '0'},200);
	});
}
//实现滚动条无法滚动
var mo=function(e){e.preventDefault();};
/***禁止滑动***/
function stopsc(){
	document.body.style.overflow='hidden';        
    document.addEventListener("touchmove",mo,false);//禁止页面滑动
}
$(function(){
	initSize();
	main();
	over();
	setTimeout(function() {
		bgloop();
	},5000)
	stopsc();
})

