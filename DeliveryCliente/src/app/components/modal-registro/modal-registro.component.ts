import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss']
})
export class ModalRegistroComponent implements OnInit {

  formularioRegistro:FormGroup
  constructor(private fb:FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formularioRegistro=this.fb.group({
      //agregar validaciones de registro
    })
  }

  registroGoogle(){
    this.authService.loginGoogle();
    //verificar si ya esta creado, si lo esta redireccionar al login, sino crearlo e inyectarlo en la bd mysql
  }
  
  
}
