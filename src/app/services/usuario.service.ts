import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlServidor='http://localhost:9001/api/v1/empleado/';
  constructor(private http:HttpClient) { }

  //métodos para inyectar/consultar en bd mysql

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlServidor);
  }

  getOne(id: number):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlServidor+id);
  }

  getEmail(email:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlServidor+'busquedaPorEmail/'+email);
  }

  post(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlServidor, usuario);
  }

  put(usuario:Usuario, id:number):Observable<Usuario>{
    return this.http.put<Usuario>(this.urlServidor+id,usuario);
  }

}