import { Provincia } from './Provincia';

export interface Localidad{
    id?:number;
    nombre?:string;
    provincia?:Provincia;
}