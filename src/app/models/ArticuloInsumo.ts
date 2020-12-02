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

export interface InsumoStock{
    Id?:number;
    Nombre_Insumo?:string;
    Descripcion?:string;
    Es_Insumo?:string;
    Precio_Compra?:number,
    Precio_Venta?:number;
    Stock_Actual?:number,
    Stock_Min?:number,
    Stock_Max?:number,
    Unidad_de_Medida?:string;
    Categoria?:string;
}