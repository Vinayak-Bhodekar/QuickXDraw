export let upload_buttons = [
  {
    Icon: "./Icons/Tools/pencil.png",
    name: "freeHand"
  },
  {
    Icon: "./Icons/Tools/shapes.png",
    name: "shapes"
  },
  {
    Icon: "./Icons/Tools/eraser.png",
    name: "eraser"
  },
  {
    Icon: "./Icons/Tools/plus.png",
    name: "Add"
  },
];
const buttons = [
  {
    Icon: "./Icons/Tools/pencil.png",
    name: "freeHand"
  },
  {
    Icon: "./Icons/Tools/shapes.png",
    name: "shapes"
  },
  {
    Icon: "./Icons/Tools/eraser.png",
    name: "eraser"
  },
  {
    Icon: "./Icons/Tools/bucket.png",
    name: "bucket"
  },
  {
    Icon: "./Icons/Tools/text-size.png",
    name: "text"
  },
]; 
export function buttonRender(){
  let html = ``;
  let count = upload_buttons.length;
  for(let i =0; i<12; i++){
    if(count){
      html += `<div class="tool js-${upload_buttons[i].name}" style=
                "
                  border-radius:15px;
                  cursor:pointer;
                "
              ><img src="${upload_buttons[i].Icon}"></div>`;
      count--;
    }
    else{
      html += `<div class="tool">${i+1}</div>`;
    }
  }
  document.querySelector(".tool-frame").innerHTML = html;
}
buttonRender();

