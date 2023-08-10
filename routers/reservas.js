import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js"

const storageReserva = Router();
const db = await con();
storageReserva.use(configGet())

//Reserva pendientes
storageReserva.get("/", async(req,res)=>{
    try {
        const collection = db.collection("reserva");
        const data = await collection.aggregate([
            {
              $match: {
                Estado: "Pendiente",
              },
            },
            {
              $lookup: {
                from: "cliente",
                localField: "ID_Cliente_id",
                foreignField: "ID_Cliente",
                as: "Cliente_Info",
              },
            },
            {
              $unwind: "$Cliente_Info",
            },
            {
              $lookup: {
                from: "automovil",
                localField: "ID_Automovil_id",
                foreignField: "ID_Automovil",
                as: "Automovil_Info",
              },
            },
            {
              $unwind: "$Automovil_Info",
            },
            {
              $project: {
                "_id":0,
                  "Cliente_Info._id":0,
                  "Automovil_Info._id":0,
                "Cliente_Info.ID_Cliente": 0,
                "Automovil_Info.ID_Automovil": 0,
              },
            },
          ]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

// reservas pendientes realizadas por un cliente
storageReserva.get("/pendiente", async(req,res)=>{
  try {
    console.log(req.query);
    let {id_cliente} = req.query;
        id_cliente = parseInt(id_cliente)
      const collection = db.collection("reserva");
      const data = await collection.aggregate([
        {
          $match: {
            Estado: "Pendiente",
            ID_Cliente_id: id_cliente,
          },
        },
        {
          $lookup: {
            from: "cliente",
            localField: "ID_Cliente_id",
            foreignField: "ID_Cliente",
            as: "Cliente_Info",
          },
        },
        {
          $unwind: "$Cliente_Info",
        },
        {
          $lookup: {
            from: "automovil",
            localField: "ID_Automovil_id",
            foreignField: "ID_Automovil",
            as: "Automovil_Info",
          },
        },
        {
          $unwind: "$Automovil_Info",
        },
        {
          $project: {
            "Cliente_Info.ID_Cliente": 0,
            "Automovil_Info.ID_Automovil": 0,
          },
        },
      ]).toArray();
      res.send(data);
  } catch (error) {
      res.send(error)
  }
})


export default storageReserva;