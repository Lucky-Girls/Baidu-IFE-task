//左侧入
function inLeft(){

	var oInput = document.getElementById('input_number'),
		oQueShow = document.getElementById('que_show'),
		reg = /^-?\d+$/;

	var newDiv = document.createElement('div');
	
	if(!reg.test(oInput.value)){
		alert('请输入整数！');
	}
	else{
		newDiv.innerHTML = oInput.value;
		oQueShow.insertBefore(newDiv, oQueShow.firstElementChild);
	}
}

//右侧入
function inRight(){

	var oInput = document.getElementById('input_number'),
	oQueShow = document.getElementById('que_show'),
	reg = /^-?\d+$/;

	if(!reg.test(oInput.value)){
		alert('请输入整数！');
	}
	else{
		oQueShow.innerHTML += "<div>"+oInput.value+"</div>";
	}
}

//左侧出
function outLeft(){

	var oInput = document.getElementById('input_number'),
	oQueShow = document.getElementById('que_show');

	if(oQueShow.innerHTML){
		alert('移出' + oQueShow.firstElementChild.innerHTML);
		oQueShow.removeChild(oQueShow.firstElementChild);
	}
	else{
		alert('队列已为空！');
	}
}

//右侧出
function outRight(){

	var oInput = document.getElementById('input_number'),
	oQueShow = document.getElementById('que_show');

	if(oQueShow.innerHTML){
		alert('移出' + oQueShow.lastElementChild.innerHTML);
		oQueShow.removeChild(oQueShow.lastElementChild);
	}
	else{
		alert('队列已为空！');
	}
}
function changeQue(){
	var oQue = document.getElementById('que');

	oQue.addEventListener('click',function(ev){

		var theEvent = window.event || ev;
    	var target=theEvent.target || theEvent.srcElement;

		//判断并调用相关函数
    	switch(target.id){
    		case "left_in":
    			inLeft();
    			break;
    		case "left_out":
    			outLeft();
    			break;
    		case "right_in":
    			inRight();
    			break;
    		case "right_out":
    			outRight();
    			break;
    		default: break;
    	}
	})
}

window.onload = function(){
	changeQue();
}