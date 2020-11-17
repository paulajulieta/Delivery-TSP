import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pantalla-cocinero',
  templateUrl: './pantalla-cocinero.component.html',
  styleUrls: ['./pantalla-cocinero.component.scss']
})
export class PantallaCocineroComponent implements OnInit {

  
  pedidos:Pedido[]=[];
  pedidosCocinero:Pedido[]=[];
  pedidoId:number;
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
      this.pedidosCocinero=this.pedidos.filter((ped)=>{
        if(ped.estado==='Demorado'){
          return ped;
        }else if(ped.estado==='En cocina'){
          return ped;
        }
      })
    })

    
  }

  demorarPedido(pedido:Pedido){
    pedido.estado="Demorado"
    this.pedidoService.putEstadoPedido(pedido, pedido.id, "Demorado").subscribe((res)=>{
      this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
        this.pedidos=pedidosApi;
        this.pedidosCocinero=this.pedidos.filter((ped)=>{
          if(ped.estado==='Demorado'){
            return ped;
          }else if(ped.estado==='En cocina'){
            return ped;
          }
        })
      })
    })
  }

  terminarPedido(pedido:Pedido){
    pedido.estado="Terminado"
    this.pedidoService.putEstadoPedido(pedido, pedido.id, "Terminado").subscribe((res)=>{
      debugger
      for(var i:number=0; i<this.pedidosCocinero.length; i++){
        if(this.pedidosCocinero[i].id===pedido.id){
          this.pedidosCocinero.splice(i, 1);
          break;
        }
      }
    })
  }

}
