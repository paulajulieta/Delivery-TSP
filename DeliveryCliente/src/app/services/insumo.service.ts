import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticuloInsumo } from '../models/ArticuloInsumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  urlServidor='http://localhost:9001/api/v1/insumo/';

  constructor(private http:HttpClient) { }

  //métodos para consultar en la bd mysql

  getAll():Observable<ArticuloInsumo[]>{
    return this.http.get<ArticuloInsumo[]>(this.urlServidor);
  }

  getAllNoInsumos():Observable<ArticuloInsumo[]>{
    return this.http.get<ArticuloInsumo[]>(this.urlServidor+'esInsumo/'+false);
  }

  getOne(id:number):Observable<ArticuloInsumo>{
    return this.http.get<ArticuloInsumo>(this.urlServidor+id);
  }
}
