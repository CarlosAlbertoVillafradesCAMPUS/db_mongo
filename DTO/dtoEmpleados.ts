import {Expose} from "class-transformer";
import {IsDefined} from "class-validator";

export class dtoEmpleados{

    @Expose({name:"empleado_id"})
    @IsDefined({message: () => {throw {status:422, message:"El parametro empleado_id es obligatorios"}}})
    ID_Empleado:number;

    @Expose({name:"empleado_nombre"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro empleado_nombre es obligatorios"}}})
    Nombre:string;

    @Expose({name:"empleado_apellido"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro empleado_apellido es obligatorios"}}})
    Apellido:string;

    @Expose({name:"dni"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro dni es obligatorios"}}})
    DNI:number;

    @Expose({name:"empleado_direccion"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro empleado_direccion es obligatorios"}}})
    Direccion:string;

    @Expose({name:"empleado_telefono"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro empleado_telefono es obligatorios"}}})
    Telefono:string;

    @Expose({name:"cargo"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro cargo es obligatorios"}}})
    Cargo:string;

    constructor(data: Partial<dtoEmpleados>){
            Object.assign(this, data);
            this.ID_Empleado = 0;
            this.Nombre = "";
            this.Direccion = "";
            this.Telefono = "";
            this.Cargo = "";
    }
}

//"ID_Empleado", "Nombre", "Apellido", "DNI", "Direccion", "Telefono", "Cargo"