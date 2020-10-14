import { CarritoDetalle } from './CarritoDetalle';
import { Usuario } from './Usuario';
import { Domicilio } from './Domicilio';

export interface Carrito{
    id?:number;
    fecha?:Date;
    tipoEnvio?:string;
    montoDescuento?:number;
    total?:number;
    detallesCarrito?:CarritoDetalle[];
    cliente?:Usuario;
    domicilioCliente?:Domicilio;
}