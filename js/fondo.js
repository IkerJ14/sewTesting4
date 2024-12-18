class Fondo{

    constructor(nombrePais, nombreCapital, nombreCircuito){

        this.nombreCapital = nombreCapital;
        this.nombrePais = nombrePais;
        this.nombreCircuito = nombreCircuito;

    }

    llamadaApex(){
        
            var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        tags: this.nombreCircuito,
                        tagmode: "any",
                        format: "json"
                    })
                .done(function(data) {
                    var url = data.items[0].media.m;
                    
                    $('body').css({
                        "background-image": "url('" + url + "')",
                        "background-size": "cover"
                    });
            }).fail(function() {
                console.log("error al obtener imagenes");
            });
        
    }
}
var miFondo = new Fondo("España", "Madrid", "CircuitoMontmelo");