import { freeHand,freeHandClick } from "./tools/Shapes/FreeHand.js";
import { shapeSelector } from "./ShapeSelector.js";
import { paintButtonClick } from "./tools/paint.js";
import { toolState } from "./tools/managingTools.js";
import { colorSelector } from "./ShapeSelector.js";
import { addText,setupInputText } from "./tools/addText.js";

let upload_buttons = [
  {
    Icon: "./Icons/Tools/pencil.png",
    name: "freeHand"
  },
  {
    Icon: "./Icons/Tools/shapes.png",
    name: "shapes"
  },
  {
    Icon: "./Icons/Tools/plus.png",
    name: "Add"
  },
];
let buttons = [
  {
    Icon: "./Icons/Tools/bucket.png",
    name: "bucket"
  },
  {
    Icon: "./Icons/Tools/text-size.png",
    name: "text"
  },
];

const shapes = [
  {
    name: "line",
    Icon: "./Icons/Shapes/line.png"
  },
  {
    name: "rectangle",
    Icon: "./Icons/Shapes/rectangle.png"
  },
  {
    name: "triangle",
    Icon: "./Icons/Shapes/triangle.png"
  },
  {
    name: "circle",
    Icon: "./Icons/Shapes/circle.png"
  },
  {
    name: "square",
    Icon: "./Icons/Shapes/square.png"
  },
  {
    name: "right-Arrow",
    Icon: "./Icons/Shapes/right-arrow.png"
  },
  {
    name: "left-Arrow",
    Icon: "./Icons/Shapes/left-arrow.png"
  },
  {
    name: "up-Arrow",
    Icon: "./Icons/Shapes/up-arrow.png"
  },
  {
    name: "down-Arrow",
    Icon: "./Icons/Shapes/down-arrow.png"
  },
]

const storedButtons = localStorage.getItem('upload_buttons');
if(storedButtons){
  upload_buttons = JSON.parse(storedButtons);
}
else {
  localStorage.setItem('upload_buttons',JSON.stringify(upload_buttons));
}

const storedbuttons2 = localStorage.getItem('buttons');
if(storedbuttons2){
  buttons = JSON.parse(storedbuttons2);
}
else{
  localStorage.setItem('buttons',JSON.stringify(buttons));
}

const optionMenu = document.querySelector(".option-menu");

// Render buttons.

export function buttonRender() {
  let html = ``;
  let count = upload_buttons.length;
  for (let i = 0; i < 12; i++) {
    if (count) {
      html += `<div class="tool js-${upload_buttons[i].name} use-tool" 
      data-tool-name="${upload_buttons[i].name}"
      style="
                  border-radius:15px;
                  cursor:pointer;

                "
              ><img src="${upload_buttons[i].Icon}"></div>`;
    
      count--;
    } else {
      html += `<div class="tool"></div>`;
    }
  }
  document.querySelector(".tool-frame").innerHTML = html;
  
  handleAddButtonClick();    // add button handling

  shapeButtonClick(); // shape button handling

  freeHandFunction(); // free hand handling.

  freeHandClick();

  paintButtonClick();

  addTextHandling();
}

buttonRender();

  //Create option menu.

function CreateOptionMenu(arr){

  let html = '';
  arr.forEach((button) => {
    html += `<div class="ele box-${button.name}" data-name="${button.name}"><pre>${button.name}     <img src="${button.Icon}"></pre></div>`
  });
  optionMenu.innerHTML = html;

}

  //Handle js-add button click


function handleAddButtonClick(){


    const optionAddButton = document.querySelector(".js-Add");
    CreateOptionMenu(buttons);
    optionAddButton.addEventListener('click', () => {
      console.log("hello");
      const rect = optionAddButton.getBoundingClientRect();
      const rect1 = optionMenu.getBoundingClientRect();
      let Top = rect.top;
      let Left = rect.left;
      if (optionMenu.style.display === "none" || optionMenu.style.display === "") {
        optionMenu.style.display = "block"; 
        
        optionMenu.style.position = "absolute";
        
        if((rect.left + optionMenu.offsetWidth) > window.innerWidth){
          Left = window.innerWidth - optionMenu.offsetWidth;
        }
        optionMenu.style.top = `${Top + rect.height}px`; 
        optionMenu.style.left = `${Left}px`;
      } else {
        optionMenu.style.display = "none";
      }
  });
  attachEventListeners();
}

  // Add inner Eventlisteners for specific buttons.

function attachEventListeners(){

  document.querySelectorAll(".ele").forEach((button) => {
    button.addEventListener('click', () => {
      const buttonName = button.dataset.name;
      addButtonInArray(buttonName);
      deleteButtonFromArray(buttonName);

      console.log(buttons,getButtonIndex(buttonName),upload_buttons);
      buttonRender();
      optionMenu.style.display = "none";

    });
  });

}

// inner functions

function deleteButtonFromArray(Name){
  const index = getButtonIndex(Name);
  if(index !== -1){
    buttons.splice(index,1);
    localStorage.setItem('upload_buttons',JSON.stringify(upload_buttons));
    localStorage.setItem('buttons',JSON.stringify(buttons));
  }
}
function addButtonInArray(Name){
  const Element = getButtonByName(Name);
  if(Element){
    upload_buttons.splice(upload_buttons.length-1,0,Element);
    localStorage.setItem('upload_buttons',JSON.stringify(upload_buttons));
    localStorage.setItem('buttons',JSON.stringify(buttons));
  }
}
function getButtonIndex(buttonName){
  return buttons.findIndex((ele) => ele.name === buttonName);
}
function getButtonByName(buttonName){
  return buttons.find((ele) => ele.name === buttonName);
}

// freehand handling.

function freeHandFunction(){
  const handleFreeHand = () => {
    freeHand();
  }
  document.querySelector(".js-freeHand").removeEventListener('click',handleFreeHand);
  document.querySelector(".js-freeHand").addEventListener('click', handleFreeHand);
  
}
// shapes button handling
function shapeButtonClick() {
  document.querySelector(".js-shapes").addEventListener('click', () => {
    // Set the current tool to shape
    toolState.setCurrentTool('shape');

    let shapesHtml = '';
    shapes.forEach(shape => {
      shapesHtml += `<div class="js-shape-selector shape" data-shape-name="${shape.name}">
        ${shape.name}-<img width="15" height="15" src="${shape.Icon}">
      </div>`;
    });

    const html = `
      <div class="shapes-container">
        <div class="shapes-column">
          ${shapesHtml}
        </div>
        <div class="shape-modifiers">
          <div class="color-column">
            <input type="color" id="shapeColor">
            <label for="shapeColor">Shape Color</label>
          </div>
          <div class="thickness-column">
            <input type="range" id="shapeThickness" min="1" max="10" value="5">
            <label for="shapeThickness">Set Thickness</label>
          </div>
        </div>
      </div>
    `;

    document.querySelector(".tool-frame-2").innerHTML = html;
    colorSelector();
    shapeSelector();
  });
}

// add text button handling

function addTextHandling() {
  const  textButton = document.querySelector(".js-text");
  if (textButton){
    textButton.addEventListener('click', () => {
      console.log("text button has been clicked");
      setupInputText();
      addText();
    });
  } 
  
}