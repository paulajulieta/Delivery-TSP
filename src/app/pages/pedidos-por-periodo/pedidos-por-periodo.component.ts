import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

export interface Ped{
  tipoEnvío:string;
  total:number;
}

@Component({
  selector: 'app-pedidos-por-periodo',
  templateUrl: './pedidos-por-periodo.component.html',
  styleUrls: ['./pedidos-por-periodo.component.scss']
})
export class PedidosPorPeriodoComponent implements OnInit {

  
  fechaFiltroInicio:Date;
  fechaFiltroFin:Date;
  pedidos:Pedido[]=[];
  pedidosFiltrados:Pedido[]=[];
  data:Ped[]=[];
  datosEstadisticos:any;
  labels:any[]=[];
  datosNumericos: any []=[];
  colorArray : any []=[];
  cargo:boolean=false;
  pedidoId:number;
  totalPedidos:number=0;
  pedidosDelivery:any[]=[];
  pedidosEnLocal:any[]=[];
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    
  }

  filtrarDia(fechaInicio:Date, fechaFin:Date){
    console.log(this.pedidos)
    this.totalPedidos=0;
    this.pedidos=[];
    this.pedidosFiltrados=[];
    this.labels=[];
    this.data=[];
    this.datosNumericos=[];
    this.datosEstadisticos=[];
    this.colorArray=[];
    this.cargo=false;
    this.pedidosDelivery=[];
    this.pedidosEnLocal=[];
    var fechaI:string=fechaInicio.toString();
    let arrayStringI=fechaI.split('-');
    fechaI=arrayStringI[1]+'/'+arrayStringI[2]+'/'+arrayStringI[0]+' 00:01:00'
    var fechaF:string=fechaFin.toString();
    let arrayStringF=fechaF.split('-');
    fechaF=arrayStringF[1]+'/'+arrayStringF[2]+'/'+arrayStringF[0]+' 23:59:00'
    
    var fechaIni=new Date(fechaI);
    var fechaFi=new Date(fechaF);
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
    })
    setTimeout(() => {
      for(const pedido of this.pedidos){
        let arrayString=pedido.fecha.split('/');
        let fechaFixeada=(arrayString[1]+'/'+arrayString[0]+'/'+arrayString[2]);
        const fechaPedido=new Date(fechaFixeada);
        console.log(fechaFixeada)
        if(fechaPedido>=fechaIni && fechaPedido<=fechaFi){
          this.pedidosFiltrados.push(pedido);
          this.totalPedidos+=1;
        }
      }
      for(let pedido of this.pedidosFiltrados){
        if(pedido.tipoEnvio==='Delivery'){
          this.pedidosDelivery.push(pedido);
        }else if(pedido.tipoEnvio==='Retiro en local'){
          this.pedidosEnLocal.push(pedido);
        }
      }
      var p:Ped={
        tipoEnvío:'Delivery',
        total:this.pedidosDelivery.length
      }
      var p2:Ped={
        tipoEnvío:'Retiro en local',
        total:this.pedidosEnLocal.length
      }
      
      this.data.push(p);
      this.data.push(p2);
      console.log(this.pedidosFiltrados)
      console.log(this.pedidosDelivery)
      console.log(this.pedidosEnLocal)
      console.log(this.data)
      this.introducirDatosEstadisticos();
    }, 2000);
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  introducirDatosEstadisticos(){
    for(let dato of this.data){
      this.labels.push(dato.tipoEnvío);
      this.datosNumericos.push(dato.total);
      this.colorArray.push(this.getRandomColor());
    }
    this.cargo=true;
    this.datosEstadisticos={
      labels :this.labels,
      datasets:[
        {
          label:'Pedidos',
          backgroundColor:this.colorArray,
          borderColor:this.colorArray,
          data:this.datosNumericos
        }
      ]
    };
  }

}
