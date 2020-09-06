import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localidad } from '../models/Localidad';
import { HttpClient } from '@angular/common/http';
import { Provincia } from '../models/Provincia';
import { Pais } from '../models/Pais';

@Injectable({
  providedIn: 'root'
})
export class LocProvPaisService {

  urlServidorLocalidad='http://localhost:9001/api/v1/delivery/localidad/';
  urlServidorProvincia='http://localhost:9001/api/v1/delivery/provincia/';
  urlServidorPais='http://localhost:9001/api/v1/delivery/pais/';
  constructor(private http:HttpClient) { }

  //localidad

  getAllLoc():Observable<Localidad[]>{
    return this.http.get<Localidad[]>(this.urlServidorLocalidad);
  }

  //provincia

  getAllProv():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.urlServidorProvincia);
  }

  //país

  getAllPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(this.urlServidorPais);
  }
}
