import { CarritoDetalle } from './CarritoDetalle';
import { Usuario } from './Usuario';
import { Domicilio } from './Domicilio';

export interface Carrito{
    id?:number;
    fecha?:Date;
    tipoEnvio?:string;
    montoDescuento?:number;
    total?:number;
    formaPago?:string;
    detallesCarrito?:CarritoDetalle[];
    cliente?:Usuario;
    domicilioCliente?:Domicilio;
}