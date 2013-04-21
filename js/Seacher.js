//定义全局变量并加载方法
//_前缀的为辅助方法
$(document).ready(function(){
	autoTime = 233; //此为每个字符的打印时间
	fakeMouse = $("#fake_mouse");
	inputField = $("input[type=text]:first");
	button = $("#creatUrl");
	GetUrl();
	
});
//鼠标移动到Button
function moveToButton(){
	fakeMouse.animate({top:(button.position().top+5),left:(button.position().left+15)},500,function(){
		//这里添加发送请求 记得模拟下鼠标点击效果啊!
	});
}
//鼠标移动到Test;
function moveToText(){
	fakeMouse.animate({top:(inputField.position().top+5),left:(inputField.position().left)},2000,function(){
		inputField.focus();
		});
}

//鼠标乱动触发下事件
function moveToRandom(str){
	var stemp = str;
	fakeMouse.animate({top:"+=5px",left:"+=10px"},"fast",function(){
		autoInput(stemp,0);
		});
}

//选择鼠标图片
function switchMouseCursor(){
	var agent = navigator.userAgent;
	if (agent.indexOf("Windows NT") >= 0) {
		$(fakeMouse).attr("src", "img/mouse_arrow_windows_aero.png");
    } else if (agent.indexOf("Mac OS") >= 0) {
   		$(fakeMouse).attr("src", "img/mouse_arrow_mac.png");
    }	
}

//创建Url
function CreatUrl(){
	var creatUrl = $("#creatUrl");
	var seach = $("#seach");
	var text = "bangnibaidu.com/?q=";
	var seachtest = _trim(seach.val());
	if(checkSeach(seachtest)){
		$("#seachUrl").val(text+seachtest);
	}else{
		$("#seachUrl").val("请输入合法的搜查数据(不要乱来嘛~");
	}
}

//自动打印字符
function autoInput(str,index){
      var val = str.substr(0,index + 1);
      inputField.attr("value",val);
      if (index < str.length) {
        setTimeout(function(){autoInput(str,index+1);},Math.random()*autoTime);
      }
      else {
		moveToButton();
      }
}
//Url为唯一标示,此为主逻辑入口
function GetUrl(){
	var url  = window.location.search+"";
	var pram = url.indexOf("q=");
	if(pram>0){
		pram += 2;
		var seachText =  _trim(decodeURI(url.substr(pram)));
		var seachLangth = _len(seachText);
		if(seachLangth>0){
			button.val("帮你百度");
			fakeMouse.show();
			switchMouseCursor();
			button.ready(function(){
    	    moveToText();
			moveToRandom(seachText);
    });
		}
	}
	
	$("#creatUrl").click(function(){
		CreatUrl();
	});
	
}

//检查要创建Url的数据的合法性
function checkSeach(str){
	if(_len(str)<1){
		return false;
	}
	
	return true;
}

function _trim(str){
	//去两边空格 我靠 javascript连这个都没有?
	str = str.replace(/^(\s|\u00A0)+/,'');
    for(var i=str.length-1; i>=0; i--){
        if(/\S/.test(str.charAt(i))){
            str = str.substring(0,i+1);
            break;
        }
    }
	return str;
}
function _len(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};