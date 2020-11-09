import { Component, OnInit } from '@angular/core';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  articulos:ArticuloInsumo[]=[];
  articulosBD:ArticuloInsumo[]=[];
  alto:boolean=false;
  medio:boolean=false;
  bajo:boolean=false;
  constructor(private articuloService:ArticulosService) { }

  ngOnInit(): void {
    this.articuloService.getAllInsumo().subscribe((res)=>{
      this.articulos=res;
      this.articulosBD=res;
      console.log(res)
    })
  }

  buscarInsumo(event){
    console.log(event.target.value)
    this.articulos=this.articulosBD.filter((res)=>{
      return res.nombre.toLowerCase().includes(event.target.value);
    })
  }

}
