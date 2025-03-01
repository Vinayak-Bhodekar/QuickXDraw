import { inner_adjustement } from "./tool-bar-2.js";
import { buttonRender} from "./buttonsRendering.js";
import { canvasStorage } from "./canvasStorage.js";
import { handlingUndoRedoButton,saveCanvasState} from "./menu/undoRedoButton.js";
import { exportButtonHandling } from "./menu/export.js";
import { handleDeleteButton } from "./menu/delete.js";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas-board");
  
  // Set initial canvas dimensions
  if (canvas) {
    // Set canvas dimensions to match display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    
    const savedCanvas = localStorage.getItem("savedCanvas");
    if (savedCanvas) {
      const img = new Image();
      img.onload = function() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = savedCanvas;
    }

    // Set up auto-save
    canvasStorage.autoSave();
    saveCanvasState();
  }

  // Initialize buttons and event handlers
  buttonRender();
  exportButtonHandling();
  handleDeleteButton();
  handlingUndoRedoButton();

  // Mark canvas as created
  localStorage.setItem("canvasCreated", 'true');
});
