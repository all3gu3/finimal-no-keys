//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
var pool = config.pool; // Crear la conexion con los datos almacenados en config


/**
 * [Function that gets all data from an user]
 * @param  idUser  
 * @return response/error
 */ 
module.exports.getUser = (request, response) => {
    var sql = "SELECT * FROM user WHERE idUser = ?"; 
    console.log("idUser: "+[request.params.idUser]);
    pool.query(sql, [request.params.idUser], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all the plants of an user]
 * @param  idUser  
 * @return response/error
 */ 
module.exports.getUserPlants = (request, response) => {
    var sql = "SELECT * FROM plant WHERE userId = ?"; 

    pool.query(sql, [request.params.userId], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}