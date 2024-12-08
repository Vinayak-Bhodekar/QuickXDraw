import { inner_adjustement } from "./tool-bar-2.js";
import { buttonRender,buttons } from "./buttonsRendering.js";

const addButton = document.querySelector(".canvas-add-button");
addButton.addEventListener('click',(event) => {
  inner_adjustement("canvas-adjustement");
  /*document.querySelector(".canvas-add-button").innerHTML = `<canvas height = 600 width = 800 id = "canvas-board"></canvas>`;*/
  
  document.querySelector(".create-button").addEventListener('click', (event) => {
    const height = Number(document.querySelector(".height").value);
    const width = Number(document.querySelector(".width").value);
    document.querySelector(".canvas-frame").innerHTML = `<canvas height=${height === 0 ? 594 : height} width=${width === 0 ? 1134:width} id = "canvas-board"></canvas>`;
    console.log(height,width,document.querySelector(".canvas-frame"));
    buttonRender();
  });
});


