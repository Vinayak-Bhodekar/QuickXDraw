export function exportButtonHandling() {
  
  const exportButton = document.getElementById("js-download-button");

  exportButton.addEventListener('click', () => {
    const exportOption = document.querySelector(".export-option");
    const rect = exportButton.getBoundingClientRect();

    let top = rect.top;
    let left = rect.left;

    if (exportOption.style.display === "none" || exportOption.style.display === "") {
      exportOption.style.display = "block";
      exportOption.style.position = "absolute";

      exportOption.style.top = `${top}px`;
      exportOption.style.left = `${left + rect.width + 10}px`;
    } else {
      exportOption.style.display = "none";
    }

    attachEventListeners();
  });

  function attachEventListeners() {
    document.querySelectorAll(".exp").forEach((option) => {
      option.addEventListener("click", () => {
        if (option.dataset.name === "jpg") {
          convertIntoJPG();
        } else if (option.dataset.name === "png") {
          convertIntoPNG();
        } else {
          convertIntoPDF();
        }
      });
    });
  }

  function convertIntoJPG() {
    console.log("JPG clicked");
    exportCanvas("jpg");
  }

  function convertIntoPNG() {
    console.log("PNG clicked");
    exportCanvas("png");
  }

  function exportCanvas(format) {
    let canvas = document.getElementById("canvas-board");

    
    const tempCanvas = document.createElement("canvas");
    const tctx = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    
    tctx.fillStyle = "white";
    tctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    
    tctx.drawImage(canvas, 0, 0);

    
    let imageType = format === "jpg" ? "image/jpeg" : "image/png";
    let image = tempCanvas.toDataURL(imageType, 1.0);

    
    let link = document.createElement("a");
    link.download = `canvas-image.${format}`;
    link.href = image;
    link.click();
  }
}

function convertIntoPDF() {
  let canvas = document.getElementById("canvas-board");

  // Create a temporary canvas with a white background
  const tempCanvas = document.createElement("canvas");
  const tctx = tempCanvas.getContext("2d");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Ensure white background
  tctx.fillStyle = "white";
  tctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Copy the original canvas content
  tctx.drawImage(canvas, 0, 0);

  let imgData = tempCanvas.toDataURL("image/png");

  let pdf = new window.jspdf.jsPDF("landscape", "mm", "a4");

  let imgWidth = 297;
  let imgHeight = (canvas.height / canvas.width) * imgWidth;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("canvas-drawing.pdf");
}

export { convertIntoPDF };