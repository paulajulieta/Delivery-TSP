import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RolCocineroGuard implements CanActivate {
  usuario:Usuario;
  estado:boolean;

  constructor(private router: Router, private usuarioService:UsuarioService, private auth:AuthService, private afsAuth: AngularFireAuth){
    this.usuario={}
  }
  
  canActivate(): boolean {
    this.getRol();
    return this.estado;
  }

  async getRol(){
    this.usuarioService.getEmail((await this.afsAuth.currentUser).email).subscribe((res) => {
      this.usuario = res;
      if(this.usuario.rol.nombre==='cocinero'){
        this.estado=true;
        console.log('correcto')
      }else{
        this.router.navigate(['home']);
        this.estado=false;
      }
    })
    /* this.auth.isAuth().subscribe((usuario)=>{
      this.usuarioService.getEmail(usuario.email).subscribe(((usuarioApi)=>{
        this.usuario=usuarioApi;
        this.verificar();
      }))
    }) */
  }

  verificar(){
    if(this.usuario.rol.nombre==='cocinero'){
      this.estado=true;
      console.log('correcto')
    }else{
      this.router.navigate(['home']);
      this.estado=false;
    }
  }
  
}
