function getModes(){
	var currentMode = "SELECT";

	function selectNode(nodes, point){
		nodes.forEach(function (node){
			node.toggleSelect(point);
		})
	}

	function createNodeAt(nodes, point){
		var width = Math.floor(Math.random()*50+50)
		var height = Math.floor(Math.random()*50+50)
		var square = {x: point.x-width/2, y: point.y-height/2, width:width, height:height}
		var collision = false;
		nodes.forEach(function (node){
			if(node.collidesWith(square)){
				collision= true;
			}
		});
		if(!collision){
			nodes.push(createNode(square.x, square.y, square.width, square.height, "rgb(200, 0, 0"))
		}
	}

	function getSelectedNodes(nodes){
		var selectedNodes = []
		nodes.forEach(function (node){
			if(node.isSelected()){
				selectedNodes.push(node);
			}
		});
		return selectedNodes;
	}

	function linkNodes(nodes){
		var selectedNodes = getSelectedNodes(nodes);
		selectedNodes.forEach(function (node){
			node.link(selectedNodes);
		})
	}

	function clearLinks(nodes){
		var selectedNodes = getSelectedNodes(nodes);
		selectedNodes.forEach(function (node){
			node.clearLinksWith(selectedNodes);
		})
	}

	return {
		runMode: function activateMode(nodes, point){
			if(currentMode == "SELECT"){
				return selectNode(nodes, point);
			} else if(currentMode == "NEW"){
				return createNodeAt(nodes, point);
			} else if(currentMode === "LINK"){
				return linkNodes(nodes)
			} else if(currentMode === "CLEAR"){
				return clearLinks(nodes)
			}
		},
		setMode: function(newMode){
			currentMode = newMode;
		}
	}
}