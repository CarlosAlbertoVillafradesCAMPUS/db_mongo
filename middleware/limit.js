import {rateLimit} from "express-rate-limit";

export const configGet = () =>{
    return rateLimit({
        windowMs: 10 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req,res)=>{
            if (req.headers["content-length"] > 900) {
                res.status(413).send({
                    status:413,
                    message: "El tamaño es incorrecto"
                });
                return true;
            }
        },
        message: (req,res) =>{
            res.status(429).send({
                status: 429,
                message: "alcanzo el limite de peticiones"
            })
        }
    })
}