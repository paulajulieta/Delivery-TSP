import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {

  formularioLogin:FormGroup
  datosCorrectos:boolean=true;
  textoError:string='';
  constructor(private auth:AngularFireAuth, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formularioLogin=this.fb.group({
      email:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      pass:['', Validators.required]
    })
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  

  ingresar(){
    if(this.formularioLogin.valid){
      this.datosCorrectos=true;
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.pass)
      .then((usuario)=>{
        console.log(usuario);
      }).catch((error)=>{
        this.datosCorrectos=false;
        this.textoError=error.message;
      })
    }else{
      this.datosCorrectos=false;
      this.textoError='Correo o contraseña incorrectos!!';
    }
    
  }

}
