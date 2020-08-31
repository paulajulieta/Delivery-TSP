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

  @Input() idPlato:number;
  plato:Plato;
  detalle:DetalleManufacturado[]=[];
  datos:DetalleManufacturado[]=[];
  ngOnInit(): void {
    
  }

  traerDetalle(){
    console.log('id plato '+this.idPlato)
    this.platoService.getOnePlato(this.idPlato).subscribe((platoApi)=>{
      this.plato=platoApi as Plato;
      console.log(this.plato);
    })

    this.platoService.getAllDetalle().subscribe((detalleApi)=>{
      this.datos=detalleApi;
      this.detalle=this.datos.filter(detalle=>detalle.manufacturado.id===this.idPlato);
      this.plato.detalles=this.detalle;
      console.log(this.plato.detalles);
    })
  }

}
