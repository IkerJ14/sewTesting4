<?php
  class Record{
    protected $server;
    protected $user;
    protected $pass;
    protected $dbname;

    public function __construct(){
      $this->server = "localhost";
      $this->user = "DBUSER2024";
      $this->pass = "DBPSWD2024";
      $this->dbname = "records";
    }

    public function getServer(){
      return $this->server;
    }
    public function getUser(){
      return $this->user;
    }
    public function getPassword(){
      return $this->pass;
    }
    public function getDbname(){
      return $this->dbname;
    }

    public function enviaFormulario(){
      $conn = new mysqli($this->getServer(), $this->getUser(), $this->getPassword(), $this->getDbname());

      if($conn->connect_error){
        die("Fallo de conexion: " . $conn->connect_error);
      }

      $nombre = $conn->escape_string($_POST['nombre']);
      $apellidos = $conn->escape_string($_POST['apellidos']);
      $dificultad = $conn->escape_string($_POST['dificultad']);
      $tiempo = $conn->escape_string($_POST['tiempo']);

      $stmt = $conn->prepare("INSERT INTO registro(nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");


      $stmt->bind_param("ssdi", $nombre, $apellidos, $dificultad, $tiempo);
      $stmt->execute();

      $conn->close();


      $this->muestraRecords($dificultad);
    }

    public function muestraRecords($nivelDificultad){
      $conn = new mysqli($this->getServer(), $this->getUser(), $this->getPassword(), $this->getDbname());

      if($conn->connect_error){
        die("Fallo de conexion: " . $conn->connect_error);
      }

      $stmt = $conn->prepare("SELECT nombre, apellidos, nivel, tiempo from registro where nivel = ? order by tiempo asc limit 10");

      $stmt->bind_param("d", $nivelDificultad);

      $stmt->execute();

      $respuesta = $stmt->get_result();

      echo "<section>";
      echo "<h2> Records con dificultad $nivelDificultad</h2>";
      echo "<ol>";

      while($row = $respuesta->fetch_assoc()){
        echo "<li>" . htmlspecialchars($row['nombre']) . " - " . htmlspecialchars($row['apellidos']) . " - " .  htmlspecialchars($row['tiempo']) . " - " . "ms </li>";
      }

      echo "</ol>";
      echo "</section>";

      $stmt->close();
      $conn->close();
    }


}?>






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
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css" />
    <link rel="icon" type="img/ico" href="multimedia/imagenes/favicon.ico" />
    <script src="./js/semaforo.js"></script>
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
           <a href="./viajes.html">Viajes</a>
           <a href="./juegos.html" class="active">Juegos</a>
        </nav>
     </header>
 <!-- Datos con el contenido que aparece en el navegador -->
  <section>
    <p>Estás en: <a href="./index.html">Inicio</a> | <a href="./juegos.html">Juegos</a> | Semaforo</p>
    <h2>Juego de reacción</h2>
  </section>
  <main>

    <script>
        var semaforo = new Semaforo();
    </script>

  </main>
    <?php
      if (count($_POST)>0) {
        $record = new Record();
        $record->enviaFormulario();
      }
    ?>

  </body>
  </html>