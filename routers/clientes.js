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
        const projection = {"ID_Cliente": 0};
        const data = await collection.find({}, projection).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//clientes con el DNI específico
storageClientes.get("/especifico", async (req,res)=>{
    try {
      console.log(req);
        let {dni} = req.query;
        dni = parseInt(dni)
        const collection = db.collection("cliente");
        const data = await collection.aggregate([{
          $match:{
            DNI: {$eq: dni},
          }
          }]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//clientes que realizaron al menos un alquiler
storageClientes.get("/alquiler", async (req,res)=>{
    try {
        const collection = db.collection("cliente");
        const data = await collection.aggregate([
            {
              $lookup: {
                from: "alquiler",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente_id",
                as: "Alquiler_Info",
              },
            },
            {
              $match: {
                Alquiler_Info: { $ne: [] },
              },
            },
          ]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

export default storageClientes;