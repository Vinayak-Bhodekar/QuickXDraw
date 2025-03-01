import { lineDraw } from "./tools/Shapes/lineDraw.js";
import { CreateRectangle } from "./tools/Shapes/rectangleDraw.js";
import { circleDraw } from "./tools/Shapes/circleDraw.js";
import { triangleDraw } from "./tools/Shapes/tringleDraw.js";
import { squareDraw } from "./tools/Shapes/square.js";
import { rightArrowDraw } from "./tools/Shapes/rightArrow.js";
import { leftArrowDraw } from "./tools/Shapes/leftArrow.js";
import { downArrowDraw } from "./tools/Shapes/downArrow.js";
import { upArrowDraw } from "./tools/Shapes/upArrow.js";
import { canvasStorage } from "./canvasStorage.js";
import { toolState } from "./tools/managingTools.js";

let currentShape = null;
let currentShapeName = null;
let color = '#000000'; // Default color
let stroke = 2;

// Remove the current shape
function removeCurrentShape() {
  if (currentShape) {
    const canvas = document.getElementById("canvas-board");
    canvas.removeEventListener('mousedown', currentShape.mousedown);
    canvas.removeEventListener('mousemove', currentShape.mousemove);
    canvas.removeEventListener('mouseup', currentShape.mouseup);
    canvas.removeEventListener('mouseleave', currentShape.mouseleave);
    currentShape = null;
    currentShapeName = null;
  }
}

function removeActiveClass() {
  document.querySelectorAll('.js-shape-selector, .use-tool').forEach(button => {
    button.classList.remove('active');
  });
}

export function shapeSelector() {
  document.querySelectorAll(".js-shape-selector").forEach(button => {
    button.addEventListener('click', () => {
      const shapeName = button.dataset.shapeName;
      handleShapeSelection(shapeName, button);
    });
  });

  const freeHandButton = document.querySelector(".js-freeHand");
  if (freeHandButton) {
    freeHandButton.addEventListener('click', () => {
      handleShapeSelection('freeHand', freeHandButton);
    });
  }
}

function handleShapeSelection(shapeName, button) {
  // Allow switching to shape tool
  if (toolState.currentTool !== 'shape') {
    toolState.setCurrentTool('shape'); // Set the current tool to shape
  } else {
    // If already in shape mode, remove the current shape before selecting a new one
    clearCurrentShape();
  }

  removeActiveClass();
  button.classList.add('active');
  activateShape(shapeName);
  currentShapeName = shapeName;

  canvasStorage.save();
}

export function clearCurrentShape() {
  removeCurrentShape();
  removeActiveClass();
}

export function colorSelector(preColor) {
  if (preColor) {
    color = preColor;
  } else {
    const colorInput = document.getElementById("shapeColor");
    if (colorInput) {
      colorInput.addEventListener('input', (event) => {
        color = event.target.value;
      });
    }
  }
}

export function strokeSelector() {
  const strokeInput = document.getElementById("shapeThickness");
  if (strokeInput) {
    strokeInput.addEventListener('input', (event) => {
      stroke = event.target.value;
    });
  }
}

function activateShape(shapeName) {
  switch (shapeName) {
    case 'line':
      currentShape = lineDraw();
      break;
    case 'rectangle':
      currentShape = CreateRectangle();
      break;
    case 'circle':
      currentShape = circleDraw(color);
      break;
    case 'triangle':
      currentShape = triangleDraw();
      break;
    case 'square':
      currentShape = squareDraw();
      break;
    case 'right-Arrow':
      currentShape = rightArrowDraw();
      break;
    case 'left-Arrow':
      currentShape = leftArrowDraw();
      break;
    case 'down-Arrow':
      currentShape = downArrowDraw();
      break;
    case 'up-Arrow':
      currentShape = upArrowDraw();
      break;
    default:
      currentShapeName = null;
  }
}

export function getCurrentColor() {
  return color;
}

export function getCurrentStroke() {
  return stroke;
}