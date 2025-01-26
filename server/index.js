import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./connection.js";
import router from "./routers/route.js";
import cors from "cors";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.static("./dist"));
app.use(express.json());

app.use("/api", router);
app.get("/data", (req, res) => res.json({ msg: "success" }));

app.all("/", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

connect()
  .then(() => {
    app.listen(process.env.PORT, (error) => {
      if (error) return console.log(error);
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
