var flag = false;
var showTree = {
	oderArray: [],
	setId: null,
	//深度优先搜索，将结果存入数组
	preDfs: function(node, len){
	    if(node == null || this.oderArray.length >= len){
	    	return;
	    }
	    console.log(this.oderArray);
	        this.oderArray.push(node);
	        this.preDfs(node.firstElementChild, len);
	        this.preDfs(node.nextElementSibling, len);  	    
	}
	//去除空格
	,trim: function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	//重置类名，去掉显示的类
	,reset: function(nodeCls, clsName){
		var oNode = document.getElementsByClassName(nodeCls);
		for( var i in oNode){
			var temp = oNode[i].className;
			if(temp!=null && temp.indexOf(clsName) > -1){
				oNode[i].className = this.trim(temp.replace(clsName,''));
			}
		}
	}
	//添加遍历时的显示的类
	,add: function(node, clsName){
		node.className += " "+clsName+"";
	}
	//判断show的条件，是否搜索到并关闭定时器
	,show: function(nodeCls, clsName, val){
		if(this.oderArray.length > 0){
			var curNode = this.oderArray.shift();
			this.reset(nodeCls, clsName);
			this.reset(nodeCls, "mark");
			if(this.trim(curNode.firstChild.nodeValue) == val){
				clearInterval(showTree.setId);
				this.add(curNode, "mark");
				alert("founded!");
			}
			this.add(curNode, clsName);
		}
		else{
			if(val){
				alert("not found!")
			}
			clearInterval(showTree.setId);
			this.reset(nodeCls, clsName);
		}
	}
	//前序深度搜索，开启定时
	,showPre: function(node, len, nodeCls, clsName, val){
		clearInterval(showTree.setId);
		this.oderArray = []; 
		this.preDfs(node, len);
		showTree.setId = setInterval(function(){
			showTree.show(nodeCls, clsName, val)
		}, 1000);
	}
	//绑定事件函数
	,bind: function(node, len, nodeCls, clsName){
		var oPre = document.getElementById('preDfs'),
		    oSearch = document.getElementById('search'),
		    that = this;

		oPre.addEventListener('click', function(){
			that.showPre(node, len, nodeCls, clsName);
		});
		oSearch.addEventListener('click', function(){
			var searchTxt = document.getElementById('searchTxt').value;
			that.showPre(node, len, nodeCls, clsName, searchTxt);
		});	
	}	
}

window.onload = function(){
 	var oNode = document.getElementsByClassName('first'),
 		len = document.getElementsByClassName('node').length;

 	showTree.bind(oNode[0], len, 'node', 'show');
}