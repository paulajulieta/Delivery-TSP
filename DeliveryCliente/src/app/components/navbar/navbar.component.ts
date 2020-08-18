import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario:User;
  constructor(private auth:AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe((usuario)=>{
      this.usuario=usuario;
    })
  }

  logout() {
    this.auth.signOut();
  }

}
