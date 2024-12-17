import { inner_adjustement } from "./tool-bar-2.js";
import { buttonRender} from "./buttonsRendering.js";
import { freeHand } from "./tools/Shapes/FreeHand.js";

// Creati

const addButton = document.querySelector(".canvas-add-button");
addButton.addEventListener('click',(event) => {
  inner_adjustement("canvas-adjustement");
  console.log("hi");
  
  document.querySelector(".create-button").addEventListener('click', (event) => {
    const height = Number(document.querySelector(".height").value);
    const width = Number(document.querySelector(".width").value);
    document.querySelector(".canvas-frame").innerHTML = `<canvas height=${height === 0 ? 594 : height} width=${width === 0 ? 1134:width} id = "canvas-board"></canvas>`;
    buttonRender();
    inner_adjustement("don't-display");
  });
});



