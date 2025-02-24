import { canvasStorage } from "../canvasStorage.js";
import { saveCanvasState } from "./undoRedoButton.js";

export function handleDeleteButton() {
  document.getElementById("js-delete-button").addEventListener('click', () => {
    const canvas = document.getElementById('canvas-board');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear storage
    localStorage.clear();
    
    // Save the cleared state
    canvasStorage.save();
    saveCanvasState();

    // Optional: Show confirmation
    const confirmation = document.createElement('div');
    confirmation.textContent = 'Canvas cleared';
    confirmation.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(confirmation);
    
    // Show and hide confirmation
    setTimeout(() => {
      confirmation.style.opacity = '1';
      setTimeout(() => {
        confirmation.style.opacity = '0';
        setTimeout(() => confirmation.remove(), 300);
      }, 2000);
    }, 0);
  });
}
