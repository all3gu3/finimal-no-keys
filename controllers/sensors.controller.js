//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
//var conexion = mysql.createConnection(config); // Crear la conexion con los datos almacenados en config
var pool = config.pool;

// Creando y exportando el metodo para visualizar la listas de los datos enviados por los sensores
module.exports.sensor_data_list = (request, response) => {
    var sql = "SELECT * FROM sensorData"; // Declarando query a realizar (mostrar toda la tabla de sensorData)

    // Ejecuntado dicha query
    pool.query(sql, (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
            response.send(error);
        else // En caso contrario obtiene la lista de resultados en formato JSON
            response.json(results);
    });
}

// Creando y exportando el metodo para obtener un dato del sensor mediante su ID
module.exports.get_sensor_data = (request, response) => {
    var sql = "SELECT * FROM sensorData WHERE idSensorData = ?"; // Declarando query a realizar (mostrar un dato del sensor mediante su ID)

    // Ejecuntado dicha query
    pool.query(sql, [request.params.idSensorData], (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
            response.send(error);
        else // En caso contrario obtiene la lista de resultados en formato JSON
            response.json(results);
    });
}

// Creando y exportando el metodo para insertar un dato del sensor
module.exports.insert_sensor_data = (request, response) => {
    var sensorData = request.body; // Esta variable contendra los datos del sensor en formato JSON (enviado por el cliente)

    var currentDate = new Date(); // Obteniendo fecha y hora actual
    var utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000); // Obteniendo la hora en formato UTC
    var currentDateOfMexico = new Date(utc + (3600000*(-6))); // Obteniendo la fecha y hora actual de Mexico

    // Almacenando la fecha actual en formato YYYY-MM-DD
    var date = `${
        currentDateOfMexico.getFullYear().toString().padStart(4, '0')}-${
        (currentDateOfMexico.getMonth()+1).toString().padStart(2, '0')}-${
        currentDateOfMexico.getDate().toString().padStart(2, '0')}`;

    // Almacenando la hora actual en formato HH:MM:SS
    var time = `${
        currentDateOfMexico.getHours().toString().padStart(2, '0')}:${
        currentDateOfMexico.getMinutes().toString().padStart(2, '0')}:${
        currentDateOfMexico.getSeconds().toString().padStart(2, '0')}`;
    // 1'; DROP DATABASE equipo6;
    var sql = "INSERT INTO sensorData SET ?, registrationDate='" + date + "'" + ", registrationTime='" + time + "'"; // Declarando query a realizar (insertar un dato del sensor)

    // Ejecuntado dicha query
    pool.query(sql, [sensorData], (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
            response.send(error);
        else // En caso contrario obtiene la lista de resultados en formato JSON
            response.json(results);
    });
}