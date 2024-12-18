class Viajes{

    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }


    añadirListenersImg(){
        const slides = document.querySelectorAll("img");


        const nextSlide = document.querySelectorAll("button")[1];

        console.log(slides);
        console.log(nextSlide);
        // current slide counter
        let curSlide = 3;
        // maximum number of slides
        let maxSlide = slides.length - 1;

        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
            // check if current slide is the last and reset current slide
            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            //   move slide by -100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
          
        });

        // select next slide button
        const prevSlide = document.querySelectorAll("button")[2];

        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
            // check if current slide is the first and reset current slide to last
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }

            //   move slide by 100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
       
        this.latitud          = posicion.coords.latitude;  
        
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getMapaEstaticoMapBox(){
        setTimeout( () => {
            console.log(this.longitud);
            console.log(this.latitud);

            var ubicacion=document.getElementsByTagName("section")[0];
            
            var apiKey = "pk.eyJ1IjoidW8yNzY0MTciLCJhIjoiY20zeXNnbDRuMXUyMzJrcjN3dDBwZDc1NSJ9.tAk71q4MKbf00dTpIsZ99g";
            //URL: obligatoriamente https

            var URL = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/"+ String(this.longitud) + "," + String(this.latitud) +",13,0,0/600x600?access_token=" + apiKey;
            
            var img = document.createElement("img");
            img.setAttribute("src", URL);
            img.setAttribute("alt", 'mapa estático google');

            ubicacion.appendChild(img);
            
        }, 2000);
        
    }

    getMapaDinamicoMapBox(){
        const div = document.getElementsByTagName("div")[0];
        
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzY0MTciLCJhIjoiY20zeXNnbDRuMXUyMzJrcjN3dDBwZDc1NSJ9.tAk71q4MKbf00dTpIsZ99g'; // Nuestro Token de acceso
        var map = new mapboxgl.Map({
           container: div, // id del contenedor
           style: 'mapbox://styles/mapbox/streets-v9', // localización del mapa de estilo
           center: [this.longitud, this.latitud], // Posición inicial
           zoom: 13 // Zoom inicial
        });
    }
}

var miPosicion = new Viajes();
