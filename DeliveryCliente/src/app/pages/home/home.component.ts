import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { PlatoService } from 'src/app/services/plato.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { Usuario } from 'src/app/models/Usuario';
import { User } from 'firebase';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Carrito } from 'src/app/models/Carrito';
import { CarritoDetalle } from 'src/app/models/CarritoDetalle';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carrito:Carrito={};
  detallesCarrito:Array<CarritoDetalle>=new Array<CarritoDetalle>();
  detalleCarrito:CarritoDetalle={};
  images:Array<string>;
  platos:Plato[];
  bebidas:ArticuloInsumo[];
  platosBD:Plato[];
  bebidasBD:ArticuloInsumo[];
  usuario:User;
  usuarioApi:Usuario;
  platoDetalle:Plato={}
  bebidaAux:ArticuloInsumo={};
  platoAux
  constructor(private platoService: PlatoService, private insumoService: InsumoService, private usuarioService:UsuarioService, private carritoService:CarritoService, private authService:AuthService) { }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
    this.platoService.getAllPlato().subscribe((platosApi)=>{
      this.platosBD=platosApi;
      this.platos=this.platosBD
      for(let plato of this.platos){
        for(let detalle of plato.detalles){
          if(detalle.insumo!=null){
            if(detalle.insumo.stockActual<detalle.cantidad){
              plato.sinStock=true;
            }else{
              plato.sinStock=false;
            }
          }
        }
      }
      console.log(this.platos);
    });
    this.insumoService.getAllNoInsumos().subscribe((bebidasApi)=>{
      this.bebidasBD=bebidasApi;
      this.bebidas=this.bebidasBD;
      for(let bebida of this.bebidasBD){
        if(bebida.stockActual<bebida.stockMin/2){
          bebida.sinStock=true;
        }else{
          bebida.sinStock=false;
        }
      }
      
      console.log(this.bebidas);
    });
    setInterval(() => {
      this.platoService.getAllPlato().subscribe((platosApi)=>{
        this.platosBD=platosApi;
        this.platos=this.platosBD
        for(let plato of this.platos){
          for(let detalle of plato.detalles){
            if(detalle.insumo!=null){
              if(detalle.insumo.stockActual<detalle.cantidad){
                plato.sinStock=true;
              }else{
                plato.sinStock=false;
              }
            }
          }
        }
      });
      this.insumoService.getAllNoInsumos().subscribe((bebidasApi)=>{
        this.bebidasBD=bebidasApi;
        this.bebidas=this.bebidasBD;
        for(let bebida of this.bebidasBD){
          if(bebida.stockActual<bebida.stockMin/2){
            bebida.sinStock=true;
          }else{
            bebida.sinStock=false;
          }
        }
      });
    }, 5000);
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          console.log(usuarioRes);
        })
      }
    })
  }

  buscarPlatos(platoBuscado:string){
    this.platos=this.platosBD.filter(plato=>{
      return plato.nombre.toLowerCase().includes(platoBuscado.toLowerCase());
    })
  }

  buscarBebida(bebidaBuscada:string){
    this.bebidas=this.bebidasBD.filter(bebida=>{
      return bebida.nombre.toLowerCase().includes(bebidaBuscada.toLowerCase());
    })
  }

  verDetalle(plato:Plato){
    this.platoDetalle=plato;
  }

  agregarCarrito(esBebida:boolean, plato:Plato, bebida:ArticuloInsumo){
    if(plato!=null){
      this.platoAux=plato;
    }else if(bebida!=null){
      this.bebidaAux=bebida;
    }
    if(this.usuarioApi!=null){
      this.carritoService.getOneByCliente(this.usuarioApi.id).subscribe((carritoRes)=>{ //busco carrito que este asociado al cliente logueado
        if(carritoRes.id==0){ //si no hay carrito lo creo
          this.carrito.fecha=new Date();
          this.carrito.cliente=this.usuarioApi;
          this.carrito.tipoEnvio="Delivery";
          this.carrito.formaPago="Contado";
          if(esBebida){ //si es bebida
            this.detalleCarrito.insumo=this.bebidaAux;  //asigno la bebida al insumo del detalle
            this.detalleCarrito.cantidad=1; //aumento la cantidad del insumo en el detalle
            this.detalleCarrito.subtotal=this.bebidaAux.precioVta*this.detalleCarrito.cantidad; //asigno subtotal del detalle
            this.detallesCarrito.push(this.detalleCarrito); //agrego el detalle a los detallesAux
            this.carrito.detallesCarrito=this.detallesCarrito;  //agrego los detalles al carrito
            this.carrito.total=this.bebidaAux.precioVta;
            //guardo el carrito en la bd
            this.carritoService.post(this.carrito).subscribe((res)=>{
              console.log(res);
              this.carrito={}
              this.detalleCarrito={}
              this.detallesCarrito=[]
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              })
            })
          }else{  //si es plato idem pero con plato
            this.detalleCarrito.manufacturado=this.platoAux;
            this.detalleCarrito.cantidad=1;
            this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
            this.detallesCarrito.push(this.detalleCarrito);
            this.carrito.detallesCarrito=this.detallesCarrito;
            this.carrito.total=this.platoAux.precio;
            
            
            this.carritoService.post(this.carrito).subscribe((res)=>{
              console.log(res);
              this.detalleCarrito={};
              this.carrito={}
              this.detallesCarrito=[]
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              })
            })
          }
          console.log("carrito nuevo: ");
          console.log(this.carrito);
        }else{  //si hay carrito
          
          this.carrito=carritoRes;  //asigno el carrito que traigo de la bd al carrito local
          
          console.log(this.carrito.detallesCarrito);
          if(esBebida){ //si es bebida
            
            this.detalleCarrito.insumo=this.bebidaAux;  //asigno bebida aux al insumo del detalle
            if(this.carrito.detallesCarrito.length!=0){ //si hay detalles
              this.detallesCarrito=this.carrito.detallesCarrito;  //asigno los detalles del carrito a la variable auxiliar para recorrerlos
              
              var contadorIgualId:number=0;
              for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
                
                if(this.carrito.detallesCarrito[i].insumo!=null){
                  if(this.carrito.detallesCarrito[i].insumo.id==this.detalleCarrito.insumo.id){
                    contadorIgualId++;
                    this.carrito.detallesCarrito[i].cantidad++;
                    this.carrito.detallesCarrito[i].subtotal=this.carrito.detallesCarrito[i].cantidad*this.bebidaAux.precioVta;
                    if(this.carrito.tipoEnvio==="Retiro en local"){
                      this.carrito.total=this.carrito.total+this.bebidaAux.precioVta+this.carrito.montoDescuento;
                      this.carrito.montoDescuento=this.carrito.total*0.1;
                      this.carrito.total-=this.carrito.montoDescuento;
                    }else{
                      this.carrito.total+=this.bebidaAux.precioVta;
                    }
                    
                  }else if(i==(this.carrito.detallesCarrito.length-1) && (this.carrito.detallesCarrito[i].insumo.id!=this.detalleCarrito.insumo.id)){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.detalleCarrito.cantidad*this.bebidaAux.precioVta;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    if(this.carrito.tipoEnvio==="Retiro en local"){
                      this.carrito.total=this.carrito.total+this.bebidaAux.precioVta+this.carrito.montoDescuento;
                      this.carrito.montoDescuento=this.carrito.total*0.1;
                      this.carrito.total-=this.carrito.montoDescuento;
                    }else{
                      this.carrito.total+=this.bebidaAux.precioVta;
                    }
                    break;
                  }
                }else if(i==(this.carrito.detallesCarrito.length-1) && contadorIgualId==0){
                  this.detalleCarrito.cantidad=1;
                  this.detalleCarrito.subtotal=this.detalleCarrito.cantidad*this.bebidaAux.precioVta;
                  this.carrito.detallesCarrito.push(this.detalleCarrito);
                  this.carrito.detallesCarrito[i+1].id=0;
                  if(this.carrito.tipoEnvio==="Retiro en local"){
                    this.carrito.total=this.carrito.total+this.bebidaAux.precioVta+this.carrito.montoDescuento;
                    this.carrito.montoDescuento=this.carrito.total*0.1;
                    this.carrito.total-=this.carrito.montoDescuento;
                  }else{
                    this.carrito.total+=this.bebidaAux.precioVta;
                  }
                  break;
                }
              }
            }else{  //si no hay detalles lo agrego directamente
              this.detalleCarrito.cantidad++;
              this.detalleCarrito.subtotal=this.bebidaAux.precioVta*this.detalleCarrito.cantidad;
              this.carrito.detallesCarrito.push(this.detalleCarrito);
              if(this.carrito.tipoEnvio==="Retiro en local"){
                this.carrito.total=this.carrito.total+this.bebidaAux.precioVta+this.carrito.montoDescuento;
                this.carrito.montoDescuento=this.carrito.total*0.1;
                this.carrito.total-=this.carrito.montoDescuento;
              }else{
                this.carrito.total+=this.bebidaAux.precioVta;
              }
            }
            //guardo en bd
            this.carritoService.put(this.carrito, this.carrito.id).subscribe((res)=>{
              console.log(res);
              this.detalleCarrito={};
              this.carrito={}
              this.detallesCarrito=[]
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              })
            })
          }else{  //si es plato idem anterior
            this.detalleCarrito.manufacturado=this.platoAux;
            if(this.carrito.detallesCarrito.length!=0){ //si hay detalles
              this.detallesCarrito=this.carrito.detallesCarrito;  //asigno los detalles del carrito a la variable aux para recorrerlos
              /* for(let detalle of this.carrito.detallesCarrito){
                if(detalle.manufacturado!=null){
                  if(detalle.manufacturado.id!=this.detalleCarrito.manufacturado.id){
                    
                  }else{
                    detalle.cantidad++;
                    detalle.subtotal+=this.bebidaAux.precioVta;
                  }
                }
              } */
              var contadorIgualId:number=0;
              for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
                if(this.carrito.detallesCarrito[i].manufacturado!=null){
                  if(this.carrito.detallesCarrito[i].manufacturado.id==this.detalleCarrito.manufacturado.id){
                    contadorIgualId++;
                    this.carrito.detallesCarrito[i].cantidad++;
                    this.carrito.detallesCarrito[i].subtotal=this.carrito.detallesCarrito[i].cantidad*this.platoAux.precio;
                    if(this.carrito.tipoEnvio==="Retiro en local"){
                      this.carrito.total=this.carrito.total+this.platoAux.precio+this.carrito.montoDescuento;
                      this.carrito.montoDescuento=this.carrito.total*0.1;
                      this.carrito.total-=this.carrito.montoDescuento;
                    }else{
                      this.carrito.total+=this.platoAux.precio;
                    }
                  }else if(i==(this.carrito.detallesCarrito.length-1) && (this.carrito.detallesCarrito[i].manufacturado.id!=this.detalleCarrito.manufacturado.id)){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    if(this.carrito.tipoEnvio==="Retiro en local"){
                      this.carrito.total=this.carrito.total+this.platoAux.precio+this.carrito.montoDescuento;
                      this.carrito.montoDescuento=this.carrito.total*0.1;
                      this.carrito.total-=this.carrito.montoDescuento;
                    }else{
                      this.carrito.total+=this.platoAux.precio;
                    }
                    break;
                  }
                }else if(i==(this.carrito.detallesCarrito.length-1) && contadorIgualId==0){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    this.carrito.detallesCarrito[i+1].id=0;
                    if(this.carrito.tipoEnvio==="Retiro en local"){
                      this.carrito.total=this.carrito.total+this.platoAux.precio+this.carrito.montoDescuento;
                      this.carrito.montoDescuento=this.carrito.total*0.1;
                      this.carrito.total-=this.carrito.montoDescuento;
                    }else{
                      this.carrito.total+=this.platoAux.precio;
                    }
                    break;  //rompo bucle porque se me actualiza el tamaño de los detalles
                }
              }
            }else{
              this.detalleCarrito.cantidad=1;
              this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
              this.carrito.detallesCarrito.push(this.detalleCarrito);
              this.carrito.detallesCarrito[0].id=0;
              if(this.carrito.tipoEnvio==="Retiro en local"){
                this.carrito.total=this.carrito.total+this.platoAux.precio+this.carrito.montoDescuento;
                this.carrito.montoDescuento=this.carrito.total*0.1;
                this.carrito.total-=this.carrito.montoDescuento;
              }else{
                this.carrito.total+=this.platoAux.precio;
              }
            }
            this.carritoService.put(this.carrito, this.carrito.id).subscribe((res)=>{
              console.log(res);
              this.detalleCarrito={};
              this.carrito={}
              this.detallesCarrito=[]
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              })
            })
          }
          console.log("carrito existente: ");
          console.log(this.carrito);
        }
      })
      //$("#modalCarrito").modal("show");
    }else{
      $("#modalIngreso").modal("show");
    }
}

}
