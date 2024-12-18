
class API {
    constructor(){
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
    }

    addEventListeners(){
        var dropArea = document.getElementsByTagName("section")[0];
        

        dropArea.addEventListener('dragover', (event)=>{
            event.preventDefault();
        });

        dropArea.addEventListener('drop', (event)=>{
            event.preventDefault();

            var files = event.dataTransfer.files;

            if(files.length > 0 ){
                var canvas = document.createElement("canvas");
                var file = files[0];
                var lector = new FileReader();

                lector.onload = function(event){

                    var img = new Image();

                    img.onload = function (){
                        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                    }

                    img.src = event.target.result;
                }

                lector.readAsDataURL(file);
                dropArea.innerHTML = "<h2>Archivo cargado con exito</h2>"
                dropArea.appendChild(canvas);

                this.addCanvasEventListeners(canvas);
            }
        });

    }

    addCanvasEventListeners(canvas){
        
        canvas.addEventListener('mousedown', (evento)=>{
            console.log(this.lastX);
            console.log(this.lastY);
            this.isDrawing = true; 
            this.lastX = evento.offsetX;
            this.lastY = evento.offsetY;  
            console.log(this.lastX);
            console.log(this.lastY);
        });

        canvas.addEventListener('mousemove', (evento)=>{
            if(this.isDrawing == true){
                canvas.getContext('2d').beginPath();
                canvas.getContext('2d').moveTo(this.lastX, this.lastY);
                canvas.getContext('2d').lineTo(evento.offsetX, evento.offsetY);
                canvas.getContext('2d').stroke();
                this.lastX = evento.offsetX;
                this.lastY = evento.offsetY; 
            }
        });

        canvas.addEventListener('mouseup', () =>{
            this.isDrawing = false;
        });
        canvas.addEventListener('mouseout', () =>{
            this.isDrawing = false;
        });
    }
}
var Api1 = new API();


