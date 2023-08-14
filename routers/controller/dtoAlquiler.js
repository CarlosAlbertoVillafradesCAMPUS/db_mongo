var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDefined, IsString, Matches } from "class-validator";
import { Expose } from "class-transformer";
export class dtoAlquiler {
    constructor(data) {
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
__decorate([
    Expose({ name: "alquiler_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro alquiler_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Alquiler", void 0);
__decorate([
    Expose({ name: "cliente_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: "automovil_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro automovil_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: "fecha_inicio" }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_inicio es obligatorio` }; } }),
    IsString({ message: 'El parametro fecha_inicio debe ser un string' }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: "fecha_fin" }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_fin es obligatorio` }; } }),
    IsString({ message: 'El parametro fecha_fin debe ser un string' }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: "costo" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro costo es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: "estado" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro estado es obligatorio" }; } }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Estado", void 0);
//"ID_Alquiler", "ID_Cliente_id", "ID_Automovil_id", "Fecha_Inicio", "Fecha_Fin", "Costo_Total", "Estado"
