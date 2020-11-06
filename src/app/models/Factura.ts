import { PedidoDetalle } from './PedidoDetalle';
import { Usuario } from './Usuario';
import { Pedido } from './Pedido';

export interface Factura{
    id?:number;
    fecha?:Date;
    montoDescuento?:number;
    total?:number;
    nro?:number;
    tipoPago?:string;
    nroTarjeta?:number;
    detalles?:PedidoDetalle[];
    cliente?:Usuario;
    pedido?:Pedido;
}