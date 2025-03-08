import { colorSelector, getCurrentColor, strokeSelector, getCurrentStroke } from "../../ShapeSelector.js";

export function circleDraw() {
  const canvas = document.getElementById("canvas-board");
  const ctx = canvas.getContext("2d");

  // Create temporary canvas
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");

  let isDrawing = false;
  let startX = 0, startY = 0;

  // Extra input
  colorSelector();
  strokeSelector();

  function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left),
      y: (event.clientY - rect.top),
    };
  }

  function getTouchPosition(event) {
    const touch = event.touches[0];
    return getMousePosition(touch);
  }

  function calculateRadius(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function handleStart(event) {
    event.preventDefault();
    const pos = event.type === "touchstart" ? getTouchPosition(event) : getMousePosition(event);
    isDrawing = true;
    startX = pos.x;
    startY = pos.y;

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  function handleMove(event) {
    if (!isDrawing) return;
    event.preventDefault();

    const pos = event.type === "touchmove" ? getTouchPosition(event) : getMousePosition(event);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    const radius = calculateRadius(startX, startY, pos.x, pos.y);

    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();
  }

  function handleEnd(event) {
    if (!isDrawing) return;
    event.preventDefault();

    const pos = event.type === "touchend" ? { x: startX, y: startY } : getMousePosition(event);
    const radius = calculateRadius(startX, startY, pos.x, pos.y);

    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = getCurrentStroke();
    ctx.stroke();

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    isDrawing = false;
  }

  function handleLeave(event) {
    if (!isDrawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    isDrawing = false;
  }

  // Mouse Events
  canvas.addEventListener("mousedown", handleStart);
  canvas.addEventListener("mousemove", handleMove);
  canvas.addEventListener("mouseup", handleEnd);
  canvas.addEventListener("mouseleave", handleLeave);

  // Touch Events (for mobile)
  canvas.addEventListener("touchstart", handleStart, { passive: false });
  canvas.addEventListener("touchmove", handleMove, { passive: false });
  canvas.addEventListener("touchend", handleEnd);

  return {
    mousedown: handleStart,
    mousemove: handleMove,
    mouseup: handleEnd,
    mouseleave: handleLeave,
  };
}