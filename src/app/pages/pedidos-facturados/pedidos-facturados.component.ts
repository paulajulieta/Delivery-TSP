import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidos-facturados',
  templateUrl: './pedidos-facturados.component.html',
  styleUrls: ['./pedidos-facturados.component.scss']
})
export class PedidosFacturadosComponent implements OnInit {

  pedidos:Pedido[]=[];
  pedidosCajero:Pedido[]=[];
  pedidoId:number;
  tipoEnvio:string;
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
      this.pedidosCajero=this.pedidos.filter((ped)=>{
        return ped.estado.toLowerCase().includes('Facturado'.toLowerCase());
      })
    })
  }

  

}
