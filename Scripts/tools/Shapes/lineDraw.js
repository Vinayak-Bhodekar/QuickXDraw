const canvas = document.getElementById("canvas-board");
const ctx = canvas.getContext('2d');

const tempCanvas = document.createElement("canvas");
tempCanvas.width = canvas.width;
tempCanvas.height = canvas.height;
const tempCtx = tempCanvas.getContext('2d');
console.log("hello",tempCanvas);



let startX = 0, centerY = 0;
let isDrawing = false;



function getMousePosition(event){
  const rect = canvas.getBoundingClientRect();
  return {
    x:(event.clientX - rect.left) ,
    y:(event.clientY - rect.top)
  };
}

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  const {x,y} = getMousePosition(event);
  startX = x;
  centerY = y;

  tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
  tempCtx.drawImage(canvas,0,0);
});

canvas.addEventListener('mousemove', (event) => {
  if(!isDrawing) return;

  const {x,y} = getMousePosition(event);

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(tempCanvas,0,0);

  ctx.beginPath();
  ctx.moveTo(startX,centerY);
  ctx.lineTo(x,y);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
});

canvas.addEventListener('mouseup', (event) => {
  if(!isDrawing) return;
  isDrawing = false;

  const {x,y} = getMousePosition(event);

  ctx.drawImage(tempCanvas,0,0);
  ctx.beginPath();
  ctx.moveTo(startX,centerY);
  ctx.lineTo(x,y);
  ctx.stroke();
  ctx.closePath();
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});