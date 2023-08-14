import "reflect-metadata";
import dotenv from "dotenv";
import {plainToClass, classToPlain} from "class-transformer"
import {SignJWT, jwtVerify} from "jose";
import {Router} from "express";
import {dtoAlquiler} from "../routers/controller/dtoAlquiler.js";
import {dtoAutomovil} from "../routers/controller/dtoAutomovil.js";

dotenv.config("../");
const generarToken = Router();
const validarToken = Router();

const structurasDto = (collect) => {
    const instCollect = {
        "alquiler": dtoAlquiler,
        "automovil": dtoAutomovil
    };

    const myCollect = instCollect[collect];
    if(!myCollect) throw {status: 404, message: "Token solicitado no valido"}
    return {atributos: plainToClass(myCollect, {}, {ignoreDecorators: true}), class: myCollect}
}

generarToken.use("/:collection", async(req,res)=>{
    try {
        let inst = structurasDto(req.params.collection).atributos;
        const encoder = new TextEncoder();
        const jwtConstructor = new SignJWT(Object.assign({}, classToPlain(inst)));
        const jwt = await jwtConstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(201).send({status:201, jwt})
    } catch (error) {
        res.status(404).send({status:404, message:error.message})
    }
})

validarToken.use("/", async(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(400).send({status: 400, token: "Error, porfavor generar token"});
    try {
        const encoder = new TextEncoder();
        req.data = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        next();
    } catch (error) {
        res.status(498).send({status:498, message: "Algo salio mal, genere un nuevo token"});
    }
})
export{
    generarToken,
    validarToken,
    structurasDto
}