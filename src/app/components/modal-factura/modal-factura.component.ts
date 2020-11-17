import { Component, Input, OnInit } from '@angular/core';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { Factura } from 'src/app/models/Factura';
import { PedidoDetalle } from 'src/app/models/PedidoDetalle';
import { Plato } from 'src/app/models/Plato';
import { ArticulosService } from 'src/app/services/articulos.service';
import { PedidoService } from 'src/app/services/pedido.service';
declare var $:any;

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.scss']
})
export class ModalFacturaComponent implements OnInit {

  @Input() pedidoId:number;
  factura:Factura={}
  @Input() tipoEnvio:string;
  constructor(private pedidoService:PedidoService, private articuloService:ArticulosService) { }
  insumos:ArticuloInsumo[]=[];
  manufacturados:Plato[]=[];
  insumo:string=null;
  plato:string=null;
  cantidad:number=null;
  insumoNuevo:ArticuloInsumo={};
  platoNuevo:Plato={};
  detalleNuevo:PedidoDetalle={};
  ngOnInit(): void {
  }

  traerDetalle(){
    console.log(this.pedidoId);
    this.pedidoService.getOneFacturaByPedido(this.pedidoId).subscribe((res)=>{
      this.factura=res as Factura;
      console.log(this.factura);
    })

    this.articuloService.getAllNoInsumos().subscribe((insumosApi)=>{
      this.insumos=insumosApi;
    })

    this.articuloService.getAllManufacturado().subscribe((platosApi)=>{
      this.manufacturados=platosApi;
    })
    
  }

  guardar(){ 
    if(this.insumo!=null && this.insumo!=undefined){
      for(let insumo of this.insumos){
        if(insumo.id.toString()===this.insumo){
          this.insumoNuevo=insumo;
          break;
        }
      }
      var contadorIgualID=0;
      for(var i:number=0; i< this.factura.detalles.length; i++){
        if(this.factura.detalles[i].insumo!=null){
          if(this.factura.detalles[i].insumo.id===this.insumoNuevo.id){
            contadorIgualID++;
            if(this.cantidad>0){
              this.factura.detalles[i].cantidad+=this.cantidad;
              this.factura.total+=this.factura.detalles[i].insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }else{
              this.cantidad=1;
              this.factura.detalles[i].cantidad+=this.cantidad;
              this.factura.total+=this.factura.detalles[i].insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }
            this.factura.detalles[i].subtotal=this.factura.detalles[i].insumo.precioVta*this.factura.detalles[i].cantidad;
          }else if(i===(this.factura.detalles.length-1)){
            this.detalleNuevo.insumo=this.insumoNuevo;
            if(this.cantidad>0){
              this.detalleNuevo.cantidad=this.cantidad;
              this.factura.total+=this.factura.detalles[i].insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }else{
              this.detalleNuevo.cantidad=1;
              this.factura.total+=this.factura.detalles[i].insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }
            this.detalleNuevo.subtotal=this.factura.detalles[i].insumo.precioVta*this.factura.detalles[i].cantidad;
            this.detalleNuevo.factura={};
            this.detalleNuevo.factura.id=this.factura.id;
            this.detalleNuevo.pedido={};
            this.detalleNuevo.pedido.id=this.factura.pedido.id;
            this.factura.detalles.push(this.detalleNuevo)
          }
        }else if((i===(this.factura.detalles.length-1)) && contadorIgualID==0){
          this.detalleNuevo.insumo=this.insumoNuevo;
            if(this.cantidad>0){
              this.detalleNuevo.cantidad=this.cantidad;
              this.factura.total+=this.detalleNuevo.insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }else{
              this.detalleNuevo.cantidad=1;
              this.factura.total+=this.detalleNuevo.insumo.precioVta*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }
            this.detalleNuevo.subtotal=this.detalleNuevo.insumo.precioVta*this.factura.detalles[i].cantidad;
            this.detalleNuevo.factura={};
            this.detalleNuevo.factura.id=this.factura.id;
            this.detalleNuevo.pedido={};
            this.detalleNuevo.pedido.id=this.factura.pedido.id;
            this.factura.detalles.push(this.detalleNuevo);
            break;
        }
      }
    }else if(this.plato!=null && this.plato!=undefined){
      for(let plato of this.manufacturados){
        if(plato.id.toString()===this.plato){
          this.platoNuevo=plato;
          break;
        }
      }
      var contadorIgualID=0;
      for(var i:number=0; i<this.factura.detalles.length; i++){
        if(this.factura.detalles[i].manufacturado!=null){
          if(this.factura.detalles[i].manufacturado.id===this.platoNuevo.id){
            if(this.cantidad>0){
              this.factura.detalles[i].cantidad+=this.cantidad;
              this.factura.total+=this.factura.detalles[i].manufacturado.precio*this.cantidad;
              this.factura.montoDescuento=this.factura.total*0.1;
              this.factura.total=this.factura.total-this.factura.montoDescuento;
            }else{
              this.cantidad=1;
              this.factura.detalles[i].cantidad+=this.cantidad;
              this.factura.total+=this.factura.detalles[i].manufacturado.precio*this.cantidad;
              this.factura.montoDescuento=this.factura.total*0.1;
              this.factura.total=this.factura.total-this.factura.montoDescuento;
            }
            this.factura.detalles[i].subtotal=this.factura.detalles[i].manufacturado.precio*this.factura.detalles[i].cantidad;
          }else if(i===(this.factura.detalles.length-1)){
            this.detalleNuevo.manufacturado=this.platoNuevo;
            if(this.cantidad>0){
              this.detalleNuevo.cantidad=this.cantidad;
              this.factura.total+=this.factura.detalles[i].manufacturado.precio*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }else{
              this.detalleNuevo.cantidad=1;
              this.factura.total+=this.factura.detalles[i].manufacturado.precio*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }
            this.detalleNuevo.subtotal=this.factura.detalles[i].manufacturado.precio*this.factura.detalles[i].cantidad;
            this.detalleNuevo.factura={};
            this.detalleNuevo.factura.id=this.factura.id;
            this.detalleNuevo.pedido={};
            this.detalleNuevo.pedido.id=this.factura.pedido.id;
            this.factura.detalles.push(this.detalleNuevo)
          }
        }else if((i===(this.factura.detalles.length-1)) && contadorIgualID===0){
          this.detalleNuevo.manufacturado=this.platoNuevo;
            if(this.cantidad>0){
              this.detalleNuevo.cantidad=this.cantidad;
              this.factura.total+=this.detalleNuevo.manufacturado.precio*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }else{
              this.detalleNuevo.cantidad=1;
              this.factura.total+=this.detalleNuevo.manufacturado.precio*this.cantidad;
              if(this.factura.pedido.tipoEnvio==='Retiro en local'){
                this.factura.montoDescuento=this.factura.total*0.1;
                this.factura.total=this.factura.total-this.factura.montoDescuento;
              }
            }
            this.detalleNuevo.subtotal=this.detalleNuevo.manufacturado.precio*this.factura.detalles[i].cantidad;
            this.detalleNuevo.factura={};
            this.detalleNuevo.factura.id=this.factura.id;
            this.detalleNuevo.pedido={};
            this.detalleNuevo.pedido.id=this.factura.pedido.id;
            this.factura.detalles.push(this.detalleNuevo);
            break;
        }
      }
    }
    console.log(this.factura)
    this.pedidoService.putFactura(this.factura, this.factura.id).subscribe((res)=>{
      console.log(res);
    })
    this.plato=null;
    this.insumo=null;
    this.cantidad=null;
  }

  cerrar(){
    this.insumo=null;
    this.plato=null;
    this.cantidad=null;
    $("#modalAgregar").modal('hide');
  }
}
