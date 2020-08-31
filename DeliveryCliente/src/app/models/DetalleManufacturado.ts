import { ArticuloInsumo } from './ArticuloInsumo';
import { Plato } from './Plato';

export interface DetalleManufacturado{
    id?:number;
    cantidad?:number;
    insumo?:ArticuloInsumo;
    manufacturado?:Plato;
}