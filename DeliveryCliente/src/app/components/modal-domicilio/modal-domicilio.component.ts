import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Domicilio } from 'src/app/models/Domicilio';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { LocProvPaisService } from 'src/app/services/loc-prov-pais.service';
import { Localidad } from 'src/app/models/Localidad';
import { Provincia } from 'src/app/models/Provincia';
import { Pais } from 'src/app/models/Pais';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-modal-domicilio',
  templateUrl: './modal-domicilio.component.html',
  styleUrls: ['./modal-domicilio.component.scss']
})
export class ModalDomicilioComponent implements OnInit {
  @Output() guardarDom:EventEmitter<Domicilio>;
  @Input() idDom:number=0;
  @Input() usuario:Usuario={};
  formularioGuardar:FormGroup;
  domicilioLocal:Domicilio;
  domicilioEnvio:Domicilio;
  localidades:Localidad[];
  provincias:Provincia[];
  paises:Pais[];
  constructor(private fb:FormBuilder, 
              private domicilioService:DomicilioService, 
              private auth:AuthService, 
              private usuarioService:UsuarioService, 
              private selectService:LocProvPaisService,
              private router:Router) {
                this.guardarDom=new EventEmitter();
               }

  ngOnInit(): void {
   
    this.formularioGuardar=this.fb.group({
      calle:['', Validators.required],
      nro:['', Validators.required],
      piso:['', Validators.required],
      dpto:['', Validators.required],
      CP:['', Validators.required],
      latitud:['', Validators.required],
      longitud:['', Validators.required],
      localidad:[null, Validators.required],
      provincia:[null, Validators.required],
      pais:[null, Validators.required]
    })
    
  }

  traerDatos(){
    this.selectService.getAllLoc().subscribe((locRes)=>{
      this.localidades=locRes;
    });
    this.selectService.getAllProv().subscribe((provRes)=>{
      this.provincias=provRes;
    });
    this.selectService.getAllPais().subscribe((paisRes)=>{
      this.paises=paisRes;
    });
    console.log(this.idDom)
    console.log(this.usuario)
    if(this.idDom!==0){
      this.domicilioService.getOne(this.idDom).subscribe((domicilioRes)=>{
        this.domicilioLocal=domicilioRes;
        console.log(this.domicilioLocal);
        this.formularioGuardar.controls['calle'].setValue(this.domicilioLocal.calle);
        this.formularioGuardar.controls['nro'].setValue(this.domicilioLocal.nro);
        this.formularioGuardar.controls['piso'].setValue(this.domicilioLocal.piso);
        this.formularioGuardar.controls['dpto'].setValue(this.domicilioLocal.dpto);
        this.formularioGuardar.controls['CP'].setValue(this.domicilioLocal.cp);
        this.formularioGuardar.controls['localidad'].setValue(this.domicilioLocal.localidad);
        this.formularioGuardar.controls['provincia'].setValue(this.domicilioLocal.localidad.provincia);
        this.formularioGuardar.controls['pais'].setValue(this.domicilioLocal.localidad.provincia.pais);
        console.log(this.domicilioLocal)
      });
    }else{
      this.domicilioLocal=null;
      this.domicilioEnvio=null;
      this.formularioGuardar.controls['calle'].setValue('');
      this.formularioGuardar.controls['nro'].setValue('');
      this.formularioGuardar.controls['piso'].setValue('');
      this.formularioGuardar.controls['dpto'].setValue('');
      this.formularioGuardar.controls['CP'].setValue('');
      this.formularioGuardar.controls['localidad'].setValue(null);
      this.formularioGuardar.controls['provincia'].setValue(null);
      this.formularioGuardar.controls['pais'].setValue(null);
      console.log(this.domicilioLocal)
    }

    
  }

  guardar(){
    /* if(this.idDom!==0){
      this.domicilioService.put(this.formularioGuardar.value as Domicilio, this.idDom).subscribe((domicilioRes)=>{
        this.formularioGuardar.reset();
        
        this.router.navigate(['/domicilio']);
        $("#modalDomicilio").modal("hide");
      },error=>{
        console.log(error);
      })
    }else{
      this.domicilioLocal=this.formularioGuardar.value as Domicilio;
      this.domicilioLocal.cliente=this.usuario;
      console.log(this.usuario);
      console.log(this.domicilioLocal.cliente.id);
      this.domicilioService.post(this.domicilioLocal).subscribe((domicilioRes)=>{
        this.formularioGuardar.reset();
        this.router.navigate(['/domicilio']);
        $("#modalDomicilio").modal("hide");
      })
    } */
    if(this.idDom!==0){
      this.domicilioEnvio=this.formularioGuardar.value as Domicilio;
      this.domicilioEnvio.id=this.domicilioLocal.id;
      this.formularioGuardar.reset();
      this.guardarDom.emit(this.domicilioEnvio);
      
    }else{
      this.domicilioEnvio=this.formularioGuardar.value as Domicilio;
      console.log(this.domicilioEnvio)
      console.log(this.formularioGuardar)
      this.domicilioEnvio.cliente=this.usuario;
      this.formularioGuardar.reset();
      this.guardarDom.emit(this.domicilioEnvio);
    }
    
  }

  

}
