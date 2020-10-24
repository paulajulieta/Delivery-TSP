import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario:User;
  usuarioApi:Usuario;
  cargando:boolean=true;
  logueado:boolean=false;
  esAdmin:boolean=false;
  esCocinero:boolean=false;
  esCajero:boolean=false;
  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          this.cargando=false;
          this.logueado=true;
          if(this.usuarioApi.rol.nombre==="administrador"){
            this.esAdmin=true;
          }else if(this.usuarioApi.rol.nombre==="cajero"){
            this.esCajero=true;
          }else if(this.usuarioApi.rol.nombre==="cocinero"){
            this.esCocinero=true;
          }
          console.log(usuarioRes);
        })
      }
    })
  }

  salir() {
    this.authService.logout();
  }
}
