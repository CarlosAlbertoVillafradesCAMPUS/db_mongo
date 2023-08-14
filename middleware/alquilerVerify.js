import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {structurasDto} from "./jwt.js";
import {Router} from "express";
import {validate} from "class-validator";

const appMiddlewareAlquilerVerify = Router();
// const appDtoDataAlquiler = Router();

appMiddlewareAlquilerVerify.use(async(req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat,exp, ...newPayload} = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("alquiler").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    req.data = undefined;
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

// appDtoDataAlquiler.use(async(req,res,next)=>{
//     try {
//         let data = plainToClass(structurasDto("alquiler").class, req.body);
//         await validate(data);
//         console.log(data);
//         req.body = JSON.parse(JSON.stringify(data));
//         req.data= undefined;
//         next()
//     } catch (error) {
//         res.status(error.status).send(error);
//     }
// })

export{
    appMiddlewareAlquilerVerify
}