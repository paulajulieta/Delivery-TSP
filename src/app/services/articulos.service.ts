import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloInsumo } from '../models/ArticuloInsumo';
import { CategoriaGeneral } from '../models/CategoriaGeneral';
import { DetalleManufacturado } from '../models/DetalleManufacturado';
import { Plato } from '../models/Plato';
import { UnidadMedida } from '../models/UnidadDeMedida';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  urlServidorInsumo='http://localhost:9001/api/v1/insumo/';
  urlServidorCategoria='http://localhost:9001/api/v1/categoriainsumo/';
  urlServidorCategoriaPlato='http://localhost:9001/api/v1/categoriageneral/';
  urlServidorUniMed='http://localhost:9001/api/v1/unidadmedida/';
  urlServidorManufacturado='http://localhost:9001/api/v1/manufacturado/';
  urlServidorDetalleManufacturado='http://localhost:9001/api/v1/manufacturadodetalle/';

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

  getAllCategoriasPlato():Observable<CategoriaGeneral[]>{
    return this.http.get<CategoriaGeneral[]>(this.urlServidorCategoriaPlato);
  }

  //unidad de medida
  getAllUnidadDeMed():Observable<UnidadMedida[]>{
    return this.http.get<UnidadMedida[]>(this.urlServidorUniMed);
  }

  //manufacturado
  getAllManufacturado():Observable<Plato[]>{
    return this.http.get<Plato[]>(this.urlServidorManufacturado);
  }

  getOneManufacturado(id:number):Observable<Plato>{
    return this.http.get<Plato>(this.urlServidorManufacturado+id);
  }

  postManufacturado(plato:Plato):Observable<Plato>{
    return this.http.post<Plato>(this.urlServidorManufacturado, plato);
  }

  putManufacturado(plato:Plato, id:number):Observable<Plato>{
    return this.http.put<Plato>(this.urlServidorManufacturado+id, plato);
  }

  deleteManufacturado(id:number):Observable<string>{
    return this.http.delete<string>(this.urlServidorManufacturado+id);
  }

  //detalle
  postDetalleManufacturado(detalle:DetalleManufacturado):Observable<DetalleManufacturado>{
    return this.http.post<DetalleManufacturado>(this.urlServidorDetalleManufacturado, detalle);
  }

  putDetalleManufacturado(detalle:DetalleManufacturado, id:number):Observable<DetalleManufacturado>{
    return this.http.put<DetalleManufacturado>(this.urlServidorDetalleManufacturado+id, detalle);
  }

  deleteDetalleManufacturado(id:number):Observable<string>{
    return this.http.delete<string>(this.urlServidorDetalleManufacturado+id);
  }
}
