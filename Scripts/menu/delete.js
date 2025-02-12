import { newCanvasCreate } from "../script.js";
export function handleDeleteButton() {
  document.getElementById("js-delete-button").addEventListener('click',() => {
    
    localStorage.clear();

    document.querySelector(".canvas-frame").innerHTML = `<div class="canvas-add-button">
          <img src="Icons/Canvas-add.png" alt="add">
        </div>`;

    newCanvasCreate();

  });
}
