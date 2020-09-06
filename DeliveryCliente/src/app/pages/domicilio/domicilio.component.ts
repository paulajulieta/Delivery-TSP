import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'firebase';
import { Usuario } from 'src/app/models/Usuario';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Domicilio } from 'src/app/models/Domicilio';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.scss']
})
export class DomicilioComponent implements OnInit {

  id:number=0;
  usuario:User;
  usuarioApi:Usuario={};
  constructor(private authService:AuthService, private usuarioService:UsuarioService, private domicilioService:DomicilioService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
        })
      }
    })
  }

  guardar(domicilio:Domicilio){
    if(domicilio.id===undefined){
      this.domicilioService.post(domicilio).subscribe((domRes)=>{
        console.log('insertado');
        window.location.reload();
      })
    }else{
      this.domicilioService.put(domicilio, domicilio.id).subscribe((domRes)=>{
        console.log('actualizado');
        window.location.reload();
      })
    }
    
  }

  eliminar(id:number){
    this.domicilioService.delete(id).subscribe((domicilioRes)=>{
      console.log("eliminado")
    })
  }
  }


