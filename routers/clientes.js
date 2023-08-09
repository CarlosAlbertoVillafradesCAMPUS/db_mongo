import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js"

const storageClientes = Router();
const db = await con();
storageClientes.use(configGet())

//All clientes
storageClientes.get("/", async (req,res)=>{
    try {
        const collection = db.collection("cliente");
        const projection = {"_id": 0};
        const data = await collection.find({}, projection).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

export default storageClientes;