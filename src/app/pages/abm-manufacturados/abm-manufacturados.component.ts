import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';
declare var $:any

@Component({
  selector: 'app-abm-manufacturados',
  templateUrl: './abm-manufacturados.component.html',
  styleUrls: ['./abm-manufacturados.component.scss']
})
export class AbmManufacturadosComponent implements OnInit {

  manufacturados:Plato[]=[]
  manufacturado:Plato;
  constructor(private articuloService:ArticulosService) { }

  ngOnInit(): void {
    this.articuloService.getAllManufacturado().subscribe((platosApi)=>{
      this.manufacturados=platosApi;
    })
  }

  deletePlato(id:number){
    Swal.fire({
      text: "¿Está seguro que desea eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articuloService.deleteManufacturado(id).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Se eliminó correctamente',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        })
      }
    })
    
  }

  abrirModal(plato:Plato){
    this.manufacturado=plato;
    
    $("#modalManufacturado").modal('show');
  }

}
