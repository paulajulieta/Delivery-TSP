import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { PlatoService } from 'src/app/services/plato.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images:Array<string>;
  platos:Plato[];
  bebidas:ArticuloInsumo[];
  platosBD:Plato[];
  bebidasBD:ArticuloInsumo[];
  constructor(private platoService: PlatoService, private insumoService: InsumoService) { }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
    this.platoService.getAllPlato().subscribe((platosApi)=>{
      this.platosBD=platosApi;
      this.platos=this.platosBD
      console.log(this.platos);
    });
    this.insumoService.getAllNoInsumos().subscribe((bebidasApi)=>{
      this.bebidasBD=bebidasApi;
      this.bebidas=this.bebidasBD;
      console.log(this.bebidas);
    });
  }

  buscarPlatos(platoBuscado:string){
    this.platos=this.platosBD.filter(plato=>{
      return plato.nombre.toLowerCase().includes(platoBuscado.toLowerCase());
    })
  }

  buscarBebida(bebidaBuscada:string){
    this.bebidas=this.bebidasBD.filter(bebida=>{
      return bebida.nombre.toLowerCase().includes(bebidaBuscada.toLowerCase());
    })
  }

}
