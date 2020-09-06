import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { User } from 'firebase';
import { error } from 'protractor';

@Component({
  selector: 'app-modal-editar-usuario',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.scss']
})
export class ModalEditarUsuarioComponent implements OnInit {
  usuarioApi:Usuario;
  usuario:User;
  nombre:string;
  apellido:string;
  telefono:string;
  dni:number;
  fechaNac:string;
  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          this.nombre=this.usuarioApi.nombre;
          this.apellido=this.usuarioApi.apellido;
          this.telefono=this.usuarioApi.telefono;
          this.dni=this.usuarioApi.dni;
          this.fechaNac=this.usuarioApi.fechaNac;
        })
      }
    })
  }

  updateUsuario(){
    this.usuarioApi.nombre=this.nombre;
    this.usuarioApi.apellido=this.apellido;
    this.usuarioApi.telefono=this.telefono;
    this.usuarioApi.dni=this.dni;
    this.usuarioApi.fechaNac=this.fechaNac;

    this.usuarioService.put(this.usuarioApi, this.usuarioApi.id).subscribe((usuarioRes)=>{
      console.log(usuarioRes);
    }, (error)=>{
      console.log(error)
    })
  }

}
