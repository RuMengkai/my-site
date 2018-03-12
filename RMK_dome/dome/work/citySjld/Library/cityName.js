
function readCounty(_index,_c){
	var _options="<option>请选择</option>";
	for(var i=0;i<_cn["regions"][_index]["regions"][_c]["regions"].length;i++){
		_options+="<option>"+_cn["regions"][_index]["regions"][_c]["regions"][i]["name"]+"</option>";
	}
	var _county=document.getElementById("county");
	_county.innerHTML=_options;
}

function readCity(_index){
	var _options="<option>请选择</option>";
	for(var i=0;i<_cn["regions"][_index]["regions"].length;i++){
		_options+="<option>"+_cn["regions"][_index]["regions"][i]["name"]+"</option>";
	}
	var _city=document.getElementById("city");
	_city.innerHTML=_options;
	_city.onchange=function(){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].selected){
				readCounty(_index,i-1);
				break;
			}
		}
	}
}
function readProvince(_obj){
	var _options="<option>请选择</option>";
	for(var i=0;i<_cn["regions"].length;i++){
		_options+="<option>"+_cn["regions"][i]["name"]+"</option>";
	}
	_obj.innerHTML=_options;
}

window.onload=function(){
	console.log(_cn);
	var _province=document.getElementById("province");
	readProvince(_province);
	_province.onchange=function(){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].selected){
				readCity(i-1);
				break;
			}
		}
	}
}