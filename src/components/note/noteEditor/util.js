export const XYruler = () => {
		var fromX, fromY;
        var svg = document.createElementNS ('http://www.w3.org/2000/svg',"svg");
        svg.setAttribute("style", "position: absolute; top:0;left:0;height: " + document.body.clientHeight + "px;width: 100%");
        var line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute("style", "stroke-width: 4; stroke: red");

        svg.appendChild(line);
        document.body.appendChild(svg);

        document.body.addEventListener("mousedown", function (e) {
          fromX = e.pageX;
          fromY = e.pageY;
        });

        document.body.addEventListener("mousemove", function (e) {
          if (fromX === undefined) {
            return;
          }

          line.setAttribute("x1", fromX);
          line.setAttribute("x2", e.pageX);
          line.setAttribute("y1", fromY);
          line.setAttribute("y2", e.pageY);

          console.log(
            [fromX, fromY], " to ", [e.pageX, e.pageY], "Distance:",
            Math.sqrt(Math.pow(fromX - e.pageX, 2) + Math.pow(fromY - e.pageY, 2))
          );
        });

        document.body.addEventListener("mouseup", function (e) {
          fromX = undefined;
          fromY = undefined;
        });
}


		
