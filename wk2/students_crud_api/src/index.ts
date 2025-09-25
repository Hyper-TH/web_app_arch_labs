import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import studentsRouter from './routes/students';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/students", studentsRouter);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student API",
      version: "1.0.0",
      description: "API to manage students",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    paths: {}, // prevents TS error
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
    res.send("<h1>Student API</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);  
});