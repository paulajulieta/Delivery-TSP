import { Component, OnInit } from '@angular/core';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { ArticulosService } from 'src/app/services/articulos.service';

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
    this.articuloService.deleteInsumo(id).subscribe((res)=>{
      window.location.reload();
    });
  }

}
