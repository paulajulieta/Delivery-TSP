import { Component, OnInit } from '@angular/core';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-insumos',
  templateUrl: './abm-insumos.component.html',
  styleUrls: ['./abm-insumos.component.scss']
})
export class AbmInsumosComponent implements OnInit {
  insumoModal:ArticuloInsumo;
  insumos:ArticuloInsumo[]=[]
  constructor(private articuloService:ArticulosService) { }

  ngOnInit(): void {
    this.articuloService.getAllInsumo().subscribe((insumosApi)=>{
      this.insumos=insumosApi;
      console.log(this.insumos);
    })
  }

  delete(id:number){

    Swal.fire({
      text: "¿Está seguro que desea eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articuloService.deleteInsumo(id).subscribe((res)=>{
      
          Swal.fire({
            icon: 'success',
            title: 'Se eliminó correctamente',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        });
      }
    })
    
  }

}
