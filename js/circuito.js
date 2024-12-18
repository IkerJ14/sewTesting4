class Circuito{
    constructor(){
        this.latitud = "2.26";
        this.longitud = "41.57";
    }

    procesarXML(files){
        
        var archivo = files[0];

        var tipoTexto = /xml/;

        if (archivo.type.match(tipoTexto)){
            var lector = new FileReader();
          
            lector.onload = function () {

                var stringDatos = "";

                var parser = new DOMParser();

                var myFile = lector.result;

                var miXML = parser.parseFromString(myFile,"text/xml");

                var circuito = miXML.getElementsByTagName("circuito")[0];

                var section = document.getElementsByTagName("section")[0]; 

                /**DATOS BASE */

                var nombreCircuito = circuito.getAttribute("name");

                stringDatos += "<h2>" + nombreCircuito + "</h2>";

                var longitud = circuito.getElementsByTagName("Longitud")[0];
                var udLongitud = longitud.getAttribute("unidades");

                stringDatos += "<p>Longitud: " + longitud.textContent + udLongitud +"</p>";

                var anchura = circuito.getElementsByTagName("Anchura")[0];
                var udAnchura = longitud.getAttribute("unidades");

                stringDatos += "<p>Anchura: " + anchura.textContent + udAnchura +"</p>";

                var fCarrera = circuito.getElementsByTagName("FCarrera")[0];

                stringDatos += "<p>Fecha: " + fCarrera.textContent + "</p>";

                var horaCarrera = circuito.getElementsByTagName("HoraCarrera")[0];
                stringDatos += "<p>Hora: " + horaCarrera.textContent + "</p>";

                var NVueltas = circuito.getElementsByTagName("NVueltas")[0];

                stringDatos += "<p>Vueltas: " + NVueltas.textContent + "</p>";

                var localidad = circuito.getElementsByTagName("Localidad")[0];

                stringDatos += "<p>Localidad: " + localidad.textContent + "</p>";

                var pais = circuito.getElementsByTagName("Pais")[0];

                stringDatos += "<p>Pais: " + pais.textContent + "</p>";

                /**REFERENCIAS */
                stringDatos += "<h3>Referencias</h3><ol>";
                var referencias = circuito.getElementsByTagName("Referencias")[0].getElementsByTagName("Referencia");

                Array.from(referencias).forEach(ref => {
                    stringDatos+= "<li><a href="+ ref.textContent + ">" + ref.textContent+ "</a></li>";
                });

                stringDatos+="</ol>";

                /**FOTOGRAFIAS */

                stringDatos += "<h3>Fotografias</h3>";
                var fotografias = circuito.getElementsByTagName("Fotografias")[0].getElementsByTagName("Fotografia");

                Array.from(fotografias).forEach(img => {
                    stringDatos+= "<img src=\""+ img.getAttribute("src") + "\" alt=" + img.textContent +" />";
                });

                /**VIDEOS */

                stringDatos += "<h3>Videos</h3>";
                var videos = circuito.getElementsByTagName("Videos")[0].getElementsByTagName("Video");

                console.log("videos");
                console.log(videos);


                Array.from(videos).forEach(vid => {
                    stringDatos+= "<video controls><source src=\""+ vid.getAttribute("src") +"\" type=\"video/mp4\"></video>";
                });

                /**Meta */

                var metaLongitud = circuito.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Longitud")[0];
                var metaLatitud = circuito.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Latitud")[0];
                var metaAltitud = circuito.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Altitud")[0];


                stringDatos += "<h4>Meta</h4>";
                stringDatos += "<p>Longitud: " + metaLongitud.textContent + " Latitud: "+ metaLatitud.textContent +" Altura: "+ metaAltitud.textContent + "</p>";


                /**Tramos */
                var tramos = circuito.getElementsByTagName("Tramos")[0].getElementsByTagName("Tramo");

                stringDatos += "<h4>Tramos</h4>"
                stringDatos += "<ol>"
                Array.from(tramos).forEach(tramo => {
                    var tramoLatitud = tramo.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Latitud")[0];
                    var tramoLongitud = tramo.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Longitud")[0];
                    var tramoAltitud = tramo.getElementsByTagName("Coordenadas")[0].getElementsByTagName("Altitud")[0];

                    var tramoSector = tramo.getElementsByTagName("Sector")[0]; 

                    var tramoDistancia = tramo.getElementsByTagName("Distancia")[0];

                    stringDatos += "<li>Distancia: "+ tramoDistancia.textContent  + tramoDistancia.getAttribute("unidades") ;
                    stringDatos += " Latitud: " +  tramoLatitud.textContent  + tramoLatitud.getAttribute("unidades");
                    stringDatos += " Longitud: " +  tramoLongitud.textContent  + tramoLongitud.getAttribute("unidades");
                    stringDatos += " Altitud: " +  tramoAltitud.textContent  + tramoAltitud.getAttribute("unidades");
                    stringDatos += " Sector: " +  tramoSector.textContent
                    
                    stringDatos+= "</li>";

                });

                stringDatos += "</ol>";
                section.innerHTML = stringDatos;
                console.log(circuito);
                console.log(nombreCircuito);
              
            }

            lector.readAsText(archivo);
        }
        else {

            pre.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        } 
    }


    procesarKML(files){
        var archivo = files[0];

        var tipoTexto = /kml/;

        if (archivo.type.match(tipoTexto)){
            var lector = new FileReader();
          
            lector.onload = function (evento) {

                var coordenadas = lector.result.split("<coordinates>")[1];
                coordenadas = coordenadas.split("</coordinates>")[0];


                coordenadas = coordenadas.split("\n");
                

                var coordenadasVector = [];

                for (let i = 1; i < coordenadas.length - 1; i++) {
                    const par1 = coordenadas[i].split(",")[0];
                    const par2 = coordenadas[i].split(",")[1];

                    const vectorPar = [parseFloat(par1),parseFloat(par2)];

                    coordenadasVector.push(vectorPar);
                    
                    
                }


                const div = document.getElementsByTagName("div")[0];
        
                mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzY0MTciLCJhIjoiY20zeXNnbDRuMXUyMzJrcjN3dDBwZDc1NSJ9.tAk71q4MKbf00dTpIsZ99g';
                var map = new mapboxgl.Map({
                   container: div, 
                   style: 'mapbox://styles/mapbox/streets-v9',
                   center: [2.26, 41.57],
                   zoom: 13
                });
                
                map.on('load', () => {
                    // Add a data source containing GeoJSON data.
                    map.addSource('maine', {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Polygon',
                                // These coordinates outline Maine.
                                'coordinates': [coordenadasVector]
                            }
                        }
                    });


                    
                    map.addLayer({
                        'id': 'maine',
                        'type': 'fill',
                        'source': 'maine', // reference the data source
                        'layout': {},
                        'paint': {
                            'fill-color': '#0080ff', // blue color fill
                            'fill-opacity': 0.5
                        }
                    });
                    // Add a black outline around the polygon.
                    map.addLayer({
                        'id': 'outline',
                        'type': 'line',
                        'source': 'maine',
                        'layout': {},
                        'paint': {
                            'line-color': '#000',
                            'line-width': 3
                        }
                    });

                })

                
            
            }
            

            lector.readAsText(archivo);
        }
        else {

            console.log("entra mal x");
            pre.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        } 



        
    }


    procesarSVG(files){
        var archivo = files[0];

        var tipoTexto = /svg/;

        var lector = new FileReader();

        if (archivo.type.match(tipoTexto)){
            lector.onload = function (){
                var miSvg = lector.result;
                var section = document.getElementsByTagName("section")[2];

                section.innerHTML = "<h3>Procesar SVG</h3>" + miSvg;
            }
            lector.readAsText(archivo);
        }
        else {

            console.log("entra mal x");
            pre.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        } 
    }
}

var miCircuito = new Circuito();