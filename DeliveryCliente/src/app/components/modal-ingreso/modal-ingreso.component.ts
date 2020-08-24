import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {

  formularioLogin:FormGroup
  datosCorrectos:boolean=true;
  datosIncorrectos:boolean=true;
  textoError:string='';
  constructor(private auth:AngularFireAuth, private fb:FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formularioLogin=this.fb.group({
      email:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      pass:['', Validators.required]
    })
  }

  ingresar(email:string, pass:string){
    if(this.formularioLogin.valid){
      this.datosCorrectos=true;
      this.authService.login(email, pass)
      .then((usuario)=>{
        console.log(usuario);
        $("#modalIngreso").modal("hide");
      }).catch((error)=>{
        this.datosCorrectos=false;
        this.textoError=error.message;
      })
    }else{
      this.datosCorrectos=false;
      this.textoError='Correo o contraseña incorrectos!!';
    }
  }

  
  ingresarGoogle(){
    this.authService.loginGoogle();
  }

}
