import {Router} from "express";
import { configGet } from "../middleware/limit.js";
import {con} from "../db/connect.js"

let db = await con();
let storageAutomovil = Router();
storageAutomovil.use(configGet())

//automoviles disponibles
storageAutomovil.get("/", async (req,res)=>{
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



export default storageAutomovil;