window.onload=function(){
	var _contentid=document.getElementById("content");
	var _btn=document.getElementById("btn");
	var _search=document.getElementById("search");
	var _data=[],_item=0;
	_btn.onclick=function(){
		var _name=document.getElementById("from").value;
		var _message=document.getElementById("message").value;
		var _time=Date("2016").slice(11,24);
		var _content='<dl><dt>'+_name+'</dt><dd>'+_message+'</dd><dd class="time">'+_time+'</dd></dl>';
		$('#content').children(":first").before(_content);//添加到第一个子元素之前。
//		$("#content").append(_content);
		//保存每次的留言
		_item++;
		_data[_item]={
			"name":_name,
			"message":_message,
			"time":_time
		};
	}
	_search.onclick=function(){
		var _name=document.getElementById("from").value;
		var _content="";
		for(var i=_data.length-1;i>=1;i--){
			if (_data[i]["name"]==_name) {
				_content+='<dl><dt>'+_data[i]["name"]+'</dt><dd>'+_data[i]["message"]+'</dd><dd class="time">'+_data[i]["time"]+'</dd></dl>';
			} 
		}
		_contentid.innerHTML=_content;
		console.log(_data);
	}
}
