import {Expose} from "class-transformer";
import {IsDefined} from "class-validator";

export class dtoSucursal{

    @Expose({name:"sucursal_id"})
    @IsDefined({message: () => {throw {status:422, message:"El parametro sucursal_id es obligatorios"}}})
    ID_Sucursal:number;

    @Expose({name:"sucursal_nombre"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro sucursal_nombre es obligatorios"}}})
    Nombre:string;

    @Expose({name:"sucursal_direccion"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro sucursal_direccion es obligatorios"}}})
    Direccion:string;

    @Expose({name:"sucursal_telefono"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro sucursal_telefono es obligatorios"}}})
    Telefono:string;

    constructor(data: Partial<dtoSucursal>){
            Object.assign(this, data);
            this.ID_Sucursal = 0;
            this.Nombre = "";
            this.Direccion = "";
            this.Telefono = "";
    }
}
//"ID_Sucursal", "Nombre", "Direccion", "Telefono"