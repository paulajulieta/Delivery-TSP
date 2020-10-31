import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent implements OnInit {

  usuariosEmpleados:Usuario[]=[]
  usuariosClientes:Usuario[]=[]
  usuarioModal:Usuario={}
  constructor(private usuariosService:UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe((usuariosApi)=>{
      this.usuariosEmpleados=usuariosApi;
      console.log(this.usuariosEmpleados)
    });
    this.usuariosService.getAllClientes().subscribe((usuariosApi)=>{
      this.usuariosClientes=usuariosApi;
    })
  }

  eliminarUsuario(id:number, tipo:string){
    if(tipo==="cliente"){
      this.usuariosService.deleteCli(id).subscribe((res)=>{
        console.log(res);
      })
    }else if(tipo==="empleado"){
      this.usuariosService.deleteEmp(id).subscribe((res)=>{
        console.log(res);
      })
    }
    window.location.reload();
  }

}
