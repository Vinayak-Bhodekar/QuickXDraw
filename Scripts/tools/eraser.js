import { saveCanvasState } from "../menu/undoRedoButton.js";
import { canvasStorage } from "../canvasStorage.js";
import { toolState } from "./managingTools.js";

let lineWidth;

export function eraser() {
  
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
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  function hideMenus() {
    const menuBars = document.querySelectorAll('.js-options');
    menuBars.forEach(menu => {
      menu.style.opacity = '0';
      menu.style.pointerEvents = 'none';
    });
  }

  function showMenus() {
    const menuBars = document.querySelectorAll('.js-options');
    menuBars.forEach(menu => {
      menu.style.opacity = '1';
      menu.style.pointerEvents = 'auto';
    });
  }

  function handleMouseDown(event) {
    
    hideMenus();
    isDrawing = true;
    const { x, y } = getMousePosition(event);
    startX = x;
    startY = y;

    // Set line style before starting path
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = lineWidth || 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Start new path
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }

  function handleMouseMove(event) {
    if (!isDrawing) return;
  
    const { x, y } = getMousePosition(event);
  
    ctx.lineTo(x, y);
    ctx.stroke();
    
    startX = x;
    startY = y;
  }

  function handleMouseUp() {
    if (!isDrawing) return;
    
    showMenus();
    isDrawing = false;
    ctx.closePath();

    // Save current state to temp canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    saveCanvasState();
    canvasStorage.save();
  }

  function handleMouseLeave() {
    if (!isDrawing) return;
    
    showMenus();
    isDrawing = false;
    ctx.closePath();

    // Save current state to temp canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    
  }

  // Set up the eraser tool with all its handlers
  toolState.setCurrentTool('eraser', {
    mousedown: handleMouseDown,
    mousemove: handleMouseMove,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave
  });
}

export function eraserClick(){
  document.querySelector(".js-eraser").addEventListener('click', () => {
    let html = "";
    html = `<div>
              <input type="range" min="0" max="100" value="50" class="slider" id="mySlider">
              
          </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;


    document.getElementById("mySlider").addEventListener('input',(event) => {
      lineWidth =  event.target.value;
    });
  });
  
}
