import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pantalla-cajero',
  templateUrl: './pantalla-cajero.component.html',
  styleUrls: ['./pantalla-cajero.component.scss']
})
export class PantallaCajeroComponent implements OnInit {

  
  pedidos:Pedido[]=[];
  pedidosCajero:Pedido[]=[];
  pedidoId:number;
  tipoEnvio:string='';
  delivery:string='Delivery';

  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
      this.pedidosCajero=this.pedidos.filter((ped)=>{
        if(ped.estado==='Pendiente'){
          return ped;
        }else if(ped.estado==='Delivery'){
          return ped;
        }else if(ped.estado==='Terminado'){
          return ped;
        }
      })
    })
    setInterval(()=>{
      this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
        this.pedidos=pedidosApi;
        this.pedidosCajero=this.pedidos.filter((ped)=>{
          if(ped.estado==='Pendiente'){
            return ped;
          }else if(ped.estado==='Delivery'){
            return ped;
          }else if(ped.estado==='Terminado'){
            return ped;
          }
        })
      })
    }, 5000)
  }

  enviarCocina(pedido:Pedido){
    pedido.estado='En cocina';
    this.pedidoService.putPedido(pedido, pedido.id).subscribe((res)=>{
      for(var i:number=0; i<this.pedidosCajero.length; i++){
        if(this.pedidosCajero[i].id===pedido.id){
          this.pedidosCajero.splice(i, 1);
          break;
        }
      }
    });
  }

  enviarDelivery(pedido:Pedido){
    pedido.estado='Delivery';
    this.pedidoService.putPedido(pedido, pedido.id).subscribe((res)=>{
      pedido=res;
    });
  }

  enviarFactura(pedido:Pedido){
    pedido.estado='Facturado';
    this.pedidoService.putPedido(pedido, pedido.id).subscribe((res)=>{
      for(var i:number=0; i<this.pedidosCajero.length; i++){
        if(this.pedidosCajero[i].id===pedido.id){
          this.pedidosCajero.splice(i, 1);
          break;
        }
      }
      this.pedidoService.getOneFacturaByPedido(pedido.id).subscribe((res)=>{
        if(res!=null){
          this.pedidoService.postEnviarFacturaByEmail(res).subscribe((res)=>{
            console.log(res);
          })
        }
      })
    });
  }

  abrirFactura(idPedido:number, tipoEnvio:string){
    this.pedidoId=idPedido;
    this.tipoEnvio=tipoEnvio;
  }

}
