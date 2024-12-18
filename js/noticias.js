class Noticias{
    constructor(){
        
    if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File  
            document.write("<p>Este navegador soporta el API File </p>");
        }
            else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
      
    }

    readInputFile(files){
        console.log("entra metodos");
        var archivo = files[0];
        console.log(archivo);

        var tipoTexto = /text.*/;

        if (archivo.type.match(tipoTexto))
            
            {
          
            var lector = new FileReader();

            var section = document.getElementsByTagName("section")[0];

            var newSection;

            if(document.getElementsByTagName("section").length == 3){
                newSection = document.createElement("section");
            }else{
                newSection = document.getElementsByTagName("section")[2];
            }
            
            var h3 = document.createElement("h3");
            h3.textContent = "Noticias del dia";

            newSection.appendChild(h3);
            lector.onload = function (evento) {

                var newsArray = lector.result.split("\n");

                for (let i = 0; i < newsArray.length; i++) {
                
                    var newsTitle = newsArray[i].split("_")[0];
                    var newsText = newsArray[i].split("_")[1];
                    var newsAuthor = newsArray[i].split("_")[2];
            

                    var art = document.createElement("article");

                    var h = document.createElement("h3");
                    h.textContent = newsTitle;
                    art.appendChild(h);

                    var h4 = document.createElement("h4");
                    h4.textContent = newsAuthor;
                    art.appendChild(h4);

                    var p = document.createElement("p");
                    p.textContent = newsText;
                    art.appendChild(p);

                    newSection.appendChild(art);
                    section.appendChild(newSection);
                
                }

            }

            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        } 

    }


    añadirNoticia(){

        var newSection;
            
        if(document.getElementsByTagName("section").length == 3){
            newSection = document.createElement("section");
            console.log("entra")
        }else{
            newSection = document.getElementsByTagName("section")[2];
        }

        var inputTitulo = document.getElementsByTagName("input")[1];
        var inputAutor = document.getElementsByTagName("input")[2];
        var inputTexto = document.getElementsByTagName("input")[3];

        var art = document.createElement("article");

        var h = document.createElement("h3");
        h.textContent = inputTitulo.value;
        art.appendChild(h);

        var h4 = document.createElement("h4");
        h4.textContent = inputAutor.value;
        art.appendChild(h4);

        var p = document.createElement("p");
        p.textContent = inputTexto.value;
        art.appendChild(p);

        newSection.appendChild(art);

        if(document.getElementsByTagName("section").length == 3){
            document.getElementsByTagName("section")[0].appendChild(newSection);
        }


    }
      
}

var noticias1 = new Noticias();