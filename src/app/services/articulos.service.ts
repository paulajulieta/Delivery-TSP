import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloInsumo } from '../models/ArticuloInsumo';
import { CategoriaGeneral } from '../models/CategoriaGeneral';
import { UnidadMedida } from '../models/UnidadDeMedida';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  urlServidorInsumo='http://localhost:9001/api/v1/insumo/';
  urlServidorCategoria='http://localhost:9001/api/v1/categoriainsumo/';
  urlServidorUniMed='http://localhost:9001/api/v1/unidadmedida/';

  constructor(private http:HttpClient) { }

  //artículo insumo
  getAllInsumo():Observable<ArticuloInsumo[]>{
    return this.http.get<ArticuloInsumo[]>(this.urlServidorInsumo);
  }

  getAllNoInsumos():Observable<ArticuloInsumo[]>{
    return this.http.get<ArticuloInsumo[]>(this.urlServidorInsumo+'esInsumo/'+false);
  }

  getOneInsumo(id:number):Observable<ArticuloInsumo>{
    return this.http.get<ArticuloInsumo>(this.urlServidorInsumo+id);
  }

  postInsumo(insumo:ArticuloInsumo):Observable<ArticuloInsumo>{
    return this.http.post<ArticuloInsumo>(this.urlServidorInsumo, insumo);
  }

  putInsumo(insumo:ArticuloInsumo, id:number):Observable<ArticuloInsumo>{
    return this.http.put<ArticuloInsumo>(this.urlServidorInsumo+id+'/',insumo);
  }

  deleteInsumo(id:number):Observable<string>{
    return this.http.delete<string>(this.urlServidorInsumo+id);
  }

  //categorías
  getAllCategorias():Observable<CategoriaGeneral[]>{
    return this.http.get<CategoriaGeneral[]>(this.urlServidorCategoria);
  }

  //unidad de medida
  getAllUnidadDeMed():Observable<UnidadMedida[]>{
    return this.http.get<UnidadMedida[]>(this.urlServidorUniMed);
  }
}
