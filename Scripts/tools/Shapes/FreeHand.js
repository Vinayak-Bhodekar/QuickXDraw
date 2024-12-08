const canvas = document.getElementById('canvas-board');
const ctx = canvas.getContext('2d');

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

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  const { x, y } = getMousePosition(event);
  startX = x;
  startY = y;
});

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) return;

  const { x, y } = getMousePosition(event);

  ctx.beginPath();
  ctx.moveTo(startX, startY); 
  ctx.lineTo(x, y); 
  ctx.strokeStyle = 'white'; 
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  
  startX = x;
  startY = y;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});
