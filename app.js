// Declarando dependencias de diferentes modulos
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
const AWS = require('aws-sdk');

var index = require('./routes/index'); // Variable que contiene la ruta del index.js
var sensors = require('./routes/sensors'); // Variable que contiene la ruta del sensors.js

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
//var port = 30000; // Declarando port en el 8060
var app = express(); // Metodos necesarios para poder crear una aplicacion web


app.use(cors()); // Inicializamos el cors()
app.use(bodyParser.json()); // Lo que recibamos del cliente o de la base de datos se convertira en formato JSON
app.use(bodyParser.urlencoded({extended: false})); // La informacion que recibamos desde el cliente o base de datos no estara codificada
app.use(express.static(__dirname + '/frontend')); // Enlazando a nuestro frontend de la pagina web

//HTML routes
app.use('', index); // Acceder al archivo index.js desde la raiz del sitio

//API routes
app.use('/api', sensors); 

// Inicializar el servidor para poner en linea nuestra API
/*app.listen(port, () => {
    console.log('El servidor inicio en el puerto ' + port);
});*/

app.listen(port, host, function() {
    console.log("Server started at port "+port);
});

///////////////////////////////
///////////////////////////////


///////////////////////////////





var img_0 = "https://karma-testing.s3.amazonaws.com/Bosque+Pino+Encino/DSCF0058.jpg";

async function quickstart1() {
    var objectA = new Object();
    const directions = {};
    var img_labels = {};
    /* AWS things */
    AWS.config.update({region: 'us-east-2'});

    // Create S3 service object
    s3 = new AWS.S3({apiVersion: '2006-03-01'});

    // Create the parameters for calling listObjects
    var bucketParams = {
      Bucket : 'karma-testing',
    };
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        objectA = data;
        for (x in objectA.Contents) {
          directions[x]=objectA.Contents[x].Key;
          //console.log(objectA.Contents[x].Key);
        } 
        for(x in directions){
          console.log('Direction: ',x, ':', directions[x]);
        }
        return directions;
        //console.log("Success", objectA);
      }
    });
    return directions;
    /*================================== */
}

async function quickstart(img_name) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'chicharron.json'
    });
  
    
    // Performs text detection on the image file
    const [result_text] = await client.textDetection(img_name);
    const texts = result_text.textAnnotations;
    console.log('Text:');
    console.log(texts[0].description);
    
    // Performs label detection on the image file
    const [result] = await client.labelDetection(img_name);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    //console.log(labels[0].description);
    labels.forEach(label => console.log(label.description));
}

function get_dictionary(){
  const the_directions = quickstart1();
  for(x in the_directions){
    console.log(the_directions[x]);
  }
}

//the_directions = quickstart1();
quickstart('jag3.png');
get_dictionary();
//quickstart('jag3.png');




///

//const vision = require('@google-cloud/vision');

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
/* const inputImageUri = 'gs://karma-bucket-1/Bosque Pino Encino/DSCF0059.jpg';
 const outputUri = 'gs://karma-out-1/test-outputs-1/';


// Imports the Google Cloud client libraries
const {ImageAnnotatorClient} = require('@google-cloud/vision').v1;

// Instantiates a client
const client = new ImageAnnotatorClient({
    keyFilename: 'quesito.json'
});

// You can send multiple images to be annotated, this sample demonstrates how to do this with
// one image. If you want to use multiple images, you have to create a request object for each image that you want annotated.
async function asyncBatchAnnotateImages() {
  // Set the type of annotation you want to perform on the image
  // https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.Feature.Type
  const features = [{type: 'LABEL_DETECTION'}, {type: 'TEXT_DETECTION'}];

  // Build the image request object for that one image. Note: for additional images you have to create
  // additional image request objects and store them in a list to be used below.
  const imageRequest = {
    image: {
      source: {
        imageUri: inputImageUri,
      },
    },
    features: features,
  };

  // Set where to store the results for the images that will be annotated.
  const outputConfig = {
    gcsDestination: {
      uri: outputUri,
    },
    batchSize: 2, // The max number of responses to output in each JSON file
  };

  // Add each image request object to the batch request and add the output config.
  const request = {
    requests: [
      imageRequest, // add additional request objects here
    ],
    outputConfig,
  };

  // Make the asynchronous batch request.
  const [operation] = await client.asyncBatchAnnotateImages(request);

  // Wait for the operation to complete
  const [filesResponse] = await operation.promise();

  console.log(operation);
  // The output is written to GCS with the provided output_uri as prefix
  const destinationUri = filesResponse.outputConfig.gcsDestination.uri;
  console.log(`Output written to GCS with prefix: ${destinationUri}`);
}

asyncBatchAnnotateImages();
*/
