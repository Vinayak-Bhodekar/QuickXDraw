import { clearCurrentShape } from "../ShapeSelector.js";

export const toolState = {
  currentTool: null,
  currentHandler: null,
  currentMoveHandler: null,
  currentUpHandler: null,
  currentLeaveHandler: null,

  setCurrentTool(tool, handlers) {
    const canvas = document.getElementById("canvas-board");
    if (!canvas) return;

    // Remove all existing event listeners
    this.removeCurrentListeners(canvas);

    // If switching away from shapes, remove the current shape
    if (this.currentTool === 'shape' && tool !== 'shape') {
      clearCurrentShape(); // Ensure shape is cleared before switching tools
    }

    // Update tool state
    this.currentTool = tool;

    // If handlers are provided, set them up
    if (handlers) {
      if (typeof handlers === 'function') {
        this.currentHandler = handlers;
        canvas.addEventListener('mousedown', handlers);
      } else {
        if (handlers.mousedown) {
          this.currentHandler = handlers.mousedown;
          canvas.addEventListener('mousedown', handlers.mousedown);
        }
        if (handlers.mousemove) {
          this.currentMoveHandler = handlers.mousemove;
          canvas.addEventListener('mousemove', handlers.mousemove);
        }
        if (handlers.mouseup) {
          this.currentUpHandler = handlers.mouseup;
          canvas.addEventListener('mouseup', handlers.mouseup);
        }
        if (handlers.mouseleave) {
          this.currentLeaveHandler = handlers.mouseleave;
          canvas.addEventListener('mouseleave', handlers.mouseleave);
        }
      }
    }

    this.updateToolUI(tool);
  },

  removeCurrentListeners(canvas) {
    if (this.currentHandler) {
      canvas.removeEventListener('mousedown', this.currentHandler);
      this.currentHandler = null;
    }
    if (this.currentMoveHandler) {
      canvas.removeEventListener('mousemove', this.currentMoveHandler);
      this.currentMoveHandler = null;
    }
    if (this.currentUpHandler) {
      canvas.removeEventListener('mouseup', this.currentUpHandler);
      this.currentUpHandler = null;
    }
    if (this.currentLeaveHandler) {
      canvas.removeEventListener('mouseleave', this.currentLeaveHandler);
      this.currentLeaveHandler = null;
    }
  },

  updateToolUI(tool) {
    document.querySelectorAll('.use-tool').forEach(button => {
      button.classList.remove('active');
    });

    const toolButton = document.querySelector(`.js-${tool}`);
    if (toolButton) {
      toolButton.classList.add('active');
    }
  }
};