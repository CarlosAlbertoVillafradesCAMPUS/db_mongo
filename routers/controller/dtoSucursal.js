var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class dtoSucursal {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Sucursal = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono = "";
    }
}
__decorate([
    Expose({ name: "sucursal_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro sucursal_id es obligatorios" }; } }),
    __metadata("design:type", Number)
], dtoSucursal.prototype, "ID_Sucursal", void 0);
__decorate([
    Expose({ name: "sucursal_nombre" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro sucursal_nombre es obligatorios" }; } }),
    __metadata("design:type", String)
], dtoSucursal.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: "sucursal_direccion" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro sucursal_direccion es obligatorios" }; } }),
    __metadata("design:type", String)
], dtoSucursal.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: "sucursal_telefono" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro sucursal_telefono es obligatorios" }; } }),
    __metadata("design:type", String)
], dtoSucursal.prototype, "Telefono", void 0);
//"ID_Sucursal", "Nombre", "Direccion", "Telefono"
