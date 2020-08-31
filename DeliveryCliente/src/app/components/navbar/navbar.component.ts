import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          console.log(this.usuarioApi);
        })
      }
    })
  }

  salir() {
    this.authService.logout();
  }

}
