import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario:User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
      }
    })
  }

  salir() {
    this.authService.logout();
  }

}
