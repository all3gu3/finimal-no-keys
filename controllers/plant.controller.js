//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
//var conexion = mysql.createConnection(config); // Crear la conexion con los datos almacenados en config
var pool = config.pool;

/**
 * [Function that gets all luminosity lectures for a plant]
 * @param  idPlant  
 * @return response/error
 */ 
module.exports.getPlantLuminosity = (request, response) => {
    var sql = "SELECT luminosity, registrationDate, registrationTime FROM sensorData WHERE idPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all humidity lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantHumidity = (request, response) => {
    var sql = "SELECT humidity, registrationDate, registrationTime FROM sensorData WHERE idPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all earth humidity lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantEarthHumidity = (request, response) => {
    var sql = "SELECT earthHumidity, registrationDate, registrationTime FROM sensorData WHERE idPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all temperature lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantTemperature = (request, response) => {
    var sql = "SELECT temperature, registrationDate, registrationTime FROM sensorData WHERE idPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}