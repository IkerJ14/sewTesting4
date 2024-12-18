class Agenda{
    constructor(){
        this.url = "http://ergast.com/api/f1/current.json"; /** http://api.jolpi.ca/ergast/f1/2024/races*/
    }

    getRacesInfo(){
            
            $.ajax({
                url: this.url,
                method: 'GET',
                dataType: 'json',
                success: function(json) {

                    /**Prueba generar json */
                    const section = document.querySelectorAll('section')[0];

                    /*var pre = document.createElement("pre");*/

                    var carreras = json.MRData.RaceTable.Races;

                    /*pre.textContent = JSON.stringify(carreras, null, 2);

                    section.appendChild(pre);
                    console.log(json);*/

                    /**GENERAR TABLA Y SUS HIJOS */

                    var table = document.createElement("table");
                    var tHead = document.createElement("thead");
                    var tBody = document.createElement("tbody");


                    /**Creamos encabezados de la tabla */
                    var trHead = document.createElement("tr");

                    var thName = document.createElement("th");
                    thName.textContent = "Nombre Carrera";
                    thName.setAttribute("scope","colgroup");
                    thName.setAttribute("id","nCarrera");

                    var thCircuitName = document.createElement("th");
                    thCircuitName.textContent = "Nombre Circuito";
                    thCircuitName.setAttribute("scope","colgroup");
                    thCircuitName.setAttribute("id","nCircuito");

                    var thCoors = document.createElement("th");
                    thCoors.textContent = "Coordenadas Circuito";
                    thCoors.setAttribute("scope","colgroup");
                    thCoors.setAttribute("id","coorCircuito");

                    var thDate = document.createElement("th");
                    thDate.textContent = "Fecha y hora";
                    thDate.setAttribute("scope","colgroup");
                    thDate.setAttribute("id","fCarrera");

                    /**Añadimos encabezados a la fila */

                    trHead.appendChild(thName);
                    trHead.appendChild(thCircuitName);
                    trHead.appendChild(thCoors);
                    trHead.appendChild(thDate);

                    /**Añadimos la fila al encabezado general */
                    tHead.appendChild(trHead);


                    $(carreras).each(function(index, carrera){
                        /**Creamos la fila */
                        var tr = document.createElement("tr");

                        var tdName = document.createElement("td");
                        tdName.textContent = carrera.raceName;
                        tdName.setAttribute("headers", "nCarrera");

                         var tdCircuit = document.createElement("td");
                        tdCircuit.textContent = carrera.Circuit.circuitName;
                        tdCircuit.setAttribute("headers", "nCircuito");

                        var tdCoors = document.createElement("td");
                        tdCoors.textContent = "Latitud: " + carrera.Circuit.Location.lat + " Longitud: " + carrera.Circuit.Location.long;
                        tdCoors.setAttribute("headers", "coorCircuito");

                        var tdDate = document.createElement("td");
                        tdDate.textContent = carrera.date;
                        tdDate.setAttribute("headers", "fCarrera");

                         
                        

                        tr.appendChild(tdName);
                        tr.appendChild(tdCircuit);
                        tr.appendChild(tdCoors);
                        tr.appendChild(tdDate);
                       

                        tBody.appendChild(tr);

                    });

                    table.appendChild(tHead);
                    table.appendChild(tBody);
                    section.appendChild(table);




                    
                   

                
                
                },
                error: function(error) {
                  
                  console.error("Error al realizar la solicitud AJAX:");
                  console.error(error);

                }
              });
        }
    
}

var agenda1 = new Agenda();