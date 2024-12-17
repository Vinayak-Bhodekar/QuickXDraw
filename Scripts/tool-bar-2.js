export function inner_adjustement(tool_name){
  const tool_box = document.querySelector(".tool-frame-2");
  if (tool_name === "canvas-adjustement"){
    tool_box.innerHTML = `
      <div>Height = <input type = "text" placeholder = "0 - 594" class="height"></div>
      <div>bridth = <input type = "text" placeholder = "0 - 1134" class="width"></div>
      <div class="create-button">Create</div>
    `;
  }
  else{
    tool_box.innerHTML = "";
  }
}