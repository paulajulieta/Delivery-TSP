import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidosBD:Pedido[]=[];
  pedidos:Pedido[]=[];
  pedidoId:number=0;
  
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((res)=>{
      this.pedidos=res;
      this.pedidosBD=this.pedidos;
    })
  }

  buscarPedidos(event){
    this.pedidos=this.pedidosBD.filter((pedido)=>{
      return pedido.estado.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

}
