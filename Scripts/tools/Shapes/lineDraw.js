import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke} from "../../ShapeSelector.js";


export function lineDraw() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;

  strokeSelector();

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left),
      y: (event.clientY - rect.top)
    };
  }

  
  function getTouchPosition(event) {
    const touch = event.touches[0];
    return getMousePosition(touch);
  }

  function handleMouseDown(event) {

    event.preventDefault();
    const pos = event.type === "touchend" ? { x: startX, y: startY } : getMousePosition(event);
    isDrawing = true;
    startX = pos.x;
    startY = pos.y;

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    if (!isDrawing) return;
    
    const pos = event.type === "touchend" ? { x: startX, y: startY } : getMousePosition(event);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(tempCanvas, 0, 0);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
  }

  function handleMouseUp(event) {
    if (!isDrawing) return;
    event.preventDefault();
    
    const pos = event.type === "touchend" ? { x: startX, y: startY } : getMousePosition(event);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    isDrawing = false;
  }

  function handleMouseLeave() {
    if (!isDrawing) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
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