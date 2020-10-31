import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/Rol';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-abm-usuario',
  templateUrl: './modal-abm-usuario.component.html',
  styleUrls: ['./modal-abm-usuario.component.scss']
})
export class ModalAbmUsuarioComponent implements OnInit {

  @Input() usuario:Usuario;
  formulario:FormGroup
  nuevoUsuario:Usuario={}
  roles:Rol[]=[];
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private authService:AuthService) { }

  ngOnInit(): void {
    this.usuarioService.getAllRol().subscribe((rolApi)=>{
      this.roles=rolApi;
    })
    this.formulario=this.fb.group({
      id:[''],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      email:['', Validators.compose(
        [Validators.email, Validators.required]
      )],
      pass:['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      telefono:['', Validators.required],
      dni:['', Validators.required],
      fechaNac:['', Validators.required],
      rol:[null, Validators.required]
    })

    console.log(this.usuario)
  }

  traerDatos(){
    if(this.usuario!=null){
      this.formulario.controls['id'].setValue(this.usuario.id);
      this.formulario.controls['nombre'].setValue(this.usuario.nombre);
      this.formulario.controls['apellido'].setValue(this.usuario.apellido);
      this.formulario.controls['email'].setValue(this.usuario.email);
      this.formulario.controls['pass'].setValue(this.usuario.pass);
      this.formulario.controls['telefono'].setValue(this.usuario.telefono);
      this.formulario.controls['dni'].setValue(this.usuario.dni);
      this.formulario.controls['fechaNac'].setValue(this.usuario.fechaNac);
      this.formulario.controls['rol'].setValue(this.usuario.rol);
      console.log(this.formulario.controls['rol'].value)
    }else{
      this.formulario.controls['id'].setValue('');
      this.formulario.controls['nombre'].setValue('');
      this.formulario.controls['apellido'].setValue('');
      this.formulario.controls['email'].setValue('');
      this.formulario.controls['pass'].setValue('');
      this.formulario.controls['telefono'].setValue('');
      this.formulario.controls['dni'].setValue('');
      this.formulario.controls['fechaNac'].setValue('');
      this.formulario.controls['rol'].setValue(null);
    }
  }

  save(){
    if(this.usuario===null){
      this.usuarioService.post(this.formulario.value as Usuario).subscribe(
        result=>{console.log('Registro correcto', result); window.location.reload();},
        error=>{console.log('Ha ocurrido un error', error)}
      )
    }else{
      this.usuarioService.put(this.formulario.value as Usuario, this.formulario.controls['id'].value).subscribe((res)=>{
        console.log(res);
        window.location.reload();
      })
    }
    
  }
}
