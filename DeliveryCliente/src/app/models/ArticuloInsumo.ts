import { UnidadMedida } from './UnidadDeMedida';
import { Imagen } from './Imagen';

export interface ArticuloInsumo{
    id?:number;
    nombre?:string;
    descripcion?:string;
    esInsumo?:boolean;
    precioVta?:number;
    unidadDeMed?:UnidadMedida;
    img?:Imagen;
}