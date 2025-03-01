import { canvasStorage } from "../canvasStorage.js";
import { toolState } from "./managingTools.js";
import { saveCanvasState } from "../menu/undoRedoButton.js";
import { colorSelector,getCurrentColor } from "../ShapeSelector.js";

export function paintDraw() {
  const canvas = document.getElementById('canvas-board');
  const ctx = canvas.getContext('2d');

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.floor((event.clientX - rect.left) * scaleX),
      y: Math.floor((event.clientY - rect.top) * scaleY)
    };
  }

  function floodfill(startX, startY, fillcolor) {
    // Get the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Get the starting pixel color
    const startPos = (startY * canvas.width + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];

    // Convert fill color from hex to RGB
    const fillR = parseInt(fillcolor.substr(1, 2), 16);
    const fillG = parseInt(fillcolor.substr(3, 2), 16);
    const fillB = parseInt(fillcolor.substr(5, 2), 16);

    // Create a queue for flood fill
    const pixelsToCheck = [[startX, startY]];
    const visited = new Set();

    function checkPixel(x, y) {
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return false;
      
      const key = `${x},${y}`;
      if (visited.has(key)) return false;
      
      const pos = (y * canvas.width + x) * 4;
      return (
        pixels[pos] === startR &&
        pixels[pos + 1] === startG &&
        pixels[pos + 2] === startB &&
        pixels[pos + 3] === startA
      );
    }

    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop();
      const key = `${x},${y}`;
      
      if (!checkPixel(x, y)) continue;
      
      visited.add(key);
      const pos = (y * canvas.width + x) * 4;
      pixels[pos] = fillR;
      pixels[pos + 1] = fillG;
      pixels[pos + 2] = fillB;
      pixels[pos + 3] = 255;

      // Add adjacent pixels
      pixelsToCheck.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
    saveCanvasState();
    canvasStorage.save();
  }

  function handleMouseDown(event) {
    const { x, y } = getMousePosition(event);
    floodfill(x, y, getCurrentColor());
  }

  // Set up the paint tool with all its handlers
  toolState.setCurrentTool('paint', {
    mousedown: handleMouseDown
  });
}

export function paintButtonClick() {
  const bucketButton = document.querySelector(".js-bucket");
  if (bucketButton) {
    bucketButton.addEventListener('click', () => {
      const html = `
        <div class="js-paint-controls">
          <div class="js-color-box">
            <div class="box js-box" style="background-color: black;" data-color="#000000"></div>
            <div class="box js-box" style="background-color: gray;" data-color="#808080"></div>
            <div class="box js-box" style="background-color: maroon;" data-color="#800000"></div>
            <div class="box js-box" style="background-color: red;" data-color="#FF0000"></div>
            <div class="box js-box" style="background-color: purple;" data-color="#800080"></div>
            <div class="box js-box" style="background-color: pink;" data-color="#FFC0CB"></div>
            <div class="box js-box" style="background-color: green;" data-color="#008000"></div>
            <div class="box js-box" style="background-color: lime;" data-color="#00FF00"></div>
            <div class="box js-box" style="background-color: olive;" data-color="#808000"></div>
            <div class="box js-box" style="background-color: yellow;" data-color="#FFFF00"></div>
            <div class="box js-box" style="background-color: navy;" data-color="#000080"></div>
            <div class="box js-box" style="background-color: blue;" data-color="#0000FF"></div>
          </div>
          <input type="color" id="shapeColor" value="#000000">
        </div>`;
      document.querySelector(".tool-frame-2").innerHTML = html;

      function colorButtonSelector() {
        document.querySelectorAll(".js-box").forEach(color => {
          color.addEventListener('click', () => {
            const selectedColor = color.dataset.color;
            colorSelector(selectedColor);
            paintDraw();
          });
        });
      }

      document.querySelectorAll('.js-box').forEach(box => {
        box.style.cursor = 'pointer';
      });

      colorButtonSelector();
      colorSelector();
      paintDraw();
    });
  }
}
