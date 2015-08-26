function createNode(x, y, width, height) {
    var r = Math.floor(Math.random() * 100 + 55);
    var g = Math.floor(Math.random() * 120 + 55);
    var b = Math.floor(Math.random() * 150 + 55);
    var fillStyle = "rgb(" + r + ", " + g + ", " + b + ")"
    var isSelected = false;
    var links = [];
    var linkStartCoordinates = {
        x: x + width / 2 + 5,
        y: y + height / 2 + 5
    }
    var linkTargetCoordinates = {
        x: x + width / 2 + 15,
        y: y + height / 2 + 5
    }
    var position = {
        x: x,
        y: y
    };

    return {
        selected: isSelected,
        draw: function (ctx, canvasPosition) {
            var translatedPosition = translate({
                x: x,
                y: y
            }, canvasPosition);
            if (isSelected) {
                ctx.fillStyle = "rgb(100, 100, 240)"
                ctx.fillRect(translatedPosition.x - 5, translatedPosition.y - 5, width + 10, height + 10);
            }
            ctx.fillStyle = fillStyle;
            ctx.fillRect(translatedPosition.x, translatedPosition.y, width, height);
        },
        drawLinks: function (ctx, canvasPosition) {
            links.forEach(function (link, i) {
                var translatedLinkStartCoordinates = translate(linkStartCoordinates, canvasPosition);
                var linkTargetCoordinates = translate(link.targetCoordinates, canvasPosition);
                ctx.beginPath();
                ctx.moveTo(translatedLinkStartCoordinates.x, translatedLinkStartCoordinates.y);
                ctx.lineTo(linkTargetCoordinates.x, linkTargetCoordinates.y);
                ctx.stroke();
            });
        },
        toggleSelect: function (point, canvasPosition) {
            if (this.collision(point, canvasPosition)) {
                isSelected = !isSelected;
            }
        },
        collision: function (point, canvasPosition) {
            var translatedPosition = translate(position, canvasPosition);

            return translatedPosition.x < point.x &&
                translatedPosition.y < point.y &&
                translatedPosition.x + width > point.x &&
                translatedPosition.y + height > point.y;
        },
        isSelected: function () {
            return isSelected;
        },
        collidesWith: function (quad, canvasPosition) {
            var translatedPosition = translate(position, canvasPosition);
            var r = width + 20
            var p1 = {
                x: translatedPosition.x + width / 2,
                y: translatedPosition.y + width / 2
            }
            var p2 = {
                x: quad.x + quad.width / 2,
                y: quad.y + quad.width / 2
            }
            return Math.abs(p1.x - p2.x) < r && Math.abs(p1.y - p2.y) < r
        },
        link: function (nodes) {
            var self = this;
            nodes.forEach(function (node) {
                if (!node.hasSameCoordinates(x, y)) {
                    self.linkWith(node);
                }
            });
            isSelected = false
        },
        clearLinksWith: function (nodes) {
            nodes.forEach(function (node) {
                links = $.grep(links, function (value) {
                    return !node.isSameAs(value);
                });
            });
        },
        linkWith: function (node) {
            var self = this;
            var hasLink = false;
            links.forEach(function (link) {
                if (link.isSameAs(node)) {
                    hasLink = true;
                }
            });
            if (!hasLink) {
                links.push(node);
                node.addMe(self);
            }
        },
        addMe: function (node) {
            var hasLink = false;
            links.forEach(function (link) {
                if (link.isSameAs(node)) {
                    hasLink = true;
                }
            });
            if (!hasLink) {
                links.push(node);
            }
        },
        hasSameCoordinates: function (otherX, otherY) {
            return x === otherX && y === otherY;
        },
        isSameAs: function (otherNode) {
            return otherNode.hasSameCoordinates(x, y);
        },
        targetCoordinates: linkTargetCoordinates
    }
}