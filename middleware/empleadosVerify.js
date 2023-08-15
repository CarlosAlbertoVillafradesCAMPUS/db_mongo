import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {Router} from "express";
import {structurasDto} from "./jwt.js";

const appMiddlewareEmpleadosVerify = Router();

appMiddlewareEmpleadosVerify.use(async(req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;

    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("empleado").class,{},{ignoreDecorators:true})))
    const verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(422).send({status:422, message:"No Autorizado"}) :next()
})

export{
    appMiddlewareEmpleadosVerify
}