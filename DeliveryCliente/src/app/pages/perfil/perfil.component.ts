import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuarioApi:Usuario;
  usuario:User;
  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

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

}
