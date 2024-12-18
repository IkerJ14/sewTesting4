<?php

class Carrusel {

   protected $nombrePais;
   protected $nombreCapital;


   public function __construct($nombrePais, $nombreCapital){
      $this->nombrepais = $nombrePais;
      $this->nombreCapital = $nombreCapital;


   }


   public function llamaAPIFlickr(){
      $api_key = '0565634739c78dcdbf56368cb0991f0b';
      $tag = $this->nombreCapital;
      $perPage = 10;
      // Fotos públicas recientes
      $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
      $url.= '&api_key='.$api_key;
      $url.= '&tags='.$tag;
      $url.= '&per_page='.$perPage;
      $url.= '&format=json';
      $url.= '&nojsoncallback=1';

      $respuesta = file_get_contents($url);
      $json = json_decode($respuesta);

      if($json==null) {
         echo "<h3>Error en el archivo JSON recibido</h3>";
      }
      else {
         $this->crearCarrusel($json);
      }

   }


   public function crearCarrusel($json){
      echo "<section>"; 
      echo "<h2> Carrusel de imagenes </h2>";
      echo "<article>";
      echo "<h3>Barcelona</h3>";
   
      for ($i=0; $i < 10; $i++) {
         $title = $json->items[$i]->title;
         $url = $json->items[$i]->media->m;

         print "<img alt='imagen". $i ."' src='".$url."' />";
      }


      

      echo "<button> &gt </button>";
      echo "<button> &lt </button>";

      echo "</article>";

      echo "</section>";
   }


}

class Moneda {

   protected $siglasComparar;
   protected $siglasLocal;

   public function __construct($siglasLocal, $siglasComparar){
      $this->siglasLocal = $siglasLocal;
      $this->siglasComparar = $siglasComparar;
   }

   public function cambiarMoneda(){
      $api_key = 'fxf_1soKer7GAABpBE1wYHy0';

      $url = 'https://api.fxfeed.io/v1/latest?base='. $this->siglasLocal .'&currencies='. $this->siglasComparar .'&api_key=' . $api_key;

      $respuesta = file_get_contents($url);
      $json = json_decode($respuesta);

      if($json==null) {
         echo "<h3>Error en el archivo JSON recibido</h3>";
      }
      else {
         $USDRate = $json->rates->USD;
         echo "<section>";
         echo "<h2>Cambio de divisa</h2>";
         echo "<p>Un EUR en USD son: ". $USDRate ." </p>";
         echo "</section>";
      }
   }
}







?>


<!DOCTYPE HTML>
<html lang="es">
<head>
   <!-- Datos que describen el documento -->
   <meta charset="UTF-8" />
   <title>SEW.P0</title> 
   <meta name ="author" content ="Iker Jiménez Herrero" />
   <meta name ="description" content ="Página con información del piloto" />
   <meta name ="keywords" content ="Información piloto" />
   <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
   <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
   <link rel="icon" type="img/ico" href="multimedia/imagenes/favicon.ico" />
   <script src="./js/viajes.js"></script>
   <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
   <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
   <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
</head>
<body>
   <header>
      <h1>F1Desktop</h1>
      <nav>
         <a href="./index.html">Inicio</a>
         <a href="./piloto.html">Piloto</a>
         <a href="./calendario.html">Calendario</a>
         <a href="./circuito.html">Circuito</a>
         <a href="./meteorologia.html">Meteorologia</a>
         <a href="./noticias.html">Noticias</a>
         <a href="./viajes.html" class="active">Viajes</a>
         <a href="./juegos.html">Juegos</a>
      </nav>
   </header>
   <section>
      <h2>Viajes</h2>
      <script>
      miPosicion.getMapaEstaticoMapBox();
      </script>

      <div style="width: 50%; height: 500px;"></div>

      <script>
      miPosicion.getMapaDinamicoMapBox();
      </script>
   </section>
   <?php
      $moneda = new Moneda("EUR", "USD");
      $moneda->cambiarMoneda();
   ?>
   <?php
      $carrusel = new Carrusel("España", "Barcelona");
      $carrusel->llamaAPIFlickr();
   ?>
   

   <script>miPosicion.añadirListenersImg();</script>
</body>
</html>