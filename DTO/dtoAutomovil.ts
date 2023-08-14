import {Expose} from "class-transformer";
import {IsDefined} from "class-validator";

export class dtoAutomovil{
    @Expose({name: "automovil_id"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'automovil_id' es obligatorio"}}})
    ID_Automovil:string;

    @Expose({name:"auto_marca"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_marca' es obligatorio"}}})
    Marca:string;

    @Expose({name:"auto_modelo"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_modelo' es obligatorio"}}})
    Modelo:string

    @Expose({name:"auto_anio"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_anio' es obligatorio"}}})
    Anio:number;

    @Expose({name:"auto_tipo"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_tipo' es obligatorio"}}})
    Tipo:string;

    @Expose({name:"auto_capacidad"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_capacidad' es obligatorio"}}})
    Capacidad:number;

    @Expose({name:"auto_precio_diario"})
    @IsDefined({message: ()=> {throw {status: 422, message:"El parametro 'auto_precio_diario' es obligatorio"}}})
    Precio_Diario:number;
    constructor(data: Partial<dtoAutomovil>){
        Object.assign(this, data);
        this.ID_Automovil = "";
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo="";
        this.Capacidad=0;
        this.Precio_Diario=0;
    }
}

//"ID_Automovil", "Marca", "Modelo", "Anio", "Tipo", "Capacidad", "Precio_Diario"