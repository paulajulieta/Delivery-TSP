import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss']
})
export class ModalRegistroComponent implements OnInit {

  formularioRegistro:FormGroup
  constructor(private auth:AngularFireAuth, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formularioRegistro=this.fb.group({

    })
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    //modificar para que no me cree un nuevo usuario sino que valide el existente
  }
  logout() {
    this.auth.signOut();
  }

}
