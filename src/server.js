const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const vehicleRouter = require('./routes/vehicleRoute')

const app = express();
const PORT = 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workshop booking API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to the API routes folders
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// simple get route
app.get('/', (req, res) => {
    res.send('Welcome, to the workshop management system');
});

app.use(vehicleRouter);

// start server on set port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})