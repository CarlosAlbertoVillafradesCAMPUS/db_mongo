import dotenv from "dotenv";
import {Router} from "express";
import { configGet } from "../middleware/limit.js";
import {con} from "../db/connect.js"

let db = await con();

dotenv.config();
let storageAutomovil = Router();

storageAutomovil.get("/", async (req,res)=>{
    try {
        const collection = db.collection("reserva");
        let data = await collection.aggregate([
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
                  "ID_Cliente_id":0,
                  "ID_Automovil_id":0,
                "Cliente_Info.ID_Cliente": 0,
                "Automovil_Info.ID_Automovil": 0,
              },
            },
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