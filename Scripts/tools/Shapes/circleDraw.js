import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke} from "../../ShapeSelector.js";

export function circleDraw() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext('2d');
  
  // Create temporary canvas 
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;

  // extra input
  colorSelector(); 
  strokeSelector();

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left),
      y: (event.clientY - rect.top)
    };
  }

  function calculateRadius(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function handleMouseDown(event) {
    const pos = getMousePosition(event);
    isDrawing = true;
    startX = pos.x;
    startY = pos.y;

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMouseMove(event) {
    if (!isDrawing) return;
    
    const pos = getMousePosition(event);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    // radius
    const radius = calculateRadius(startX, startY, pos.x, pos.y);

  
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = getCurrentColor(); 
    ctx.lineWidth = getCurrentStroke(); 
    ctx.stroke();
  }

  function handleMouseUp(event) {
    if (!isDrawing) return;
    
    const pos = getMousePosition(event);
    
    const radius = calculateRadius(startX, startY, pos.x, pos.y);
    
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
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
