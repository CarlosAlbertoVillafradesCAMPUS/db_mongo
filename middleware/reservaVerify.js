import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {structurasDto} from "./jwt.js";
import {Router} from "express";

const appMiddlewareReservaVerify = Router();

appMiddlewareReservaVerify.use(async(req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat,exp, ...newPayload} = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("reserva").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

export{
    appMiddlewareReservaVerify
}