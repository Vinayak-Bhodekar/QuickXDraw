export const canvasStorage = {
  
  // for save canvas

  save: function() {
    const canvas = document.getElementById('canvas-board');
    if (canvas) {
      const data = canvas.toDataURL();
      localStorage.setItem('savedCanvas', data);
      console.log('Canvas saved');
    }
  },

  load: function() {
    const canvas = document.getElementById('canvas-board');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const savedData = localStorage.getItem('savedCanvas');

      if (savedData) {
        const img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = savedData;
      }
    }
  },

  clear: function() {
    localStorage.removeItem('savedCanvas');
    localStorage.removeItem('undostack');
    localStorage.removeItem('redostack');
    console.log('Canvas Storage cleared');
  },

  autoSave: function() {
    const canvas = document.getElementById('canvas-board');
    if (canvas) {
      ['mouseup', 'touchend'].forEach(event => {
        canvas.addEventListener(event, () => this.save());
      });
    }
  }
};