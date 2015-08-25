function createNode(x, y, width, height){
	var r = Math.floor(Math.random() * 100 + 55);
	var g = Math.floor(Math.random() * 120 + 55);
	var b = Math.floor(Math.random() * 150 + 55);
	var fillStyle = "rgb("+r+", "+g+", "+b+")"
	var isSelected = false;
	var links =[];
	var linkStartCoordinates={x:x + width/2+ 5,y:y+height/2+5}
	var linkTargetCoordinates = {x:x + width/2+ 15,y:y+height/2+5}

	return {
		selected:isSelected,
		draw: function(ctx){
			if(isSelected){
				ctx.fillStyle="rgb(0, 0, 200)"
				ctx.fillRect(x- 5, y- 5, width + 10, height + 10);
			}
			ctx.fillStyle = fillStyle;
			ctx.fillRect(x, y, width, height);
		},
		drawLinks: function(ctx){
			links.forEach(function(link, i){
		    	ctx.beginPath();
				ctx.moveTo(linkStartCoordinates.x, linkStartCoordinates.y);
				ctx.lineTo(link.targetCoordinates.x, link.targetCoordinates.y);
		      	ctx.stroke();
			});
		},
		toggleSelect: function(point){
			if(this.collision(point)){
				isSelected = !isSelected;
			}
		},
		collision: function(point){
			return x < point.x && y < point.y && x + width > point.x && y + height > point.y;
		},
		isSelected: function(){
			return isSelected;
		},
		collidesWith: function (square){
			var r = square.width+20
			var p1 = {x: x + width/2, y: y + width/2}
			var p2 = {x: square.x + square.width/2, y: square.y + square.width/2}
			return Math.abs(p1.x - p2.x) < r && Math.abs(p1.y - p2.y) < r
		},
		link: function(nodes){
			var self = this;
			nodes.forEach(function (node){
				if(!node.hasSameCoordinates(x, y)) {
					self.linkWith(node);
				}
			});
			isSelected = false
		},
		clearLinksWith: function (nodes){
			nodes.forEach(function(node){
				links = $.grep(links, function(value) {
					return !node.isSameAs(value);
				});
			});
		},
		linkWith: function(node){
			var self = this;
			var hasLink = false;
			links.forEach(function (link){
				if(link.isSameAs(node)) {
					hasLink = true;
				}
			});
			if(!hasLink){
				links.push(node);
				node.addMe(self);
			}
		},
		addMe: function(node){
			var hasLink = false;
			links.forEach(function (link){
				if(link.isSameAs(node)) {
					hasLink = true;
				}
			});
			if(!hasLink){
				links.push(node);
			}
		},
		hasSameCoordinates: function(otherX, otherY){
			return x === otherX && y === otherY;
		},
		isSameAs: function(other){
			return other.hasSameCoordinates(x, y);
		},
		targetCoordinates:linkTargetCoordinates
	}
}