var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente

var Scontroller = require('../controllers/sensors.controller'); // Variable que contiene la ruta del sensors.controller.js

router.get('/sensors', Scontroller.sensor_data_list); // Realizando la peticion GET para mostrar la lista de datos de los sensores
router.get('/sensors/:idSensorData', Scontroller.get_sensor_data); // Realizando la peticion GET para mostrar un dato del sensor mediante su ID
router.post('/sensors', Scontroller.insert_sensor_data); // Realizando peticion POST para insertar un dato del sensor


var Ucontroller = require('../controllers/user.controller'); 

router.get('/user/:idUser', Ucontroller.getUser);
router.get('/user-plants/:userId', Ucontroller.getUserPlants);


var Pcontroller = require('../controllers/plant.controller'); 

router.get('/plant-luminosoty/:idPlant', Pcontroller.getPlantLuminosity);
router.get('/plant-humidity/:idPlant', Pcontroller.getPlantHumidity);
router.get('/plant-earth-humidity/:idPlant', Pcontroller.getPlantEarthHumidity);
router.get('/plant-temperature/:idPlant', Pcontroller.getPlantTemperature);

module.exports = router; // Objeto que quiero exportar o hacer publico fuera de este archivo