import { Component, Input, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.scss']
})
export class ModalFacturaComponent implements OnInit {

  @Input() pedidoId:number;
  factura:Factura={}
  
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
  }

  traerDetalle(){
    console.log(this.pedidoId);
    this.pedidoService.getOneFacturaByPedido(this.pedidoId).subscribe((res)=>{
      this.factura=res as Factura;
      console.log(this.factura);
    })
  }

}
