import { Imagen } from './Imagen';
import { Domicilio } from './Domicilio';

export interface Usuario{
    id?:number;
    nombre?:string;
    apellido?:string;
    dni?:number;
    email?:string;
    pass?:string;
    telefono?:string;
    fechaNac?:string;
    fechaAlta?:string;
    img?:Imagen;
    domicilios?:Array<Domicilio>;
}