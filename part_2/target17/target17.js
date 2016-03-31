/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

	var date = pageState.nowGraTime,
		city = pageState.nowSelectCity,
		oWrap = document.getElementsByClassName('aqi-chart-wrap'),
		figure='',
		width;

	//确定div宽度
	width = (date == 'day')? 10: ((date == 'week')? 40: 100);

	for(value in chartData[date][city]){
		figure += "<div class='figure' title='"+value+"_空气质量："+Math.ceil(chartData[date][city][value])+"' style='height:"+Math.ceil(chartData[date][city][value])+"px; width:"+width+"px;'></div>";
    }

	oWrap[0].innerHTML = figure;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 ，防止冒泡到空白处
  if(this.value  == pageState.nowGraTime || this.value  == undefined){
  	return;
  }
  else{
  	// 设置对应数据
  	pageState.nowGraTime = this.value;
  	// 调用图表渲染函数
  	renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  pageState.nowSelectCity = this.value;
  // 调用图表渲染函数
  renderChart();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */

function initGraTimeForm() {

	var oSelectDate = document.getElementById('form-gra-time');

	oSelectDate.onclick = function(ev){

	var theEvent = window.event || ev;
    var theObj=theEvent.target || theEvent.srcElement;

	graTimeChange.call(theObj);

	}
}


/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

   var oCity = document.getElementById('city-select');

   for(value in aqiSourceData){
   		oCity.innerHTML += '<option>'+ value +'</option>';
   }

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  	oCity.onchange = function(ev){

  		var theEvent = window.event || ev;
    	var theObj=theEvent.target || theEvent.srcElement;

 		citySelectChange.call(theObj);
  	}
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
 
  //day
 chartData['day'] = aqiSourceData;

 chartData.week = {};
 chartData.month = {};

  var weeks=0,
  	  num=0,
  	  months=0,
  	  total=0;

  //week  for in注意乱序问题
  for(city in aqiSourceData){
  	weeks = 0;
  	chartData['week'][city]={};

  	for(value in aqiSourceData[city]){
  		weeks++;
  		num += aqiSourceData[city][value]; 	
  		if(weeks%7 == 0 ){
  			num = num/7;
  			chartData['week'][city]['weeks'+weeks/7] = num;
  			num = 0;
  		}
  	}
  }

  //month
   for(city in aqiSourceData){
   	months = 0;
   	chartData['month'][city]={};

  	for(value in aqiSourceData[city]){
  		months++;
  		total += aqiSourceData[city][value]; 	

  		if(months == 31 ){
  			total = total/31;
  			chartData['month'][city]['months'+1] = total;
  			total = 0;
  		}
  		else if(months == 60){
  			total = total/29;
  			chartData['month'][city]['months'+2] = total;
  			total = 0;
  		}
  		else if(months == 91){
  			total = total/31;
  			chartData['month'][city]['months'+3] = total;
  			total = 0;
  		}

  	}
  }

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

window.onload = function(){
	init();
}
