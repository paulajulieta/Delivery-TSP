import { UnidadMedida } from './UnidadDeMedida';
import { Imagen } from './Imagen';
import { CategoriaGeneral } from './CategoriaGeneral';

export interface ArticuloInsumo{
    id?:number;
    nombre?:string;
    descripcion?:string;
    esInsumo?:boolean;
    precioCompra?:number,
    precioVta?:number;
    stockActual?:number,
    stockMin?:number,
    stockMax?:number,
    unidadDeMed?:UnidadMedida;
    img?:Imagen;
    categoria?:CategoriaGeneral;
}