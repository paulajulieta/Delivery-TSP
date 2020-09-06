import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domicilio } from '../models/Domicilio';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {
  urlServidor='http://localhost:9001/api/v1/delivery/domicilio/';
  constructor(private http:HttpClient) { }

  //métodos para inyectar/consultar bd mysql

  getAll():Observable<Domicilio[]>{
    return this.http.get<Domicilio[]>(this.urlServidor);
  }

  getOne(id:number):Observable<Domicilio>{
    return this.http.get<Domicilio>(this.urlServidor+ id);
  }

  post(dom:Domicilio):Observable<Domicilio>{
    return this.http.post<Domicilio>(this.urlServidor, dom);
  }

  put(dom:Domicilio, id:number):Observable<Domicilio>{
    return this.http.put<Domicilio>(this.urlServidor+id, dom);
  }

  delete(id:number):Observable<Domicilio>{
    return this.http.delete<Domicilio>(this.urlServidor+id);
  }
}
