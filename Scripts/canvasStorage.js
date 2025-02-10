export const canvasStorage = {
  
  // for save canvas

  save: function() {
    const canvas = document.querySelector("#canvas-board");
    if(canvas) {
      const data = canvas.toDataURL();
      localStorage.setItem('savedCanvas',data);
      console.log('canvas saved');
    }
  },

  load: function() {
    const canvas = document.querySelector("#canvas-board");
    if(canvas) {
      const ctx = canvas.getContext("2d");
      const savedData = localStorage.getItem("savedCanvas");

      if(savedData){
        const img = new Image();
        img.onload = function() {

          ctx.clearRect(0,0,canvas.width,canvas.height);

          ctx.drawImage(img,0,0);

        };``
        img.src = savedData;
      }
    }
  },

  clear: function() {
    localStorage.removeItem("savedCanvas");
    console.log('Canvas Storage cleared');
  },

  autoSave: function() {
    const canvas = document.querySelector("#canvas-board");
    if(canvas){
      canvas.addEventListener('mouseup', () => this.save());
      canvas.addEventListener('touchend', () => this.save());
    }
  }
};