window.onload = function () {

    
    var canvas = document.getElementById("sigCanvas");
    var context = canvas.getContext("2d");
    var isDrawing = false;
  
    
    context.strokeStyle = '#000000'; 
    context.lineWidth = 1; 
  
    canvas.addEventListener('mousedown', function(event) {
      isDrawing = true;
      startDrawing(event);
    });
  
    canvas.addEventListener('mousemove', function(event) {
      if(isDrawing){
        draw(event);
      }
    });
  
    canvas.addEventListener('mouseup', function(event) {
      isDrawing = false;
    });
    var colorInput = document.getElementById('selectColour');

        colorInput.addEventListener('input', function() {
        context.strokeStyle = this.value;
    });
    var bgColorInput = document.getElementById('selectBG');

        bgColorInput.addEventListener('input', function() {
        canvas.style.backgroundColor = this.value;
    });
    const fontSizeSelect = document.getElementById('fontSize');

    fontSizeSelect.addEventListener('change', () => {
        const selectedFontSize = `${fontSizeSelect.value}px Arial`;

        context.font = selectedFontSize;
  
    });
    document.getElementById("from").addEventListener("click", function() {
      document.getElementById("pdfInput").click();
  });
  
  document.getElementById("pdfInput").addEventListener("change", async function(event) {
      var file = event.target.files[0];
      if (file) {
          var url = URL.createObjectURL(file);
          
          // Asynchronously load PDF.
          const pdf = await pdfjsLib.getDocument(url).promise;
          
          // Get the first page.
          const pdfPage = await pdf.getPage(1);
          
          // Prepare to render the page into a viewport with 100% scale.
          var viewport = pdfPage.getViewport({scale: 1});
          
          // Ensure the canvas is the right size for the PDF page.
          var canvas = document.getElementById("sigCanvas");
          var context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
  
          // Render PDF page into canvas context.
          var renderContext = {
              canvasContext: context,
              viewport: viewport
          };
          pdfPage.render(renderContext);
      }
  });
  
  
    function startDrawing(event) {
      context.beginPath();
      setMouseCoordinates(event);
      context.moveTo(mouseX, mouseY);
    }
  
    function draw(event) {
      setMouseCoordinates(event);
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  
    function setMouseCoordinates(event) {
      var boundings = canvas.getBoundingClientRect();
      mouseX = event.clientX - boundings.left;
      mouseY = event.clientY - boundings.top;
    }
  
    var clearButton = document.getElementById('clearbtn');
  
    clearButton.addEventListener('click', function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    var saveDownloadButton = document.getElementById('save&download');
  
    saveDownloadButton.addEventListener('click', function() {
      var imageName = prompt('Please enter image name');
      var canvasDataURL = canvas.toDataURL();
      var a = document.createElement('a');
      a.href = canvasDataURL;
      a.download = imageName || 'signature';
      a.click();
    });
   
};
    