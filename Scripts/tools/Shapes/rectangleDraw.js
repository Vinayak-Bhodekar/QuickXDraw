export function CreateRectangle(){
  console.log("rectangle has been called.");
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;
  let width =0, height = 0;


  function getMousePosition (event){
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX-rect.left),
      y: (event.clientY-rect.top)
    };
  }

  function handleMouseDown(event){
    const pos = getMousePosition(event);
    isDrawing = true;
    startX = pos.x;
    startY = pos.y;

    tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
    tempCtx.drawImage(canvas,0,0);
  }

  function handleMouseMove(event){
    if(!isDrawing) return;
    const pos = getMousePosition(event);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    width = pos.x - startX;
    height = pos.y - startY;

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = '#000';  
    ctx.lineWidth = 2;     
    ctx.stroke();
    ctx.closePath();
  }

  function handleMouseUp(event){
    if (!isDrawing) return;
    
    const pos = getMousePosition(event);
    width = pos.x - startX;
    height = pos.y - startY;
    
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;        
    ctx.stroke();
    ctx.closePath();

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    isDrawing = false;
  }

  function handleMouseLeave(){
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
    mousedown:handleMouseDown,
    mousemove:handleMouseMove,
    mouseup:handleMouseUp,
    mouseleave:handleMouseLeave
  };
}
