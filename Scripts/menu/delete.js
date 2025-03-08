import { canvasStorage } from "../canvasStorage.js";
import { undoStack, redoStack } from "./undoRedoButton.js";

export function handleDeleteButton() {
  document.getElementById("js-delete-button").addEventListener("click", () => {
    const canvas = document.getElementById("canvas-board");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear local storage
    localStorage.removeItem("undostack"); 
    localStorage.removeItem("redostack");

    // Reset undo/redo stacks
    undoStack.length = 0; 
    redoStack.length = 0;

    // Save the cleared state manually
    const emptyState = canvas.toDataURL();
    undoStack.push(emptyState);
    localStorage.setItem("undostack", JSON.stringify(undoStack));
    localStorage.setItem("redostack", JSON.stringify(redoStack));

    // Save to storage
    canvasStorage.save();

    // Display confirmation message
    showConfirmationMessage("Canvas cleared!");
  });
}

// Function to display a confirmation message
function showConfirmationMessage(message) {
  const confirmation = document.createElement("div");
  confirmation.textContent = message;
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
    z-index: 1000;
  `;

  document.body.appendChild(confirmation);

  // Show and auto-remove confirmation
  setTimeout(() => {
    confirmation.style.opacity = "1";
    setTimeout(() => {
      confirmation.style.opacity = "0";
      setTimeout(() => confirmation.remove(), 300);
    }, 2000);
  }, 0);
}
