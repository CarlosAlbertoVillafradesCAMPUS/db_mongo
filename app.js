import dotenv from "dotenv";
import express from "express";
import storageAutomovil from "./routers/automovil.js";


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/automovil", storageAutomovil)
appExpress.use("/cliente", storageAutomovil)

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))

