function styleInit(){
	var _timer=0;
	var _x=0,_y=0,_z=0;
	var _cute=document.getElementById("cute");
	var _flag=0;
	function playY(){
		window.clearTimeout(_timer);
		if (_flag==0) {
			_y+=2;
		}else{
			_x+=2;
		}
		for(var i=0;i<_cute.children.length;i++){
			
			_cute.children[i].style.transform="rotateX("+_x+"deg) rotateY("+_y+"deg) rotateZ("+_z+"deg)";
		}
		//转一圈后归0；
		if (_y==360) {
			_y=0;
		}
		if (_x==360) {
			_x=0;
		}
		//
		if((_y%90)==0){
			_flag=1;
		}
		if (_x%90==0&&_x!=0) {
			_flag=0;
			_x+=2;
		}
		if(_y%90==0&&(_x)%90==0){
			_timer=window.setTimeout(playY,1000);
		}else{
			_timer=window.setTimeout(playY,30);
		}
	}
	playY();
	
//		_x+=2;
//		_y+=2;
//		_z+=2;
//		for(var i=0;i<_cute.children.length;i++){
//			_cute.children[i].style.transform="rotateX("+_x+"deg) rotateY("+_y+"deg) rotateZ("+_z+"deg)";
//		}
//		if(_x==360 && _y==360 && _z==360){
//			_x=0;
//			_y=0;
//			_z=0;
//		}

}
function initCss(){
	var _cute=document.getElementById("cute");
	for(var i=0;i<_cute.children.length;i++){
		for(var n=0;n<_cute.children[i].children.length;n++){
			_cute.children[i].children[n].style.backgroundPosition=-63*i+"px "+(-Math.floor(i/10)*63)+"px";
		}
	}
	
	for(var n=0;n<_cute.children.length;n++){
		_cute.children[n].children[0].style.backgroundImage="url(images/c01.jpg)";
		_cute.children[n].children[1].style.backgroundImage="url(images/c02.jpg)";
		_cute.children[n].children[2].style.backgroundImage="url(images/c03.jpg)";
		_cute.children[n].children[3].style.backgroundImage="url(images/c04.jpg)";
		_cute.children[n].children[4].style.backgroundImage="url(images/c05.jpg)";
		_cute.children[n].children[5].style.backgroundImage="url(images/c06.jpg)";
	}
}
window.onload=function(){
	initCss();
	styleInit();
}