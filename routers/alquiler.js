import { Router } from "express";
import { con } from "../db/connect.js";
import { configGet } from "../middleware/limit.js";

const storageAlquiler = Router();
const db = await con();
storageAlquiler.use(configGet());

//alquileres activos
storageAlquiler.get("/", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
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
            _id: 0,
            "Cliente_Info._id": 0,
            "Cliente_Info.ID_Cliente": 0,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {}
});

// detalles del alquiler con el ID_Alquiler
storageAlquiler.get("/detalles", async (req, res) => {
  try {
    let { id } = req.query;
    id = parseInt(id);
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
        {
          $match: {
            ID_Alquiler: 1,
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
            _id: 0,
            "Cliente_Info._id": 0,
            "Automovil_Info._id": 0,
            "Cliente_Info.ID_Cliente": 0,
            "Automovil_Info.ID_Automovil": 0,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {}
});

//Obtener el costo total de un alquiler
storageAlquiler.get("/costoTotal", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find(
        {
          ID_Alquiler: id,
        },
        {
          Costo_Total: 1,
        }
      )
      .toArray();

    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

//del alquiler que tiene fecha de inicio en '2023-07-05'.
storageAlquiler.get("/fechas", async (req, res) => {
  try {
    let { fecha_inicio } = req.query;
    const collection = db.collection("alquiler");

    const data = await collection.aggregate([{
      $match:{
        Fecha_Inicio: { $regex: "2023-08-05"}
      }
    }]).toArray();

    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

//cantidad total de alquileres registrados
storageAlquiler.get("/total", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    let data = await collection.countDocuments();
    res.send({cant_total: data});
  } catch (error) {
    res.send(error);
  }
});

//alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'
storageAlquiler.get("/rango", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({
        $and: [
          { Fecha_Inicio: { $gte: "2023-07-20" } },
          { Fecha_Inicio: { $lte: "2024-12-10" } },
        ],
      })
      .toArray();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export default storageAlquiler;
