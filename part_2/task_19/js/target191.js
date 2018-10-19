var chartData = [];

//左侧入
function inLeft(){

	var oInput = document.getElementById('input_number'),
		oQueShow = document.getElementById('que_show'),
		reg = /^-?\d+$/;

	var newDiv = document.createElement('div');

	if(chartData.length > 60){
		alert("输入的元素数量超过60！");
	}
	else if(!reg.test(oInput.value) || (parseInt(oInput.value) < 10 || parseInt(oInput.value) > 100)){
		alert('请输入10到100的整数！');
	}
	else{
		newDiv.innerHTML = oInput.value;
		newDiv.style.height = oInput.value+'px';
		oQueShow.insertBefore(newDiv, oQueShow.firstElementChild);
		chartData.unshift(parseInt(oInput.value));
	}
}

//右侧入
function inRight(){

	var oInput = document.getElementById('input_number'),
	oQueShow = document.getElementById('que_show'),
	reg = /^-?\d+$/;

	if(chartData.length > 60){
		alert("输入的元素数量超过60！");
	}
	else if(!reg.test(oInput.value) || (parseInt(oInput.value) <10 || parseInt(oInput.value) > 100)){
		alert('请输入10到100的整数！');
	}
	else{
		oQueShow.innerHTML += "<div style='height:"+parseInt(oInput.value)+"px;'>"+oInput.value+"</div>";
		chartData.push(parseInt(oInput.value));
	}
}

//左侧出
function outLeft(){

	var oInput = document.getElementById('input_number'),
	oQueShow = document.getElementById('que_show');

	if(oQueShow.innerHTML){
		alert('移出' + oQueShow.firstElementChild.innerHTML);
		oQueShow.removeChild(oQueShow.firstElementChild);
		chartData.shift();
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
		chartData.pop();
	}
	else{
		alert('队列已为空！');
	}
}


function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}
 
 //当前方法暂停5秒


//quick sort
function quickSort(array, prev, numsize){
	var nonius = prev;
	var j = numsize -1;
	var flag = array[prev];
	var timer;

		if ((numsize - prev) > 1) {
			if(nonius < j){
				for(; nonius < j; j--){
					if (array[j] < flag) {
						array[nonius++] = array[j];　
						show();
						break;
					};
				}
				for( ; nonius < j; nonius++){
					if (array[nonius] > flag){
						array[j--] = array[nonius];
						show();
						break;
					}
				}
			}

			array[nonius] = flag;
			show();
			quickSort(array, 0, nonius);
			quickSort(array, nonius + 1, numsize);
		}



	return array;
}

/*function bubbleSort(array) {

	var len = array.length,
		i = 0,
		j = 0,
		temp,
		timer;

	timer = setInterval(run, 100);

	function run() {
		if(i < len ){
			if(j < len - i -1) {
				if(array[j] > array[j+1]) {
					temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
					show();
				}
				j++;
				return;
			} 
			else {
				j = 0;
			}
			i++;
		} 
		else {
			clearInterval(timer);
		}
	}
}
*/
//显示div
function show() {

	var oWrap = document.getElementById('que_show'),
		figure='';

	for(var value = 0; value < chartData.length; value++){
		figure += "<div title="+chartData[value]+" style='height:"+Math.ceil(chartData[value])+"px;'>"+chartData[value]+"</div>";
    }

	oWrap.innerHTML = figure;
}

function sortClick(){

	var oSort = document.getElementById('sort');

	oSort.addEventListener('click',function(){

		bubbleSort(chartData);

	})
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
	sortClick();
}