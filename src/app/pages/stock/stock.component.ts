import { Component, OnInit } from '@angular/core';
import { ArticuloInsumo, InsumoStock } from 'src/app/models/ArticuloInsumo';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ExcelService } from 'src/app/services/excel.service';


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
  articulosStock:InsumoStock[]=[];
  constructor(private articuloService:ArticulosService, private excelService:ExcelService) { }

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
      return res.nombre.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

  exportarExcel(){
    for(let insumo of this.articulosBD){
      var insumoNuevo:InsumoStock={};
      insumoNuevo.Id=insumo.id;
      insumoNuevo.Nombre_Insumo=insumo.nombre;
      insumoNuevo.Descripcion=insumo.descripcion;
      if(insumo.esInsumo){
        insumoNuevo.Es_Insumo="Si";
      }else{
        insumoNuevo.Es_Insumo="No";
      }
      
      insumoNuevo.Categoria=insumo.categoria.denominacion;
      insumoNuevo.Unidad_de_Medida=insumo.unidadDeMed.nombre;
      insumoNuevo.Stock_Actual=insumo.stockActual;
      insumoNuevo.Stock_Max=insumo.stockMax;
      insumoNuevo.Stock_Min=insumo.stockMin;
      insumoNuevo.Precio_Compra=insumo.precioCompra;
      insumoNuevo.Precio_Venta=insumo.precioVta;
      this.articulosStock.push(insumoNuevo);
    }
    this.excelService.exportAsExcelFile(this.articulosStock, 'Stock');
  }

}
