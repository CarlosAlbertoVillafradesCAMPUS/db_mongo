import {IsDefined, IsString, Matches} from "class-validator";
import {Expose, Transform} from "class-transformer";

export class dtoReserva{
    @Expose({name:"reserva_id"})
    @IsDefined({message: ()=>{ throw {status:422, message:"El parametro reserva_id es obligatorio"}}})
    ID_Reserva:number;

    @Expose({name:"cliente_id"})
    @IsDefined({message:()=>{ throw {status:422, message:"El parametro cliente_id es obligatorio"}}})
    ID_Cliente_id:number;

    @Expose({name:"automovil_id"})
    @IsDefined({message:()=>{ throw {status:422, message:"El parametro automovil_id es obligatorio"}}})
    ID_Automovil_id:number;

    @Expose({name:"fecha_reserva"})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_reserva es obligatorio` } } })
    @IsString ({ message: 'El parametro fecha_reserva debe ser un string'})
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error en los parametros de entrada'})
    Fecha_Reserva:string;

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


    @Expose({name:"estado"})
    @IsDefined({message:()=>{throw {status:422, message:"El parametro estado es obligatorio"}}})
    Estado:string;

    constructor(data: Partial<dtoReserva>){
        Object.assign(this, data);
        this.ID_Reserva = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Reserva = "0000-00-00";
        this.Fecha_Inicio = "0000-00-00";
        this.Fecha_Fin = "0000-00-00";
        this.Estado = "";
    }
}

//"ID_Reserva", "ID_Cliente_id", "ID_Automovil_id", "Fecha_Reserva", "Fecha_Inicio", "Fecha_Fin", "Estado"