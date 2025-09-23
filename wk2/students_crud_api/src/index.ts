import express from "express";
import bodyParser from "body-parser";
import studentsRouter from "./routes/students";
import { initDb } from "./db";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/v1/students", studentsRouter);

// Test to see the server working in the browser
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

// Initialize DB then start Server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to initialize database:", err);
});