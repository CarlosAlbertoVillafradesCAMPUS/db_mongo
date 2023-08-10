import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js";

const storageAlquiler = Router();
const db = await con();
storageAlquiler.use(configGet());

//alquileres activos
storageAlquiler.get("/", async(req,res)=>{
    try {
        const collection = db.collection("alquiler");
        const data = await collection.aggregate([
            {
              $match: {
                Estado: "Activo",
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
              $project: {
                "_id":0,
                "Cliente_Info._id":0,
                "Cliente_Info.ID_Cliente": 0,
              },
            },
          ]).toArray();

        res.send(data)
    } catch (error) {
        
    }
});

// detalles del alquiler con el ID_Alquiler 
storageAlquiler.get("/:id", async (req,res)=>{
    try {
        let {id} = req.params;
        id = parseInt(id);
        const collection = db.collection("alquiler");
        const data = await collection.aggregate([
            {
              $match: {
                ID_Alquiler: id,
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

        res.send(data)
    } catch (error) {
        
    }
});

//Obtener el costo total de un alquiler
storageAlquiler.get("/costoTotal/:id", async (req,res)=>{
    try {
        let {id} = req.params;
        id = parseInt(id);
        const collection = db.collection("alquiler");
        const data = await collection.find(
            {
              ID_Alquiler: id
            },
            {
              Costo_Total: 1,
            }
          ).toArray();

        res.send(data)
    } catch (error) {
        res.send(error)
    }
});

//del alquiler que tiene fecha de inicio en '2023-07-05'.
storageAlquiler.get("/", async (req,res)=>{
  try {

    let {fecha_inicio} = req.query;
      const collection = db.collection("alquiler");
      const data = await collection.find({
        Fecha_Inicio: {$eq: fecha_inicio},
      }).toArray();

      res.send(data)
  } catch (error) {
      res.send(error)
  }
});

//cantidad total de alquileres registrados
storageAlquiler.get("/total/", async (req,res)=>{
  try {
      const collection = db.collection("alquiler");
      const data = await collection.countDocuments().toArray();
      res.send(data)
  } catch (error) {
      res.send(error)
  }
});

//alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'
storageAlquiler.get("/rango", async (req,res)=>{
  try {
      const collection = db.collection("alquiler");
      const data = await collection.find({$and: [{Fecha_Inicio: {$gte:'2023-07-20' }},{Fecha_Inicio: {$lte: "2024-12-10"}}]}).toArray();
      res.send(data)
  } catch (error) {
      res.send(error)
  }
});



export default storageAlquiler;