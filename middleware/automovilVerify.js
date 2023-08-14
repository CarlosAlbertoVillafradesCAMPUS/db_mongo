import "reflect-metadata";
import {plainToClass, classToPlain} from "class-transformer";
import {Router} from "express";
import {validate} from "class-validator";
import {structurasDto} from "./jwt.js"

const appMiddlewareAutomovilVerify = Router();
const appDtoDataAutomovil = Router();

appMiddlewareAutomovilVerify.use((req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("automovil").class, {}, {ignoreDecorators:true})));
    let verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

export{
    appMiddlewareAutomovilVerify
}
