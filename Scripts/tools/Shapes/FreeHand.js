import { colorSelector, getCurrentColor } from "../../ShapeSelector.js";
import { saveCanvasState } from "../../menu/undoRedoButton.js";

let lineWidth = 1;
let isDrawing = false;
let hasDrawn = false; // Prevents multiple saves

export function freeHand() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext("2d");

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  function getTouchPosition(event) {
    const touch = event.touches[0];
    return getMousePosition(touch);
  }

  function hideMenus() {
    document.querySelectorAll(".js-options").forEach(menu => {
      menu.style.opacity = "0";
      menu.style.pointerEvents = "none";
    });
  }

  function showMenus() {
    document.querySelectorAll(".js-options").forEach(menu => {
      menu.style.opacity = "1";
      menu.style.pointerEvents = "auto";
    });
  }

  function handleStart(event) {
    event.preventDefault();
    hideMenus();
    isDrawing = true;
    hasDrawn = false; // Reset flag

    const pos = event.type.startsWith("touch") ? getTouchPosition(event) : getMousePosition(event);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = lineWidth || 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function handleMove(event) {
    if (!isDrawing) return;
    event.preventDefault();

    const pos = event.type.startsWith("touch") ? getTouchPosition(event) : getMousePosition(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    hasDrawn = true; // Mark that drawing has occurred
  }

  function handleEnd() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
    showMenus();

    if (hasDrawn) {
      saveCanvasState(); // Save only if something was drawn
      hasDrawn = false;
    }
  }

  
  canvas.addEventListener('mousedown', handleStart);
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mouseup', handleEnd);
  canvas.addEventListener('mouseleave', handleEnd);


  canvas.addEventListener('touchstart', handleStart);
  canvas.addEventListener('touchmove', handleMove);
  canvas.addEventListener('touchend', handleEnd);


  return {
    mousedown: handleStart,
    mousemove: handleMove,
    mouseup: handleEnd,
    mouseleave: handleEnd
  };
}

export function freeHandClick() {
  document.querySelector(".js-freeHand").addEventListener("click", () => {
    let html = `
      <div>
        <input type="range" min="1" max="100" value="1" class="slider" id="mySlider">
        <input type="color" value="#000000" id="shapeColor">
      </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;

    colorSelector();

    document.getElementById("mySlider").addEventListener("input", (event) => {
      lineWidth = event.target.value;
    });
  });
}
