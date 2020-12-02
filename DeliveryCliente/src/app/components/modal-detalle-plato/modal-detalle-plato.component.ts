import { Component, OnInit, Input } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { PlatoService } from 'src/app/services/plato.service';
import { DetalleManufacturado } from 'src/app/models/DetalleManufacturado';

@Component({
  selector: 'app-modal-detalle-plato',
  templateUrl: './modal-detalle-plato.component.html',
  styleUrls: ['./modal-detalle-plato.component.scss']
})
export class ModalDetallePlatoComponent implements OnInit {

  constructor(private platoService: PlatoService) { }

  
  @Input() platoAux:Plato
  plato:Plato;
  detalle:DetalleManufacturado[]=[];
  datos:DetalleManufacturado[]=[];
  ngOnInit(): void {
  }

  traerDetalle(){
    
    console.log(this.platoAux)
    
  }

  cerrar(){
    this.plato={};
  }  

}
