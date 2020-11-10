import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

export interface Mes{
  id:string;
  nombre:string;
}

@Component({
  selector: 'app-recaudaciones',
  templateUrl: './recaudaciones.component.html',
  styleUrls: ['./recaudaciones.component.scss']
})
export class RecaudacionesComponent implements OnInit {

  meses:Mes[]=[
    {
      id:'01',
      nombre:'Enero'
    },
    {
      id:'02',
      nombre:'Febrero'
    },
    {
      id:'03',
      nombre:'Marzo'
    },
    {
      id:'04',
      nombre:'Abril'
    },
    {
      id:'05',
      nombre:'Mayo'
    },
    {
      id:'06',
      nombre:'Junio'
    },
    {
      id:'07',
      nombre:'Julio'
    },
    {
      id:'08',
      nombre:'Agosto'
    },
    {
      id:'09',
      nombre:'Septiembre'
    },
    {
      id:'10',
      nombre:'Octubre'
    },
    {
      id:'11',
      nombre:'Noviembre'
    },
    {
      id:'12',
      nombre:'Diciembre'
    }
  ]
  mesSeleccionado:string;
  fechaFiltro:Date;
  pedidos:Pedido[]=[];
  pedidosFiltrados:Pedido[]=[];
  data:any[]=[];
  datosEstadisticos:any;
  labels:any[]=[];
  datosNumericos: any []=[];
  colorArray : any []=[];
  cargo:boolean=false;
  pedidoId:number;
  totalPedidos:number=0;
  totalRecaudado:number=0;
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
  }

  filtrarMes(event){
    this.totalPedidos=0;
    this.pedidos=[];
    this.pedidosFiltrados=[];
    this.labels=[];
    this.data=[];
    this.datosNumericos=[];
    this.datosEstadisticos=[];
    this.colorArray=[];
    this.totalRecaudado=0;
    this.cargo=false;
    this.labels.push('Pedidos');
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi.filter((pedido)=>{
        return pedido.estado.toLowerCase().includes('Facturado'.toLowerCase());
      })
      console.log(this.pedidos)
    })
    setTimeout(() => {
      for(const pedido of this.pedidos){
        let arrayString=pedido.fecha.split('/');
        if(event.target.value===arrayString[1]){
          this.pedidosFiltrados.push(pedido);
          this.totalPedidos+=1;
          this.totalRecaudado+=pedido.total;
        }
      }
      this.data.push(this.totalPedidos);
      this.introducirDatosEstadisticos();
    }, 2000);
  }

  filtrarDia(fecha:Date){
    this.totalPedidos=0;
    this.pedidos=[];
    this.pedidosFiltrados=[];
    this.labels=[];
    this.data=[];
    this.datosNumericos=[];
    this.datosEstadisticos=[];
    this.colorArray=[];
    this.totalRecaudado=0;
    this.cargo=false;
    var fecha2:string=fecha.toString();
    let arrayString=fecha2.split('-');
    fecha2=arrayString[2]+'/'+arrayString[1]+'/'+arrayString[0]
    console.log(fecha2)
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
    })
    setTimeout(() => {
      for(const pedido of this.pedidos){
        let arrayString=pedido.fecha.split('/');
        let arrayString2=arrayString[2].split(' ');
        let fechaFixeada=(arrayString[0]+'/'+arrayString[1]+'/'+arrayString2[0]);
        if(fecha2.includes(fechaFixeada)){
          this.pedidosFiltrados.push(pedido);
          this.totalPedidos+=1;
          this.totalRecaudado+=pedido.total;
        }
      }
      this.data.push(this.totalPedidos);
      this.colorArray.push(this.getRandomColor());
      this.introducirDatosEstadisticos();
    }, 2000);
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  introducirDatosEstadisticos(){
    
    this.cargo=true;
    this.datosEstadisticos={
      labels :this.labels,
      datasets:[
        {
          label:'Pedidos',
          backgroundColor:this.colorArray,
          borderColor:this.colorArray,
          data:this.data
        }
      ]
    };
  }

}
