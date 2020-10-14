import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/models/Carrito';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'firebase';
import { Usuario } from 'src/app/models/Usuario';
import { CarritoDetalle } from 'src/app/models/CarritoDetalle';
import { Domicilio } from 'src/app/models/Domicilio';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoDetalle } from 'src/app/models/PedidoDetalle';
declare var $:any;

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.scss']
})
export class ModalCarritoComponent implements OnInit {

  carrito:Carrito;
  usuario:User;
  usuarioApi:Usuario;
  totalConDescuento:number;
  totalSinDescuento:number;
  descuento:boolean = false;
  pedidoEnvio:Pedido={};
  detallePedido:PedidoDetalle={};
  tiempoPedido:number=0;
  tiempoDelivery:number=0;
  constructor(private carritoService:CarritoService, private authService:AuthService, private usuarioService:UsuarioService, private pedidoService:PedidoService) { }

  ngOnInit(): void {
    
  }

  traerDatos(){
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          this.carritoService.getOneByCliente(this.usuarioApi.id).subscribe((carritoRes)=>{
            this.carrito=carritoRes;
            if(this.carrito.montoDescuento!=0){
              this.descuento=true;
              this.totalConDescuento=this.carrito.total;
              this.totalSinDescuento=this.carrito.total+this.carrito.montoDescuento;
            }else{
              this.descuento=false;
              this.totalSinDescuento=this.carrito.total;
            }
            for(let detalle of this.carrito.detallesCarrito){
              if(detalle.manufacturado!=null){
                if(Number(detalle.manufacturado.tiempoPreparacion)>this.tiempoPedido){
                  this.tiempoPedido+=Number(Number(detalle.manufacturado.tiempoPreparacion));
                }
              }
            }
          })
        })
      }
    })
  }

  eliminarProducto(item:CarritoDetalle){
    for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
      if(this.carrito.detallesCarrito[i].id == item.id){
        this.carrito.detallesCarrito.splice(i, 1);
        console.log(this.carrito.detallesCarrito);
        this.carrito.total-=item.subtotal;
        this.carritoService.deleteDetalle(item.id).subscribe((detalleRes)=>{
          console.log(detalleRes);
        })
      }
    }
  }

  aumentarProducto(item:CarritoDetalle){
    for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
      if(this.carrito.detallesCarrito[i].id == item.id){
        this.carrito.detallesCarrito[i].cantidad++;
        if(this.carrito.detallesCarrito[i].insumo!=null){
          this.carrito.detallesCarrito[i].subtotal = this.carrito.detallesCarrito[i].cantidad * this.carrito.detallesCarrito[i].insumo.precioVta;
          this.carrito.total += this.carrito.detallesCarrito[i].insumo.precioVta;
          if(this.descuento){
            this.totalSinDescuento=this.carrito.total+this.carrito.montoDescuento;
            this.aplicoDescuento();
          }
        }else{
          this.carrito.detallesCarrito[i].subtotal = this.carrito.detallesCarrito[i].cantidad * this.carrito.detallesCarrito[i].manufacturado.precio;
          this.carrito.total += this.carrito.detallesCarrito[i].manufacturado.precio;
          if(this.descuento){
            this.totalSinDescuento=this.carrito.total+this.carrito.montoDescuento;
            this.aplicoDescuento();
          }
        }
        console.log(this.carrito.detallesCarrito);
      }
    }
  }

  disminuirProducto(item:CarritoDetalle){
    for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
      if(this.carrito.detallesCarrito[i].id == item.id && this.carrito.detallesCarrito[i].cantidad>1){
        this.carrito.detallesCarrito[i].cantidad--;
        if(this.carrito.detallesCarrito[i].insumo!=null){
          this.carrito.detallesCarrito[i].subtotal = this.carrito.detallesCarrito[i].cantidad * this.carrito.detallesCarrito[i].insumo.precioVta;
          this.carrito.total -= this.carrito.detallesCarrito[i].insumo.precioVta;
          if(this.descuento){
            this.totalSinDescuento=this.carrito.total+this.carrito.montoDescuento;
            this.aplicoDescuento();
          }
        }else{
          this.carrito.detallesCarrito[i].subtotal = this.carrito.detallesCarrito[i].cantidad * this.carrito.detallesCarrito[i].manufacturado.precio;
          this.carrito.total -= this.carrito.detallesCarrito[i].manufacturado.precio;
          if(this.descuento){
            this.totalSinDescuento=this.carrito.total+this.carrito.montoDescuento;
            this.aplicoDescuento();
          }
        }
        console.log(this.carrito.detallesCarrito);
      }
    }
  }

  aplicoDescuento(){
    console.log(this.carrito.total);
    this.totalConDescuento = this.totalSinDescuento - (this.totalSinDescuento * 0.10);
    this.carrito.montoDescuento = this.totalSinDescuento * 0.10;
    this.carrito.total = this.totalConDescuento;
    this.carrito.tipoEnvio="Retiro en local";
    console.log(this.carrito.montoDescuento);
    console.log(this.carrito.total);
  }

  quitoDescuento(){
    if(this.descuento){
      this.totalSinDescuento = this.carrito.total + this.carrito.montoDescuento;
      this.carrito.total = this.totalSinDescuento;
      this.carrito.montoDescuento=0;
      this.carrito.tipoEnvio="Delivery";
    }else{
      this.carrito.total = this.totalSinDescuento;
      this.carrito.tipoEnvio="Delivery";
      console.log(this.carrito.total);
    }
    
  }

  limpiar(){
    this.carritoService.delete(this.carrito.id).subscribe((res)=>{
      this.carrito={};
      this.totalConDescuento=0;
      this.totalSinDescuento=0;
      this.descuento=false;
    })
  }

  confirmarPedido(){
    if(this.carrito.tipoEnvio=="Retiro en local"){
      this.tiempoDelivery=0;
    }else{
      this.tiempoDelivery=20;
    }
    let tiempoFinal: string;
    let tiempoFinal2: string;
    let fechaPedido = new Date();
    let horaFinalizacion = new Date(fechaPedido.getTime() + ((this.tiempoPedido + 15 + this.tiempoDelivery)*60000));

    if(this.puedePedir()){
  // ESTA EN HORARIO PARA PEDIR
  tiempoFinal = fechaPedido.toLocaleDateString()+" "+fechaPedido.toLocaleTimeString();
  tiempoFinal2 = horaFinalizacion.toLocaleDateString()+" "+horaFinalizacion.toLocaleTimeString();
  console.log('En HORARIO');

      //alert se esta procesando su pedido
  }else{
    // NO ESTA EN HORARIO, EL PEDIDO PASA A LAS 20:00:00
    console.log('Fuera de HORARIO');
    tiempoFinal = fechaPedido.toLocaleDateString()+" "+fechaPedido.toLocaleTimeString();
    horaFinalizacion.setHours(20);
    horaFinalizacion.setMinutes(0);
    horaFinalizacion.setSeconds(0);
    horaFinalizacion.setTime(horaFinalizacion.getTime() + ((this.tiempoPedido + 15 + this.tiempoDelivery)*60000));
    tiempoFinal2 = fechaPedido.toLocaleDateString()+" "+horaFinalizacion.toLocaleTimeString();
        //alert esta fuera de horario

  }

    this.pedidoEnvio.fecha=tiempoFinal;
    this.pedidoEnvio.cliente=this.carrito.cliente;
    this.pedidoEnvio.domicilioCliente=this.carrito.domicilioCliente;
    this.pedidoEnvio.montoDescuento=this.carrito.montoDescuento;
    this.pedidoEnvio.tipoEnvio=this.carrito.tipoEnvio;
    this.pedidoEnvio.total=this.carrito.total;
    this.pedidoEnvio.horaEstimadaFin=tiempoFinal2;
    this.pedidoEnvio.estado="Pendiente";
    this.pedidoEnvio.detalles=new Array<PedidoDetalle>();
    for(let detalle of this.carrito.detallesCarrito){
      debugger
      if(detalle.insumo!=null){
        this.detallePedido.cantidad=detalle.cantidad;
        this.detallePedido.subtotal=detalle.subtotal;
        this.detallePedido.insumo=detalle.insumo;
        this.pedidoEnvio.detalles.push(this.detallePedido);
        this.detallePedido={};
        
      }else if(detalle.manufacturado!=null){
        this.detallePedido.cantidad=detalle.cantidad;
        this.detallePedido.subtotal=detalle.subtotal;
        this.detallePedido.manufacturado=detalle.manufacturado;
        this.pedidoEnvio.detalles.push(this.detallePedido);
        this.detallePedido={};
      }
    }
    this.pedidoService.postPedido(this.pedidoEnvio).subscribe((res)=>{
      console.log(res);
      this.carritoService.delete(this.carrito.id).subscribe((res)=>{
        console.log(res);
        this.carrito={};
        this.totalConDescuento=0;
        this.totalSinDescuento=0;
        this.descuento=false;
        this.tiempoPedido=0;
        this.tiempoDelivery=0;
        this.pedidoEnvio={};
        this.detallePedido={};
      })
    })
  }

  domSelect(domicilio : Domicilio){
    console.log(domicilio);
    this.carrito.domicilioCliente=domicilio;
    console.log(this.carrito);
    $("#modalSelectDomicilio").modal("hide");
    $("#modalCarrito").modal("show");
  }

  cerrar(){
    if(this.carrito.id>0){
      this.carritoService.put(this.carrito, this.carrito.id).subscribe((carritoRes)=>{
      console.log(carritoRes);
    })
    }
  }

  puedePedir(){
    let fechaPedido = new Date();

    switch (this.getNombreDia(fechaPedido.getDay())) {
      case 'Lunes': case 'Martes': case'Miercoles' : case'Jueves': case'Viernes':
        if(fechaPedido.toLocaleTimeString() > '12:00:00' && fechaPedido.toLocaleTimeString() < '20:00:00'){
          return false;
        }else{
          return true;
      }
        break;
        case 'Sábado': case 'Domingo':
        if(fechaPedido.toLocaleTimeString() > '15:00:00' && fechaPedido.toLocaleTimeString() < '20:00:00'){
          return false;
        }else{
          return true;
        }
        break;
    }
    fechaPedido = null;
  }

  getNombreDia(index: number){
    var dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes';
    dia[2] = 'Martes';
    dia[3] = 'Miércoles';
    dia[4] = 'Jueves';
    dia[5] = 'Viernes';
    dia[6] = 'Sábado';
    return dia[index];
  }

}
