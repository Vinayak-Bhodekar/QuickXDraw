import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke } from "../../ShapeSelector.js";


export function rightArrowDraw(){

  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;
  let width = 0, height = 0;

  colorSelector();
  strokeSelector();



  function DrawRightArrow(x,y,height,width){
    // Draw the arrow line
    ctx.beginPath();
    ctx.moveTo(startX, startY + (height/2));
    ctx.lineTo(x, startY + (height/2));
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closePath();

    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo((width/2) + (width/8) + startX, startY);
    ctx.lineTo(x, startY + (height/2));
    ctx.lineTo((width/2) + (width/8) + startX, y);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closePath();
  } 

  function getMousePosition (event){
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX-rect.left),
      y: (event.clientY-rect.top)
    };
  }

  function getTouchPosition(event) {
    const touch = event.touches[0];
    return getMousePosition(touch);
  }

  function handleMouseDown(event){
    event.preventDefault();
    isDrawing = true;
    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);
    startX = pos.x;
    startY = pos.y;
    tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    tempCtx.drawImage(canvas,0,0);
  }

  function handleMouseMove(event){
    event.preventDefault();
    if(!isDrawing) return;
    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(tempCanvas,0,0);
    width = pos.x - startX;
    height = pos.y - startY;
    DrawRightArrow(pos.x, pos.y, height, width);
  }

  function handleMouseUp(event){
    event.preventDefault();
    if(!isDrawing) return;
    isDrawing = false;
    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);
    width = pos.x - startX;
    height = pos.y - startY;
    DrawRightArrow(pos.x,pos.y,height,width,ctx);
  }

  function handleMouseLeave(event){
    isDrawing = false;
  }

  canvas.addEventListener('touchstart', handleMouseDown);
  canvas.addEventListener('touchmove', handleMouseMove);
  canvas.addEventListener('touchend', handleMouseUp);

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

export function rightArrowClick() {
  document.querySelector(".js-rightArrow").addEventListener('click', () => {
    let html = "";
    html = `<div>
              <input type="range" min="0" max="100" value="50" class="slider" id="mySlider">
          </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;
  });
}