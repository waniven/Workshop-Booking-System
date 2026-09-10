const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const path = require("path");

const vehicleRouter = require("./routes/vehicleRoute");

const app = express();
const dbURI = "mongodb://host.docker.internal:27017/workshop";
const PORT = 3000;

async function startServer(){
  try {
    //connect to DB
    console.log("Establishing connection to the DB");
    await mongoose.connect(dbURI);
    console.log(`Sucessfully connected to DB at ${dbURI}`);
    // start server on set port
    app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
  } catch (error) {
    console.log(`Failed to connect to DB, Error: ${error}`);
    process.exit(1);
  }
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workshop booking API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],  // Path to the API routes folders
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(vehicleRouter);

startServer();