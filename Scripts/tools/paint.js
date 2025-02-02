import { canvasStorage } from "../canvasStorage.js";
import { toolState } from "./managingTools.js";

export function paintDraw(paintColor) {


  const canvas = document.getElementById('canvas-board');
  const ctx = canvas.getContext('2d');

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top),
    };
  }

  function floodfill(startX, startY, fillcolor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const startPos = (startY * canvas.width + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];

    const fillR = parseInt(fillcolor.substr(1, 2), 16);
    const fillG = parseInt(fillcolor.substr(3, 2), 16);
    const fillB = parseInt(fillcolor.substr(5, 2), 16);

    const visited = new Uint8Array(canvas.width * canvas.height);
    const pixelsToCheck = [[startX, startY]];

    function matchesStart(x, y) {
      const index = (y * canvas.width + x) * 4;
      const visitedIndex = y * canvas.width + x;

      return !visited[visitedIndex] &&
        pixels[index] === startR &&
        pixels[index + 1] === startG &&
        pixels[index + 2] === startB &&
        pixels[index + 3] === startA;
    }

    function fill(x, y) {
      const index = (y * canvas.width + x) * 4;
      const visitedIndex = y * canvas.width + x;

      visited[visitedIndex] = 1; // Mark as visited
      pixels[index] = fillR;
      pixels[index + 1] = fillG;
      pixels[index + 2] = fillB;
      pixels[index + 3] = 255;
    }

    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop();

      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      if (!matchesStart(x, y)) continue;

      fill(x, y);

      pixelsToCheck.push([x + 1, y]);
      pixelsToCheck.push([x - 1, y]);
      pixelsToCheck.push([x, y + 1]);
      pixelsToCheck.push([x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function handleMouseDown(event) {
    if(toolState.currentTool !== 'paint') return;
    const { x, y } = getMousePosition(event);
    floodfill(x, y, paintColor);
  }

  // Remove any previous listeners to avoid duplication
  toolState.setCurrentTool('paint',handleMouseDown);
}

export function paintButtonClick() {
  const bucketButton = document.querySelector(".js-bucket");

  if (bucketButton) {
    bucketButton.addEventListener('click', () => {
      const html = `
        <div>
          <input type="color" id="paintColor" value="#000000">
          <label for="paintColor">Paint Color</label><br>
          <button id="colorPaint">Paint</button>
        </div>`;
      document.querySelector(".tool-frame-2").innerHTML = html;

      const paintButton = document.getElementById("colorPaint");
      if (paintButton) {
        paintButton.addEventListener('click', () => {
          const colorValue = document.getElementById("paintColor").value;
          console.log('Selected color:', colorValue);

          // Initialize the paint functionality with the selected color
          paintDraw(colorValue);
          canvasStorage.save();
        });
      }
    });
  }
}
