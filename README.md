Microservicio SOAP para Gestión de Actores - Sakila 1.0.0

Descripción General

Este proyecto implementa un microservicio independiente que expone los datos de la tabla actor de Sakila a través de un servicio web SOAP. El microservicio se encarga de:
•	Obtener la lista completa de actores desde la base de datos Sakila a través de un endpoint REST interno.
•	Exponer un servicio SOAP con un contrato formal (WSDL) que permite consumir operaciones para:
•	Obtener todos los actores.
•	Obtener estadísticas de actores (total, mínimo, máximo y promedio de actor_id).
Tecnologías Utilizadas
•	Node.js: Plataforma de desarrollo para construir el microservicio.
•	Express: Framework para exponer endpoints REST y para servir el servicio SOAP.
•	mysql2: Driver para conectarse a la base de datos MySQL (Sakila).
•	soap: Librería para crear y exponer el servicio web SOAP.
•	Axios: Para consumir internamente el endpoint REST que consulta la tabla actor.
•	dotenv: Para la configuración de variables de entorno.
Instalación
1.	Clonar el repositorio:
2.	Entrar en el proyecto:
3.	Instalar dependencias:
npm install 
4.	Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
PORT=3001 
SOAP_PORT=3002 
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=tu_contraseña 
DB_NAME=sakila 
DB_PORT=3306 
5.	(Modifica los valores según tu configuración de MySQL y Sakila)
6.	Levantar la API REST:
7.	En una terminal, ejecuta:
npm start 
8.	Esto iniciará el servidor REST para actores en http://localhost:3001.
9.	Levantar el Servicio SOAP:
En otra terminal, ejecuta: 
node src/soap/soapService.js 
Esto expondrá el servicio SOAP en http://localhost:3002/wsdl. 
Uso
API REST
La API REST está disponible en:
http://localhost:3001/api/actors 
Esta URL devuelve un arreglo JSON con actores, cada uno con los siguientes campos:
•	actor_id
•	first_name
•	last_name
Servicio SOAP
El servicio SOAP se expone en:
http://localhost:3002/wsdl 
Puedes consumir el servicio SOAP utilizando herramientas como Postman o SoapUI. A continuación se muestran ejemplos de solicitudes SOAP para cada operación:
Ejemplo de Solicitud SOAP para getAllActors
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/ActorService">
  <SOAP-ENV:Header/>
  <SOAP-ENV:Body>
    <tns:getAllActorsRequest>Consulta</tns:getAllActorsRequest>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
Ejemplo de solicitud para GetActorStats:
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/ActorService">
  <SOAP-ENV:Header/>
  <SOAP-ENV:Body>
    <tns:getActorStatsRequest>Consulta</tns:getActorStatsRequest>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

Respuestas Esperadas
•	Para getAllActors
La respuesta será un XML conteniendo la lista de actores, por ejemplo:
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Body>
    <getAllActorsResponse>
      <actor>
        <actor_id>1</actor_id>
        <first_name>PENELOPE</first_name>
        <last_name>GUINESS</last_name>
      </actor>
      <actor>
        <actor_id>2</actor_id>
        <first_name>NICK</first_name>
        <last_name>WAHLBERG</last_name>
      </actor>
      <!-- Más actores -->
    </getAllActorsResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

ESTRUCTURA DEL PROYECTO:


├── src/
│   ├── config/
│   │   └── db.js           # Configuración de conexión a MySQL
│   ├── controllers/
│   │   └── actorController.js  # Funciones de consulta para la tabla 'actor'
│   ├── routes/
│   │   └── actorRoutes.js   # Endpoint REST para actores (opcional)
│   ├── soap/
│   │   ├── soapService.js  # Implementación del servicio SOAP y asociación de operaciones
│   │   └── actor.wsdl      # Contrato WSDL del servicio SOAP
│   └── app.js              # Inicializa el servidor Express (API REST)
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Documentación del proyecto


Consideraciones
•	El microservicio utiliza un endpoint REST interno para obtener datos de la tabla actor de Sakila, el cual es consumido por el servicio SOAP.
•	Se implementa manejo automático de errores para asegurar que tanto la API REST como el servicio SOAP respondan de forma clara en caso de problemas de comunicación o de base de datos.
•	La separación de módulos (config, controladores, rutas y SOAP) permite la escalabilidad y el mantenimiento del proyecto, facilitando futuras extensiones.
•	El contrato WSDL garantiza la interoperabilidad y permite que cualquier consumidor del servicio SOAP conozca la estructura exacta de las solicitudes y respuestas.

Pruebas
•	Prueba Manual:
o	Se realizaron consultas desde Postman para verificar la respuesta correcta de la API REST en http://localhost:3001/api/actors.
o	Se realizaron pruebas SOAP enviando solicitudes XML (como las indicadas arriba) a http://localhost:3002/wsdl y se validó la estructura y contenido de las respuestas.


Autor
Proyecto realizado para el cumplimiento de los requisitos de integración de microservicios
en el Proyecto Integrador.
