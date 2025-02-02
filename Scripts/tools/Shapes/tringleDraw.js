import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke } from "../../ShapeSelector.js";


export function triangleDraw() {
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
    tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    tempCtx.drawImage(canvas,0,0);
  }

  function handleMouseMove(event) {
    if(!isDrawing) return;
    const {x,y} = getMousePosition(event);
    ctx.clearRect(0,0,tempCanvas.width, tempCanvas.height);
    ctx.drawImage(tempCanvas,0,0);
    width = Math.sqrt(((x-startX)**2) + ((startY-startY)**2));
    height = Math.sqrt(((x-x)**2) + ((y-startY)**2));
    DrawTriangle(x,y,height,width,ctx);
  }

  function handleMouseUp(event) {
    if(!isDrawing) return;
    isDrawing = false;
    const {x,y} = getMousePosition(event);
    ctx.drawImage(tempCanvas,0,0);
    DrawTriangle(x,y,height,width,ctx);
  }

  function handleMouseLeave() {
    isDrawing = false;
  }

  function DrawTriangle(x,y,height,width,ctx){
    const x1 = x - (2*width);
    ctx.beginPath();
    ctx.rect(startX-(2*width),startY,width*2,height);
    ctx.strokeStyle = `transparent`;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(x,y);
    ctx.lineTo(x1,y);
    ctx.lineTo(startX,startY);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closePath(); 
  }

  // Add event listeners
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  // Return the event handlers
  return {
    mousedown: handleMouseDown,
    mousemove: handleMouseMove,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave
  };
}

export function triangleClick() {
  document.querySelector(".js-triangle").addEventListener('click', () => {
    let html = "";
    html = `<div>
              <input type="range" min="0" max="100" value="50" class="slider" id="mySlider">
          </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;
  });
}
