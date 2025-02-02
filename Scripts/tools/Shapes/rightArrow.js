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
  let width =0, height = 0;

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

  function handleMouseDown(event){
    isDrawing = true;
    const {x,y} = getMousePosition(event);
    startX = x;
    startY = y;
    tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    tempCtx.drawImage(canvas,0,0);
  }

  function handleMouseMove(event){
    if(!isDrawing) return;
    const {x,y} = getMousePosition(event);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(tempCanvas,0,0);
    width = x - startX;
    height = y - startY;
    DrawRightArrow(x, y, height, width);
  }

  function handleMouseUp(event){
    if(!isDrawing) return;
    isDrawing = false;
    const {x,y} = getMousePosition(event);
    width = x - startX;
    height = y - startY;
    DrawRightArrow(x,y,height,width,ctx)
  }

  function handleMouseLeave(event){
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
