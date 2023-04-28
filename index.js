const express = require('express')
const app = express()
const path = require('path')


const http = require("http");
const server = http.createServer(app);

const cors = require('cors')
const mercadopago = require('mercadopago');

// Agrega aquí tus credenciales de Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-4521739040420991-090420-8019442443799c590368686458e0f3d7-1188085013',
});



//json


const fs = require('fs');
let maderasjson
let preciosArray = [];

fs.readFile('precio.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const jsonData = JSON.parse(data);
  maderasjson = jsonData.madera;

  maderasjson.forEach((madera) => {
    console.log(`Nombre: ${madera.name}`);
    console.log(`Precio: ${madera.precio}`);
    preciosArray.push(madera.precio)
  });
});













app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))



/* app.use(cors())
 */

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/obtener", function (req, res) {
  console.log("se ha pulsado el botón obtener");
  res.send(maderasjson);
  
});

app.post("/enviar", function (req, res) {
    console.log("se ha pulsado el botón enviar");
    res.send({ color: "rojo" });
  });

  app.post('/endpoint', (req, res) => {
    const data = req.body;
    // Procesa la información que se ha enviado desde el cliente
    console.log(data);
    res.send('Información recibida');
  });





// Ruta de pago
app.get('/pagar', (req, res) => {
  // Crea un objeto de preferencia
  console.log( 'el numero es =' + Math.round(parseFloat(req.query.precio)*preciosArray[req.query.materialmercado]))
  let numermagic = Math.round(parseFloat(req.query.precio)*preciosArray[req.query.materialmercado])
  let preference = {
    items: [
      {
        title: 'Producto de ejemplo',
        unit_price: +numermagic,
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/success',
      pending: 'http://localhost:3000/pending',
      failure: 'http://localhost:3000/failure',
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [
        { id: 'amex' } // Excluye American Express
      ],
      excluded_payment_types: [
        { id: 'atm' } // Excluye Pagos en efectivo
      ],
      installments: 12 // Cantidad máxima de cuotas
    },
    /* notification_url: 'http://localhost:3000/notifications', */
  };

  mercadopago.preferences
    .create(preference)
    .then(response => {
      global.id = response.body.id;
      console.log(req.query.precio)
      res.redirect(response.body.init_point);
    })
    .catch(error => {
      console.log(error);
      res.send('Hubo un error al procesar el pago');
    });
});

// Ruta de éxito
app.get('/success', (req, res) => {
  res.send('Pago exitoso');
});

// Ruta pendiente
app.get('/pending', (req, res) => {
  res.send('Pago pendiente');
});

// Ruta de fallo
app.get('/failure', (req, res) => {
  res.send('Pago fallido');
});


















const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
