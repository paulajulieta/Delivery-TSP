import { Localidad } from './Localidad';
import { Usuario } from './Usuario';

export interface Domicilio{
    id?:number;
    calle?:string;
    nro?:number;
    piso?:number;
    dpto?:number;
    cp?:number;
    localidad?:Localidad;
    alias?:string;
    cliente?:Usuario;
}