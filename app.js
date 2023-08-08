// import dotenv from "dotenv";
// import express from "express";
// import storageAutomovil from "./routers/automovil.js";
// 

// dotenv.config();
// const appExpress = express();

// appExpress.use("/automovil", storageAutomovil)

// let config = JSON.parse(process.env.MY_CONFIG);
// appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))


import {con} from "./db/connect.js";
let db = await con()
let res = await db.createCollection("prueba");
console.log(res);
