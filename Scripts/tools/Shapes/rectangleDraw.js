const canvas = document.getElementById("canvas-board");
const ctx = canvas.getContext('2d');

const tempCanvas = document.createElement("canvas");
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
  }
}

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;

  const {x,y} = getMousePosition(event);
  startX = x;
  startY = y;

  tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
  tempCtx.drawImage(canvas,0,0);

});

canvas.addEventListener('mousemove', (event) => {
  if(!isDrawing) return;

  const {x,y} = getMousePosition(event);
  ctx.clearRect(0,0,tempCanvas.width, tempCanvas.height);
  ctx.drawImage(tempCanvas,0,0);
  width = Math.sqrt(((x-startX)**2) + ((startY-startY)**2));
  height = Math.sqrt(((x-x)**2) + ((y-startY)**2));
  ctx.beginPath();
  ctx.rect(startX,startY,width,height);
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
  ctx.rect(startX,startY,width,height);
  ctx.stroke();
  ctx.closePath();
});

canvas.addEventListener('mouseleave', (event) => {
  isDrawing = false;
});