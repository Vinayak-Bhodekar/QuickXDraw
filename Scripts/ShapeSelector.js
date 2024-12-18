import { freeHand } from "./tools/Shapes/FreeHand.js";
import { lineDraw } from "./tools/Shapes/lineDraw.js";
import { CreateRectangle } from "./tools/Shapes/rectangleDraw.js";

let currentShape = null;
let currentShapeName = null;

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
  
  if (shapeName === currentShapeName) {
    removeCurrentShape();
    removeActiveClass();
    return;
  }

  removeCurrentShape();
  removeActiveClass();
  button.classList.add('active');
  activateShape(shapeName);
  currentShapeName = shapeName;
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
    case 'freeHand':
      currentShape = freeHand();
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