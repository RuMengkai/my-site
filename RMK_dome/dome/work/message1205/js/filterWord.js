window.onload=function(){
	var _text=document.getElementById("text");
	var _btn=document.getElementById("btn");
	var _result=document.getElementById("result");
	
	_btn.onclick=function(){
		var _word=document.getElementById("word").value;
		if(_word==""){
			alert("请输入要过滤的关键词");
			return true;
		}
		var _string=_text.value;
		//将接收到的字符串切割成数组
		var _array=_word.split("，");
		console.log(_array.length);
		//遍历数组，依次过滤
		for (var i=0;i<_array.length;i++) {
			while(_string.indexOf(_array[i])>=0){
				_string=_string.replace(_array[i],"");
			}
		}
		_result.value=_string;
	}
}

