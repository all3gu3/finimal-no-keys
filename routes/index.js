const { request, response } = require('express');
var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente

// Cada vez que recibas una peticion GET desde la raiz del sitio vas ejecutar la siguiente funcion
// request - Lo que se envia al servidor
// response - Respuesta del servidor
router.get('/', (request, response) => {
    response.send('Pagina de inicio');
});

router.get('/nosotros', (request, response) => {
    response.send('Nosotros');
});

module.exports = router; // Objeto que quiero exportar o hacer publico fuera de este archivo