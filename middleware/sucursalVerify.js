import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {Router} from "express";
import {structurasDto} from "./jwt.js";

const appMiddlewareSucursalVerify = Router();

appMiddlewareSucursalVerify.use(async(req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;

    const clone = JSON.stringify(classToPlain(plainToClass(structurasDto("sucursal").class, {}, {ignoreDecorators:true})));
    const verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(401).send({status:401, message: "No autorizado"}) :next();
})

export{
    appMiddlewareSucursalVerify
}