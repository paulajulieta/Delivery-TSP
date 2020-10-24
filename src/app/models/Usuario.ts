/* import { Imagen } from './Imagen';
import { Domicilio } from './Domicilio'; */

import { Rol } from './Rol';

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
    rol?:Rol;
    /* img?:Imagen;
    domicilios?:Array<Domicilio>; */
}