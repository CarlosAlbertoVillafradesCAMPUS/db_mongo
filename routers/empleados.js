import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js"

const storageEmpleado = Router();
const db = await con();
storageEmpleado.use(configGet())

//Listar los empleados con el cargo de "Vendedor"
storageEmpleado.get("/", async(req,res)=>{
    try {
        const collection = db.collection("empleado");
        const data = await collection.find({ Cargo: "Vendedor" }).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
});

//empleados con cargo de "Gerente" o "Asistente"
storageEmpleado.get("/cargoEspecial", async(req,res)=>{
    try {
        const collection = db.collection("empleado");
        const data = await collection.find({
            Cargo: { $in: ["Gerente", "Asistente"] },
          }).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
});

export default storageEmpleado;