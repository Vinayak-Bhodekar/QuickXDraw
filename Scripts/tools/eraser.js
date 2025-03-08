import { saveCanvasState } from "../menu/undoRedoButton.js";
import { canvasStorage } from "../canvasStorage.js";
import { toolState } from "./managingTools.js";

let lineWidth = 5; // Default eraser size

export function eraser() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext("2d");

  let isDrawing = false;

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  
  function getTouchPosition(event) {
    const touch = event.touches[0];
    return getMousePosition(touch);
  }

  function hideMenus() {
    document.querySelectorAll(".js-options").forEach((menu) => {
      menu.style.opacity = "0";
      menu.style.pointerEvents = "none";
    });
  }

  function showMenus() {
    document.querySelectorAll(".js-options").forEach((menu) => {
      menu.style.opacity = "1";
      menu.style.pointerEvents = "auto";
    });
  }

  function handleMouseDown(event) {
    event.preventDefault();
    hideMenus();
    isDrawing = true;

    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);

    // Set eraser mode
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    if (!isDrawing) return;

    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function handleMouseUp() {
    if (!isDrawing) return;

    isDrawing = false;
    ctx.closePath();
    // Reset composite operation back to default
    ctx.globalCompositeOperation = 'source-over';

    saveCanvasState();
    canvasStorage.save();
    showMenus();
  }

  function handleMouseLeave() {
    if (isDrawing) {
      handleMouseUp();
    }
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseLeave);


  canvas.addEventListener('touchstart', handleMouseDown);
  canvas.addEventListener('touchmove', handleMouseMove);
  canvas.addEventListener('touchend', handleMouseUp);


  return{
    mousedown: handleMouseDown,
    mousemove: handleMouseMove,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave,
  };
}

export function eraserClick() {
  document.querySelector(".js-eraser").addEventListener("click", () => {
    document.querySelector(".tool-frame-2").innerHTML = `
      <div>
        <input type="range" min="1" max="100" value="${lineWidth}" class="slider" id="mySlider">
      </div>`;

    document.getElementById("mySlider").addEventListener("input", (event) => {
      lineWidth = event.target.value;
    });
  });
}
