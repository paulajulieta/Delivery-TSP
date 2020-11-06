import { ArticuloInsumo } from './ArticuloInsumo';
import { Plato } from './Plato';
import { Pedido } from './Pedido';
import { Factura } from './Factura';

export interface PedidoDetalle{
    id?:number;
    cantidad?:number;
    subtotal?:number;
    insumo?:ArticuloInsumo;
    manufacturado?:Plato;
    pedido?:Pedido;
    factura?:Factura;
}