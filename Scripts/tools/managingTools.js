export const toolState = {
  currentTool : null,
  currentHandler: null,
  setCurrentTool(tool,handler){
    const canvas = document.getElementById("canvas-board");
    if(canvas) {
      if(this.currentHandler){
        canvas.removeEventListener('mousedown', this.currentHandler);
      }

      this.currentTool = tool;
      this.currentHandler = handler;

      if(handler){
        canvas.addEventListener('mousedown', handler);
      }
    }
  }
}; 