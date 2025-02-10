import { lineDraw } from "./tools/Shapes/lineDraw.js";
import { CreateRectangle } from "./tools/Shapes/rectangleDraw.js";
import { circleDraw } from "./tools/Shapes/circleDraw.js"
import { triangleDraw } from "./tools/Shapes/tringleDraw.js";
import { squareDraw } from "./tools/Shapes/square.js";
import { rightArrowDraw} from "./tools/Shapes/rightArrow.js";
import { leftArrowDraw } from "./tools/Shapes/leftArrow.js";
import { downArrowDraw } from "./tools/Shapes/downArrow.js";
import { upArrowDraw} from "./tools/Shapes/upArrow.js";
import { toolState } from "./tools/managingTools.js";
import { canvasStorage } from "./canvasStorage.js";

let currentShape = null;
let currentShapeName = null;
let color = '#000000'; // Default color
let stroke = 2;

// remove the current shape

function removeCurrentShape(){
  if(currentShape){
    console.log("Removing shape:", currentShapeName);
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

export function shapeSelector(){
  document.querySelectorAll(".js-shape-selector").forEach(button => {
    button.addEventListener('click', () => {
      console.log("Shape button clicked:", button.dataset.shapeName);
      const shapeName = button.dataset.shapeName;
      handleShapeSelection(shapeName, button);
    });
  });

  const freeHandButton = document.querySelector(".js-freeHand");
  if(freeHandButton){
    freeHandButton.addEventListener('click',() => {
      console.log("freeHand button clicked");
      handleShapeSelection('freeHand', freeHandButton);
    });
  } 
}

export function initializeToolbar() {
  const freeHandButton = document.querySelector(".js-freeHand");
  if (freeHandButton) {
    freeHandButton.addEventListener('click', () => {
      console.log("FreeHand button clicked");
      handleShapeSelection('freeHand', freeHandButton);
    });
  }
}

function handleShapeSelection(shapeName, button) {
  console.log("Selecting shape:", shapeName);

  // Allow switching to shape tool
  if (toolState.currentTool !== 'shape' && toolState.currentTool !== 'freehand') {
    console.log("Switching to shape tool.");
    toolState.setCurrentTool('shape'); // Set the current tool to shape
  }

  if (shapeName === currentShapeName) {
    return;
  }

  removeCurrentShape();
  removeActiveClass();
  button.classList.add('active');
  activateShape(shapeName);
  currentShapeName = shapeName;

  canvasStorage.save();
}

export function colorSelector() {
  const colorInput = document.getElementById("shapeColor");
  if (colorInput) {
    colorInput.addEventListener('input', (event) => {
      color = event.target.value; // Update the global color variable
      console.log(color);
    });
  } else {
    console.error("Color input not found!");
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

function activateShape(shapeName){
  console.log("Activating shape:", shapeName);
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
      console.log('Shape not implemented');
      currentShapeName = null;
  }
}

export function isShapeActive() {
  return currentShape !== null;
}

export function getCurrentShape() {
  return currentShape;
}

export function clearCurrentShape(){
  removeCurrentShape();
  removeActiveClass();
}

export function getCurrentColor() {
  return color; // Function to get the current color
}

export function getCurrentStroke() {
  return stroke;
}