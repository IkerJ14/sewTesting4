<?php
class GestionCarreras {
    protected $server;
    protected $user;
    protected $pass;
    protected $dbname;

    public function __construct(){
      $this->server = "localhost";
      $this->user = "DBUSER2024";
      $this->pass = "DBPSWD2024";
      $this->dbname = "carreras";
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

    public function crearBaseDeDatos() {
        $conn = new mysqli($this->getServer(), $this->getUser(), $this->getPassword());
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }
        
        $querry = "DROP DATABASE IF EXISTS $this->dbname";
        if ($conn->query($querry) === false) {
            echo "Error al crear la base de datos: " . $conn->error;
        }
      
        $sql = "CREATE DATABASE IF NOT EXISTS $this->dbname";
        if ($conn->query($sql) === false) {
            echo "Error al crear la base de datos: " . $conn->error;
        }
        $conn->select_db($this->dbname);

        $this->crearTablas($conn);
    }

    public function crearTablas($conn) {
        
        $sql = "CREATE TABLE IF NOT EXISTS Año (id_año INT AUTO_INCREMENT PRIMARY KEY,
            año INT NOT NULL UNIQUE
        )";
        $conn->query($sql);

        $sql = "CREATE TABLE IF NOT EXISTS Coche (id_coche INT AUTO_INCREMENT PRIMARY KEY,
            modelo VARCHAR(255) NOT NULL
        )";
        $conn->query($sql);

        $sql = "CREATE TABLE IF NOT EXISTS Corredor (id_corredor INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            apellidos VARCHAR(255) NOT NULL,
            id_coche INT,
            FOREIGN KEY (id_coche) REFERENCES Coche(id_coche)
        )";
        $conn->query($sql);

        $sql = "CREATE TABLE IF NOT EXISTS Carrera (id_carrera INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            año INT,
            FOREIGN KEY (año) REFERENCES Año(año)
        )";
        $conn->query($sql);

        $sql = "CREATE TABLE IF NOT EXISTS Inscripcion (id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
            id_corredor INT,
            id_carrera INT,
            FOREIGN KEY (id_corredor) REFERENCES Corredor(id_corredor),
            FOREIGN KEY (id_carrera) REFERENCES Carrera(id_carrera)
        )";
        $conn->query($sql);
    }

    public function importarCsv() {
        $conn = new mysqli($this->getServer(), $this->getUser(), $this->getPassword(), $this->getDbname());
    
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }
      
    
        $csvFile = fopen($_FILES['csvFile']['tmp_name'], 'r');
    
        $stmtAño = $conn->prepare("INSERT IGNORE INTO Año (año) VALUES (?)");
        $stmtCoche = $conn->prepare("INSERT IGNORE INTO Coche (modelo) VALUES (?)");
        $stmtCorredor = $conn->prepare("INSERT IGNORE INTO Corredor (nombre, apellidos, id_coche) VALUES (?, ?, ?)");
        $stmtCarrera = $conn->prepare("INSERT IGNORE INTO Carrera (nombre, año) VALUES (?, ?)");
        $stmtInscripcion = $conn->prepare("INSERT INTO Inscripcion (id_corredor, id_carrera) VALUES (?, ?)");
    
        while (($row = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
           
            $año = $row[0];
            $coche = $row[1];
            $nombre = $row[2];
            $apellidos = $row[3];
            $carrera = $row[4];
    
      
            $stmtAño->bind_param("i", $año);
            $stmtAño->execute();
    
            
            $stmtCoche->bind_param("s", $coche);
            $stmtCoche->execute();
    

            $idCoche = $conn->insert_id;
    
            $stmtCorredor->bind_param("ssi", $nombre, $apellidos, $idCoche);
            $stmtCorredor->execute();
    
            $idCorredor = $conn->insert_id;
    
            $stmtCarrera->bind_param("si", $carrera, $año);
            $stmtCarrera->execute();
    
            $idCarrera = $conn->insert_id;
    
            $stmtInscripcion->bind_param("ii", $idCorredor, $idCarrera);
            $stmtInscripcion->execute();
        }
    
        
        echo "<p>Datos importados correctamente desde el CSV.</p>";
    
        $stmtAño->close();
        $stmtCoche->close();
        $stmtCorredor->close();
        $stmtCarrera->close();
        $stmtInscripcion->close();
        fclose($csvFile);
    }
    
    
    public function exportarCsv(){
        $conn = new mysqli($this->getServer(), $this->getUser(), $this->getPassword(), $this->getDbname());
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $myfile = fopen("inscripciones.csv", 'w');


        $carreras =  $conn->query('SELECT * FROM carrera');   

        if($carreras->num_rows > 0){
            while($row = $carreras->fetch_assoc()){
                fputcsv($myfile, $row, ";");
            }
        }


        $años =  $conn->query('SELECT * FROM año');   

        if($años->num_rows > 0){
            while($row = $años->fetch_assoc()){
                fputcsv($myfile, $row, ";");
            }
        }

        $corredor =  $conn->query('SELECT * FROM corredor');   

        if($corredor->num_rows > 0){
            while($row = $corredor->fetch_assoc()){
                fputcsv($myfile, $row, ";");
            }
        }

        $coches =  $conn->query('SELECT * FROM coche');   

        if($coches->num_rows > 0){
            while($row = $coches->fetch_assoc()){
                fputcsv($myfile, $row, ";");
            }
        }

        $inscripciones =  $conn->query('SELECT * FROM inscripcion');   

        if($inscripciones->num_rows > 0){
            while($row = $inscripciones->fetch_assoc()){
                fputcsv($myfile, $row, ";");
            }
        }

        $conn->close();
        fclose($myfile); 
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
   <script type="text/javascript" src="./js/viajes.js"></script>
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
         <a href="./viajes.html" >Viajes</a>
         <a href="./juegos.html"class="active">Juegos</a>
      </nav>
   </header>
   <main>
    <section>
        <h2>Crear Base de Datos y Tablas</h2>
        <form method="post">
            <input type="submit" name="crearBase" value="Crear Base de Datos" />
        </form>
        <?php
    
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['crearBase'])) {
                try{
                    $gestorDB = new GestionCarreras();
                    $gestorDB->crearBaseDeDatos();
                    echo "<p>Base de datos creada con exito</p>";
                }catch(Exception $e){
                    echo "<p>Error" . $e->getMessage() . "</p>";
                }
            }

    
        ?>
    </section>
    <section>
        <h2>Cargar csv</h2>
        <form method="post" enctype="multipart/form-data"> 
            <input type="file" name="csvFile" accept=".csv" required />
            <input type="submit" name="importaCsv" value="Importar CSV" />
        </form>
        <?php
    
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['importaCsv'])) {
                try {
                    if (isset($_FILES['csvFile'])) {
                        $gestorDB = new GestionCarreras();
                        $gestorDB->importarCsv();
                    } else {
                        echo "<p>Error en la carga del archivo.</p>";
                    }
                } catch (Exception $e) {
                    echo "<p>Error: " . $e->getMessage() . "</p>";
                }
            }

        ?>
    </section>
    <section>
        <h2>Exportar csv</h2>
        <form method="post" enctype="multipart/form-data"> 
            <input type="submit" name="exportaCsv" value="Exportar CSV" />
        </form>
        <?php
    
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['exportaCsv'])) {
                try {
                        $gestorDB = new GestionCarreras();
                        $gestorDB->exportarCsv();
                } catch (Exception $e) {
                    echo "<p>Error: " . $e->getMessage() . "</p>";
                }
            }

        ?>
    </section>
   </main>
   
</body>
</html>