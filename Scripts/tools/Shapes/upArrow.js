import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke } from "../../ShapeSelector.js";


export function upArrowDraw() {
  const canvas = document.getElementById('canvas-board');
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;
  let width = 0, height = 0;

  colorSelector();
  strokeSelector();

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function handleMouseDown(event) {
    isDrawing = true;
    const {x,y} = getMousePosition(event);
    startX = x;
    startY = y;
    // Save current canvas state
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMouseMove(event) {
    if(!isDrawing) return;
    const {x,y} = getMousePosition(event);
    
    // Clear the main canvas and restore the previous state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    width = x - startX;
    height = startY - y;
    DrawUpArrow(x, y, height, width);
  }

  function handleMouseUp(event) {
    if(!isDrawing) return;
    isDrawing = false;
    const {x,y} = getMousePosition(event);
    
    // Draw final shape
    width = x - startX;
    height = startY - y;
    DrawUpArrow(x, y, height, width);
  }

  function handleMouseLeave() {
    isDrawing = false;
  }

  function DrawUpArrow(x, y, height, width) {
    // Draw the arrow line
    ctx.beginPath();
    ctx.moveTo(startX + (width/2), startY);
    ctx.lineTo(startX + (width/2), y);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closePath();

    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(startX, y + (height/4));
    ctx.lineTo(startX + (width/2), y);
    ctx.lineTo(x, y + (height/4));
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closePath();
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  return {
    mousedown: handleMouseDown,
    mousemove: handleMouseMove,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave
  };
}

export function upArrowClick() {
  document.querySelector(".js-upArrow").addEventListener('click', () => {
    let html = "";
    html = `<div>
              <input type="range" min="0" max="100" value="50" class="slider" id="mySlider">
          </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;
  });
}