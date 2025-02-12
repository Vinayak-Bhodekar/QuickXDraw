import { inner_adjustement } from "./tool-bar-2.js";
import { buttonRender} from "./buttonsRendering.js";
import { canvasStorage } from "./canvasStorage.js";
import { undo, redo, undoStack, redoStack } from "./menu/undoRedoButton.js";
import { exportButtonHandling } from "./menu/export.js";



document.addEventListener('DOMContentLoaded', () => {
  
  const wasCanvasCreated = localStorage.getItem('canvasCreated');
  
  // when canvas is already created

  if (wasCanvasCreated) {
  
    const savedDimensions = JSON.parse(localStorage.getItem('canvasDimensions')) || {};
    const height = savedDimensions.height || 594;
    const width = savedDimensions.width || 1134;
    
    document.querySelector(".canvas-frame").innerHTML = 
      `<canvas height=${height} width=${width} id="canvas-board"></canvas>`;
    
    buttonRender();
    canvasStorage.load();
    canvasStorage.autoSave();
  } 
  
  // for first time create canvas

  else {
    const addButton = document.querySelector(".canvas-add-button");
    addButton.addEventListener('click', (event) => {
      inner_adjustement("canvas-adjustement");
      
      document.querySelector(".create-button").addEventListener('click', (event) => {
        const height = Number(document.querySelector(".height").value);
        const width = Number(document.querySelector(".width").value);
        
        localStorage.setItem('canvasCreated', 'true');
        localStorage.setItem('canvasDimensions', JSON.stringify({
          height: height === 0 ? 594 : height,
          width: width === 0 ? 1134 : width
        }));
        
        document.querySelector(".canvas-frame").innerHTML = 
          `<canvas height=${height === 0 ? 594 : height} width=${width === 0 ? 1134 : width} id="canvas-board"></canvas>`;
        
        const canvas = document.getElementById("canvas-board");

        // pushing a blank canvas for undo button
        if(canvas) {
          undoStack.push(canvas.toDataURL());
        }

        
        buttonRender();
        canvasStorage.autoSave();
        canvasStorage.load();
        inner_adjustement("don't-display");
      });
    });
  }

  document.getElementById("js-undo-button").addEventListener("click", undo);
  document.getElementById("js-redo-button").addEventListener("click", redo);
  exportButtonHandling();

});






