import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Pedido } from 'src/app/models/Pedido';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  usuario:User;
  usuarioApi:Usuario;
  pedidosPendientes:Pedido[];
  pedidoId:number=0;
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private pedidoService : PedidoService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          this.pedidoService.getAllByClientePendientes(this.usuarioApi.id).subscribe((pedidoRes)=>{
            this.pedidosPendientes=pedidoRes;
            console.log(pedidoRes);
          })
        })
      }
    })

    setInterval(() => {
      this.authService.isAuth().subscribe((usuario)=>{
        if(usuario!=null){
          this.usuario=usuario;
          this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
            this.usuarioApi=usuarioRes;
            this.pedidoService.getAllByClientePendientes(this.usuarioApi.id).subscribe((pedidoRes)=>{
              this.pedidosPendientes=pedidoRes;
              console.log(pedidoRes);
            })
          })
        }
      })
    }, 10000);
  }


  

}
