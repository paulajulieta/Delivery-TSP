import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivate {

  usuario:Usuario;
  estado:boolean;

  constructor(private afsAuth: AngularFireAuth, private router: Router, private usuarioService:UsuarioService, private auth:AuthService){
    this.usuario={}
  }
  
  canActivate(): boolean {
    this.getRol();
    return this.estado;
  }

  getRol(){
    this.auth.isAuth().subscribe((usuario)=>{
      this.usuarioService.getEmail(usuario.email).subscribe(((usuarioApi)=>{
        this.usuario=usuarioApi;
        this.verificar();
      }))
    })
  }

  verificar(){
    if(this.usuario.rol.nombre==='administrador'){
      this.estado=true;
    }else{
      this.router.navigate(['home']);
      this.estado=false;
    }
  }
  
}
