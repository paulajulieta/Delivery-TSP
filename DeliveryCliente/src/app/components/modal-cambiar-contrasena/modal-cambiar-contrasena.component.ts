import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'firebase';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-modal-cambiar-contrasena',
  templateUrl: './modal-cambiar-contrasena.component.html',
  styleUrls: ['./modal-cambiar-contrasena.component.scss']
})
export class ModalCambiarContrasenaComponent implements OnInit {

  errorContr:boolean=false;
  errorContrValid:boolean=false;
  usuario:User;
  usuarioApi:Usuario;
  formularioCont:FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
        })
      }
    })

    this.formularioCont=this.fb.group({
      contrasenaActual:['', Validators.required],
      contrasenaNueva:['', Validators.compose(
        [Validators.required, Validators.minLength(8)]
      )],
      comparacion:['', Validators.required]
    })
  }

  updateContrasena(){
    this.usuarioApi.pass=this.formularioCont.controls['contrasenaNueva'].value;
    this.usuarioService.put(this.usuarioApi, this.usuarioApi.id).subscribe((usuarioRes)=>{
      console.log(usuarioRes);
    })
  }

  validarContActual(){
    if(this.formularioCont.controls['contrasenaActual'].value!==this.usuarioApi.pass){
      this.errorContr=true;
    }else{
      this.errorContr=false;
    }
  }

  validarContNueva(){
    if(this.formularioCont.controls['contrasenaNueva'].value!==this.formularioCont.controls['comparacion'].value){
      this.errorContrValid=true;
    }else{
      this.errorContrValid=false;
    }
  }

}
