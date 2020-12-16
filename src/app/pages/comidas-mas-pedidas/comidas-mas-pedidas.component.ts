import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { Plato } from 'src/app/models/Plato';
import { ArticulosService } from 'src/app/services/articulos.service';
import { PedidoService } from 'src/app/services/pedido.service';

export interface ComidaMasPedida{
  id?:number;
  plato?:Plato;
  cantidad?:number;
}

@Component({
  selector: 'app-comidas-mas-pedidas',
  templateUrl: './comidas-mas-pedidas.component.html',
  styleUrls: ['./comidas-mas-pedidas.component.scss']
})
export class ComidasMasPedidasComponent implements OnInit {
  fechaFiltroInicio:Date;
  fechaFiltroFin:Date;
  datosEstadisticos:any;
  datos:ComidaMasPedida[]=[];
  pedidos:Pedido[]=[];
  pedidosFiltrados:Pedido[]=[];
  platos:Plato[]=[];
  labels: string []=[];
  datosNumericos: any []=[];
  colorArray : any []=[];
  cargo:boolean=false;
  constructor(private pedidoService:PedidoService, private platoService:ArticulosService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
      console.log(this.pedidos)
    })
    this.platoService.getAllManufacturado().subscribe((platosApi)=>{
      this.platos=platosApi;
      console.log(this.platos)
    })
    /* setTimeout(() => {
      this.mostrarDatos();
    }, 2000); */
    
  }

  mostrarDatos(){
    for(let pedido of this.pedidosFiltrados){
      for(let detalle of pedido.detalles){
        for(let plato of this.platos){
          if(detalle.manufacturado!=null){
            if(detalle.manufacturado.id===plato.id){
              if(this.datos.length===0){
                var dato:ComidaMasPedida={};
                dato.id=plato.id;
                dato.plato=plato;
                dato.cantidad=detalle.cantidad;
                this.datos.push(dato);
              }else{
                for(var i:number=0; i<this.datos.length; i++){
                  if(this.datos[i].id===plato.id){
                    this.datos[i].cantidad+=detalle.cantidad;
                    break;
                  }else if(i===(this.datos.length-1)){
                    var dato:ComidaMasPedida={};
                    dato.id=plato.id;
                    dato.plato=plato;
                    dato.cantidad=detalle.cantidad;
                    this.datos.push(dato);
                    break;
                  }
                }
                /* for(let dato2 of this.datos){
                  if(dato2.id===plato.id){
                    dato2.cantidad+=detalle.cantidad;
                    i++;
                    break;
                  }else if(i==cont){
                    var dato:ComidaMasPedida={};
                    dato.id=plato.id;
                    dato.plato=plato;
                    dato.cantidad=detalle.cantidad;
                    this.datos.push(dato);
                    break;
                  }
                } */
              }
            }
          }
        }
      }
    }
    this.introducirDatosEstadisticos();
    console.log(this.datos)
  }

  filtrarDia(fechaInicio:Date, fechaFin:Date){
    this.labels=[];
    this.datos=[];
    this.datosNumericos=[];
    this.datosEstadisticos=[];
    this.colorArray=[];
    this.cargo=false;
    var fechaI:string=fechaInicio.toString();
    let arrayStringI=fechaI.split('-');
    fechaI=arrayStringI[1]+'/'+arrayStringI[2]+'/'+arrayStringI[0]+' 00:01:00'
    var fechaF:string=fechaFin.toString();
    let arrayStringF=fechaF.split('-');
    fechaF=arrayStringF[1]+'/'+arrayStringF[2]+'/'+arrayStringF[0]+' 23:59:00'
    
    var fechaIni=new Date(fechaI);
    var fechaFi=new Date(fechaF);

    for(const pedido of this.pedidos){
      let arrayString=pedido.fecha.split('/');
      let fechaFixeada=(arrayString[1]+'/'+arrayString[0]+'/'+arrayString[2]);
      const fechaPedido=new Date(fechaFixeada);
      console.log(fechaFixeada)
      if(fechaPedido>=fechaIni && fechaPedido<=fechaFi){
        this.pedidosFiltrados.push(pedido);
      }
    }
    setTimeout(() => {
      this.mostrarDatos();
    }, 2000);
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  introducirDatosEstadisticos(){
    for(let dato of this.datos){
      this.labels.push(dato.plato.nombre);
      this.datosNumericos.push(dato.cantidad);
      this.colorArray.push(this.getRandomColor());
    }
    this.cargo=true;
    this.datosEstadisticos={
      labels : this.labels,
      datasets:[
        {
          label:'Comidas',
          backgroundColor:this.colorArray,
          borderColor:this.colorArray,
          data:this.datosNumericos
        }]
    };
  }

}
