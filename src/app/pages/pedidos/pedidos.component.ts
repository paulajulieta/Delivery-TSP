import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos:Pedido[]=[];
  pedidoId:number=0;
  
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((res)=>{
      this.pedidos=res;
    })
  }

}
