import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Factura } from '../models/Factura';
import { Pedido } from '../models/Pedido';
import { PedidoDetalle } from '../models/PedidoDetalle';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http:HttpClient) { }

  

  urlServidor1:string='http://localhost:9001/api/v1/pedido/';
  urlServidor2:string='http://localhost:9001/api/v1/detallePedido/';
  urlServidor3:string='http://localhost:9001/api/v1/factura/'

  


  //métodos bd PEDIDO

  getAllPedido():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.urlServidor1);
  }

  getOnePedido(id:number):Observable<Pedido>{
    return this.http.get<Pedido>(this.urlServidor1+id);
  }

  getAllByClientePendientes(idcliente:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.urlServidor1+"byClientePendientes/"+idcliente);
  }

  getAllByClienteHistorial(idcliente:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.urlServidor1+"byClienteHistorial/"+idcliente);
  }

  postPedido(pedido:Pedido):Observable<Pedido>{
    return this.http.post<Pedido>(this.urlServidor1, pedido);
  }

  putPedido(pedido:Pedido, id:number):Observable<Pedido>{
    return this.http.put<Pedido>(this.urlServidor1+id, pedido);
  }

  putEstadoPedido(pedido:Pedido, id:number, estado:string):Observable<Pedido>{
    return this.http.put<Pedido>(this.urlServidor1+id+"/"+estado, pedido);
  }

  deletePedido(id:number):Observable<Pedido>{
    return this.http.delete<Pedido>(this.urlServidor1+id);
  }

  //métodos bd PEDIDO DETALLE

  getAllPedidoDetalle():Observable<PedidoDetalle[]>{
    return this.http.get<PedidoDetalle[]>(this.urlServidor2);
  }

  getOnePedidoDetalle(id:number):Observable<PedidoDetalle>{
    return this.http.get<PedidoDetalle>(this.urlServidor2+id);
  }

  postPedidoDetalle(pedido:PedidoDetalle):Observable<PedidoDetalle>{
    return this.http.post<PedidoDetalle>(this.urlServidor2, pedido);
  }

  putPedidoDetalle(pedido:PedidoDetalle, id:number):Observable<PedidoDetalle>{
    return this.http.put<PedidoDetalle>(this.urlServidor2+id, pedido);
  }

  deletePedidoDetalle(id:number):Observable<PedidoDetalle>{
    return this.http.delete<PedidoDetalle>(this.urlServidor2+id);
  }

  //métodos bd FACTURA 
  getAllFactura():Observable<Factura[]>{
    return this.http.get<Factura[]>(this.urlServidor3);
  }

  getOneFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(this.urlServidor3+id);
  }

  getOneFacturaByPedido(idPedido:number):Observable<Factura>{
    return this.http.get<Factura>(this.urlServidor3+'byPedido/'+idPedido);
  }

  putFactura(factura:Factura, id:number):Observable<Factura>{
    return this.http.put<Factura>(this.urlServidor3+id, factura);
  }

  postEnviarFacturaByEmail(factura:Factura):Observable<string>{
    return this.http.post<string>("http://localhost:9001/api/v1/configuracion/sendMail", factura);
  }
}
