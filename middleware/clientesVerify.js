import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {Router} from "express";
import {structurasDto} from "./jwt.js";

const appMiddlewareClientesVerify = Router();

appMiddlewareClientesVerify.use(async(req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;

    const clone = JSON.stringify(classToPlain(plainToClass(structurasDto("clientes").class, {}, {ignoreDecorators:true})));
    const verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

export{
    appMiddlewareClientesVerify
}