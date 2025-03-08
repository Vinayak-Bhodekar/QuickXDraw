import { canvasStorage } from "../canvasStorage.js";

const canvas = document.getElementById("canvas-board");

export let undoStack = JSON.parse(localStorage.getItem("undostack")) || [];
export let redoStack = JSON.parse(localStorage.getItem("redostack")) || [];

// Function to save the current canvas state
export function saveCanvasState() {
    const state = canvas.toDataURL();
    undoStack.push(state);
    redoStack = []; // ✅ Clear redo stack when new action is performed

    localStorage.setItem("undostack", JSON.stringify(undoStack));
    localStorage.setItem("redostack", JSON.stringify(redoStack));
}

// Function to undo the last action
export function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        restoreCanvas(undoStack[undoStack.length - 1]);
    }
}

// Function to redo the last undone action
export function redo() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push(nextState);
        restoreCanvas(nextState);
    }
}

// Function to restore canvas state from a saved image
function restoreCanvas(state) {
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = state;
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvasStorage.save();
    };
    localStorage.setItem("undostack", JSON.stringify(undoStack));
    localStorage.setItem("redostack", JSON.stringify(redoStack));
}

export function handlingUndoRedoButton() {
    document.getElementById("js-undo-button").addEventListener('click', undo);
    document.getElementById("js-redo-button").addEventListener('click', redo);
}
