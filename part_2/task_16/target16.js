/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

	function addAqiData() {

	var oCity = document.getElementById('aqi-city-input');
	var oValue = document.getElementById('aqi-value-input');
	
	//正则判断输入字符是否合理
	var integer = /^[1-9]*[1-9][0-9]*$/;
	var str = /^[a-zA-Z\u4e00-\u9fa5]+$/;
	var trim = /(^\s*)|(\s*)|(\s*$)/g;

	var reInteger = oValue.value.replace(trim,'');
	var reStr = oCity.value.replace(trim,'');

	if( !str.test(reStr)){
		alert('请输入合理城市名字');
	}
	else if(!integer.test(reInteger)){
		alert('空气质量请输入整数');		
	}
	else{
		aqiData[oCity.value] = oValue.value;		
	}

} 

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {


	var oTb = document.getElementById('aqi-table');
	var data = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';

		for(var value in aqiData){
			data += '<tr><td>' + value + '</td><td>' + aqiData[value] + '</td><td><button>删除</button></td></tr>';
		}
		//判断是否为空
		if(value){
			oTb.innerHTML = data;
		}
		else{
			oTb.innerHTML = '';
		}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var value = target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[value];

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var oBtn = document.getElementById('add-btn');

  oBtn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var oTb = document.getElementById('aqi-table');

  oTb.onclick = function(event){

  	var target = event.target;
  	delBtnHandle(target);

  }

}

window.onload = function(){
	init();
}