import {Router} from "express";
import { configGet } from "../middleware/limit.js";
import {appMiddlewareAutomovilVerify} from "../middleware/automovilVerify.js";
import {con} from "../db/connect.js";

let db = await con();
let storageAutomovil = Router();
storageAutomovil.use(configGet());
storageAutomovil.use(appMiddlewareAutomovilVerify);


//automoviles disponibles
storageAutomovil.get("/", async (req,res)=>{
  if(!req.rateLimit) return; 
    try {
        const collection = db.collection("automovil");
        const data = await collection.aggregate([
          {
            $lookup: {
              from: "alquiler",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil_id",
              as: "Alquiler_Info"
            }
          },
          {
            $match: {
              "Alquiler_Info.Estado":"Inactivo"
            }
          },
          {
            $project: {
              "_id":0,
              "Alquiler_Info":0
            }
          }
        ]).toArray();

        res.send(data);
    } catch (error) {
        res.send(error)
        // if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
        //     res.status(401).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
        // }else{
        //     res.status(401).send("es obligatorio el campo: " + error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties)
        // }
       
    }
   
})

// todos los automóviles con una capacidad mayor a 5 personas
storageAutomovil.get("/capacidadMayor", async (req,res)=>{
  if(!req.rateLimit) return; 
  try {
      const collection = db.collection("automovil");
      const data = await collection.aggregate([{
        $match:{
          Capacidad: { $gt: 5}
        }
      },
    {
      $project:{
        _id:0
      }
    }]).toArray();

      res.send(data);
  } catch (error) {
      res.send(error)
      // if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
      //     res.status(401).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
      // }else{
      //     res.status(401).send("es obligatorio el campo: " + error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties)
      // }
     
  }
})

//automóviles ordenados por marca y modelo
storageAutomovil.get("/ordenados", async (req,res)=>{
  if(!req.rateLimit) return; 
  try {
      const collection = db.collection("automovil");
      const data = await collection.find().sort({
        Marca: 1,
        Modelo: -1,
      }).toArray();
      res.send(data);
  } catch (error) {
      res.send(error)
      // if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
      //     res.status(401).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
      // }else{
      //     res.status(401).send("es obligatorio el campo: " + error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties)
      // }
     
  }
})

//cantidad total de automóviles en cada sucursal junto con su dirección
storageAutomovil.get("/sucursal", async (req,res)=>{
  if(!req.rateLimit) return; 
  try {
      const collection = db.collection("sucursal_automovil");
      const data = await collection.aggregate([
        {
            $group: {
                "_id": "$ID_Sucursal_id",
                "Cantidad_Total_Disponible": { $sum: "$Cantidad_Disponible" },
            }
        },
        {
          $lookup:{
            from: "sucursal",
            localField: "_id",
            foreignField: "ID_Sucursal",
            as: "Sucursal_info"
          }
        },
        {
          $unwind: "$Sucursal_info"
        },
        {
          $project:{
            _id:0,
            "Sucursal_info.Direccion": 1,
            "Cantidad_Total_Disponible": "$Cantidad_Total_Disponible",
          }
        }
    ]).toArray();
      res.send(data);
  } catch (error) {
      res.send(error)
      // if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
      //     res.status(401).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
      // }else{
      //     res.status(401).send("es obligatorio el campo: " + error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties)
      // }
     
  }
})

// automóviles con capacidad igual a 5 personas y que estén disponibles
storageAutomovil.get("/disponibles", async (req,res)=>{
  if(!req.rateLimit) return; 
  try {
    let {capacidad} = req.query;
    capacidad = parseInt(capacidad);
      const collection = db.collection("automovil");
      const data = await collection.aggregate([
        {
          $lookup: {
            from: "alquiler",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil_id",
            as: "Alquiler_Info"
          }
        },
        {
          $match: {
            "Alquiler_Info.Estado":"Inactivo",
            "Capacidad": capacidad
          }
        },
        {
          $project: {
            _id:0,
            "ID_Automovil": 1,
            "Marca": 1,
            "Modelo": 1,
            "Anio": 1,
            "Tipo": 1,
            "Capacidad": 1,
            "Precio_Diario":1,
            "Alquiler_Info.Estado":1
          }
        }
      ]).toArray();
      res.send(data);
  } catch (error) {
      res.send(error)
      // if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
      //     res.status(401).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
      // }else{
      //     res.status(401).send("es obligatorio el campo: " + error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties)
      // }
     
  }
})

export default storageAutomovil;