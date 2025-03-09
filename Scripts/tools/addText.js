import { canvasStorage } from "../canvasStorage.js";
import { saveCanvasState } from "../menu/undoRedoButton.js";


export function addText() {
    const canvas = document.getElementById("canvas-board");
    const ctx = canvas.getContext("2d");

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tctx = tempCanvas.getContext("2d");
    tctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tctx.drawImage(canvas, 0, 0);

    let x, y;
    let arr = [{ string: "", x, y }];
    let keydownListener = null; 
    let canvasClickListener = null; 

    function measureCanvasPosition(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    function findTheLastIndex(arr) {
        return arr.length - 1;
    }

    function handlingInputTexts(str) {
        if (str === "Backspace") {
            arr[findTheLastIndex(arr)].string = arr[findTheLastIndex(arr)].string.slice(0, -1);
        } else if (str === "Enter") {
            let temp = {
                string: "",
                x: x,
                y: arr[findTheLastIndex(arr)].y + 30 * 1.1,
            };
            arr.push(temp);
        } else if (str.charCodeAt(0) === 32) {
            arr[findTheLastIndex(arr)].string += " ";
        } else if (str.charCodeAt(0) >= 32 && str.charCodeAt(0) <= 126) {
            arr[findTheLastIndex(arr)].string += str;
        }
    }

    function displayOnTheCanvas(arr) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);

        const aboutText = textEditz();

        console.log(`${aboutText.font}px Arial`,`#${aboutText.color}`);
        ctx.font = `${aboutText.font}px Arial`;
        ctx.fillStyle = `${aboutText.color}`;

        for (let i = 0; i < arr.length; i++) {
            ctx.fillText(arr[i].string, arr[i].x, arr[i].y);
        }
        canvasStorage.save();
        saveCanvasState();
    }

    function textEditz (){
        let color = document.getElementById("text-color").value;
        let font = document.getElementById("text-font").value;

        return {
            color,font
        }
    }

    function onKeyPress(e) {

        handlingInputTexts(e.key);
        displayOnTheCanvas(arr);
    }

    function enableTextInput(event) {
        let pos = measureCanvasPosition(event);
        x = pos.x;
        y = pos.y;

        if (!findTheLastIndex(arr)) {
            arr[findTheLastIndex(arr)].x = x;
            arr[findTheLastIndex(arr)].y = y;
        }


        if (keydownListener) {
            document.body.removeEventListener("keydown", keydownListener);
        }
        keydownListener = onKeyPress;
        document.body.addEventListener("keydown", keydownListener);

        document.body.removeEventListener("click", removeListeners);
        document.body.addEventListener("click", removeListeners);

        
    }

    function removeListeners(event) {
        if (!canvas.contains(event.target)) {
            if (keydownListener) {
                document.body.removeEventListener("keydown", keydownListener);
                keydownListener = null; 
            }
            if (canvasClickListener) {
                canvas.removeEventListener("click", canvasClickListener);
                canvasClickListener = null;
            }
            document.body.removeEventListener("click", removeListeners);
        }
    }

    
    canvasClickListener = enableTextInput;
    canvas.addEventListener("click", canvasClickListener);
}


export function setupInputText() {
    let html = `<div class="edit-bar">
                <input type="color" id="text-color">
                <select id="text-font">
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                    <option value="26">26</option>
                    <option value="28">28</option>
                </select>
    </div>`;
    document.querySelector(".tool-frame-2").innerHTML = html;
}