import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke } from "../../ShapeSelector.js";


export function squareDraw() {
  const canvas = document.getElementById('canvas-board');
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempctx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;
  let width = 0;

  colorSelector();
  strokeSelector();

  function getMousePosition(event){
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function handleMouseDown(event){
    isDrawing = true;
    const {x,y} = getMousePosition(event);
    startX = x;
    startY = y;
    tempctx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    tempctx.drawImage(canvas,0,0);
  }

  function handleMouseMove(event){
    if(!isDrawing) return;
    const {x,y} = getMousePosition(event);
    ctx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    ctx.drawImage(tempCanvas,0,0);
    width = x - startX;
    DrawSquare(width,ctx);
  }

  function handleMouseUp(event){
    if(!isDrawing) return;
    isDrawing = false;
    const {x,y} = getMousePosition(event);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas,0,0);
    DrawSquare(width,ctx);
  }

  function handleMouseLeave(){
    isDrawing = false;
  }

  function DrawSquare(width,ctx){
    ctx.beginPath();
    ctx.rect(startX,startY,width,width);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
    ctx.closepath;
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