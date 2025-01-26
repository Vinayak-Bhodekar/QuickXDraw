export function circleDraw() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext('2d');
  
  // Create temporary canvas for preview
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;

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

    // Save current canvas state
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMouseMove(event) {
    if (!isDrawing) return;
    
    const pos = getMousePosition(event);
    
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Restore the previous state
    ctx.drawImage(tempCanvas, 0, 0);
    
    // Calculate radius
    const radius = calculateRadius(startX, startY, pos.x, pos.y);

    // Draw the preview circle
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function handleMouseUp(event) {
    if (!isDrawing) return;
    
    const pos = getMousePosition(event);
    
    // Calculate final radius
    const radius = calculateRadius(startX, startY, pos.x, pos.y);
    
    // Draw the final circle
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Save current state to temp canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    isDrawing = false;
  }

  function handleMouseLeave() {
    if (!isDrawing) return;
    
    // Restore the previous state if mouse leaves canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    isDrawing = false;
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
