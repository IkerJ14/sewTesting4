class Pais{
        constructor (nombrePais, nombreCapital, poblacion){
            this.nombre = nombrePais;
            this.capital = nombreCapital;
            this.circuito;
            this.poblacion = poblacion;
            this.tipoGobierno;
            this.coorMeta;
            this.religion;
            this.respuestaXML;
            this.rellenaDatos();
            this.getWeatherReport();
            
            

            
            this.apikey = "d38662ba0ec9ed6fbbcc2ff08ad668dd";

         
        }

        rellenaDatos(){
            this.circuito = 'Circuito de Montmeló';
            this.tipoGobierno = 'Democracia';
            this.coorMeta = '41.57, 2.26';
            this.religion = 'Catolicismo';
        }

        getNombrePais(){
            return this.nombre;
        }

        getNombreCapital(){
            return this.capital;
        }

        getNombreCircuito(){
            return this.circuito;
        }

        getPoblacion(){
            return this.poblacion;
        }

        getTipoGobierno(){
            return this.tipoGobierno;
        }

        getCoordenadaMeta(){
            return this.coorMeta;
        }

        getReligion(){
            return this.religion;
        }


        getSecondaryInfo(){
            return '<ol> '+
                '<li>' +this.getNombreCircuito+'<li>'
               +'<li>' +this.poblacion+'<li>'
               +'<li>' +this.tipoGobierno+'<li>'
               +'<li>' +this.religion+'<li>'
            +'</ol>'
        }

        writeCoordinates(){
            const section = document.querySelectorAll('section')[0];
            const p = document.createElement("p");
            p.textContent = "Coordenadas: " + this.getCoordenadaMeta();
            section.appendChild(p); 
        }


        getWeatherReport(){
            this.url = "http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=" + this.apikey;
            var OPWAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.coorMeta.split(", ")[0]+ "&lon=" + this.coorMeta.split(", ")[1] + "&appid=d38662ba0ec9ed6fbbcc2ff08ad668dd&mode=xml";
            $.ajax({
                url: OPWAPI,
                method: 'GET',
                dataType: 'xml',
                data:{
                    lang:'es'
                },
                
                success: function(xml) {
                 
                    console.log("Respuesta XML recibida:");
                    console.log(xml);

                    const section = document.querySelectorAll('section')[0];

                    var ultimoDia = null;
                    
                    var tempMax = null;
                    var tempMin = null;

                    var contadorAcumulado = 0;
                    var humedadAcumulada = 0;

                    $(xml).find("time").each(function(){

                        var diaActual = $(this).attr("from").split("T")[0];
                        var tempMinActual = parseFloat($(this).find("temperature").attr("min"));
                        var tempMaxActual = parseFloat($(this).find("temperature").attr("max"));
                        var humedadActual = parseFloat($(this).find("humidity").attr("value"));

                        var icono = $(this).find("symbol").attr("var");

                        if(tempMin == null || tempMinActual < tempMin){
                            tempMin = tempMinActual
                        }
                        if(tempMax == null || tempMaxActual > tempMax){
                            tempMax = tempMaxActual
                        }

                        humedadAcumulada += humedadActual;
                        contadorAcumulado += 1;


                        if(ultimoDia == null){

                            ultimoDia = diaActual;

                        }else if(ultimoDia != diaActual){
                        //Si el dia ha cambiado generamos un nuevo encabezado
                            ultimoDia = diaActual;

                            var mediaHumedad = humedadAcumulada / contadorAcumulado;

                            const art = document.createElement("article");

                            const h3 = document.createElement("h3");
                            h3.textContent = diaActual;
                            art.appendChild(h3);

                            const p = document.createElement("p");
                            p.textContent = "Temperatura maxima: " + tempMax + " Temperatura minima: " + tempMin + " Humedad media: " + mediaHumedad.toFixed(2) + "%";
                            art.appendChild(p);

                            const img = document.createElement("img");
                            img.setAttribute("src", "https://openweathermap.org/img/wn/"+icono+"@2x.png");
                            img.setAttribute("alt", "iconoTiempo");
                            art.appendChild(img);

                            section.appendChild(art);

                            tempMax = null;
                            tempMin = null;

                            humedadAcumulada = 0;
                            contadorAcumulado = 0;

                        }

                        
                        
                        
                    });   

                
                
                },
                error: function(error) {
                  
                  console.error("Error al realizar la solicitud AJAX:");
                  console.error(error);

                }
              });
        }
    
}

var pais1 = new Pais('Barcelona', 'Barcelona', '400000');

