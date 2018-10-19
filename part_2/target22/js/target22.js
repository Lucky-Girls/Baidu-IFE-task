/*
function Node(data,left,right){
    this.value = data;
    this.leftTree = left;//保存left节点链接
    this.rightTree = right;
}

var node9 = new Node('K', null, null),
 	node8 = new Node('J', null, null),
 	node7 = new Node('I', null, null),
 	node6 = new Node('H', null, null),
 	node10 = new Node('G', null, null),
    node5 = new Node('F', null, node9),
	node4 = new Node('E', null, node8),
	node3 = new Node('D', node6, node7),
	node2 = new Node('C', node5, node10),
	node1 = new Node('B', node3, node4),
	root = new Node('A', node1, node2);

var root={
	        value: "A",
	        leftTree: {
	            value: "B",
	            leftTree: {
	                value: "D",
	                leftTree: {
	                    value: "H",
	                    leftTree: null,
	                    rightTree: null
	                },
	                rightTree: {
	                    value: "I",
	                    leftTree: null,
	                    rightTree: null
	                }
	            },
	            rightTree: {
	                value: "E",
	                leftTree: {
	                    value: "J",
	                    leftTree: null,
	                    rightTree: null
	                },
	                rightTree: {
	                    value: "K",
	                    leftTree: null,
	                    rightTree: null
	                }
	            }
	        },
	        rightTree: {
	            value: "C",
	            leftTree: {
	                value: "F",
	                leftTree: {
	                    value: "L",
	                    leftTree: null,
	                    rightTree: null
	                },
	                rightTree: {
	                    value: "M",
	                    leftTree: null,
	                    rightTree: null
	                }
	            },
	            rightTree: {
	                value: "G",
	                leftTree: {
	                    value: "N",
	                    leftTree: null,
	                    rightTree: null
	                },
	                rightTree: {
	                    value: "O",
	                    leftTree: null,
	                    rightTree: null
	                }
	            }
	        }
        };

	preOrder(root);
	console.log(str);

*/
var showTree = {
	oderArray: [],
	setId: null,
	preOrder: function(node){
			    if(node !== null){
			        this.oderArray.push(node);
			        this.preOrder(node.firstElementChild);
			        this.preOrder(node.lastElementChild);		        
			    }
			}
	,inOrder: function(node){
		if(node !== null){           
	        this.inOrder(node.firstElementChild);
	        this.oderArray.push(node);
	        this.inOrder(node.lastElementChild);
    	}
	}
	,postOrder: function(node){
		if(node !== null){
	        this.oderArray.push(node);
	        this.postOrder(node.firstElementChild);
	        this.postOrder(node.lastElementChild);
	        this.oderArray.push(node);
    	}
	}
	,reset: function(nodeCls, clsName){
		var oNode = document.getElementsByClassName(nodeCls);
		for( var i in oNode){
			var temp = oNode[i].className;
			if(temp!=null && temp.indexOf(clsName) > -1){
				oNode[i].className = temp.replace(clsName,'');
			}
		}
	}
	,add: function(node, clsName){
		node.className += " "+clsName+"";
	}
	,show: function(nodeCls, clsName){
		if(this.oderArray.length > 0){
			this.reset(nodeCls, clsName);
			this.add(this.oderArray.shift(), clsName);
		}
		else{
			clearInterval(showTree.setId);
			this.reset(nodeCls, clsName);
		}
	}
	//showTree.show(nodeCls, clsName)
	,showPre: function(node, nodeCls, clsName){
		clearInterval(showTree.setId);
		this.oderArray = []; 
		this.preOrder(node);
		showTree.setId = setInterval(function(){
			showTree.show(nodeCls, clsName)
		}, 1000);

	}
	,showIn: function(node, nodeCls, clsName){
		clearInterval(showTree.setId);
		this.oderArray = []; 
		this.inOrder(node);
		showTree.setId = setInterval(function(){
			showTree.show(nodeCls, clsName)
		}, 1000);

	}
	,showPost: function(node, nodeCls, clsName){
		clearInterval(showTree.setId);
		this.oderArray = []; 
		this.postOrder(node);
		showTree.setId = setInterval(function(){
			showTree.show(nodeCls, clsName)
		}, 1000);

	}
	,bind: function(node, nodeCls, clsName){
		var oPre = document.getElementById('pre'),
		    oIn = document.getElementById('in'),
		    oPost = document.getElementById('post'),
		    that = this;

		oPre.addEventListener('click', function(){
			that.showPre(node, nodeCls, clsName);
		});
		oIn.addEventListener('click', function(){
			that.showIn(node, nodeCls, clsName);
		});
		oPost.addEventListener('click', function(){
			that.showPost(node, nodeCls, clsName);
		});
	}	
}

window.onload = function(){
 	var oNode = document.getElementsByClassName('first');
 	showTree.bind(oNode[0], 'node', 'show');
}