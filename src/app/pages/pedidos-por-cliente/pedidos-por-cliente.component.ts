import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { Usuario } from 'src/app/models/Usuario';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

export interface Ped{
  tipoEnvío:string;
  total:number;
}

@Component({
  selector: 'app-pedidos-por-cliente',
  templateUrl: './pedidos-por-cliente.component.html',
  styleUrls: ['./pedidos-por-cliente.component.scss']
})
export class PedidosPorClienteComponent implements OnInit {
  data:Ped[]=[];
  pedidos:Pedido[]=[];
  usuarios:Usuario[]=[];
  datosEstadisticos:any;
  labels:any[]=[];
  userSeleccionado:string;

  pedidosFiltrados:Pedido[]=[];
  pedidosDelivery:any[]=[];
  pedidosEnLocal:any[]=[];
  datosNumericos: any []=[];
  colorArray : any []=[];
  cargo:boolean=false;
  fechaFiltro:Date;
  pedidoId:number;
  totalPedidos:number=0;
  constructor(private usuarioService:UsuarioService, private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedido().subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
    })
    this.usuarioService.getAllClientes().subscribe((usuariosApi)=>{
      this.usuarios=usuariosApi;
      console.log(this.usuarios)
    })
  }

  filtrar(user:string, fecha:Date){
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

    this.pedidoService.getAllByClienteHistorial(parseInt(user)).subscribe((pedidosApi)=>{
      this.pedidos=pedidosApi;
    })
    this.fechaFiltro=new Date(fecha);
    
    setTimeout(() => {
      for(const pedido of this.pedidos){
        let arrayString=pedido.fecha.split('/');
        let fechaFixeada=(arrayString[1]+'/'+arrayString[0]+'/'+arrayString[2]);
        const fechaPedido=new Date(fechaFixeada);
        if(fechaPedido>this.fechaFiltro){
          this.pedidosFiltrados.push(pedido);
          this.totalPedidos+=1;
        }
        console.log(arrayString)
        console.log(fechaFixeada)
        console.log(fechaPedido)
      }
      console.log(this.fechaFiltro)
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
      this.introducirDatosEstadisticos();
    }, 2000);
    /* if(tipo==="usuario"){
      if(this.fechaFiltro===undefined){
        this.pedidoService.getAllByClienteHistorial(event).subscribe((pedApi)=>{
          this.pedidosFiltrados=pedApi;
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
          this.totalPedidos=this.pedidosFiltrados.length;
          console.log(this.pedidosEnLocal)
          this.introducirDatosEstadisticos();
        })
      }else{
        this.fechaFiltro=new Date(event);
        this.labels.push('Pedidos');
        
      }
    }else if(tipo==="fecha"){
      if(this.userSeleccionado===undefined || this.userSeleccionado==='undefined'){

      }else{

      }
    } */
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
          hoverBackgroundColor:this.colorArray,
          data:this.datosNumericos
        }
      ]
    };
    
    /* this.colorArray.push(this.getRandomColor);
    this.colorArray2.push(this.getRandomColor);
    this.cargo=true;
    this.datosEstadisticos={
      labels : ['Pedidos'],
      datasets:[
        {
          label:'Delivery',
          backgroundColor:this.colorArray,
          borderColor:this.colorArray,
          data:[this.pedidosDelivery.length]
        },
        {
          label:'Retiro en local',
          backgroundColor:this.colorArray2,
          borderColor:this.colorArray2,
          data:[this.pedidosEnLocal.length]
        }
      ]
    }; */
  }

}
