export function freeHand() {
  const canvas = document.getElementById('canvas-board');
  const ctx = canvas.getContext('2d');

  // Create temporary canvas for preview
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  
  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function handleMouseDown(event) {
    isDrawing = true;
    const { x, y } = getMousePosition(event);
    startX = x;
    startY = y;

    // Save current canvas state
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    // Start new path
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }

  function handleMouseMove(event) {
    if (!isDrawing) return;
  
    const { x, y } = getMousePosition(event);
  
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    startX = x;
    startY = y;
  }

  function handleMouseUp() {
    if (!isDrawing) return;
    
    isDrawing = false;
    ctx.closePath();

    // Save current state to temp canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMouseLeave() {
    if (!isDrawing) return;
    
    isDrawing = false;
    ctx.closePath();

    // Save current state to temp canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
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

export function freeHandClick(){
  document.querySelector(".js-freeHand").addEventListener('click', () => {
    let html = "";
    html = `<div>
              <input type="range" min="0" max="100" value="50" class="slider" id="mySlider">
          </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;
  });
}
