import { canvasStorage } from "../canvasStorage.js";

const canvas = document.getElementById("canvas-board");

export let undoStack = JSON.parse(localStorage.getItem("undostack")) || [];
export let redoStack = JSON.parse(localStorage.getItem("redostack")) || [];


// Function to save the current canvas state
export function saveCanvasState(isUndoRedoOperation = false) {
    const canvas = document.getElementById("canvas-board");
    const ctx = canvas.getContext("2d");
    const state = canvas.toDataURL();
    undoStack.push(state);
    
    if (!isUndoRedoOperation) {
        redoStack = []; // Clear the redo stack only on new drawing actions
    }
    
    localStorage.setItem("undostack", JSON.stringify(undoStack));
    localStorage.setItem("redostack", JSON.stringify(redoStack));
    console.log("canvas has been saved in undo");
}

// Function to undo the last action
export function undo() {
    if (undoStack.length > 1) {
        console.log("hello");
        redoStack.push(undoStack.pop());
        const lastState = undoStack[undoStack.length - 1];
        const canvas = document.getElementById("canvas-board");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = lastState;
        
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            canvasStorage.save();
        };
        localStorage.setItem("undostack", JSON.stringify(undoStack));
        console.log("redo = ", redoStack.length, "undo = ", undoStack.length);
    }
}

// Function to redo the last undone action
export function redo() {
    
    if (redoStack.length > 0) {

        const nextState = redoStack.pop(); //step 1st

        undoStack.push(nextState); // step 2nd
        
        const canvas = document.getElementById("canvas-board");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = nextState;

        
        img.onload = function() {
            
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(img, 0, 0); // Draw the next state
            canvasStorage.save();

        }; // Set the source to the next state
        localStorage.setItem("redostack", JSON.stringify(redoStack));
        console.log("redo = ", redoStack.length, "undo = ", undoStack.length);
    }

    
}

export function handlingUndoRedoButton() {
    document.getElementById("js-undo-button").addEventListener('click',undo);
    document.getElementById("js-redo-button").addEventListener('click',redo);
}