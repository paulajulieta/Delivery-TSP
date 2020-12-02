import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoDetalle } from 'src/app/models/PedidoDetalle';
import { PedidoService } from 'src/app/services/pedido.service';
declare var $:any;

@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {

  @Input() idPedido:number;
  @Input() rol:string;
  pedido:Pedido={}
  detalle:PedidoDetalle={}
  subtotal:number;
  
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
  }

  traerDetalle(){
    console.log(this.idPedido);
    this.pedidoService.getOnePedido(this.idPedido).subscribe((pedidoApi)=>{
      this.pedido=pedidoApi as Pedido;
      this.subtotal=this.pedido.total+this.pedido.montoDescuento;
      
    })
  }

  cerrar(){
    this.pedido={};
  }

  aceptarPedido(pedido:Pedido){
    pedido.estado='En cocina';
    this.pedidoService.putPedido(pedido, pedido.id).subscribe((res)=>{
      console.log(res);
    })
    $("#modalDetallePedido").modal('hide');
  }
  rechazarPedido(pedido:Pedido){
    pedido.estado='Rechazado';
    this.pedidoService.putPedido(pedido, pedido.id).subscribe((res)=>{
      $("#modalDetallePedido").modal('hide');
    })
  }
}
