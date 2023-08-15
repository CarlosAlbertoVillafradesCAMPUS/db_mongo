import {Router} from "express";
import {con} from "../db/connect.js";
import {configGet} from "../middleware/limit.js";
import {appMiddlewareSucursalVerify} from "../middleware/sucursalVerify.js";

const storageSucursal = Router();
const db = await con();

storageSucursal.use(configGet());
storageSucursal.use(appMiddlewareSucursalVerify);

//cantidad total de automóviles disponibles en cada sucursal
storageSucursal.get("/", async(req,res)=>{
  if(!req.rateLimit) return; 
    try {
        const collection = db.collection("sucursal_automovil");
        const data = await collection.aggregate([
            {
              $lookup: {
                from: "sucursal",
                localField: "ID_Sucursal_id",
                foreignField: "ID_Sucursal",
                as: "Sucursal_Info",
              },
            },
            {
              $unwind: "$Sucursal_Info",
            },
            {
              $project: {
                "_id":0,
                "Sucursal_Info._id":0,
                "Sucursal_Info.ID_Sucursal": 0,
                "ID_Automovil_id": 0,
              },
            },
          ]).toArray();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

export default storageSucursal;