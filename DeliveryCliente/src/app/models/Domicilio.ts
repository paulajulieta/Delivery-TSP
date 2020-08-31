import { Localidad } from './Localidad';

export interface Domicilio{
    id?:number;
    calle?:string;
    nro?:number;
    piso?:number;
    dpto?:number;
    CP?:number;
    latitud?:number;
    longitud?:number;
    localidad?:Localidad;
}