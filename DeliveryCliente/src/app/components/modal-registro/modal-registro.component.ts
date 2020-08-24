import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss']
})
export class ModalRegistroComponent implements OnInit {

  formularioRegistro:FormGroup;
  nuevoUsuario:Usuario={};
  emailRegistrado:boolean=false;
  messageError:string="";
  constructor(private fb:FormBuilder, private authService: AuthService, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.formularioRegistro=this.fb.group({
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
      fechaNac:['', Validators.required]
    })
  }

  registro(){
      this.authService.register(this.formularioRegistro.controls['email'].value, this.formularioRegistro.controls['pass'].value)
      .then((res)=>{
        console.log(res);
        //insertar nuevo usuario en bd mysql
        this.nuevoUsuario=this.formularioRegistro.value as Usuario;

        this.usuarioService.post(this.nuevoUsuario).subscribe(
          result=>{console.log('Registro correcto', result)},
          error=>{console.log('Ha ocurrido un error', error)}
        )
        this.nuevoUsuario=null;
      }).catch((error)=>{
        console.log(error.message);
      })
  }

  registroGoogle(){
    this.authService.loginGoogle()
    .then((result)=>{
      this.authService.isAuth().subscribe(res1=>{
        const email=res1.email;
        console.log(res1);
        this.usuarioService.getEmail(email).subscribe((res)=>{
          if(res.id!=0){
            console.log("Ya esta registrado", res);
          }else{
            console.log(email);
          //email es undefined ver porque?
          this.nuevoUsuario.email=email;
          const displayName=res1.displayName;
          const dnArray=displayName.split(" ");
          const nombre=dnArray[0];
          const apellido=dnArray[1];
          this.nuevoUsuario.nombre=nombre;
          this.nuevoUsuario.apellido=apellido;

          console.log(this.nuevoUsuario);
          this.usuarioService.post(this.nuevoUsuario).subscribe((res)=>{
            console.log("Registro correcto", res);
          },(err)=>{
            console.log("Ha ocurrido un error", err);
          })
          }
        })
      })
    }).catch(err=>console.log(err.message));
    
  }

  comprobarCorreo(){
    //console.log(this.formularioRegistro.value.email)
    if(this.formularioRegistro.value.email!=''){
      this.usuarioService.getEmail(this.formularioRegistro.value.email).subscribe((res)=>{
        console.log("Este email ya esta registrado")
        this.messageError='Este correo no esta disponible';
        this.emailRegistrado=true;
        
      },(err)=>{
        console.log("Puede usar este email")
        this.emailRegistrado=false;
      })
    }
    
  }
  
  
}
