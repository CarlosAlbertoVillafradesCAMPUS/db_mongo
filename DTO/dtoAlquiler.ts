import {IsDefined, IsString, Matches} from "class-validator";
import {Expose, Transform} from "class-transformer";

export class dtoAlquiler{
    @Expose({name:"alquiler_id"})
    @IsDefined({message: ()=>{ throw {status:422, message:"El parametro alquiler_id es obligatorio"}}})
    ID_Alquiler:number;

    @Expose({name:"cliente_id"})
    @IsDefined({message:()=>{ throw {status:422, message:"El parametro cliente_id es obligatorio"}}})
    ID_Cliente_id:number;

    @Expose({name:"automovil_id"})
    @IsDefined({message:()=>{ throw {status:422, message:"El parametro automovil_id es obligatorio"}}})
    ID_Automovil_id:number;

    @Expose({name:"fecha_inicio"})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_inicio es obligatorio` } } })
    @IsString ({ message: 'El parametro fecha_inicio debe ser un string'})
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error en los parametros de entrada'})
    Fecha_Inicio:string;

    @Expose({name:"fecha_fin"})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_fin es obligatorio` } } })
    @IsString ({ message: 'El parametro fecha_fin debe ser un string'})
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error en los parametros de entrada'})
    Fecha_Fin:string;

    @Expose({name:"costo"})
    @IsDefined({message:()=>{throw {status:422, message:"El parametro costo es obligatorio"}}})
    Costo_Total:number;

    @Expose({name:"estado"})
    @IsDefined({message:()=>{throw {status:422, message:"El parametro estado es obligatorio"}}})
    Estado:string;

    constructor(data: Partial<dtoAlquiler>){
        Object.assign(this, data);
        this.ID_Alquiler = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Inicio = "0000-00-00";
        this.Fecha_Fin = "0000-00-00";
        this.Costo_Total = 0;
        this.Estado = "";
    }
}

//"ID_Alquiler", "ID_Cliente_id", "ID_Automovil_id", "Fecha_Inicio", "Fecha_Fin", "Costo_Total", "Estado"