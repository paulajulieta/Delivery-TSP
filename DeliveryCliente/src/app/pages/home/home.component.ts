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
  constructor(private platoService: PlatoService, private insumoService: InsumoService) { }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
    this.platoService.getAllPlato().subscribe((platosApi)=>{
      this.platos=platosApi;
      console.log(this.platos);
    });
    this.insumoService.getAllNoInsumos().subscribe((bebidasApi)=>{
      this.bebidas=bebidasApi;
      console.log(this.bebidas);
    });
  }

}
