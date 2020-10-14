import { ArticuloInsumo } from './ArticuloInsumo';
import { Plato } from './Plato';
import { Carrito } from './Carrito';

export interface CarritoDetalle{
    id?:number;
    cantidad?:number;
    subtotal?:number;
    insumo?:ArticuloInsumo;
    manufacturado?:Plato;
    carrito?:Carrito;
}