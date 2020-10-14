import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/Carrito';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  urlServidor='http://localhost:9001/api/v1/carrito/';
  constructor(private http:HttpClient) { }

  //métodos para inyectar/consultar en la bd mysql

  getOne(id:number):Observable<Carrito>{
    return this.http.get<Carrito>(this.urlServidor+id);
  }

  getOneByCliente(idcliente:number):Observable<Carrito>{
    return this.http.get<Carrito>(this.urlServidor+"byCliente/"+idcliente);
  }

  post(car:Carrito):Observable<Carrito>{
    return this.http.post<Carrito>(this.urlServidor, car);
  }

  put(car:Carrito, id:number):Observable<Carrito>{
    return this.http.put<Carrito>(this.urlServidor+id, car);
  }

  delete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(this.urlServidor+id);
  }

  deleteDetalle(id:number):Observable<boolean>{
    return this.http.delete<boolean>("http://localhost:9001/api/v1/detalleCarrito/"+id);
  }
}
