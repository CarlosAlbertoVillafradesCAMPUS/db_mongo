import {Expose} from "class-transformer";
import {IsDefined} from "class-validator";

export class dtoClientes{

    @Expose({name:"cliente_id"})
    @IsDefined({message: () => {throw {status:422, message:"El parametro cliente_id es obligatorios"}}})
    ID_Cliente:number;

    @Expose({name:"cliente_nombre"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro cliente_nombre es obligatorios"}}})
    Nombre:string;

    @Expose({name:"cliente_apellido"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro cliente_apellido es obligatorios"}}})
    Apellido:string;

    @Expose({name:"dni"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro dni es obligatorios"}}})
    DNI:number;

    @Expose({name:"cliente_direccion"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro cliente_direccion es obligatorios"}}})
    Direccion:string;

    @Expose({name:"cliente_telefono"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro cliente_telefono es obligatorios"}}})
    Telefono:string;

    @Expose({name:"email"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro email es obligatorios"}}})
    Email:string;

    constructor(data: Partial<dtoClientes>){
            Object.assign(this, data);
            this.ID_Cliente = 0;
            this.Nombre = "";
            this.Direccion = "";
            this.Telefono = "";
            this.Email = "";
    }
}

//"ID_Cliente", "Nombre", "Apellido", "DNI", "Direccion", "Telefono", "Email"