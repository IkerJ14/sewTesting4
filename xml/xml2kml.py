import xml.etree.ElementTree as ET

def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")


def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")


def verXML(archivoXML):
    try:
        arbol = ET.parse(archivoXML)

    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
    
    raiz = arbol.getroot()

    nombreSalida = input("introduzca el nombre del archivo de salida: ")

    try:
        salida = open(nombreSalida + ".kml",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()


    namespace = {'ns': 'http://www.uniovi.es/circuito'}

    prologoKML(salida, nombreSalida)

    salida_latitud = raiz.find('.//ns:Coordenadas', namespace).findall('.//ns:Latitud', namespace)[0].text
    salida_longitud =  raiz.find('.//ns:Coordenadas', namespace).findall('.//ns:Longitud', namespace)[0].text

    salida.write(salida_longitud + ',' + salida_latitud + '\n')

    print(salida_latitud + '      '+ salida_longitud)
    # Iterar sobre los elementos encontrados
    for coors in raiz.findall('.//ns:Tramos/ns:Tramo/ns:Coordenadas', namespace):
       
        latitud = coors.find('ns:Latitud', namespace).text
        longitud = coors.find('ns:Longitud', namespace).text

        salida.write(longitud + ',' + latitud + '\n')
        

    salida.write(salida_longitud + ',' + salida_latitud + '\n')
    epilogoKML(salida)    


def main():

    miArchivoXML = input('Introduzca un archivo XML = ')

    verXML(miArchivoXML)


if __name__ == "__main__":
    main()