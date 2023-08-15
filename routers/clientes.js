import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js";
import {appMiddlewareClientesVerify} from "../middleware/clientesVerify.js";

const storageClientes = Router();
const db = await con();
storageClientes.use(configGet());
storageClientes.use(appMiddlewareClientesVerify);

//All clientes
storageClientes.get("/", async (req,res)=>{
  if(!req.rateLimit) return; 
    try {
        const collection = db.collection("cliente");
        const data = await collection.aggregate([{
          $project: {
            _id:0
          }
          }]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//clientes con el DNI específico
storageClientes.get("/especifico", async (req,res)=>{
  if(!req.rateLimit) return; 
    try {
        let {dni} = req.query;
        dni = parseInt(dni);
        const collection = db.collection("cliente");
        const data = await collection.aggregate([{
          $match:{
            DNI: {$eq: dni},
          }
          },
        {
          $project: {
            _id:0
          }
        }]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//clientes que realizaron al menos un alquiler
storageClientes.get("/alquiler", async (req,res)=>{
  if(!req.rateLimit) return; 
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
            {
              $project: {
                _id:0,
                "Alquiler_Info._id":0
              }
            }
          ]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

export default storageClientes;