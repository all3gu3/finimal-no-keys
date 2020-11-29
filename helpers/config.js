var mysql = require('mysql');
// Configuracion de la base de datos en MySQL
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'equipo6'
})

module.exports.pool = pool; // Objeto que quiero exportar o hacer publico fuera de este archivo