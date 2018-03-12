//智能AI赢法数组
var wins=[];
for (var i=0; i<15;i++) {
	wins[i]=[];
	for (var j=0;j<15;j++) {
		wins[i][j]=[];
	}
}
var count=0;//代表第n种赢法；
//横线的赢法
for (var i=0; i<15;i++) {
	for (var j=0;j<11;j++) {
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//竖线的赢法
for (var i=0; i<15;i++) {
	for (var j=0;j<11;j++) {
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
//斜线的赢法
for (var i=0; i<11;i++) {
	for (var j=0;j<11;j++) {
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
//反斜线的赢法
for (var i=0; i<11;i++) {
	for (var j=14;j>3;j--) {
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}


//赢法的统计数组
var myWins=[];
var computerWins=[];
//初始化赢法
for (var i=0;i<count;i++) {
	myWins[i]=0;
	computerWins[i]=0;
}


//画棋盘的线。
var drawChessBord=function (){
	_context.strokeStyle="#bfbfbf";//设置画笔的颜色
	for (var i=0;i<15;i++) {
		_context.moveTo(15+30*i, 15);
		_context.lineTo(15+30*i,435);
		_context.stroke();
		_context.moveTo(15,15+30*i);
		_context.lineTo(435,15+30*i);
		_context.stroke();
	}
}
//下棋
var oneStep=function(i,j,me){
	_context.beginPath();
	_context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
	var gradient=_context.createRadialGradient(15+30*i+2,15+30*j+2,13,15+30*i+2,15+30*j-2,0);
	if (me) {
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");	
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	_context.fillStyle=gradient;
	_context.fill();
	_context.closePath();
}

//保存棋盘每个位置的状态
var _chessBoard=[];
for(var i=0;i<15;i++){
	_chessBoard[i]=[];
	for (var j=0;j<15;j++) {
		_chessBoard[i][j]=0;//初始化棋盘为空。
	}
}
var over=false;//表示是否结束
var _chess;
var _context;
var me=true;//控制下棋的颜色，初始为黑棋；
window.onload=function(){
	_chess=document.getElementById("chess");
	_context=_chess.getContext('2d');
	drawChessBord();
	
	//下棋
	_chess.onclick=function(e){
//		if(over){
//			return;
//		}
		//我方下完棋有效
		if(!me){
			return;
		}
		var i=Math.round((e.offsetX-15)/30);
		var j=Math.round((e.offsetY-15)/30);
		if(_chessBoard[i][j]==0){
			oneStep(i,j,me);
			_chessBoard[i][j]=1;//黑棋为1
			for(var k=0;k<count;k++){
				if(wins[i][j][k]){
					myWins[k]++;
					computerWins[k]=6;
					if(myWins[k]==5){
						//alert("恭喜你，你赢了");
						//over=true;
					}
				}
			}
//			me=!me;
			if(!over){
//				me=!me;
//				computerAI();
			}
		}
	}
}



//计算机AI
var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;//最高分数
	var u=0,v=0;//最高分数点的坐标
	//初始化数组
	for (var i=0;i<15;i++) {
		myScore[i]=[];
		computerScore[i]=[];
		for (var j=0; j<15;j++) {
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	//计算每个位置的分数
	for (var i=0;i<15;i++) {
		for (var j=0;j<15;j++) {
			if(_chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if (wins[i][j][k]) {
						if (myWins[k]==1) {
							myScore[i][j]+=200;
						}else if(myWins[k]==2){
							myScore[i][j]+=400;
						}else if(myWins[k]==3){
							myScore[i][j]+=2000;
						}else if(myWins[k]==4){
							myScore[i][j]+=10000;
						}
						if (computerWins[k]==1) {
							computerScore[i][j]+=220;
						}else if(computerWins[k]==2){
							computerScore[i][j]+=440;
						}else if(computerWins[k]==3){
							computerScore[i][j]+=2200;
						}else if(computerWins[k]==4){
							computerScore[i][j]+=20000;
						}
					}
				}
//				console.log(myScore[i][j]);
				if(myScore[i][j] > max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	_chessBoard[u][v]=2;
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWins[k]++;
			myWins[k]=6;
			if(computerWins[k]==5){
				alert("哈哈，您输了，回家再练练吧。或者请茹孟凯吃饭吧。[:)]");
				over=true;
			}
		}
	}
	if(!over){
		me=!me;
	}
}
