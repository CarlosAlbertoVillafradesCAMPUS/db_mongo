import dotenv from "dotenv";
import express from "express";
import {generarToken, validarToken} from "./middleware/jwt.js"
import storageAutomovil from "./routers/automovil.js";
import storageClientes from "./routers/clientes.js";
import storageAlquiler from "./routers/alquiler.js";
import storageReserva from "./routers/reservas.js";
import storageEmpleado from "./routers/empleados.js";
import storageSucursal from "./routers/sucursal.js";

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/token", generarToken);
appExpress.use("/automovil", storageAutomovil); 
appExpress.use("/clientes", storageClientes);
appExpress.use("/alquiler", validarToken, storageAlquiler);
appExpress.use("/reserva", storageReserva);
appExpress.use("/empleado", storageEmpleado);
appExpress.use("/sucursal", storageSucursal);

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))

