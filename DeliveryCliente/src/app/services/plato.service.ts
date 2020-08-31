import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plato } from '../models/Plato';
import { DetalleManufacturado } from '../models/DetalleManufacturado';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  urlServidorPlato='http://localhost:9001/api/v1/manufacturado/';

  urlServidorDetalle='http://localhost:9001/api/v1/manufacturadodetalle/';

  constructor(private http:HttpClient) { }

  //métodos para consultar en bd mysql
  //tabla manufacturado

  getAllPlato():Observable<Plato[]>{
    return this.http.get<Plato[]>(this.urlServidorPlato);
  }

  getOnePlato(id:number):Observable<Plato>{
    return this.http.get<Plato>(this.urlServidorPlato+id);
  }

  //tabla detalle manufacturado

  getAllDetalle():Observable<DetalleManufacturado[]>{
    return this.http.get<DetalleManufacturado[]>(this.urlServidorDetalle);
  }
  

}
