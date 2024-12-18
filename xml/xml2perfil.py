import xml.etree.ElementTree as ET

def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8" ?>\n')
  
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write('<polyline points = \n')

def epilogoKML(archivo):
    archivo.write('"\n')
    archivo.write('style="fill:white;stroke:red;stroke-width:4" />\n')
    archivo.write('</svg>\n')



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
        salida = open(nombreSalida + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    namespace = {'ns': 'http://www.uniovi.es/circuito'}

    prologoKML(salida, nombreSalida)

    salida.write('"')
    acumulado = 0
    # Iterar sobre los elementos encontrados
    for tramo in raiz.findall('.//ns:Tramos/ns:Tramo', namespace):
    
        
        distancia = tramo.find('ns:Distancia', namespace).text
        altitud = tramo.find('ns:Coordenadas/ns:Altitud', namespace).text

        acumulado = acumulado + int(distancia) / 5
        

        salida.write(str(acumulado)+ ',' + altitud   + '\n')
        

    
    epilogoKML(salida)    


def main():

    miArchivoXML = input('Introduzca un archivo XML = ')

    verXML(miArchivoXML)


if __name__ == "__main__":
    main()