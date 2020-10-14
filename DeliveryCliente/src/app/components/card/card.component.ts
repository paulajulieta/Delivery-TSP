import { Component, OnInit, Input } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { User } from 'firebase';
import { Usuario } from 'src/app/models/Usuario';
import { Carrito } from 'src/app/models/Carrito';
import { CarritoDetalle } from 'src/app/models/CarritoDetalle';
declare var $ : any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() platoAux:Plato;
  @Input() idPlato:number;
  @Input() bebidaAux:ArticuloInsumo;
  @Input() idBebida:number;
  mostrarPlato:boolean=false;
  mostrarBebida:boolean=false;
  logueado:boolean=false;
  usuario:User;
  usuarioApi:Usuario;
  carrito:Carrito={};
  detallesCarrito:Array<CarritoDetalle>=new Array<CarritoDetalle>();
  detalleCarrito:CarritoDetalle={};
  constructor(private usuarioService:UsuarioService, private authService:AuthService, private carritoService:CarritoService) { }

  ngOnInit(): void {
    if(this.platoAux!=null){
      this.mostrarPlato=true;
      console.log(this.platoAux)
    }else if(this.bebidaAux!=null){
      this.mostrarBebida=true;
      console.log(this.bebidaAux)
    }

    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
        })
      }
    })
  }

  agregarCarrito(esBebida:boolean){
    if(this.usuarioApi!=null){
      this.carritoService.getOneByCliente(this.usuarioApi.id).subscribe((carritoRes)=>{ //busco carrito que este asociado al cliente logueado
        
        if(carritoRes.id==0){ //si no hay carrito lo creo
          this.carrito.fecha=new Date();
          this.carrito.cliente=this.usuarioApi;
          this.carrito.tipoEnvio="Delivery";
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
              /* for(let detalle of this.carrito.detallesCarrito){ //recorro los detalles del carrito bd
                if(detalle.insumo!=null){ //si en el detalle hay un insumo
                  if(detalle.insumo.id!=this.detalleCarrito.insumo.id){ //si el id es distinto
                    this.detalleCarrito.cantidad++;
                    this.detalleCarrito.subtotal=this.bebidaAux.precioVta*this.detalleCarrito.cantidad; //calculo subtotal
                    this.carrito.detallesCarrito.push(this.detalleCarrito); //se agrega a los detalles el nuevo detalle
                    this.carrito.total+=this.bebidaAux.precioVta; //sumo subtotal al total
                  }else{  //si el id es igual
                    detalle.cantidad++; //aumento cantidad
                    detalle.subtotal=this.bebidaAux.precioVta*detalle.cantidad; //calculo subtotal
                    this.carrito.total+=this.bebidaAux.precioVta; //aumento total
                    console.log(detalle);
                    console.log(this.carrito.detallesCarrito);
                    
                  }
                }
              } */
              var contadorIgualId:number=0;
              for(var i:number=0; i<this.carrito.detallesCarrito.length; i++){
                
                if(this.carrito.detallesCarrito[i].insumo!=null){
                  if(this.carrito.detallesCarrito[i].insumo.id==this.detalleCarrito.insumo.id){
                    contadorIgualId++;
                    this.carrito.detallesCarrito[i].cantidad++;
                    this.carrito.detallesCarrito[i].subtotal=this.carrito.detallesCarrito[i].cantidad*this.bebidaAux.precioVta;
                    this.carrito.total+=this.bebidaAux.precioVta;
                  }else if(i==(this.carrito.detallesCarrito.length-1) && (this.carrito.detallesCarrito[i].insumo.id!=this.detalleCarrito.insumo.id)){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.detalleCarrito.cantidad*this.bebidaAux.precioVta;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    this.carrito.total+=this.bebidaAux.precioVta;
                  }
                }else if(i==(this.carrito.detallesCarrito.length-1) && contadorIgualId==0){
                  this.detalleCarrito.cantidad=1;
                  this.detalleCarrito.subtotal=this.detalleCarrito.cantidad*this.bebidaAux.precioVta;
                  this.carrito.detallesCarrito.push(this.detalleCarrito);
                  this.carrito.detallesCarrito[i+1].id=0;
                  this.carrito.total+=this.bebidaAux.precioVta;
                  break;
                }
              }
            }else{  //si no hay detalles lo agrego directamente
              this.detalleCarrito.cantidad++;
              this.detalleCarrito.subtotal=this.bebidaAux.precioVta*this.detalleCarrito.cantidad;
              this.carrito.detallesCarrito.push(this.detalleCarrito);
              this.carrito.total+=this.bebidaAux.precioVta;
            }
            //guardo en bd
            this.carritoService.put(this.carrito, this.carrito.id).subscribe((res)=>{
              console.log(res);
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
                
                debugger
                if(this.carrito.detallesCarrito[i].manufacturado!=null){
                  if(this.carrito.detallesCarrito[i].manufacturado.id==this.detalleCarrito.manufacturado.id){
                    contadorIgualId++;
                    this.carrito.detallesCarrito[i].cantidad++;
                    this.carrito.detallesCarrito[i].subtotal=this.carrito.detallesCarrito[i].cantidad*this.platoAux.precio;
                    this.carrito.total+=this.platoAux.precio;
                  }else if(i==(this.carrito.detallesCarrito.length-1) && (this.carrito.detallesCarrito[i].manufacturado.id!=this.detalleCarrito.manufacturado.id)){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    this.carrito.total+=this.platoAux.precio;
                  }
                }else if(i==(this.carrito.detallesCarrito.length-1) && contadorIgualId==0){
                    this.detalleCarrito.cantidad=1;
                    this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
                    this.carrito.detallesCarrito.push(this.detalleCarrito);
                    this.carrito.detallesCarrito[i+1].id=0;
                    this.carrito.total+=this.platoAux.precio;
                    break;  //rompo bucle porque se me actualiza el tamaño de los detalles
                }
              }
            }else{
              this.detalleCarrito.cantidad=1;
              this.detalleCarrito.subtotal=this.platoAux.precio*this.detalleCarrito.cantidad;
              this.carrito.detallesCarrito.push(this.detalleCarrito);
              this.carrito.detallesCarrito[0].id=0;
              this.carrito.total+=this.platoAux.precio;
            }
            this.carritoService.put(this.carrito, this.carrito.id).subscribe((res)=>{
              console.log(res);
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
