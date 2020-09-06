import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'firebase';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-barra-izq',
  templateUrl: './barra-izq.component.html',
  styleUrls: ['./barra-izq.component.scss']
})
export class BarraIzqComponent implements OnInit {

  usuario:User;
  usuarioApi:Usuario;
  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

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
