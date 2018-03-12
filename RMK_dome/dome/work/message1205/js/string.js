window.onclick=function(){
	var btn=document.getElementById("btn");
	btn.onclick=function(){
		var re=document.getElementById("re");
		var str=document.getElementById("string").value;
		var arr=[],_string="";
		for(var i=0;i<str.length;i++){
		//   如果arr中以当前字符为下标的元素存在
			if(arr[str[i]]!==undefined){
		//       就为以当前字符为下标的元素值+1
				arr[str[i]]++;
			}else{//   否则
		//      为arr添加以当前字符为下标的新元素，值为1
				arr[str[i]]=1;
			}
		}
		for (var k in arr) {
			_string+=k+":"+arr[k]+",";
		}
		re.innerHTML=_string;
		console.log(arr);
	}
	btn.onclick();
}

