var chartData = [];
//左侧入
function inLeft(){

	var oInput = document.getElementById('input_number'),
		inputArray = oInput.value.split(" ");

	for(var i = 0; i < inputArray.length; i++ ){
		if (inputArray[i]){
		chartData.unshift(inputArray[i]);}		
	}
	render();	
}

//右侧入
function inRight(){

	var oInput = document.getElementById('input_number'),
		inputArray = oInput.value.split(" ");

	for(var i = 0; i < inputArray.length; i++ ){
		if (inputArray[i]){
		chartData.push(inputArray[i]);}		
	}
	render();
}

//左侧出
function outLeft(){

	var oQueShow = document.getElementById('que_show');

	if(oQueShow.innerHTML){
		alert('移出' + oQueShow.firstElementChild.innerHTML);
		chartData.shift();
		render();
	}
	else{
		alert('队列已为空！');
	}
}

//右侧出
function outRight(){

	var oQueShow = document.getElementById('que_show');

	if(oQueShow.innerHTML){
		alert('移出' + oQueShow.lastElementChild.innerHTML);
		chartData.pop();
		render();
	}
	else{
		alert('队列已为空！');
	}
}

function searchContent(){
	var searchContent = document.getElementById('search_content'),
		oQueShow = document.getElementById('que_show'),
		oDiv = oQueShow.getElementsByTagName('div');

	for(var i = 0; i < chartData.length; i++){
		oDiv.className ='';
		if(chartData[i].indexOf(searchContent.value) > 0){
			oDiv[i].className += "select";
		}
	}

}

function render(){

	var oQueShow = document.getElementById('que_show'),
		showHTML = "";

	for(var i = 0; i < chartData.length; i++){
		showHTML += "<div>"+chartData[i]+"</div>"
	}
	oQueShow.innerHTML = showHTML;
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
    		case "search":
    			searchContent();
    		default: break;
    	}
	})
}

window.onload = function(){
	changeQue();
}