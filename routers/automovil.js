import dotenv from "dotenv";
import {Router} from "express";
import { configGet } from "../middleware/limit.js";

dotenv.config();
let storageAutomovil = Router();

storageAutomovil.get("/", configGet(), async (req,res)=>{
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    res.send("funcionaaaa")
})

export default storageAutomovil;