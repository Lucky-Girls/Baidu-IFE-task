function $(id){
	return document.getElementById(id);
}

function CreateBox(inputTag, renderTag, renderButton){
	this.queArray = [];

	this.insert = function(){
		var val = this.trim($(inputTag).value).split(" ");
		for(var i = 0; i < val.length; i++ ){
			if (val[i] && !(this.isUnique(val[i]))){
				this.fixLength(10, val[i]);
			}	
		}
	}

	//控制数组长度len
	this.fixLength = function(len, val){
		if(this.queArray.length < len){
			this.queArray.push(val);
		}
		else{
			this.queArray.shift();
			this.queArray.push(val);
		}
	}

    //trim去除两侧空格
	this.trim = function(str){
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	//渲染box
	this.render = function(){		
		var showHTML = "";

		for(var i = 0; i < this.queArray.length; i++){
			showHTML += "<a id="+i+">"+this.queArray[i]+"</a>"
		}
		$(renderTag).innerHTML = showHTML;
	}

	//去重处理
	this.isUnique = function(temp){
		var flag = false;
		for(var i in this.queArray){  
			if(this.queArray[i] == temp){
				flag = true;
				break;
			}
		}
		return flag;
	}

	this.bind = function(){
		var that = this;
		$(renderButton).addEventListener('click',function(){
			that.insert();
			that.render();
		});
	}

	this.init = function(){
		this.bind();
	}
}

function deleteTag(id, array){
	array.splice(id, 1);
	console.log(array);
}

function deleteTxt(id){
	var val = $(id).innerHTML;
	$(id).innerHTML = "点击删除" + val;
}

function addTxt(id){
	$(id).innerHTML = $(id).innerHTML.substring(4);
}

function tagEvent(ele, type, tag, handler, array){
	$(ele).addEventListener(type,function(ev){
		var event = ev || window.event,
			target = event.target || event.srcElement;
		if(target.tagName == tag.toUpperCase()){
			//alert(target.id);
			handler(target.id, array);

		}
	})
}

 function keyPress(id, oTag){
	
	var keyCode = event.keyCode;
	
	if(keyCode == 13 || keyCode == 32 || keyCode == 188){
		var temp = $('tag').value.split(/[,，\s]+/);
		if(temp[temp.length-1] && !oTag.isUnique(temp[temp.length-1])){
			//oTag.queArray.push(temp[temp.length-1]);
			oTag.fixLength(10, temp[temp.length-1]);
			oTag.render(); 
		}
	}
}

window.onload = function(){
	var oHobby = new CreateBox("input_number", "hobbyBox", "confirm");
	oHobby.init();	

    var oTag = new CreateBox("tag", "tagBox");
    tagEvent('tagBox', 'click', 'a', function(id, array){	
		array.splice(id, 1); 
		console.log(array);
		oTag.render();
		}, oTag.queArray);

	tagEvent('tagBox', 'mouseover', 'a', deleteTxt);
	tagEvent('tagBox', 'mouseout', 'a', addTxt);
    
    $('tag').addEventListener('keydown',function(){
    	keyPress("tag", oTag);
    });
}
