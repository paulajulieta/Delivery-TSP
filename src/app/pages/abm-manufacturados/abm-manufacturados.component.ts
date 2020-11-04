import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { ArticulosService } from 'src/app/services/articulos.service';

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
    this.articuloService.deleteManufacturado(id).subscribe((res)=>{
      window.location.reload();
    })
  }

}
