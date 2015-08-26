window.onload = function () {
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');
    var canvasPosition = {
        x: 0,
        y: 0
    };

    var modes = getModes();

    var nodes = [];

    nodes.push(createNode(100, 100, 100, 100));
    nodes.push(createNode(100, 300, 100, 100));
    nodes.push(createNode(300, 100, 100, 100));
    nodes.push(createNode(300, 300, 100, 100));

    function beginDraw() {
        setTimeout(draw, 1)
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(function drawLinks(node) {
            node.drawLinks(ctx, canvasPosition);
        });
        nodes.forEach(function drawNode(node) {
            node.draw(ctx, canvasPosition);
        });
    }

    $(canvas)
        .on('mousedown', function collisionDetect(e) {
            modes.runMode(nodes, {
                x: e.offsetX,
                y: e.offsetY
            }, canvasPosition)
            draw();
        });

    $(document).on('keydown', function setMode(e) {
        if (e.which == 37) {
            canvasPosition.x -= 5;
        }
        if (e.which == 38) {
            canvasPosition.y -= 5;
        }
        if (e.which == 39) {
            canvasPosition.x += 5;
        }
        if (e.which == 40) {
            canvasPosition.y += 5;
        }
        draw();
    })

    $(document).on('keypress', function setMode(e) {
        if (e.which == 99) { //c
            modes.setMode("CLEAR")
            modes.runMode(nodes, {})
            modes.setMode("SELECT")
        }
        if (e.which == 108) { //l
            modes.setMode("LINK")
            modes.runMode(nodes, {})
            modes.setMode("SELECT")
        }
        if (e.which == 110) { //n
            modes.setMode("NEW")
        }
        if (e.which == 115) { //s
            modes.setMode("SELECT")
        }
        draw();
    })
    beginDraw();
};