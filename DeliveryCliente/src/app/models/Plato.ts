import { Imagen } from './Imagen';
import { CategoriaGeneral } from './CategoriaGeneral';
import { DetalleManufacturado } from './DetalleManufacturado';

export interface Plato{
    id?:number;
    nombre?:string;
    tiempoPreparacion?:number;
    precio?:number;
    img?:Imagen;
    categoriaGral?:CategoriaGeneral;
    detalles?:DetalleManufacturado[];
    sinStock?:boolean;
}