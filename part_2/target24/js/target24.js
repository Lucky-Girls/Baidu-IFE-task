var flag = false;
var showTree = {
	oderArray: [],
	setId: null,
	selTarget: null,
	//深度优先搜索，将结果存入数组
	preDfs: function(node, len){
	    if(node == null || this.oderArray.length >= len){
	    	return;
	    }
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
			var isFound = true;
			this.reset(nodeCls, clsName);
			//this.reset(nodeCls, "mark");
			this.reset(nodeCls, "selected");
			if(this.trim(curNode.firstChild.nodeValue) == val){
				this.add(curNode, "mark");
				isFound = false;
				alert("founded!");
			}
			this.add(curNode, clsName);
		}
		else{
			if(val && isFound){
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
	//判断div是否被选中
	,selectDiv: function(target, nodeCls){
		this.reset(nodeCls, "selected");
		this.add(target,"selected");
	}
	//绑定事件函数
	,bind: function(node, nodeCls, clsName){
		var oPre = document.getElementById('preDfs'),
		    oSearch = document.getElementById('search'),
		    oDel = document.getElementById('del'),
		    oAdd = document.getElementById('add'),
		    that = this;

		oPre.addEventListener('click', function(){
			var len = document.getElementsByClassName(nodeCls).length;
			that.reset(nodeCls, "mark");
			that.showPre(node, len, nodeCls, clsName);
		});

		oSearch.addEventListener('click', function(){
			var len = document.getElementsByClassName(nodeCls).length;
			var searchTxt = document.getElementById('searchTxt').value;
			that.reset(nodeCls, "mark");
			that.showPre(node, len, nodeCls, clsName, searchTxt);
		});	

		node.addEventListener('click', function(ev){
			var event = ev || window.event,
				target = event.target || event.srcElement;
			that.selTarget	= target;
			that.selectDiv(target, nodeCls);		
		});	

		oDel.addEventListener('click', function(){
			if(that.selTarget != null){
				that.selTarget.outerHTML='';
				that.selTarget = null;
			}
			else{
				alert("请选择删除节点！");
			}
		});

		oAdd.addEventListener('click', function(){
			var addTxt = document.getElementById('addTxt').value;
			if(that.selTarget != null && that.trim(addTxt) != ""){
				that.selTarget.innerHTML += "<div class='node'>"+addTxt+"</div>";
			}
			else{
				alert("确认选择节点并输入有效内容！");
			}
		});
	}	
}

window.onload = function(){
 	var oNode = document.getElementsByClassName('first');

 	showTree.bind(oNode[0], 'node', 'show');
}