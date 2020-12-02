import { Usuario } from './Usuario';
import { PedidoDetalle } from './PedidoDetalle';
import { Domicilio } from './Domicilio';

export interface Pedido{
    id?:number;
    fecha?:string;
    nro?:number;
    horaEstimadaFin?:string;
    tipoEnvio?:string;
    montoDescuento?:number;
    total?:number;
    formaPago?:string;
    estado?:string;
    cliente?:Usuario;
    detalles?:Array<PedidoDetalle>;
    domicilioCliente?:Domicilio;
}

export interface PedidoRecaudaciones{
    Nro?:number;
    Fecha?:string;
    Total?:number;
    Cantidad_Pedidos?:number;
}