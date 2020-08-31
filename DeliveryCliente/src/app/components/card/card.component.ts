import { Component, OnInit, Input } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() platoAux:Plato;
  @Input() idPlato:number;
  @Input() bebidaAux:ArticuloInsumo;
  @Input() idBebida:number;
  mostrarPlato:boolean=false;
  mostrarBebida:boolean=false;
  constructor() { }

  ngOnInit(): void {
    if(this.platoAux!=null){
      this.mostrarPlato=true;
      console.log(this.platoAux)
    }else if(this.bebidaAux!=null){
      this.mostrarBebida=true;
      console.log(this.bebidaAux)
    }
  }

  

}
